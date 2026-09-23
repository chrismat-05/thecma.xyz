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
      // Deep obsidian background
      bctx.fillStyle = "#090a10";
      bctx.fillRect(0, 0, 512, 760);

      // Outer perimeter hairline border
      bctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      bctx.lineWidth = 1;
      bctx.strokeRect(14, 14, 484, 732);

      // Industrial registration crosshairs at 4 corners
      const drawCross = (cx: number, cy: number) => {
        bctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        bctx.lineWidth = 1;
        bctx.beginPath();
        bctx.moveTo(cx - 5, cy);
        bctx.lineTo(cx + 5, cy);
        bctx.moveTo(cx, cy - 5);
        bctx.lineTo(cx, cy + 5);
        bctx.stroke();
      };
      drawCross(26, 26);
      drawCross(486, 26);
      drawCross(26, 734);
      drawCross(486, 734);

      // Top lanyard clip punch hole simulation
      bctx.fillStyle = "#030407";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(216, 14, 80, 12, 6) : bctx.rect(216, 14, 80, 12);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      bctx.lineWidth = 1.2;
      bctx.stroke();

      // Top silver gradient hairline accent
      const grad = bctx.createLinearGradient(36, 0, 476, 0);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.85)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0.05)");
      bctx.fillStyle = grad;
      bctx.fillRect(36, 38, 440, 2);

      // Top Header Row
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 13px monospace";
      bctx.fillText("CMA Tech", 36, 64);
      bctx.fillStyle = "#71717a";
      bctx.font = "12px monospace";
      bctx.fillText(" // ACCESS PASS", 126, 64);

      // Contactless NFC Wave Icon at top right
      const nfcX = 456;
      const nfcY = 59;
      bctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      bctx.lineWidth = 2;
      bctx.beginPath();
      bctx.arc(nfcX, nfcY, 6, -Math.PI / 3, Math.PI / 3);
      bctx.stroke();
      bctx.beginPath();
      bctx.arc(nfcX, nfcY, 12, -Math.PI / 3, Math.PI / 3);
      bctx.stroke();
      bctx.beginPath();
      bctx.arc(nfcX, nfcY, 18, -Math.PI / 3, Math.PI / 3);
      bctx.stroke();

      // --- UPPER BLOCK (Balanced Two Columns: Data on Left, Photo on Right) ---
      const upperY = 84;
      const upperH = 300;

      // RIGHT COLUMN: Portrait Photo (X: 242, Y: 84, W: 234, H: 300, R: 18)
      const px = 242;
      const py = upperY;
      const pw = 234;
      const ph = upperH;
      const pr = 18;

      bctx.fillStyle = "#10111a";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(px, py, pw, ph, pr) : bctx.rect(px, py, pw, ph);
      bctx.fill();

      if (photo && photo.complete && photo.naturalWidth > 0) {
        bctx.save();
        bctx.beginPath();
        bctx.roundRect ? bctx.roundRect(px, py, pw, ph, pr) : bctx.rect(px, py, pw, ph);
        bctx.clip();
        // Crop chris.png centered on face/shoulders
        bctx.drawImage(photo, 140, 30, 1280, 1500, px, py, pw, ph);
        // Subtle dark rim gradient over bottom of photo
        const pGrad = bctx.createLinearGradient(0, py + ph - 70, 0, py + ph);
        pGrad.addColorStop(0, "transparent");
        pGrad.addColorStop(1, "rgba(9, 10, 16, 0.75)");
        bctx.fillStyle = pGrad;
        bctx.fillRect(px, py, pw, ph);
        bctx.restore();
      } else {
        // Modern silhouette placeholder while loading
        bctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        bctx.beginPath();
        bctx.arc(px + pw / 2, py + 105, 46, 0, Math.PI * 2);
        bctx.fill();
        bctx.beginPath();
        bctx.arc(px + pw / 2, py + 230, 80, Math.PI, 0, true);
        bctx.fill();
      }

      // Metallic rim highlight around photo
      bctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      bctx.lineWidth = 1.5;
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(px, py, pw, ph, pr) : bctx.rect(px, py, pw, ph);
      bctx.stroke();

      // LEFT COLUMN: Stacked Identity & Hardware Security Badges
      const lx = 36;
      const lw = 192;

      // 1. Smart Microchip Graphic (X: 36, Y: 84, W: 86, H: 62)
      bctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      bctx.lineWidth = 1.5;
      bctx.strokeRect(lx, upperY, 86, 62);
      bctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      bctx.fillRect(lx, upperY, 86, 62);

      // Gold circuit contact pads simulation
      bctx.strokeStyle = "rgba(212, 175, 55, 0.75)";
      bctx.lineWidth = 1;
      bctx.strokeRect(lx + 10, upperY + 10, 66, 42);
      bctx.beginPath();
      bctx.moveTo(lx + 43, upperY + 10);
      bctx.lineTo(lx + 43, upperY + 52);
      bctx.moveTo(lx + 10, upperY + 31);
      bctx.lineTo(lx + 76, upperY + 31);
      bctx.stroke();

      // Chip side text
      bctx.fillStyle = "#71717a";
      bctx.font = "bold 9px monospace";
      bctx.fillText("EMV CHIP", lx + 98, upperY + 24);
      bctx.fillStyle = "#a1a1aa";
      bctx.font = "10px monospace";
      bctx.fillText("SECURE", lx + 98, upperY + 40);
      bctx.fillStyle = "#34d399";
      bctx.fillText("VERIFIED", lx + 98, upperY + 56);

      // 2. Status Pill: ONLINE SINCE 2022 (Y: 160, H: 38)
      bctx.fillStyle = "rgba(255, 255, 255, 0.07)";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(lx, upperY + 76, lw, 38, 19) : bctx.rect(lx, upperY + 76, lw, 38);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      bctx.lineWidth = 1;
      bctx.stroke();

      // Glowing green active dot
      bctx.fillStyle = "#34d399";
      bctx.beginPath();
      bctx.arc(lx + 18, upperY + 95, 4.5, 0, Math.PI * 2);
      bctx.fill();
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 11px monospace";
      bctx.fillText("ONLINE SINCE 2022", lx + 30, upperY + 99);

      // 3. Studio Clearance Box (Y: 212, H: 76)
      bctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(lx, upperY + 128, lw, 76, 10) : bctx.rect(lx, upperY + 128, lw, 76);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      bctx.lineWidth = 1;
      bctx.stroke();

      bctx.fillStyle = "#71717a";
      bctx.font = "9px monospace";
      bctx.fillText("CLEARANCE", lx + 14, upperY + 148);
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 13px monospace";
      bctx.fillText("STUDIO OPERATOR", lx + 14, upperY + 168);
      bctx.fillStyle = "#34d399";
      bctx.font = "10px monospace";
      bctx.fillText("LEVEL // 01 AUTHORIZED", lx + 14, upperY + 188);

      // 4. Protocol Key Box (Y: 298, H: 76)
      bctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(lx, upperY + 218, lw, 82, 10) : bctx.rect(lx, upperY + 218, lw, 82);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      bctx.lineWidth = 1;
      bctx.stroke();

      bctx.fillStyle = "#71717a";
      bctx.font = "9px monospace";
      bctx.fillText("NETWORK DOMAIN", lx + 14, upperY + 240);
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 13px monospace";
      bctx.fillText("CMA Tech", lx + 14, upperY + 260);
      bctx.fillStyle = "#a1a1aa";
      bctx.font = "10px monospace";
      bctx.fillText("KEY: CMA-88489", lx + 14, upperY + 282);

      // --- MIDDLE SECTION (Divider & Bold Typographic Identity) ---
      const midY = 402;
      bctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.moveTo(36, midY);
      bctx.lineTo(476, midY);
      bctx.stroke();

      // Identity Label
      bctx.fillStyle = "#71717a";
      bctx.font = "bold 11px monospace";
      bctx.fillText("IDENTITY // FULL NAME", 36, midY + 24);

      // Bold Name spanning across card
      bctx.fillStyle = "#ffffff";
      bctx.font = "900 42px sans-serif";
      bctx.fillText("CHRIS MATHEW", 36, midY + 66);

      // Full-Width Role Banner
      const roleY = midY + 84;
      bctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(36, roleY, 440, 46, 12) : bctx.rect(36, roleY, 440, 46);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      bctx.lineWidth = 1;
      bctx.stroke();

      bctx.fillStyle = "#71717a";
      bctx.font = "9px monospace";
      bctx.fillText("ROLE", 50, roleY + 18);
      bctx.fillStyle = "#ffffff";
      bctx.font = "bold 15px monospace";
      bctx.fillText("WEB DEV & DESIGNER", 50, roleY + 36);

      bctx.fillStyle = "#34d399";
      bctx.font = "bold 11px monospace";
      bctx.fillText("● ACTIVE", 396, roleY + 28);

      // Sub-tag Row
      bctx.fillStyle = "#a1a1aa";
      bctx.font = "11px monospace";
      bctx.fillText("PASS: CHRIS MATHEW AJE", 36, midY + 154);
      bctx.textAlign = "right";
      bctx.fillText("STUDIO: CMA", 476, midY + 154);
      bctx.textAlign = "left";

      // --- BOTTOM SECTION (Security Barcode & Serial Identification) ---
      const btmY = 574;
      bctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.moveTo(36, btmY);
      bctx.lineTo(476, btmY);
      bctx.stroke();

      // Barcode container slot
      bctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      bctx.beginPath();
      bctx.roundRect ? bctx.roundRect(36, btmY + 14, 440, 68, 8) : bctx.rect(36, btmY + 14, 440, 68);
      bctx.fill();
      bctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      bctx.stroke();

      // Procedural deterministic barcode lines
      bctx.fillStyle = "#ffffff";
      const barPattern = [
        3, 2, 5, 2, 2, 4, 3, 2, 6, 2, 3, 4, 2, 5, 3, 2, 4, 6, 2, 3, 5, 2, 2, 4, 3, 5, 2, 6, 2, 3,
        4, 2, 5, 3, 2, 4, 6, 2, 3, 5, 2, 2, 4, 3, 5, 2, 4, 2, 3, 5, 2, 4, 3, 2, 6, 2, 3, 4,
      ];
      let barX = 48;
      for (let i = 0; i < barPattern.length && barX < 464; i++) {
        const w = barPattern[i];
        bctx.fillRect(barX, btmY + 22, w, 52);
        barX += w + ((i % 3 === 0) ? 4 : 2.5);
      }

      // Centered Serial ID
      bctx.font = "bold 13px monospace";
      bctx.fillStyle = "#ffffff";
      bctx.textAlign = "center";
      bctx.fillText("ID: 88489-14245-CMA-STUDIO", 256, btmY + 106);

      // Bottom Micro Stamp
      bctx.font = "9px monospace";
      bctx.fillStyle = "#52525b";
      bctx.textAlign = "left";
      bctx.fillText("[OFFICIAL PASS]", 36, btmY + 130);
      bctx.textAlign = "center";
      bctx.fillText("SECURE ACCESS // NFC ENABLED", 256, btmY + 130);
      bctx.textAlign = "right";
      bctx.fillText("AUTHD. 2026", 476, btmY + 130);
      bctx.textAlign = "left";
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
