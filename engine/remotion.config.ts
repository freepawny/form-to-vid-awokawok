import { Config } from '@remotion/cli/config';

// Enable ANGLE OpenGL backend for reliable WebGL / Three.js rendering
Config.setChromiumOpenGlRenderer('angle');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
