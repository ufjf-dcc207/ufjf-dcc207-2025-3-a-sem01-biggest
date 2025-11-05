import { Box } from "@react-three/drei";
import Wall from "./Wall";

export default function Floor({
    gridSize = 11,
    gridHalfSize = gridSize / 2,
    cubeSize = 1,
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
                const posY = -0.5 + (Math.random() - 0.5) * 0.05;

                tempCubes.push(
                    <Box
                        key={`floor-${x}-${z}`}
                        args={[cubeSize, 1, cubeSize]}
                        position={[posX, posY, posZ]}
                        receiveShadow
                        castShadow
                    >
                        <meshStandardMaterial color="#666" />
                    </Box>
                );
            }
        }
        return tempCubes;
    };

    const walls = () => {
        const dist = gridSize / 2 + (gridSize % 2 === 0 ? 0 : 1);
        return (
            <group>
                <Wall cubeSize={cubeSize} position={[dist, 0, dist]} wallLength={gridSize} orientation="horizontal" />
                <Wall cubeSize={cubeSize} position={[dist, 0, -dist]} wallLength={gridSize} orientation="horizontal" />
                <Wall cubeSize={cubeSize} position={[dist, 0, dist]} wallLength={gridSize} orientation="vertical" />
                <Wall cubeSize={cubeSize} position={[-dist, 0, dist]} wallLength={gridSize} orientation="vertical" />
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