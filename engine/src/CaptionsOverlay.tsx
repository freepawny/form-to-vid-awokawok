import React, { useMemo } from 'react';
import {
  Caption,
  createTikTokStyleCaptions,
  parseSrt,
} from '@remotion/captions';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface CaptionsOverlayProps {
  captions: Caption[];
  combineTokensWithinMilliseconds?: number;
}

/**
 * Helper utility if you load raw .srt text instead of Caption[] JSON
 */
export const captionsFromSrt = (srtContent: string): Caption[] => {
  const { captions } = parseSrt({ input: srtContent });
  return captions;
};

export const CaptionsOverlay: React.FC<CaptionsOverlayProps> = ({
  captions,
  combineTokensWithinMilliseconds = 1200,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  const { pages } = useMemo(() => {
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds,
    });
  }, [captions, combineTokensWithinMilliseconds]);

  const activePage = useMemo(() => {
    return pages.find((page, index) => {
      const nextPage = pages[index + 1];
      const pageEndMs = nextPage
        ? Math.min(nextPage.startMs, page.startMs + page.durationMs + 200)
        : page.startMs + page.durationMs + 300;
      return currentTimeMs >= page.startMs && currentTimeMs < pageEndMs;
    });
  }, [pages, currentTimeMs]);

  if (!activePage) {
    return null;
  }

  const pageStartFrame = (activePage.startMs / 1000) * fps;
  const popScale = spring({
    frame: Math.max(0, frame - pageStartFrame),
    fps,
    config: { damping: 14, stiffness: 220 },
  });

  const isVertical = height > width;
  const fontSize = isVertical ? 64 : 56;
  const bottomOffset = isVertical ? 260 : 90;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: bottomOffset,
        paddingLeft: 48,
        paddingRight: 48,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `scale(${0.92 + 0.08 * popScale})`,
          backgroundColor: 'rgba(9, 13, 22, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 20,
          padding: '16px 32px',
          maxWidth: isVertical ? '92%' : '78%',
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 800,
            fontSize,
            lineHeight: 1.25,
            whiteSpace: 'pre-wrap',
            letterSpacing: '-0.02em',
          }}
        >
          {activePage.tokens.map((token) => {
            const isCurrentlySpoken =
              currentTimeMs >= token.fromMs && currentTimeMs <= token.toMs;

            return (
              <span
                key={`${token.fromMs}-${token.text}`}
                style={{
                  color: isCurrentlySpoken ? '#38bdf8' : '#f8fafc',
                  textShadow: isCurrentlySpoken
                    ? '0 0 20px rgba(56, 189, 248, 0.55)'
                    : '0 2px 8px rgba(0, 0, 0, 0.65)',
                }}
              >
                {token.text}
              </span>
            );
          })}
        </p>
      </div>
    </AbsoluteFill>
  );
};
