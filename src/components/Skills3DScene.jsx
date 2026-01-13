import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SkillOrb({ position, color, label, index }) {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.3 + index * 0.5;

      // Gentle bobbing motion
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.3;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group position={position}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

function RotatingRing() {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#1CD8D2"
        emissive="#1CD8D2"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function Skills3DScene() {
  const skillPositions = [
    { pos: [2, 0, 0], color: "#1CD8D2", label: "React" },
    { pos: [-2, 0, 0], color: "#00bf8f", label: "Node" },
    { pos: [0, 2, 0], color: "#302b63", label: "TS" },
    { pos: [0, -2, 0], color: "#1CD8D2", label: "Next" },
    { pos: [1.5, 1.5, 0], color: "#00bf8f", label: "Docker" },
    { pos: [-1.5, 1.5, 0], color: "#302b63", label: "Mongo" },
    { pos: [1.5, -1.5, 0], color: "#1CD8D2", label: "Python" },
    { pos: [-1.5, -1.5, 0], color: "#00bf8f", label: "Java" },
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1CD8D2" />

        <RotatingRing />

        {skillPositions.map((skill, i) => (
          <SkillOrb
            key={i}
            position={skill.pos}
            color={skill.color}
            label={skill.label}
            index={i}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
