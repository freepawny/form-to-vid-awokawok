import React from 'react';
import { Audio } from '@remotion/media';
import { interpolate, staticFile, useVideoConfig } from 'remotion';

export interface AudioTrackProps {
  /** File path inside `public/` (e.g. "sample-bgm.wav") or full URL */
  src: string;
  baseVolume?: number;
  loop?: boolean;
}

export const AudioTrack: React.FC<AudioTrackProps> = ({
  src,
  baseVolume = 0.5,
  loop = false,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const resolvedSrc = src.startsWith('http') ? src : staticFile(src);

  const fadeFrames = Math.min(Math.round(fps * 0.5), Math.floor(durationInFrames / 3));

  return (
    <Audio
      src={resolvedSrc}
      loop={loop}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, fadeFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const fadeOut = interpolate(
          f,
          [durationInFrames - fadeFrames, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );
        return baseVolume * fadeIn * fadeOut;
      }}
    />
  );
};
