import React, { useRef } from 'react';
import * as THREE from 'three';

function MyObject() {
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

// Set up Three.js scene and load 3D object
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera();
const loader = new THREE.ObjectLoader();
loader.load('/path/to/3d/object', object => {
  object.traverse(child => {
    if (child.name === 'lid') {
      // Set pivot point for lid rotation
      const pivot = new THREE.Object3D();
      pivot.position.set(0, 1, 0);
      pivot.add(child);
      child.position.set(0, -1, 0);
      scene.add(pivot);
    } else {
      scene.add(child);
    }
  });
});

// Set up render loop and mount component to DOM
renderer.render(scene, camera);
requestAnimationFrame(() => renderer.render(scene, camera));
document.querySelector('#root').appendChild(renderer.domElement);
ReactDOM.render(<MyObject />, document.querySelector('#root'));
