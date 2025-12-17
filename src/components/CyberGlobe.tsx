"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

// Coordinates helper
const getPosition = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
};

// Arc Component
function Arc({ start, end, color }: { start: number[]; end: number[]; color: string }) {
    const curve = useMemo(() => {
        const startPos = getPosition(start[0], start[1], 5);
        const endPos = getPosition(end[0], end[1], 5);

        // Control points for arching
        const midLat = (start[0] + end[0]) / 2;
        const midLon = (start[1] + end[1]) / 2;
        // Boost height based on distance
        const dist = startPos.distanceTo(endPos);
        const midPos = getPosition(midLat, midLon, 5 + dist * 0.5);

        return new THREE.QuadraticBezierCurve3(startPos, midPos, endPos);
    }, [start, end]);

    const geometry = useMemo(() => new THREE.TubeGeometry(curve, 20, 0.05, 8, false), [curve]);

    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
}

// Marker Component
function Marker({ lat, lon, color }: { lat: number; lon: number; color: string }) {
    const pos = useMemo(() => getPosition(lat, lon, 5.05), [lat, lon]);
    return (
        <mesh position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} />
            <pointLight distance={1} intensity={2} color={color} />
        </mesh>
    );
}

// Glowing Atmosphere Shader
const Atmosphere = () => {
    return (
        <mesh scale={[1.2, 1.2, 1.2]}>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial
                color="#00FF00"
                transparent
                opacity={0.05}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}

const Earth = () => {
    const earthMap = useTexture("/earth-dark.jpg");
    const groupRef = useRef<THREE.Group>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05; // Base rotation
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.07; // Clouds slightly faster
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base Earth */}
            <Sphere args={[5, 64, 64]}>
                <meshPhongMaterial
                    map={earthMap}
                    specular={new THREE.Color("grey")}
                    shininess={5}
                />
            </Sphere>

            {/* Clouds / Glow Layer for Cyber feel */}
            <mesh ref={cloudsRef} scale={[1.01, 1.01, 1.01]}>
                <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial
                    map={earthMap}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                    color="#44ff44"
                />
            </mesh>

            <Atmosphere />

            {/* Connections (Arcs) */}
            <Arc start={[40.7, -74]} end={[51.5, -0.1]} color="#00FFFF" /> {/* NY -> London */}
            <Arc start={[51.5, -0.1]} end={[35.6, 139.6]} color="#FF00FF" /> {/* London -> Tokyo */}
            <Arc start={[-23.5, -46.6]} end={[40.4, -3.7]} color="#00FF00" /> {/* SP -> Madrid */}
            <Arc start={[35.6, 139.6]} end={[37.7, -122.4]} color="#FFFF00" /> {/* Tokyo -> SF */}
            <Arc start={[37.7, -122.4]} end={[40.7, -74]} color="#00FFFF" /> {/* SF -> NY */}

            {/* Markers */}
            <Marker lat={40.7} lon={-74} color="#00FFFF" />
            <Marker lat={51.5} lon={-0.1} color="#FF00FF" />
            <Marker lat={35.6} lon={139.6} color="#FFFF00" />
            <Marker lat={-23.5} lon={-46.6} color="#00FF00" />
            <Marker lat={37.7} lon={-122.4} color="#00FFFF" />
            <Marker lat={25.2} lon={55.2} color="#FFD700" /> {/* Dubai */}

        </group>
    );
};

export default function CyberGlobe() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={1.5} color="#444" />
                <pointLight position={[20, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-20, -10, -10]} intensity={1} color="#00FF00" />

                <Earth />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
