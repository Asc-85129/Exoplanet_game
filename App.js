import React, { useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // Import useFrame from here
import { OrbitControls, useGLTF } from '@react-three/drei'; // Correct import for OrbitControls and useGLTF


const Exoplanet = ({ position, color }) => {
  const planetRef = React.useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01; // Rotate the planet
    }
  });

  return (
    <mesh ref={planetRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Spaceship = () => {
  const spaceshipRef = React.useRef();
  const { nodes, materials } = useGLTF('/endurance_spaceship.glb'); // Update the path to your GLB file
  console.log(nodes);
  console.log(materials);
  const handleKeyPress = (event) => {
    const { key } = event;
    const speed = 0.1;

    switch (key) {
      case 'ArrowUp':
        spaceshipRef.current.position.z -= speed;
        break;
      case 'ArrowDown':
        spaceshipRef.current.position.z += speed;
        break;
      case 'ArrowLeft':
        spaceshipRef.current.position.x -= speed;
        break;
      case 'ArrowRight':
        spaceshipRef.current.position.x += speed;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
  <mesh ref={spaceshipRef} geometry={nodes?.Object_75?.geometry} material={materials?.Material_75}>
      
    </mesh>
  );
};

const App = () => {
  const planets = Array.from({ length: 10 }, (_, i) => ({
    position: [Math.random() * 10 - 5, Math.random() * 2 - 1, Math.random() * -10],
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  }));

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {planets.map((planet, index) => (
        <Exoplanet key={index} position={planet.position} color={planet.color} />
      ))}
      <Spaceship />
    </Canvas>
  );
};

export default App;
