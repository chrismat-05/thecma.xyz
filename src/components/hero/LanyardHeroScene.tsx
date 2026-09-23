import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface LanyardProps {
  scrollProgress?: number; // 0 (start) to 1 (full zoom in)
}

export const LanyardHeroScene: React.FC<LanyardProps> = ({ scrollProgress = 0 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Initial camera position at z = 7.5
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
    // Physics Hanging Lanyard & ID Card
    // ==========================================
    const lanyardGroup = new THREE.Group();
    scene.add(lanyardGroup);

    // Anchor at top [0, 2.7, 0]
    const anchorY = 2.7;

    // Segmented chain rope: tuned length so card rests centered in the middle of the screen
    const numLinks = 8;
    const linkLength = 0.16;
    const linkGeometry = new THREE.CylinderGeometry(0.018, 0.018, linkLength, 8);
    const ropeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      metalness: 0.85,
      roughness: 0.25,
    });

    const links: THREE.Mesh[] = [];
    for (let i = 0; i < numLinks; i++) {
      const link = new THREE.Mesh(linkGeometry, ropeMaterial);
      lanyardGroup.add(link);
      links.push(link);
    }

    // Clip ring
    const ringGeo = new THREE.TorusGeometry(0.11, 0.025, 8, 24);
    const clipRing = new THREE.Mesh(
      ringGeo,
      new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.95, roughness: 0.1 })
    );
    lanyardGroup.add(clipRing);

    // Frosted Holographic ID Badge Card
    const cardWidth = 2.0;
    const cardHeight = 2.9;
    const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, 0.05);

    // Badge Canvas Texture
    const badgeCanvas = document.createElement("canvas");
    badgeCanvas.width = 512;
    badgeCanvas.height = 760;
    const bctx = badgeCanvas.getContext("2d");
    if (bctx) {
      // Dark sleek obsidian background
      bctx.fillStyle = "#090a0f";
      bctx.fillRect(0, 0, 512, 760);

      // Silver metallic top accent bar
      const grad = bctx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, "#1a1a1a");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(1, "#1a1a1a");
      bctx.fillStyle = grad;
      bctx.fillRect(40, 45, 432, 5);

      // Studio tag
      bctx.fillStyle = "#a1a1aa";
      bctx.font = "bold 20px monospace";
      bctx.fillText("CHRIS MATHEW AJE // PASS", 50, 95);

      // Hologram chip icon
      bctx.strokeStyle = "rgba(255,255,255,0.6)";
      bctx.lineWidth = 2;
      bctx.strokeRect(50, 130, 80, 60);
      bctx.fillStyle = "rgba(255,255,255,0.12)";
      bctx.fillRect(50, 130, 80, 60);
      bctx.strokeStyle = "rgba(255,255,255,0.3)";
      bctx.beginPath();
      bctx.moveTo(90, 130);
      bctx.lineTo(90, 190);
      bctx.stroke();

      // Headline title
      bctx.fillStyle = "#ffffff";
      bctx.font = "900 40px sans-serif";
      bctx.fillText("CREATIVE", 50, 260);
      bctx.fillText("ENGINEER", 50, 305);

      // Sub details
      bctx.fillStyle = "#71717a";
      bctx.font = "600 18px sans-serif";
      bctx.fillText("WEB DEV & DESIGNER", 50, 355);

      // Verified pill
      bctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(50, 385, 170, 32, 16) : bctx.rect(50, 385, 170, 32);
      bctx.fill();
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 13px monospace";
      bctx.fillText("● ACTIVE 2022", 65, 406);

      // Barcode simulation
      bctx.fillStyle = "#ffffff";
      for (let x = 50; x < 460; x += Math.random() > 0.5 ? 8 : 14) {
        bctx.fillRect(x, 610, Math.random() > 0.5 ? 3 : 6, 65);
      }
      bctx.font = "14px monospace";
      bctx.fillStyle = "#52525b";
      bctx.fillText("ID: 88489-14245-CMA-STUDIO", 50, 715);
    }

    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);

    const cardMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({
        map: badgeTexture,
        roughness: 0.2,
        metalness: 0.1,
      }), // Front face
      new THREE.MeshStandardMaterial({ color: 0x07070a, roughness: 0.4 }), // Back face
    ];

    const badgeCard = new THREE.Mesh(cardGeo, cardMaterials);
    lanyardGroup.add(badgeCard);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Directional light from top center illuminating the lanyard from above (matching rays)
    const topLight = new THREE.DirectionalLight(0xffffff, 3.5);
    topLight.position.set(0, 8, 4);
    scene.add(topLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.8);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    const backRimLight = new THREE.PointLight(0xffffff, 2.5, 12);
    backRimLight.position.set(0, 3, -1.5);
    scene.add(backRimLight);

    // ==========================================
    // Physics Simulation Variables:
    // Rest position places the ID badge card exactly in the vertical center (y ≈ 0.0)
    // ==========================================
    const restX = 0;
    const restY = 0.0;
    const cardPos = { x: restX, y: restY };
    const cardVel = { x: 0, y: 0 };
    let cardAngle = 0;
    let cardAngleVel = 0;

    let isDragging = false;
    const mouse = { x: 0, y: 0 };

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

    // ==========================================
    // Animation Loop
    // ==========================================
    const clock = new THREE.Clock();
    let animationId: number;

    let currentCameraZ = 7.5;
    let currentCardScale = 1.0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Zoom in calculation:
      // When scrollProgress is 0 -> Camera at z: 7.5, Lanyard at normal size
      // When scrollProgress goes from 0 -> 1 -> Camera zooms in towards card (z: 7.5 -> 2.6)
      // and scales card in so it seamlessly reveals through into the hero section!
      const targetProgress = scrollRef.current;
      const targetZ = 7.5 - targetProgress * 4.9; // zooms into 2.6
      currentCameraZ += (targetZ - currentCameraZ) * 0.1;
      camera.position.z = currentCameraZ;

      // Card scale boosts slightly as we zoom in for dramatic effect
      const targetScale = 1.0 + targetProgress * 0.35;
      currentCardScale += (targetScale - currentCardScale) * 0.1;
      badgeCard.scale.setScalar(currentCardScale);

      // Natural breeze when not dragging
      if (!isDragging) {
        const breezeX = Math.sin(elapsed * 1.6) * 0.1;
        const breezeAngle = Math.sin(elapsed * 1.2) * 0.04;

        const k = 0.07;
        const damping = 0.88;

        const forceX = (restX + breezeX - cardPos.x) * k;
        const forceY = (restY - cardPos.y) * k;

        cardVel.x = (cardVel.x + forceX) * damping;
        cardVel.y = (cardVel.y + forceY) * damping;

        cardPos.x += cardVel.x;
        cardPos.y += cardVel.y;

        const targetAngle = (cardPos.x - restX) * 0.35 + breezeAngle;
        const angleForce = (targetAngle - cardAngle) * 0.08;
        cardAngleVel = (cardAngleVel + angleForce) * damping;
        cardAngle += cardAngleVel;
      }

      // Dynamic 3D Cursor Tilt:
      // Calculate cursor offset relative to badge position in 3D world space
      // Badge faces/tilts towards where the cursor is pointing across screen
      let cursorTiltY = 0;
      let cursorTiltX = 0;

      if (!isDragging) {
        // Horizontal look angle: cursor to right rotates Y positively, cursor to left negatively
        const dx = mouse.x - cardPos.x;
        cursorTiltY = Math.max(Math.min(dx * 0.18, 0.55), -0.55);

        // Vertical look angle: cursor up tilts card upwards (positive X), cursor down tilts downwards
        const dy = mouse.y - cardPos.y;
        cursorTiltX = Math.max(Math.min(-dy * 0.14, 0.4), -0.4);
      }

      badgeCard.position.set(cardPos.x, cardPos.y, 0);
      badgeCard.rotation.z = cardAngle;
      badgeCard.rotation.y =
        (isDragging ? (mouse.x - cardPos.x) * 0.35 : cursorTiltY) +
        Math.sin(elapsed * 0.8) * 0.05;
      badgeCard.rotation.x = isDragging ? 0 : cursorTiltX;

      const topOfCardY = cardPos.y + (cardHeight * currentCardScale) / 2;
      clipRing.position.set(cardPos.x, topOfCardY + 0.08, 0);
      clipRing.rotation.z = cardAngle;
      clipRing.rotation.y = badgeCard.rotation.y;

      // Rope links
      const startPoint = new THREE.Vector3(0, anchorY, 0);
      const endPoint = new THREE.Vector3(cardPos.x, topOfCardY + 0.15, 0);

      for (let i = 0; i < numLinks; i++) {
        const t = (i + 0.5) / numLinks;
        const currentLink = links[i];
        const px = THREE.MathUtils.lerp(startPoint.x, endPoint.x, t);
        const sag = Math.sin(t * Math.PI) * 0.15 * Math.abs(cardPos.x);
        const py = THREE.MathUtils.lerp(startPoint.y, endPoint.y, t) - sag;

        currentLink.position.set(px, py, 0);

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
      data-cursor-text="Drag Card"
    />
  );
};
