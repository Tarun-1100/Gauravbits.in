import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Data Cube - representing data blocks
export function DataCube({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += delta * 0.3;
      wireframeRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Main cube */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#00d9ff"
          transparent
          opacity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Wireframe */}
      <lineSegments ref={wireframeRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.2, 1.2)]} />
        <lineBasicMaterial color="#00d9ff" />
      </lineSegments>
    </group>
  );
}

// Data Stream - flowing particles representing data pipelines
export function DataStream({ count = 200 }) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, velocities };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 2] += particles.velocities[i] * delta;

        if (positions[i * 3 + 2] > 4) {
          positions[i * 3 + 2] = -4;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ff6b35"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Network Nodes - representing data connections
export function NetworkNodes() {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3;
      positions.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ]);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {nodes.map((pos1, i) =>
        nodes.slice(i + 1).map((pos2, j) => {
          const start = new THREE.Vector3(...pos1);
          const end = new THREE.Vector3(...pos2);
          const points = [start, end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`${i}-${j}`} geometry={geometry}>
              <lineBasicMaterial color="#9d4edd" transparent opacity={0.3} />
            </line>
          );
        })
      )}

      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#9d4edd"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Holographic Ring
export function HolographicRing({ position = [0, 0, 0] }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[2, 0.08, 16, 64]} />
      <meshStandardMaterial
        color="#00d9ff"
        emissive="#00d9ff"
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}
