import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingSphere({ position = [0, 0, 0], color = "#1CD8D2" }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.8}
      floatIntensity={1.5}
    >
      <mesh ref={meshRef} position={position} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export function FloatingTorus({ position = [0, 0, 0], color = "#00bf8f" }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1.2}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef} position={position} castShadow={false} receiveShadow={false}>
        <torusGeometry args={[1, 0.4, 12, 48]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.25}
          speed={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export function FloatingBox({ position = [0, 0, 0], color = "#302b63" }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float
      speed={1.8}
      rotationIntensity={1}
      floatIntensity={1.5}
    >
      <mesh ref={meshRef} position={position} castShadow={false} receiveShadow={false}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

export function ParticleField() {
  const particlesRef = useRef();
  const particleCount = 300;

  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
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
        size={0.04}
        color="#1CD8D2"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
