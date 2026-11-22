import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeGiftBoxProps {
  isOpened: boolean;
  onOpen: () => void;
}

export const ThreeGiftBox: React.FC<ThreeGiftBoxProps> = ({ isOpened, onOpen }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Warm Marigold Key Light
    const keyLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Cool Silver Rim Light
    const silverRimLight = new THREE.DirectionalLight(0xe2e8f0, 2.0);
    silverRimLight.position.set(-4, 3, -3);
    scene.add(silverRimLight);

    // Deep Aubergine Fill Light
    const fillLight = new THREE.PointLight(0x7e22ce, 2.0, 10);
    fillLight.position.set(0, -1, 3);
    scene.add(fillLight);

    // Gift Box Root Group
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    // Materials - Deep Aubergine velvet body, Liquid Silver & Marigold ribbons
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x240a3e, // Deep Aubergine
      roughness: 0.35,
      metalness: 0.25,
    });

    const ribbonMarigoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Vibrant Marigold
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });

    const silverAccentMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Metallic Silver
      metalness: 0.95,
      roughness: 0.15,
    });

    // 1. Box Bottom Base (width 2.0, height 1.5, depth 2.0)
    const baseGeo = new THREE.BoxGeometry(2.0, 1.4, 2.0);
    const baseMesh = new THREE.Mesh(baseGeo, boxMaterial);
    baseMesh.position.y = -0.2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    boxGroup.add(baseMesh);

    // Base Ribbons (vertical cross)
    const ribbonVGeo = new THREE.BoxGeometry(0.32, 1.42, 2.02);
    const ribbonVMesh = new THREE.Mesh(ribbonVGeo, ribbonMarigoldMat);
    ribbonVMesh.position.y = -0.2;
    boxGroup.add(ribbonVMesh);

    const ribbonHGeo = new THREE.BoxGeometry(2.02, 1.42, 0.32);
    const ribbonHMesh = new THREE.Mesh(ribbonHGeo, ribbonMarigoldMat);
    ribbonHMesh.position.y = -0.2;
    boxGroup.add(ribbonHMesh);

    // Silver pinstripes on base
    const silverTrimV = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 1.43, 2.03),
      silverAccentMat
    );
    silverTrimV.position.y = -0.2;
    boxGroup.add(silverTrimV);

    // 2. Lid Group (Lid sits on top and can fly off in 3D)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.58, 0);
    boxGroup.add(lidGroup);

    const lidGeo = new THREE.BoxGeometry(2.15, 0.35, 2.15);
    const lidMesh = new THREE.Mesh(lidGeo, boxMaterial);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Lid ribbons
    const lidRibbonV = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.37, 2.17),
      ribbonMarigoldMat
    );
    lidGroup.add(lidRibbonV);

    const lidRibbonH = new THREE.Mesh(
      new THREE.BoxGeometry(2.17, 0.37, 0.34),
      ribbonMarigoldMat
    );
    lidGroup.add(lidRibbonH);

    // 3. 3D Bow Loops on Top of Lid
    const bowLoopGeo = new THREE.TorusGeometry(0.3, 0.08, 16, 32);
    const bowLoop1 = new THREE.Mesh(bowLoopGeo, ribbonMarigoldMat);
    bowLoop1.rotation.x = Math.PI / 2.5;
    bowLoop1.rotation.y = Math.PI / 4;
    bowLoop1.position.set(-0.25, 0.3, -0.25);
    lidGroup.add(bowLoop1);

    const bowLoop2 = new THREE.Mesh(bowLoopGeo, ribbonMarigoldMat);
    bowLoop2.rotation.x = -Math.PI / 2.5;
    bowLoop2.rotation.y = -Math.PI / 4;
    bowLoop2.position.set(0.25, 0.3, 0.25);
    lidGroup.add(bowLoop2);

    const bowCenter = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      silverAccentMat
    );
    bowCenter.position.set(0, 0.28, 0);
    lidGroup.add(bowCenter);

    // 4. Starlight 3D Particles inside the box
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 1.5;
      particlePos[i * 3 + 1] = 0;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      particleVel.push(
        (Math.random() - 0.5) * 0.08,
        Math.random() * 0.12 + 0.05,
        (Math.random() - 0.5) * 0.08
      );
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.1,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    boxGroup.add(particles);

    // Mouse / Touch Drag Rotation Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.4;
    let targetRotationX = 0.2;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      targetRotationY += deltaX * 0.01;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX + deltaY * 0.008));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    let openProgress = isOpened ? 1 : 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth rotation toward target
      boxGroup.rotation.y += (targetRotationY - boxGroup.rotation.y) * 0.08;
      boxGroup.rotation.x += (targetRotationX - boxGroup.rotation.x) * 0.08;

      if (!isDragging && !isOpened) {
        targetRotationY += 0.005; // Gentle idle spin
      }

      // If opening, smoothly animate the lid lifting & flying off
      if (isOpened && openProgress < 1) {
        openProgress = Math.min(1, openProgress + 0.035);
      }

      if (openProgress > 0) {
        // Lid lifts up and rotates backward
        lidGroup.position.y = 0.58 + openProgress * 2.8;
        lidGroup.position.z = -openProgress * 1.5;
        lidGroup.rotation.x = -openProgress * 1.8;
        lidGroup.rotation.z = openProgress * 0.6;

        // Particles erupt
        particleMat.opacity = Math.max(0, 1 - openProgress * 0.8);
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleVel[i * 3];
          positions[i * 3 + 1] += particleVel[i * 3 + 1];
          positions[i * 3 + 2] += particleVel[i * 3 + 2];
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      baseGeo.dispose();
      ribbonVGeo.dispose();
      ribbonHGeo.dispose();
      lidGeo.dispose();
      bowLoopGeo.dispose();
      particleGeo.dispose();
      boxMaterial.dispose();
      ribbonMarigoldMat.dispose();
      silverAccentMat.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpened]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 cursor-grab active:cursor-grabbing relative select-none"
        title="Click to open or drag to rotate in 3D"
      />

      {/* Interactive 3D Control Hints */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[11px] text-silver-300/80 bg-aubergine-900/80 border border-silver-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-marigold-400 animate-pulse" />
          <span>Drag to rotate in 3D · Click box to open</span>
        </span>
      </div>
    </div>
  );
};
