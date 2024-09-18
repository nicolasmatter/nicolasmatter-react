import React, { useRef } from "react";

import { Canvas } from "@react-three/fiber";
import nico5 from "../assets/models/nico5.glb";
import { useGLTF } from "@react-three/drei";

useGLTF.preload(nico5);

class NicoHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coords, usingColorScheme } = this.props;
    return (
      <>
        <Canvas
          className="main-canvas"
          onCreated={(state) => {
            state.camera.fov = 30;
          }}
        >
          <ambientLight intensity={0.4} color={0xfcb38c} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NicoModel
            usingColorScheme={usingColorScheme}
            mousePosition={coords}
          />
        </Canvas>{" "}
      </>
    );
  }
}

const NicoModel = (props) => {
  const { usingColorScheme } = props;
  const refMesh = useRef();
  const { nodes, materials } = useGLTF(nico5);
  const rot = [
    0.7 + props.mousePosition[0].y / window.innerHeight,
    0,
    0.9 - props.mousePosition[0].x / window.innerWidth,
  ];

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.head3d003.geometry}
        material={materials["material_0.003"]}
        rotation={rot}
        position={[1, -1, 0]}
        scale={0.01}
        ref={refMesh}
      >
        {usingColorScheme && <meshStandardMaterial wireframe color="white" />}
      </mesh>
    </group>
  );
};

export default NicoHead;
