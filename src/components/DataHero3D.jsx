import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { DataCube, DataStream, NetworkNodes, HolographicRing } from './DataViz3D';

export default function DataHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00d9ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ff6b35" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#9d4edd" angle={0.6} penumbra={1} />

        {/* Environment */}
        <Environment preset="night" />

        {/* Data visualization elements */}
        <DataCube position={[-4, 2, -2]} />
        <DataCube position={[4, -1, -3]} />
        <DataStream count={200} />
        <NetworkNodes />
        <HolographicRing position={[0, 0, -5]} />
      </Canvas>
    </div>
  );
}
