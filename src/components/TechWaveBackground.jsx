import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Wave() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const wave =
        Math.sin(x * 0.5 + time) * 0.2 +
        Math.cos(y * 0.5 + time) * 0.2;

      positions.setZ(i, wave);
    }

    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-1.3, 0, 0]}>
      <planeGeometry args={[40, 40, 64, 64]} />
      <meshBasicMaterial
        color="#7b61ff"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function TechWaveBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1
      }}
    >
      <Canvas camera={{ position: [0, 6, 10] }}>
        <ambientLight intensity={1.5} />
        <Wave />
      </Canvas>
    </div>
  );
}