import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function MailEnvelope() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Envelope base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.4, 0.1]} />
          <meshStandardMaterial color="#1CD8D2" />
        </mesh>

        {/* Envelope flap */}
        <mesh position={[0, 0.7, 0.05]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[2, 1, 0.05]} />
          <meshStandardMaterial color="#00bf8f" />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitingParticles() {
  const particlesRef = useRef();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = (i / particleCount) * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = Math.sin(theta) * radius;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#1CD8D2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Contact3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00bf8f" />

        <MailEnvelope />
        <OrbitingParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
