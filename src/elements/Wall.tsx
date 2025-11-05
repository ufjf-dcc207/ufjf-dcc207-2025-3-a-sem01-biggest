import { Box } from "@react-three/drei";
import type { MapObjectProps } from "../Types";

type WallProps = {
    position: [number, number, number],
    height?: number,
    thickness?: number
    orientation?: 'horizontal' | 'vertical',
    wallLength: number,
    cubeSize: number


};

export default function Wall({
    wallLength,
    position,
    cubeSize,
    height = 1,
    thickness = 0.5,
    orientation = "horizontal" }: WallProps) {
    const tempWall = [];
    for (let i = 0; i < wallLength; i++) {
        const pos = (i - wallLength) * cubeSize + cubeSize / 2;
        tempWall.push(
            <Box
                key={`wall-${i}`}
                args={orientation === "horizontal" ? [cubeSize, height, thickness] : [thickness, height, cubeSize]}
                position={orientation === "horizontal" ? [pos, height / 2, 0] : [0, height / 2, pos]}
                receiveShadow
                castShadow
            >
                <meshStandardMaterial color="#888" />
            </Box>
        );
    }

    return (
        <group position={position}>
            {tempWall}
        </group >
    );
}