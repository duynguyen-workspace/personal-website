import { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../CanvasLoader";

const Computers = ({ isMobile }) => {
    const computer = useGLTF('./desktop_pc/scene.gltf');

    return (
        <mesh>
            <hemisphereLight intensity={2} groundColor="black" />
            <pointLight intensity={1}/> 
            <spotLight
                position={[-20, 50, 10]}
                angle={10}
                penumbra={1}
                intensity={Math.PI}
                castShadow
                shadow-mapSize={1024}
            />
            <primitive 
                object={computer.scene} 
                scale={isMobile ? 0.7 : 0.85}
                position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia('(max-width: 700px)')

        // Set initial value to state variable
        setIsMobile(mediaQuery.matches)

        //* Callback function: handle changes to media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
        }

        // Add the callback function as a listener
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])

    return (
        <Canvas
            frameLoop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile}/>
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
