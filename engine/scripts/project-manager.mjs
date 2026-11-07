import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// repo root & workspace root
const repoDir = path.resolve(__dirname, '..');
const workspaceDir = path.resolve(repoDir, '..');
const projectsDir = path.join(workspaceDir, 'projects');
const sharedDir = path.join(projectsDir, '_shared');
const templateDir = path.join(projectsDir, 'template');
const activePublicDir = path.join(repoDir, 'public', 'active');
const activeJsonPath = path.join(repoDir, 'src', 'active-project.json');

function getAvailableProjects() {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && d.name !== 'template')
    .map((d) => d.name);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function emptyDirSync(dir) {
  ensureDir(dir);
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const curPath = path.join(dir, file);
    try {
      if (fs.lstatSync(curPath).isDirectory()) {
        emptyDirSync(curPath);
        fs.rmdirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    } catch {}
  }
}

function copyDirClean(src, dest) {
  ensureDir(dest);
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirClean(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function cmdNew(projectName) {
  if (!projectName) {
    console.error('Error: Masukkan nama project! Contoh: npm run project:new "02-indexing-database"');
    process.exit(1);
  }

  const targetProjectDir = path.join(projectsDir, projectName);
  const inputDir = path.join(targetProjectDir, 'input');
  const outputDir = path.join(targetProjectDir, 'output');

  if (fs.existsSync(targetProjectDir)) {
    console.log(`Peringatan: Project "${projectName}" sudah ada di: ${targetProjectDir}`);
  } else {
    ensureDir(outputDir);

    if (fs.existsSync(templateDir)) {
      copyDirClean(templateDir, targetProjectDir);
      const configPath = path.join(inputDir, 'config.json');
      if (fs.existsSync(configPath)) {
        try {
          const cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
          cfg.title = projectName.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase();
          fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2), 'utf-8');
        } catch {}
      }
    } else {
      ensureDir(inputDir);
      const defaultConfig = {
        title: projectName.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase(),
        audioSrc: 'sample-bgm.wav',
        audioVolume: 0.25,
        voiceoverSrc: null,
        captionsFile: 'captions.json',
        durationInFrames: 300,
        fps: 30,
        overlays: [],
      };

      fs.writeFileSync(
        path.join(inputDir, 'config.json'),
        JSON.stringify(defaultConfig, null, 2),
        'utf-8'
      );

      fs.writeFileSync(
        path.join(inputDir, 'captions.json'),
        JSON.stringify([], null, 2),
        'utf-8'
      );
    }

    console.log(`\n Berhasil membuat project baru: "${projectName}"!`);
    console.log(` Input folder:  ${inputDir}`);
    console.log(` Output folder: ${outputDir}`);
    console.log(`\nSilakan letakkan voiceover (.mp3/.wav), naskah, dan file aset di dalam folder input tersebut.`);
  }
}

