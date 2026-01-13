import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const points = [];
  const radius = 3;
  const segments = 8;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta * 2) * 0.5,
        Math.sin(theta) * radius
      )
    );
  }

  const curve = new THREE.CatmullRomCurve3(points, true);
  const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.02, 8, true);

  return (
    <mesh ref={lineRef} geometry={tubeGeometry}>
      <meshBasicMaterial color="#1CD8D2" transparent opacity={0.6} />
    </mesh>
  );
}

export default function About3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00bf8f" />

        <ConnectingLines />

        <AnimatedSphere position={[2, 1, 0]} color="#1CD8D2" scale={0.8} />
        <AnimatedSphere position={[-2, -1, 0]} color="#00bf8f" scale={0.6} />
        <AnimatedSphere position={[0, 1.5, -1]} color="#302b63" scale={0.5} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
