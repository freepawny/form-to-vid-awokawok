import React from 'react';
import type { Caption } from '@remotion/captions';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Scene3D } from './Scene3D';
import { CaptionsOverlay } from './CaptionsOverlay';
import { AudioTrack } from './AudioTrack';

export type ImageOverlay = {
  src: string;
  startFrame: number;
  endFrame: number;
  position?: 'center' | 'top' | 'bottom';
  maxWidth?: string | number;
};

export type VideoCompositionProps = {
  title?: string;
  audioSrc?: string;
  audioVolume?: number;
  voiceoverSrc?: string;
  captions?: Caption[];
  overlays?: ImageOverlay[];
};

export const VideoComposition: React.FC<VideoCompositionProps> = ({
  title,
  audioSrc,
  audioVolume = 0.35,
  voiceoverSrc,
  captions = [],
  overlays = [],
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#090d16' }}>
      {/* Layer 1: 3D Three.js Scene */}
      <Scene3D />

      {/* Layer 2: Optional Top Badge / Title */}
      {title ? (
        <AbsoluteFill
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: isVertical ? 110 : 48,
            opacity: headerOpacity,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              backgroundColor: 'rgba(99, 102, 241, 0.18)',
              border: '1px solid rgba(129, 140, 248, 0.35)',
              color: '#e0e7ff',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: isVertical ? 28 : 22,
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}
          >
            {title}
          </div>
        </AbsoluteFill>
      ) : null}

      {/* Layer 2.5: Image / Diagram Overlays */}
      {overlays && overlays.length > 0
        ? overlays.map((overlay, index) => {
            if (frame < overlay.startFrame || frame > overlay.endFrame) {
              return null;
            }
            const entrance = interpolate(
              frame,
              [overlay.startFrame, overlay.startFrame + 10],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const exit = interpolate(
              frame,
              [overlay.endFrame - 10, overlay.endFrame],
              [1, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const opacity = entrance * exit;
            const cleanPath = overlay.src.startsWith('active/') ? overlay.src : `active/${overlay.src}`;
            const resolvedSrc = overlay.src.startsWith('http') ? overlay.src : staticFile(cleanPath);

            return (
              <AbsoluteFill
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity,
                  pointerEvents: 'none',
                  padding: 32,
                }}
              >
                <img
                  src={resolvedSrc}
                  style={{
                    maxWidth: overlay.maxWidth || (isVertical ? '85%' : '60%'),
                    maxHeight: isVertical ? '55%' : '70%',
                    borderRadius: 16,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    border: '2px solid rgba(255,255,255,0.15)',
                    objectFit: 'contain',
                  }}
                  alt={`overlay-${index}`}
                />
              </AbsoluteFill>
            );
          })
        : null}

      {/* Layer 3: Synchronized Captions Overlay */}
      {captions.length > 0 ? <CaptionsOverlay captions={captions} /> : null}

      {/* Layer 4: Audio Tracks (Background Music & Optional Voiceover) */}
      {audioSrc ? <AudioTrack src={audioSrc} baseVolume={audioVolume} /> : null}
      {voiceoverSrc ? <AudioTrack src={voiceoverSrc} baseVolume={1} /> : null}
    </AbsoluteFill>
  );
};
