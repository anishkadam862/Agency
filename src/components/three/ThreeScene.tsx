"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
  mouseX: number;
  mouseY: number;
  scrollY?: number;
}

export default function ThreeScene({ mouseX, mouseY, scrollY = 0 }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: mouseX, y: mouseY });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // ── Lights ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    const light1 = new THREE.PointLight(0x9b6dff, 2, 50);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x4f8ef7, 1.5, 50);
    light2.position.set(-5, -3, -5);
    scene.add(light2);
    const light3 = new THREE.PointLight(0x0cf2f2, 0.8, 50);
    light3.position.set(0, 5, -5);
    scene.add(light3);

    // ── Central orb (distorted sphere via morph targets) ──────
    const orbGeo = new THREE.SphereGeometry(1, 64, 64);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x0d0520,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.scale.setScalar(2.2);
    scene.add(orb);

    // ── Torus knot ring ───────────────────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(1.8, 0.06, 200, 20);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x9b6dff,
      metalness: 1,
      roughness: 0,
      emissive: new THREE.Color(0x4f8ef7),
      emissiveIntensity: 0.15,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // ── Particle field ────────────────────────────────────────
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x9b6dff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Animate ───────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    // Target rotation for smooth lerp
    let targetOrbY = 0;
    let targetOrbX = 0;
    let currentOrbY = 0;
    let currentOrbX = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Orb: smooth mouse tracking + float
      targetOrbY = mx * 0.5;
      targetOrbX = -my * 0.3;
      currentOrbY += (targetOrbY - currentOrbY) * 0.05;
      currentOrbX += (targetOrbX - currentOrbX) * 0.05;
      orb.rotation.y = currentOrbY;
      orb.rotation.x = currentOrbX;
      orb.position.y = Math.sin(t * 0.5) * 0.15;

      // Knot: continuous rotation + mouse influence
      knot.rotation.x = t * 0.3 + my * 0.2;
      knot.rotation.y = t * 0.2 + mx * 0.3;
      knot.rotation.z = t * 0.1;

      // Particles: slow drift
      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []); // run once on mount

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
