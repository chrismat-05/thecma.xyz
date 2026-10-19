import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface LightRaysProps {
  className?: string;
}

export const LightRays: React.FC<LightRaysProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom shader matching ReactBits LightRays from top center pointing down
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uOrigin;
      uniform float uScroll;
      varying vec2 vUv;

      // Pseudo random
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // Smooth value noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        vec2 st = vUv;
        // Origin at top center: (0.5, 1.0)
        vec2 origin = uOrigin;
        vec2 delta = st - origin;

        // Angle from top center looking downwards
        float angle = atan(-delta.y, delta.x); // Range from 0 to PI
        float dist = length(delta);

        // Ray beams generated with multi-frequency noise & harmonics
        float time = uTime * 0.4;
        
        // Fine volumetric ray streaks
        float rays = 0.0;
        rays += sin(angle * 14.0 + time + noise(vec2(angle * 6.0, time * 0.2)) * 4.0) * 0.5 + 0.5;
        rays += sin(angle * 28.0 - time * 1.2) * 0.25 + 0.25;
        rays += sin(angle * 56.0 + time * 0.8) * 0.125 + 0.125;
        rays = pow(rays / 1.375, 2.5);

        // Spread cone: limit rays primarily within a central downwards spotlight cone
        // Angle 0 is right, PI/2 is straight down (-y), PI is left
        float coneCenter = 1.570796; // PI / 2
        float angleDiff = abs(angle - coneCenter);
        float coneMask = smoothstep(1.35, 0.2, angleDiff); // Soft spotlight cone

        // Vertical / distance falloff
        float verticalFalloff = smoothstep(1.4, 0.05, dist);
        // Soft origin fade so it doesn't clip hard at the very top edge
        float originGlow = smoothstep(0.0, 0.15, dist);

        // Volumetric haze / ambient soft dust
        float haze = smoothstep(1.2, 0.0, dist) * 0.22 * coneMask;

        // Overall intensity reacting to scroll
        float totalLight = (rays * coneMask * verticalFalloff * 0.75 + haze) * originGlow;
        totalLight *= (1.0 + uScroll * 0.5); // intensify slightly as it zooms

        // High-end neutral silver / cold white ray color (matching ReactBits screenshot)
        vec3 rayColor = vec3(0.92, 0.94, 0.98);
        vec3 coreColor = vec3(1.0, 1.0, 1.0);
        vec3 finalColor = mix(rayColor, coreColor, totalLight * 0.4);

        gl_FragColor = vec4(finalColor, totalLight * 0.85);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uOrigin: { value: new THREE.Vector2(0.5, 1.02) }, // Top center
        uScroll: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const handleScroll = () => {
      const scrollFraction = Math.min(window.scrollY / window.innerHeight, 1.0);
      material.uniforms.uScroll.value = scrollFraction;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
    />
  );
};

export default LightRays;
