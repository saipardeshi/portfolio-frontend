import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState } from "react";

function Particles() {
  const ref = useRef();

  const [positions] = useState(() => {
    const arr = new Float32Array(8000 * 3);   // more particles
    for (let i = 0; i < 8000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  });

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.02;
    ref.current.rotation.y += delta * 0.04;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00ff9d" 
        size={0.015}          // smaller particles
        sizeAttenuation={false} // prevents big particles near camera
        depthWrite={false}
      />
    </Points>
  );
}

export default function TechBackground() {
  return (
    <div className="background3d">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.5} />
        <Particles />
      </Canvas>
    </div>
  );
}