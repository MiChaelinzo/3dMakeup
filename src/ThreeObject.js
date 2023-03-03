import React, { useRef } from 'react';
import * as THREE from 'three';

function ThreeObject() {
  const sceneRef = useRef(null);

  // Function to open/close lid
  const toggleLid = () => {
    const scene = sceneRef.current;
    const lid = scene.getObjectByName('lid');

    // Calculate rotation angle based on current lid position
    const angle = lid.rotation.angleTo(new THREE.Vector3(0, 0, -1)) > Math.PI / 2 ? 0 : Math.PI / 2;

    // Rotate lid around hinge axis using Quaternion
    const hingeAxis = new THREE.Vector3(1, 0, 0);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(hingeAxis, angle);
    lid.applyQuaternion(quaternion);
  };

  // Render scene with loaded 3D object
  return (
    <div>
      <button onClick={toggleLid}>Toggle Lid</button>
      <div ref={sceneRef}></div>
    </div>
  );
}

export default ThreeObject;
