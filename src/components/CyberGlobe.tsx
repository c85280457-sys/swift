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
                    shininess={10}
                    emissive={new THREE.Color("#002200")}
                    emissiveIntensity={0.2}
                />
            </Sphere>

            {/* Clouds / Glow Layer for Cyber feel */}
            <mesh ref={cloudsRef} scale={[1.015, 1.015, 1.015]}>
                <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial
                    map={earthMap}
                    transparent
                    opacity={0.3}
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

            <Arc start={[1.3, 103.8]} end={[-33.8, 151.2]} color="#FF00FF" /> {/* Singapore -> Sydney */}
            <Arc start={[55.7, 37.6]} end={[25.2, 55.2]} color="#00FF00" /> {/* Moscow -> Dubai */}
            <Arc start={[-26.2, 28.0]} end={[19.0, 72.8]} color="#FFFF00" /> {/* Johannesburg -> Mumbai */}

            {/* Markers */}
            {[
                { lat: 40.7, lon: -74, c: "#00FFFF" }, // NY
                { lat: 51.5, lon: -0.1, c: "#FF00FF" }, // London
                { lat: 35.6, lon: 139.6, c: "#FFFF00" }, // Tokyo
                { lat: -23.5, lon: -46.6, c: "#00FF00" }, // SP
                { lat: 37.7, lon: -122.4, c: "#00FFFF" }, // SF
                { lat: 25.2, lon: 55.2, c: "#FFD700" }, // Dubai
                { lat: 1.3, lon: 103.8, c: "#FF00FF" }, // Singapore
                { lat: -33.8, lon: 151.2, c: "#FF00FF" }, // Sydney
                { lat: 55.7, lon: 37.6, c: "#00FF00" }, // Moscow
                { lat: -26.2, lon: 28.0, c: "#FFFF00" }, // Joburg
                { lat: 19.0, lon: 72.8, c: "#FFFF00" }, // Mumbai
            ].map((m, i) => (
                <Marker key={i} lat={m.lat} lon={m.lon} color={m.c} />
            ))}

        </group>
    );
};

export default function CyberGlobe() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
                <ambientLight intensity={2.5} color="#444" />
                <pointLight position={[20, 10, 10]} intensity={3} color="#ffffff" />
                <pointLight position={[-20, -10, -10]} intensity={2} color="#00FF00" />

                <Earth />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.8}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
