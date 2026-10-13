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

    const renderBadge = (photo?: HTMLImageElement) => {
      if (!bctx) return;
      // Deep clean obsidian background
      bctx.fillStyle = "#090a0f";
      bctx.fillRect(0, 0, 512, 760);

      // Top lanyard clip punch hole simulation
      bctx.fillStyle = "#040507";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(226, 18, 60, 10, 5) : bctx.rect(226, 18, 60, 10);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      bctx.lineWidth = 1;
      bctx.stroke();

      // --- 1. PHOTO IN THE MIDDLE ON TOP ---
      const pw = 230;
      const ph = 265;
      const px = (512 - pw) / 2; // 141 - centered
      const py = 52;
      const pr = 18;

      bctx.fillStyle = "#12131a";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(px, py, pw, ph, pr) : bctx.rect(px, py, pw, ph);
      bctx.fill();

      if (photo && photo.complete && photo.naturalWidth > 0) {
        bctx.save();
        bctx.beginPath();
        bctx.roundRect ? bctx.roundRect(px, py, pw, ph, pr) : bctx.rect(px, py, pw, ph);
        bctx.clip();
        // Crop chris.png centered on face & shoulders
        bctx.drawImage(photo, 140, 30, 1280, 1500, px, py, pw, ph);
        bctx.restore();
      } else {
        // Silhouette placeholder while loading
        bctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        bctx.beginPath();
        bctx.arc(px + pw / 2, py + 95, 42, 0, Math.PI * 2);
        bctx.fill();
        bctx.beginPath();
        bctx.arc(px + pw / 2, py + 215, 75, Math.PI, 0, true);
        bctx.fill();
      }

      // Clean rim stroke around photo
      bctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      bctx.lineWidth = 1.5;
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(px, py, pw, ph, pr) : bctx.rect(px, py, pw, ph);
      bctx.stroke();

      // --- 2. MIDDLE: LEFT ALIGNED & RIGHT ALIGNED CONTENT ---

      // [LEFT ALIGNED]
      // Name
      bctx.textAlign = "left";
      bctx.fillStyle = "#ffffff";
      bctx.font = "900 38px sans-serif";
      bctx.fillText("CHRIS", 50, 395);
      bctx.fillText("MATHEW", 50, 438);

      // Role
      bctx.fillStyle = "#a1a1aa";
      bctx.font = "bold 16px monospace";
      bctx.fillText("FULL STACK WEB DEV", 50, 485);

      // Status: ONLINE SINCE 2022 with active green dot
      bctx.fillStyle = "#34d399";
      bctx.beginPath();
      bctx.arc(56, 526, 4.5, 0, Math.PI * 2);
      bctx.fill();

      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 13px monospace";
      bctx.fillText("ONLINE SINCE 2022", 68, 530);

      // [RIGHT ALIGNED]
      // Smart Microchip
      const chipX = 380;
      const chipY = 372;
      const chipW = 82;
      const chipH = 60;

      bctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      bctx.lineWidth = 1.5;
      bctx.strokeRect(chipX, chipY, chipW, chipH);
      bctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      bctx.fillRect(chipX, chipY, chipW, chipH);

      // Chip internal circuit cross
      bctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      bctx.beginPath();
      bctx.moveTo(chipX + chipW / 2, chipY);
      bctx.lineTo(chipX + chipW / 2, chipY + chipH);
      bctx.moveTo(chipX, chipY + chipH / 2);
      bctx.lineTo(chipX + chipW, chipY + chipH / 2);
      bctx.stroke();

      // Contactless NFC Wave Icon
      const nfcX = 412;
      const nfcY = 495;
      bctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      bctx.lineWidth = 2;
      bctx.beginPath();
      bctx.arc(nfcX, nfcY, 7, -Math.PI / 3, Math.PI / 3);
      bctx.stroke();
      bctx.beginPath();
      bctx.arc(nfcX, nfcY, 14, -Math.PI / 3, Math.PI / 3);
      bctx.stroke();
      bctx.beginPath();
      bctx.arc(nfcX, nfcY, 21, -Math.PI / 3, Math.PI / 3);
      bctx.stroke();

      // --- 3. BOTTOM ALIGNED CONTENT ---

      // Clean Barcode
      bctx.fillStyle = "#ffffff";
      for (let x = 50; x < 462; x += 10) {
        bctx.fillRect(x, 608, (x % 20 === 0) ? 5 : 2.5, 62);
      }

      // ID Serial
      bctx.font = "14px monospace";
      bctx.fillStyle = "#71717a";
      bctx.textAlign = "left";
      bctx.fillText("ID: 88489-14245-CMA-STUDIO", 50, 705);
    };

    renderBadge();

    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);

    // Asynchronously load Chris's actual photo and update 3D canvas texture
    const portraitImage = new Image();
    portraitImage.crossOrigin = "anonymous";
    portraitImage.src = "/media/chris.png";
    portraitImage.onload = () => {
      renderBadge(portraitImage);
      badgeTexture.needsUpdate = true;
    };

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
