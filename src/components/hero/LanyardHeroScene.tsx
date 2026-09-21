import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const LanyardHeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

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
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. Volumetric Light Rays Radial Cone
    // ==========================================
    const rayVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const rayFragmentShader = `
      uniform float uTime;
      uniform float uScroll;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vec2 center = vec2(0.5, 0.5);
        vec2 pos = vUv - center;
        float angle = atan(pos.y, pos.x);
        float dist = length(pos);

        // Rotating rays
        float rays = sin(angle * 12.0 + uTime * 0.5 + uScroll * 4.0) * 0.5 + 0.5;
        rays = pow(rays, 3.0);

        // Radial fade
        float falloff = smoothstep(0.5, 0.05, dist);
        float coreGlow = smoothstep(0.15, 0.0, dist) * 1.5;

        // Monochrome silver volumetric beam
        vec3 rayColor = vec3(0.9, 0.92, 0.95);
        float intensity = (rays * falloff * 0.35 + coreGlow * 0.4) * (1.0 - uScroll * 0.6);

        gl_FragColor = vec4(rayColor, intensity);
      }
    `;

    const rayMaterial = new THREE.ShaderMaterial({
      vertexShader: rayVertexShader,
      fragmentShader: rayFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const rayPlane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), rayMaterial);
    rayPlane.position.set(0, 0.5, -2);
    scene.add(rayPlane);

    // ==========================================
    // 2. Physics Hanging Lanyard & ID Card
    // ==========================================
    const lanyardGroup = new THREE.Group();
    scene.add(lanyardGroup);

    // Anchor at top [0, 2.8, 0]
    const anchorY = 2.8;

    // Segmented chain rope
    const numLinks = 12;
    const linkLength = 0.22;
    const linkGeometry = new THREE.CylinderGeometry(0.02, 0.02, linkLength, 8);
    const ropeMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.3,
    });

    const links: THREE.Mesh[] = [];
    for (let i = 0; i < numLinks; i++) {
      const link = new THREE.Mesh(linkGeometry, ropeMaterial);
      lanyardGroup.add(link);
      links.push(link);
    }

    // Clip ring
    const ringGeo = new THREE.TorusGeometry(0.1, 0.025, 8, 24);
    const clipRing = new THREE.Mesh(
      ringGeo,
      new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.1 })
    );
    lanyardGroup.add(clipRing);

    // Frosted Holographic ID Badge Card
    const cardWidth = 1.9;
    const cardHeight = 2.8;
    const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, 0.05);

    // Badge Canvas Texture
    const badgeCanvas = document.createElement("canvas");
    badgeCanvas.width = 512;
    badgeCanvas.height = 760;
    const bctx = badgeCanvas.getContext("2d");
    if (bctx) {
      // Dark slate background
      bctx.fillStyle = "#0c0d12";
      bctx.fillRect(0, 0, 512, 760);

      // Silver metallic header
      const grad = bctx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, "#222");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(1, "#222");
      bctx.fillStyle = grad;
      bctx.fillRect(40, 50, 432, 4);

      // Studio tag
      bctx.fillStyle = "#888888";
      bctx.font = "bold 20px monospace";
      bctx.fillText("CHRIS MATHEW AJE // ACCESS", 50, 95);

      // Hologram chip
      bctx.strokeStyle = "rgba(255,255,255,0.4)";
      bctx.lineWidth = 2;
      bctx.strokeRect(50, 130, 80, 60);
      bctx.fillStyle = "rgba(255,255,255,0.15)";
      bctx.fillRect(50, 130, 80, 60);

      // Headline title
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 38px sans-serif";
      bctx.fillText("CREATIVE", 50, 260);
      bctx.fillText("ENGINEER", 50, 305);

      // Sub details
      bctx.fillStyle = "#999999";
      bctx.font = "20px sans-serif";
      bctx.fillText("CYBERSECURITY & DEV", 50, 360);
      bctx.fillText("STATUS: ACTIVE / VERIFIED", 50, 395);

      // Barcode simulation
      bctx.fillStyle = "#ffffff";
      for (let x = 50; x < 460; x += Math.random() > 0.5 ? 8 : 14) {
        bctx.fillRect(x, 620, Math.random() > 0.5 ? 3 : 6, 60);
      }
      bctx.font = "14px monospace";
      bctx.fillStyle = "#666";
      bctx.fillText("UID: 8848-9142-CMA-2025", 50, 710);
    }

    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);

    const cardMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({
        map: badgeTexture,
        roughness: 0.25,
        metalness: 0.15,
      }), // Front face
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4 }), // Back face
    ];

    const badgeCard = new THREE.Mesh(cardGeo, cardMaterials);
    lanyardGroup.add(badgeCard);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const backRimLight = new THREE.PointLight(0xffffff, 2, 10);
    backRimLight.position.set(-3, 2, -1);
    scene.add(backRimLight);

    // ==========================================
    // 3. Physics Simulation Variables
    // ==========================================
    const cardPos = { x: 0, y: anchorY - numLinks * linkLength - cardHeight / 2 + 0.2 };
    const cardVel = { x: 0, y: 0 };
    let cardAngle = 0;
    let cardAngleVel = 0;

    let isDragging = false;
    const mouse = { x: 0, y: 0 };
    let dragStart = { x: 0, y: 0 };

    const getNDCMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const ndc = getNDCMouse(e);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), camera);
      const intersects = raycaster.intersectObject(badgeCard);
      if (intersects.length > 0) {
        isDragging = true;
        dragStart = { x: ndc.x * 4, y: ndc.y * 3 };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const ndc = getNDCMouse(e);
      mouse.x = ndc.x * 3.5;
      mouse.y = ndc.y * 2.8;

      if (isDragging) {
        cardPos.x = mouse.x;
        cardPos.y = mouse.y;
        cardAngleVel = (mouse.x - cardPos.x) * 0.2;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Scroll Integration
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
      const scrollFraction = Math.min(scrollY / (window.innerHeight * 1.5), 1.0);
      rayMaterial.uniforms.uScroll.value = scrollFraction;

      // Translate camera backwards z: 7.5 -> 12, fade out lanyard
      camera.position.z = 7.5 + scrollFraction * 4.5;
      lanyardGroup.position.y = -scrollFraction * 2.0;
      badgeCard.scale.setScalar(1.0 - scrollFraction * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ==========================================
    // 4. Animation Loop
    // ==========================================
    const clock = new THREE.Clock();
    let animationId: number;

    const restX = 0;
    const restY = anchorY - numLinks * linkLength - cardHeight / 2 + 0.1;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      rayMaterial.uniforms.uTime.value = elapsed;

      // Subtle natural breeze when not dragging
      if (!isDragging) {
        const breezeX = Math.sin(elapsed * 1.5) * 0.12;
        const breezeAngle = Math.sin(elapsed * 1.2) * 0.05;

        // Spring physics return to rest
        const k = 0.06; // Spring stiffness
        const damping = 0.88;

        const forceX = (restX + breezeX - cardPos.x) * k;
        const forceY = (restY - cardPos.y) * k;

        cardVel.x = (cardVel.x + forceX) * damping;
        cardVel.y = (cardVel.y + forceY) * damping;

        cardPos.x += cardVel.x;
        cardPos.y += cardVel.y;

        // Angle rotation physics
        const targetAngle = (cardPos.x - restX) * 0.35 + breezeAngle;
        const angleForce = (targetAngle - cardAngle) * 0.08;
        cardAngleVel = (cardAngleVel + angleForce) * damping;
        cardAngle += cardAngleVel;
      }

      // Update badge position and rotation
      badgeCard.position.set(cardPos.x, cardPos.y, 0);
      badgeCard.rotation.z = cardAngle;
      badgeCard.rotation.y = Math.sin(elapsed * 0.8) * 0.15 + (isDragging ? (mouse.x - cardPos.x) * 0.3 : 0);

      // Update clip ring
      const topOfCardY = cardPos.y + cardHeight / 2;
      clipRing.position.set(cardPos.x, topOfCardY + 0.08, 0);
      clipRing.rotation.z = cardAngle;

      // Calculate smooth catenary / segment positions for rope links
      const startPoint = new THREE.Vector3(0, anchorY, 0);
      const endPoint = new THREE.Vector3(cardPos.x, topOfCardY + 0.15, 0);

      for (let i = 0; i < numLinks; i++) {
        const t = (i + 0.5) / numLinks;
        // Interpolate position
        const currentLink = links[i];
        const px = THREE.MathUtils.lerp(startPoint.x, endPoint.x, t);
        // Add subtle catenary sag
        const sag = Math.sin(t * Math.PI) * 0.15 * Math.abs(cardPos.x);
        const py = THREE.MathUtils.lerp(startPoint.y, endPoint.y, t) - sag;

        currentLink.position.set(px, py, 0);

        // Orient link along curve
        const nextT = Math.min((i + 1.5) / numLinks, 1.0);
        const nextX = THREE.MathUtils.lerp(startPoint.x, endPoint.x, nextT);
        const nextY = THREE.MathUtils.lerp(startPoint.y, endPoint.y, nextT);
        const angle = Math.atan2(nextX - px, nextY - py);
        currentLink.rotation.z = -angle;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
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
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      data-cursor-text="Drag Badge"
    />
  );
};
