import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { FloatingSphere, FloatingTorus, FloatingBox, ParticleField } from './FloatingGeometry';

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        style={{ background: 'transparent' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#1CD8D2" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#00bf8f" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* 3D Objects */}
        <FloatingSphere position={[3, 1, 0]} color="#1CD8D2" />
        <FloatingTorus position={[-3, -1, -2]} color="#00bf8f" />
        <FloatingBox position={[2, -2, -1]} color="#302b63" />

        {/* Particle Field */}
        <ParticleField />

        {/* Controls - disabled for auto rotation, enable for interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
