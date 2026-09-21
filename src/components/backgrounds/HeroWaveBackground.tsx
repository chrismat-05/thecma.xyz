import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const HeroWaveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -2, 4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // Fallback gracefully if WebGL fails
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Plane geometry tilted at an oblique angle
    const geometry = new THREE.PlaneGeometry(12, 10, 80, 80);

    const vertexShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float wave1 = sin(pos.x * 1.5 + uTime * 0.8) * cos(pos.y * 1.5 + uTime * 0.6);
        float wave2 = sin(pos.x * 3.0 - uTime * 0.5) * 0.2;
        float elevation = (wave1 + wave2) * 0.45;

        pos.z += elevation;
        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Deep obsidian base with silver metallic rim highlights
        vec3 colBase = vec3(0.02, 0.02, 0.03);
        vec3 colMid = vec3(0.09, 0.09, 0.12);
        vec3 colHigh = vec3(0.7, 0.72, 0.75);

        float mixFactor = smoothstep(-0.4, 0.5, vElevation);
        vec3 color = mix(colBase, colMid, mixFactor);
        color = mix(color, colHigh, pow(max(0.0, vElevation + 0.3), 3.0) * 0.6);

        // Fade edges softly
        float edgeDist = distance(vUv, vec2(0.5));
        float alpha = smoothstep(0.7, 0.2, edgeDist) * 0.7;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3.2;
    mesh.rotation.z = Math.PI / 10;
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime() * 0.7;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70"
    />
  );
};
