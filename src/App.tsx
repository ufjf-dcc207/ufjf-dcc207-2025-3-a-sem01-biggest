import { Canvas } from "@react-three/fiber";
import "./App.css"; // Mantenha o CSS para o canvas ocupar a tela
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useErrorBoundary } from "use-error-boundary";

// Componente principal do aplicativo
function App() {
    const { didCatch, error } = useErrorBoundary();
    return didCatch ? (
        <div>{error.message}</div>
    ) : (
        <div id="canvas-container">
            <Canvas
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 7] }}
                fallback={<div>Sorry no WebGL supported!</div>}
            >
                {/* <pointLight position={[2, 0, 0]} castShadow shadow-mapSize={[1024, 1024]} intensity={10}/> */}
                <ambientLight intensity={0.05} />
                <directionalLight color="#fffce7" intensity={0.5} position={[2, 0, 0]}>
                    <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
                </directionalLight>
                <mesh position={[0, 0, 0]}>
                    <mesh position={[-1, 0, 0]}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial attach="material" />
                    </mesh>
                    <mesh position={[1, 0, 0]}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial color={"#90EE90"} />
                    </mesh>
                </mesh>
                <mesh userData={{ hello: "world" }} position={[1, 2, 1]} rotation={[Math.PI / 2, 0, 0]}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial color="hotpink" transparent />
                </mesh>
                <OrbitControls  autoRotate />
                <TransformControls />
            </Canvas>
        </div>
    );
}

export default App;
