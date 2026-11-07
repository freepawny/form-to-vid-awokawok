# 3D Video Generator (Three.js + Remotion)

Programmatic 3D animated videos using **Three.js** (`@react-three/fiber`, `@react-three/drei`, `@remotion/three`) and **Remotion** (`@remotion/captions`, `@remotion/media`, `@remotion/cli`).

## Quick Start

### 1. Open Remotion Studio (Interactive Preview)
```bash
npm run dev
```

### 2. Render Videos to MP4
```bash
# Render 16:9 Landscape HD (1920x1080) -> out/video.mp4
npm run render

# Render 9:16 Vertical Short / Reels / TikTok (1080x1920) -> out/short.mp4
npm run render:vertical
```

## Project Structure

- `remotion.config.ts` — Configures ANGLE OpenGL backend (`Config.setChromiumOpenGlRenderer('angle')`) for reliable Three.js WebGL rendering.
- `src/Root.tsx` — Registers `MainVideo` (1920×1080) and `VerticalShort` (1080×1920) compositions.
- `src/Scene3D.tsx` — Frame-deterministic 3D scene inside `<ThreeCanvas>` driven by `useCurrentFrame()`, `spring()`, and `interpolate()`.
- `src/CaptionsOverlay.tsx` — Word-highlighted TikTok/Reels-style captions powered by `@remotion/captions` (`createTikTokStyleCaptions` and `parseSrt`).
- `src/AudioTrack.tsx` — Audio playback with automatic fade-in/fade-out powered by `@remotion/media` (`<Audio>`).
- `src/VideoComposition.tsx` — Combines the 3D canvas, title badge, synchronized captions, and audio tracks.
- `public/` — Static assets (`sample-bgm.wav`, `captions.json`, `captions.srt`). Place custom `.mp3`/`.wav`, `.glb`/`.gltf` models, or subtitle files here and reference them with `staticFile('filename')`.

## Important Tip for 3D Animations in Remotion

Always animate 3D objects using Remotion's `useCurrentFrame()` (along with `interpolate()` or `spring()`) rather than Three.js `useFrame()` delta timers, and pass `layout="none"` if placing `<Sequence>` inside `<ThreeCanvas>`. This guarantees frame-accurate, flicker-free parallel video rendering.
