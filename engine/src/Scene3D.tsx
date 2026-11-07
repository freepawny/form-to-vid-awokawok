import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  // Entrance spring animation driven deterministically by Remotion frame
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Continuous rotation & subtle floating motion driven by frame
  const rotationY = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2]);
  const rotationX = interpolate(frame, [0, durationInFrames], [0.2, Math.PI]);
  const floatY = Math.sin((frame / fps) * Math.PI * 1.5) * 0.25;

  // Adjust camera distance slightly for vertical vs landscape aspect ratios
  const isVertical = height > width;
  const cameraZ = isVertical ? 7.5 : 5.5;

  const orbitNodes = [0, 1, 2, 3];

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ fov: 45, position: [0, 0.4, cameraZ] }}
    >
      <color attach="background" args={['#090d16']} />
      <fog attach="fog" args={['#090d16', 6, 16]} />

      {/* Studio Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color="#38bdf8" />
      <pointLight position={[4, 2, -3]} intensity={1.2} color="#a855f7" />

      {/* Central Animated 3D Object */}
      <group position={[0, floatY, 0]} scale={entrance}>
        <mesh rotation={[rotationX, rotationY, 0]}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.2}
            metalness={0.75}
          />
        </mesh>

        {/* Wireframe Outer Shell */}
        <mesh rotation={[-rotationX * 0.6, -rotationY * 0.8, 0]} scale={1.22}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Orbiting Data Nodes */}
        {orbitNodes.map((index) => {
          const angle =
            (index / orbitNodes.length) * Math.PI * 2 +
            (frame / fps) * 1.4;
          const radius = 2.3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(angle * 2) * 0.45;

          return (
            <mesh key={index} position={[x, y, z]}>
              <octahedronGeometry args={[0.24, 0]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? '#38bdf8' : '#f472b6'}
                emissive={index % 2 === 0 ? '#0284c7' : '#db2777'}
                emissiveIntensity={0.45}
                roughness={0.25}
                metalness={0.6}
              />
            </mesh>
          );
        })}
      </group>

      {/* Subtle Ground Grid Reference */}
      <gridHelper
        args={[20, 20, '#1e293b', '#0f172a']}
        position={[0, -2.2, 0]}
      />
    </ThreeCanvas>
  );
};
