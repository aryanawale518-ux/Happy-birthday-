import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJarProps {
  onSelectStar?: (index: number) => void;
  openedCount: number;
}

export const ThreeJar: React.FC<ThreeJarProps> = ({ onSelectStar, openedCount }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const marigoldLight = new THREE.PointLight(0xf59e0b, 3, 10);
    marigoldLight.position.set(0, 0, 0); // Inside the jar
    scene.add(marigoldLight);

    const silverLight = new THREE.DirectionalLight(0xe2e8f0, 2.0);
    silverLight.position.set(3, 4, 3);
    scene.add(silverLight);

    const aubergineRim = new THREE.PointLight(0xa855f7, 2, 8);
    aubergineRim.position.set(-3, -2, -2);
    scene.add(aubergineRim);

    const jarGroup = new THREE.Group();
    scene.add(jarGroup);

    // 1. Translucent 3D Glass Jar Body
    const glassGeo = new THREE.CylinderGeometry(1.2, 1.1, 2.5, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.45,
      thickness: 0.5,
      metalness: 0.1,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    jarGroup.add(glassMesh);

    // Glass Base Bottom
    const baseGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.08, 32);
    const baseMesh = new THREE.Mesh(baseGeo, glassMat);
    baseMesh.position.y = -1.25;
    jarGroup.add(baseMesh);

    // Glass Neck / Rim
    const neckGeo = new THREE.TorusGeometry(1.2, 0.08, 16, 32);
    const neckMesh = new THREE.Mesh(neckGeo, glassMat);
    neckMesh.rotation.x = Math.PI / 2;
    neckMesh.position.y = 1.25;
    jarGroup.add(neckMesh);

    // 2. Metallic Silver & Marigold Cork Lid
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1, // Silver
      metalness: 0.9,
      roughness: 0.2,
    });
    const lidGeo = new THREE.CylinderGeometry(1.28, 1.25, 0.35, 32);
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.y = 1.45;
    jarGroup.add(lidMesh);

    // Marigold ribbon tie around neck
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const tieGeo = new THREE.TorusGeometry(1.23, 0.05, 16, 32);
    const tieMesh = new THREE.Mesh(tieGeo, ribbonMat);
    tieMesh.rotation.x = Math.PI / 2;
    tieMesh.position.y = 1.2;
    jarGroup.add(tieMesh);

    // 3. 6 Floating 3D Origami Stars / Note Crystals
    const starGeos: THREE.Mesh[] = [];
    const colors = [0xf59e0b, 0xfbbf24, 0xe2e8f0, 0xfcd34d, 0xf8fafc, 0xd97706];

    for (let i = 0; i < 6; i++) {
      const geo = new THREE.OctahedronGeometry(0.24, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.6,
      });
      const star = new THREE.Mesh(geo, mat);

      const angle = (i / 6) * Math.PI * 2;
      const radius = 0.55 + (i % 2) * 0.2;
      star.position.set(
        Math.cos(angle) * radius,
        -0.8 + (i * 0.32),
        Math.sin(angle) * radius
      );
      star.userData = { id: i, baseAngle: angle, speed: 0.015 + i * 0.005 };
      jarGroup.add(star);
      starGeos.push(star);
    }

    // Drag to rotate interaction
    let isDragging = false;
    let prevX = 0;
    let targetRotY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - prevX;
      targetRotY += deltaX * 0.012;
      prevX = clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();

      // Smooth jar rotation
      jarGroup.rotation.y += (targetRotY - jarGroup.rotation.y) * 0.08;
      if (!isDragging) {
        targetRotY += 0.004; // Slow ambient orbit
      }

      // Animate floating stars inside
      starGeos.forEach((star, idx) => {
        star.rotation.x += 0.01;
        star.rotation.y += 0.015;
        star.position.y += Math.sin(delta * 2 + idx) * 0.002;
      });

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
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      glassGeo.dispose();
      baseGeo.dispose();
      neckGeo.dispose();
      lidGeo.dispose();
      tieGeo.dispose();
      glassMat.dispose();
      lidMat.dispose();
      ribbonMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={mountRef}
        className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-88 cursor-grab active:cursor-grabbing relative select-none"
        title="Interactive 3D Glowing Glass Jar — Drag to spin"
      />
      <span className="text-[11px] text-silver-300/80 bg-aubergine-900/80 border border-silver-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-marigold-400 animate-ping" />
        <span>3D Glass Memory Jar · Drag to rotate in 360°</span>
      </span>
    </div>
  );
};