export function cmdSync(projectName) {
  const available = getAvailableProjects();
  if (!projectName) {
    console.error(`Error: Harap tentukan nama project yang ingin disinkronkan!`);
    console.log(`Project yang tersedia: ${available.join(', ') || '(belum ada project)'}`);
    process.exit(1);
  }

  const targetProjectDir = path.join(projectsDir, projectName);
  const inputDir = path.join(targetProjectDir, 'input');

  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Folder input untuk "${projectName}" tidak ditemukan di:\n${inputDir}`);
    console.log(`Project yang tersedia: ${available.join(', ')}`);
    process.exit(1);
  }

  // Bersihkan dan siapkan folder public/active
  emptyDirSync(activePublicDir);

  // 1. Copy shared assets (misal sample-bgm.wav)
  if (fs.existsSync(sharedDir)) {
    copyDirClean(sharedDir, activePublicDir);
  }

  // 2. Copy aset project input
  copyDirClean(inputDir, activePublicDir);

  // 3. Baca config.json
  const configPath = path.join(inputDir, 'config.json');
  let config = {};
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (e) {
      console.warn(`Peringatan: Gagal membaca config.json, menggunakan nilai bawaan. (${e.message})`);
    }
  }

  // 4. Baca captions jika ada
  let captions = [];
  const captionsFileName = config.captionsFile || 'captions.json';
  const captionsPath = path.join(inputDir, captionsFileName);
  if (fs.existsSync(captionsPath)) {
    try {
      captions = JSON.parse(fs.readFileSync(captionsPath, 'utf-8'));
    } catch {
      // jika bukan json (misal srt), ditangani nanti
    }
  }

  const activeData = {
    projectName,
    title: config.title || projectName,
    audioSrc: config.audioSrc ? `active/${path.basename(config.audioSrc)}` : undefined,
    audioVolume: typeof config.audioVolume === 'number' ? config.audioVolume : 0.35,
    voiceoverSrc: config.voiceoverSrc ? `active/${path.basename(config.voiceoverSrc)}` : undefined,
    captions,
    overlays: config.overlays || [],
    durationInFrames: config.durationInFrames || 300,
    fps: config.fps || 30,
  };

  fs.writeFileSync(activeJsonPath, JSON.stringify(activeData, null, 2), 'utf-8');
  console.log(` Project "${projectName}" berhasil disinkronkan ke core-engine (Remotion).`);
  return activeData;
}

export function cmdDev(projectName) {
  cmdSync(projectName);
  console.log(`\n Membuka Remotion Studio untuk project "${projectName}"...`);
  const child = spawn('npx', ['remotion', 'studio'], {
    cwd: repoDir,
    stdio: 'inherit',
    shell: true,
  });
  child.on('exit', (code) => process.exit(code || 0));
}

export function cmdRender(projectName, options = {}) {
  const activeData = cmdSync(projectName);

  const isLandscape = options.landscape === true;
  const compId = isLandscape ? 'MainVideo' : 'VerticalShort';
  const outFileName = isLandscape ? 'video.mp4' : 'short.mp4';
  const outDir = path.join(projectsDir, projectName, 'output');
  ensureDir(outDir);
  const finalOutPath = path.join(outDir, outFileName);

  console.log(`\n Mulai me-render [${compId}] -> ${finalOutPath}...`);

  const remotionArgs = ['remotion', 'render', compId, `"${finalOutPath}"`];
  if (options.extraArgs && options.extraArgs.length > 0) {
    remotionArgs.push(...options.extraArgs);
  }

  const child = spawn('npx', remotionArgs, {
    cwd: repoDir,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log(`\n======================================================`);
      console.log(` Selesai! Video berhasil dirender ke:`);
      console.log(` ${finalOutPath}`);
      console.log(`======================================================\n`);
    } else {
      console.error(`\n Rendering gagal dengan exit code: ${code}`);
    }
    process.exit(code || 0);
  });
}

// CLI Argument parsing
const args = process.argv.slice(2);
const command = args[0];
const targetName = args[1];

if (!command) {
  console.log(`
Pilihan perintah:
  node project-manager.mjs new <nama-project>
  node project-manager.mjs sync <nama-project>
  node project-manager.mjs dev <nama-project>
  node project-manager.mjs render <nama-project> [--vertical | --landscape]

Project yang tersedia saat ini:
  ${getAvailableProjects().join('\n  ') || '(belum ada project)'}
`);
  process.exit(0);
}

switch (command) {
  case 'new':
    cmdNew(targetName);
    break;
  case 'sync':
    cmdSync(targetName);
    break;
  case 'dev':
    cmdDev(targetName);
    break;
  case 'render':
    cmdRender(targetName, {
      landscape: args.includes('--landscape'),
      vertical: args.includes('--vertical') || !args.includes('--landscape'),
      extraArgs: args.slice(2).filter((a) => !['--landscape', '--vertical'].includes(a)),
    });
    break;
  default:
    console.error(`Perintah tidak dikenal: ${command}`);
    process.exit(1);
}
