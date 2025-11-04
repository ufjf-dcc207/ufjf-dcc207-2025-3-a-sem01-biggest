import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder, Cone, Icosahedron } from "@react-three/drei";
import "./App.css";

// ===================================================================
function Floor({
    gridSize = 10,
    gridHalfSize = gridSize / 2,
    cubeSize = 1,
    wallHeight = 2.5, 
    wallThickness = 0.2,
}: {
    gridSize: number;
    gridHalfSize?: number;
    cubeSize?: number;
    wallHeight?: number;
    wallThickness?: number;
}) {
    const cubes = () => {
        const tempCubes = [];
        for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
                const posX = (x - gridHalfSize) * cubeSize + cubeSize / 2;
                const posZ = (z - gridHalfSize) * cubeSize + cubeSize / 2;
                const posY = -0.5 + (Math.random() - 0.5) * 0.1;

                tempCubes.push(
                    <Box
                        key={`floor-${x}-${z}`}
                        args={[cubeSize, 1, cubeSize]}
                        position={[posX, posY, posZ]}
                        receiveShadow
                    >
                        <meshStandardMaterial color="#666" />
                    </Box>
                );
            }
        }
        return tempCubes;
    };

    const walls = () => {
        const mapSize = gridSize * cubeSize;
        const wallYPos = wallHeight / 2;
        const wallEdge = mapSize / 2; 

        const halfThickness = wallThickness / 2;

        return (
            <group>
                {/* Muro Traseiro (no Z negativo) */}
                <Box
                    key="wall-back"
                    args={[mapSize + wallThickness, wallHeight, wallThickness]}
                    // Posição Z corrigida
                    position={[0, wallYPos, -wallEdge - halfThickness]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#888" />
                </Box>

                {/* Muro Frontal (no Z positivo) */}
                <Box
                    key="wall-front"
                    args={[mapSize + wallThickness, wallHeight, wallThickness]}
                    // Posição Z corrigida
                    position={[0, wallYPos, wallEdge + halfThickness]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#888" />
                </Box>

                {/* Muro Esquerdo (no X negativo) */}
                <Box
                    key="wall-left"
                    args={[wallThickness, wallHeight, mapSize]}
                    // Posição X corrigida
                    position={[-wallEdge - halfThickness, wallYPos, 0]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#888" />
                </Box>

                {/* Muro Direito (no X positivo) */}
                <Box
                    key="wall-right"
                    args={[wallThickness, wallHeight, mapSize]}
                    // Posição X corrigida
                    position={[wallEdge + halfThickness, wallYPos, 0]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#888" />
                </Box>
            </group>
        );
    };

    return (
        <group position={[0, 0, 0]}>
            {cubes()}
            {walls()}
        </group>
    );
}

type MapObjectProps = {
    position: [number, number, number];
};

function Tree({ position }: MapObjectProps) {
    const trunkHeight = 0.8;
    const leavesHeight = 1.2;
    return (
        <group position={position}>
            <Cylinder args={[0.1, 0.15, trunkHeight, 8]} position={[0, trunkHeight / 2, 0]} castShadow>
                <meshStandardMaterial color="#663300" />
            </Cylinder>
            <Cone args={[0.6, leavesHeight, 8]} position={[0, trunkHeight + leavesHeight / 2, 0]} castShadow>
                <meshStandardMaterial color="#006400" />
            </Cone>
        </group>
    );
}

function Bush({ position }: MapObjectProps) {
    const radius = 0.4;
    return (
        <Icosahedron args={[radius, 0]} position={[position[0], radius, position[2]]} castShadow>
            <meshStandardMaterial color="#228B22" />
        </Icosahedron>
    );
}

function Car({ position }: MapObjectProps) {
    const bodyHeight = 0.4;
    const cabinHeight = 0.3;
    return (
        <group position={position}>
            <Box args={[1, bodyHeight, 0.5]} position={[0, bodyHeight / 2, 0]} castShadow>
                <meshStandardMaterial color="#A0A0A0" />
            </Box>
            <Box args={[0.6, cabinHeight, 0.4]} position={[0.1, bodyHeight + cabinHeight / 2, 0]} castShadow>
                <meshStandardMaterial color="#B0C4DE" />
            </Box>
        </group>
    );
}

function Button({ position }: MapObjectProps) {
    const height = 0.1;
    return (
        <Cylinder args={[0.3, 0.3, height, 32]} position={[position[0], height / 2, position[2]]} castShadow>
            <meshStandardMaterial color="red" />
        </Cylinder>
    );
}

function MapObjects() {
    return (
        <group>
            <Tree position={[-3, 0, -3]} />
            <Tree position={[4, 0, 2]} />
            <Car position={[0, 0, -2]} />
            <Bush position={[-2, 0, 1]} />
            <Bush position={[-2.3, 0, 1.3]} />
            <Button position={[2, 0, 3]} />
        </group>
    );
}

function App() {
    return (
        <div id="canvas-container">
            <Canvas shadows camera={{ position: [8, 8, 8], fov: 60 }}>

                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[10, 15, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}

                    shadow-bias={-0.0005}
                />
                <pointLight position={[-10, -5, -10]} intensity={0.2} />

                <Floor gridSize={20} wallHeight={0.5} />

                <MapObjects />

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
