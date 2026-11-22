import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeNestedGiftProps {
  currentStage: 1 | 2 | 3;
  isOpened: boolean;
  onOpen: () => void;
}

export const ThreeNestedGift: React.FC<ThreeNestedGiftProps> = ({
  currentStage,
  isOpened,
  onOpen,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const silverLight = new THREE.DirectionalLight(0xe2e8f0, 2.2);
    silverLight.position.set(-3, 3, -3);
    scene.add(silverLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Dynamic Scale & Color based on current nested stage:
    // Stage 1: Aubergine box (size 1.8)
    // Stage 2: Marigold box (size 1.4)
    // Stage 3: Liquid Silver box (size 1.1)
    const boxSize = currentStage === 1 ? 1.7 : currentStage === 2 ? 1.35 : 1.05;
    const boxHeight = boxSize * 0.75;

    const boxColor =
      currentStage === 1 ? 0x220a3a : currentStage === 2 ? 0xd97706 : 0xe2e8f0;
    const ribbonColor =
      currentStage === 1 ? 0xf59e0b : currentStage === 2 ? 0xf8fafc : 0xf59e0b;

    const boxMat = new THREE.MeshStandardMaterial({
      color: boxColor,
      roughness: currentStage === 3 ? 0.15 : 0.35,
      metalness: currentStage === 3 ? 0.9 : 0.4,
    });

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: ribbonColor,
      roughness: 0.2,
      metalness: 0.85,
    });

    // Base Box
    const baseGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    const baseMesh = new THREE.Mesh(baseGeo, boxMat);
    baseMesh.position.y = -boxHeight / 2;
    baseMesh.castShadow = true;
    rootGroup.add(baseMesh);

    // Ribbons
    const rVGeo = new THREE.BoxGeometry(boxSize * 0.16, boxHeight * 1.02, boxSize * 1.02);
    const rVMesh = new THREE.Mesh(rVGeo, ribbonMat);
    rVMesh.position.y = -boxHeight / 2;
    rootGroup.add(rVMesh);

    const rHGeo = new THREE.BoxGeometry(boxSize * 1.02, boxHeight * 1.02, boxSize * 0.16);
    const rHMesh = new THREE.Mesh(rHGeo, ribbonMat);
    rHMesh.position.y = -boxHeight / 2;
    rootGroup.add(rHMesh);

    // Lid Group
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.05, 0);
    rootGroup.add(lidGroup);

    const lidSize = boxSize * 1.06;
    const lidHeight = boxHeight * 0.25;
    const lidGeo = new THREE.BoxGeometry(lidSize, lidHeight, lidSize);
    const lidMesh = new THREE.Mesh(lidGeo, boxMat);
    lidGroup.add(lidMesh);

    const lidRibbonV = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize * 0.18, lidHeight * 1.04, lidSize * 1.02),
      ribbonMat
    );
    lidGroup.add(lidRibbonV);

    const lidRibbonH = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize * 1.02, lidHeight * 1.04, lidSize * 0.18),
      ribbonMat
    );
    lidGroup.add(lidRibbonH);

    // Bow
    const bowGeo = new THREE.TorusGeometry(boxSize * 0.16, boxSize * 0.04, 16, 24);
    const bow1 = new THREE.Mesh(bowGeo, ribbonMat);
    bow1.rotation.x = Math.PI / 3;
    bow1.position.set(-boxSize * 0.1, lidHeight * 0.8, -boxSize * 0.1);
    lidGroup.add(bow1);

    const bow2 = new THREE.Mesh(bowGeo, ribbonMat);
    bow2.rotation.x = -Math.PI / 3;
    bow2.position.set(boxSize * 0.1, lidHeight * 0.8, boxSize * 0.1);
    lidGroup.add(bow2);

    // Drag to rotate
    let isDragging = false;
    let prevX = 0;
    let targetRotY = 0.5;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      targetRotY += (clientX - prevX) * 0.012;
      prevX = clientX;
    };
    const onUp = () => (isDragging = false);

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    let reqId: number;
    let openProgress = isOpened ? 1 : 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
      if (!isDragging && !isOpened) {
        targetRotY += 0.006;
      }

      if (isOpened && openProgress < 1) {
        openProgress = Math.min(1, openProgress + 0.04);
      }

      if (openProgress > 0) {
        lidGroup.position.y = 0.05 + openProgress * 2.2;
        lidGroup.position.z = -openProgress * 1.2;
        lidGroup.rotation.x = -openProgress * 1.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      container.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);

      renderer.dispose();
      baseGeo.dispose();
      rVGeo.dispose();
      rHGeo.dispose();
      lidGeo.dispose();
      bowGeo.dispose();
      boxMat.dispose();
      ribbonMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentStage, isOpened]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={mountRef}
        onClick={onOpen}
        className="w-64 h-64 sm:w-72 sm:h-72 cursor-grab active:cursor-grabbing relative select-none"
        title="Interactive 3D Box — Drag to rotate or click to open"
      />
      <span className="text-[11px] text-silver-300/80 bg-aubergine-900/80 border border-silver-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md -mt-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-marigold-400 animate-pulse" />
        <span>3D Box · Drag to rotate · Tap to unbox</span>
      </span>
    </div>
  );
};
