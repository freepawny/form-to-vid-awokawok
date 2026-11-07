import React from 'react';
import { Composition } from 'remotion';
import { VideoComposition, VideoCompositionProps } from './VideoComposition';
import activeProjectData from './active-project.json';

export type ActiveProjectData = VideoCompositionProps & {
  projectName?: string;
  durationInFrames?: number;
  fps?: number;
};

const active: ActiveProjectData = activeProjectData as ActiveProjectData;

const defaultProps: VideoCompositionProps = {
  title: active.title || 'Video Generator',
  audioSrc: active.audioSrc || 'sample-bgm.wav',
  audioVolume: active.audioVolume ?? 0.35,
  voiceoverSrc: active.voiceoverSrc || undefined,
  captions: active.captions || [],
  overlays: active.overlays || [],
};

const durationInFrames = active.durationInFrames || 300;
const fps = active.fps || 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Short / Reels / TikTok Video (Default) */}
      <Composition
        id="VerticalShort"
        component={VideoComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* 16:9 Landscape HD Video */}
      <Composition
        id="MainVideo"
        component={VideoComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </>
  );
};
