"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function WebdocCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const offset = useRef({ x: 0, y: 0 });
  const zoom = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const animationFrameRef = useRef<number>(0);
  const trianglePositionsRef = useRef<any[]>([]);
  const circleDecorationsRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);

  // Particle class for 3D effect
  class Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    speedZ: number;
    color: string;

    constructor(w: number, h: number, color: string) {
      this.x = Math.random() * w - w / 2;
      this.y = Math.random() * h - h / 2;
      this.z = Math.random() * 1000;
      this.size = 1;
      this.speedZ = -Math.random() * 1.5 - 0.5; // Slower and consistent speed
      this.color = color;
    }

    update(w: number, h: number) {
      this.z += this.speedZ;
      if (this.z < 1) {
        this.z = 1000;
        this.x = Math.random() * w - w / 2;
        this.y = Math.random() * h - h / 2;
      }
    }

    draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
      const scale = 800 / this.z; // Adjust for perspective
      const x2d = this.x * scale + w / 2;
      const y2d = this.y * scale + h / 2;
      const size = 1000 / this.z;

      // Dont draw if outside canvas
      if (x2d < 0 || x2d > w || y2d < 0 || y2d > h) return;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initParticles = (w: number, h: number) => {
    const particleCount = 150; // Fewer particles for a cleaner look
    const colors = ["#ff2f6e", "#ff7b9c", "#a4243b", "#ff0054"];
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push(new Particle(w, h, color));
    }
  };

  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
  ) => {
    particlesRef.current.forEach((p) => {
      p.update(w, h);
      p.draw(ctx, w, h);
    });
  };

  // Resize canvas with high DPI support
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(canvas.clientWidth, canvas.clientHeight);
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animationLoop = () => {
      draw();
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };
    animationFrameRef.current = requestAnimationFrame(animationLoop);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.05;
      const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
      zoom.current = Math.max(0.6, Math.min(3, zoom.current + delta));
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (canvas) {
        canvas.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear interactive elements data on each draw
    trianglePositionsRef.current = [];
    circleDecorationsRef.current = [];

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // --- Background Layer ---
    ctx.fillStyle = "#0a0a0a"; // Solid background to remove motion blur
    ctx.fillRect(0, 0, w, h);
    drawParticles(ctx, w, h);

    // --- Foreground Layer ---
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(zoom.current, zoom.current);
    ctx.translate(
      -w / 2 + offset.current.x / zoom.current,
      -h / 2 + offset.current.y / zoom.current
    );

    // Subtle grid with animation
    const gridSize = 80;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 0.5;

    for (let x = -4000; x < 4000; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, -4000);
      ctx.lineTo(x, 4000);
      ctx.stroke();
    }
    for (let y = -4000; y < 4000; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(-4000, y);
      ctx.lineTo(4000, y);
      ctx.stroke();
    }

    // Center coordinates
    const centreX = w / 2 + offset.current.x;
    const centreY = h / 2 + offset.current.y;

    // Main title with subtle animation
    ctx.save();
    ctx.shadowColor = "rgba(255, 47, 110, 0.3)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Main title (white)
    ctx.fillStyle = "#ffffff";
    ctx.font = "300 48px 'Montserrat', sans-serif";
    ctx.fillText("Quelles sont les interprétations", centreX, centreY - 40);

    // Accent title (Squid Game pink)
    ctx.fillStyle = "#ff2f6e";
    ctx.font = "600 52px 'Montserrat', sans-serif";
    ctx.fillText("sociétales de Squid Game ?", centreX, centreY + 20);
    ctx.restore();

    const TRIANGLE_DECORATIONS = [
      {
        color: "#ff2f6e",
        xOffset: 0,
        yOffset: -1200,
        text: "Impact de la série",
        route: "/webdoc/section/danger-enfants",
      }, // Top
      {
        color: "#ff2f6e",
        xOffset: 0,
        yOffset: 1200,
        text: "Avis divergeant du public",
        route: "/webdoc/section/premice",
      }, // Bottom
      {
        color: "#ff2f6e",
        xOffset: -1600,
        yOffset: 0,
        text: "La représentation des riches dans la série",
        route: "/webdoc/section/representation-riches",
      }, // Left
      {
        color: "#ff2f6e",
        xOffset: 1600,
        yOffset: 0,
        text: "Lien entre Squid Game et le capitalisme",
        route: "/webdoc/section/critique-capitalisme",
      }, // Right
    ];

    const wrapText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) => {
      const words = text.split(" ");
      let line = "";
      let testLine = "";
      let metrics;
      let testWidth;

      for (let n = 0; n < words.length; n++) {
        testLine = line + words[n] + " ";
        metrics = ctx.measureText(testLine);
        testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
    };

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      text: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 25px 'Montserrat', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const maxWidth = size * 0.7; // 70% of triangle size for text width
      const lineHeight = 24; // Based on font size
      wrapText(ctx, text, 0, size * 0.3, maxWidth, lineHeight); // Adjust Y for multi-line text
      ctx.restore();
    };

    const drawCircle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string,
      text: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px 'Montserrat', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const maxWidth = radius * 1.5; // 150% of radius for text width
      const lineHeight = 24; // Based on font size
      wrapText(ctx, text, 0, 0, maxWidth, lineHeight);
      ctx.restore();
    };

    TRIANGLE_DECORATIONS.forEach((triangle) => {
      const triX = centreX + triangle.xOffset;
      const triY = centreY + triangle.yOffset;

      // Draw connecting line from central text to triangle
      ctx.beginPath();
      ctx.moveTo(centreX, centreY);
      ctx.lineTo(triX, triY);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw triangle
      drawTriangle(ctx, triX, triY, 450, triangle.color, triangle.text);

      // Store interactive element data
      trianglePositionsRef.current.push({
        type: "triangle",
        x: triX,
        y: triY,
        size: 450,
        route: triangle.route,
      });

      // Add additional lines and circles for "Avis divergeant du public"
      if (triangle.text === "Avis divergeant du public") {
        const circleRadius = 150;
        const lineLength = 800; // Distance from triangle to circle

        // First circle (left)
        const circle1X = triX - lineLength;
        const circle1Y = triY + lineLength;
        // Draw line to first circle
        ctx.beginPath();
        ctx.moveTo(triX, triY);
        ctx.lineTo(circle1X, circle1Y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw first circle
        drawCircle(
          ctx,
          circle1X,
          circle1Y,
          circleRadius,
          "#00a8a8",
          "Avis d'un coréen"
        );
        circleDecorationsRef.current.push({
          type: "circle",
          x: circle1X,
          y: circle1Y,
          radius: circleRadius,
          route: "/webdoc/section/representation-societe",
        });

        // Second circle (right)
        const circle2X = triX + lineLength;
        const circle2Y = triY + lineLength;
        // Draw line to second circle
        ctx.beginPath();
        ctx.moveTo(triX, triY);
        ctx.lineTo(circle2X, circle2Y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw second circle
        drawCircle(
          ctx,
          circle2X,
          circle2Y,
          circleRadius,
          "#00a8a8",
          "Avis d'étudiants"
        );
        circleDecorationsRef.current.push({
          type: "circle",
          x: circle2X,
          y: circle2Y,
          radius: circleRadius,
          route: "/webdoc/section/avis-etudiants",
        });
      } else if (triangle.text === "Lien entre Squid Game et le capitalisme") {
        const circleRadius = 150;
        const lineLength = 800; // Distance from triangle to circle

        // First circle (top-right)
        const circle1X = triX + lineLength;
        const circle1Y = triY - lineLength;
        // Draw line to first circle
        ctx.beginPath();
        ctx.moveTo(triX, triY);
        ctx.lineTo(circle1X, circle1Y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw first circle
        drawCircle(
          ctx,
          circle1X,
          circle1Y,
          circleRadius,
          "#00a8a8",
          "Interprétation de Ben Shapiro"
        );
        circleDecorationsRef.current.push({
          type: "circle",
          x: circle1X,
          y: circle1Y,
          radius: circleRadius,
          route: "/webdoc/section/ben-shapiro",
        });

        // Second circle (bottom-right)
        const circle2X = triX + lineLength;
        const circle2Y = triY + lineLength;
        // Draw line to second circle
        ctx.beginPath();
        ctx.moveTo(triX, triY);
        ctx.lineTo(circle2X, circle2Y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw second circle
        drawCircle(
          ctx,
          circle2X,
          circle2Y,
          circleRadius,
          "#00a8a8",
          "Avis d'un internaute"
        );
        circleDecorationsRef.current.push({
          type: "circle",
          x: circle2X,
          y: circle2Y,
          radius: circleRadius,
          route: "/webdoc/section/capitalisme-lien/critique-sociale",
        });
      } else if (triangle.text === "Impact de la série") {
        const circleRadius = 150;
        const lineLength = 800; // Distance from triangle to circle

        // Second circle (top-right)
        const circle2X = triX + lineLength;
        const circle2Y = triY - lineLength;
        // Draw line to second circle
        ctx.beginPath();
        ctx.moveTo(triX, triY);
        ctx.lineTo(circle2X, circle2Y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Draw second circle
        drawCircle(
          ctx,
          circle2X,
          circle2Y,
          circleRadius,
          "#00a8a8",
          "Mesures prises par les écoles"
        );
        circleDecorationsRef.current.push({
          type: "circle",
          x: circle2X,
          y: circle2Y,
          radius: circleRadius,
          route: "/webdoc/section/mesures-ecoles",
        });
      }
    });

    ctx.restore();
  };

  // Gestion du déplacement
  const handlePointerDown = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draggingRef.current = true;
    canvas.setPointerCapture(e.pointerId);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = false;

    // Change cursor to grabbing
    canvas.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (draggingRef.current) {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        isDraggingRef.current = true;
      }

      offset.current.x += dx;
      offset.current.y += dy;

      lastPosRef.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing"; // Ensure grabbing cursor during drag
      return;
    }

    // Check for hover on interactive elements when not dragging
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const transformedMouseX =
      (mouseX - offset.current.x - w / 2) / zoom.current + w / 2;
    const transformedMouseY =
      (mouseY - offset.current.y - h / 2) / zoom.current + h / 2;

    let isHoveringInteractive = false;

    // Check triangles
    for (const triangle of trianglePositionsRef.current) {
      const halfSize = triangle.size / 2;
      if (
        transformedMouseX >= triangle.x - halfSize &&
        transformedMouseX <= triangle.x + halfSize &&
        transformedMouseY >= triangle.y - halfSize &&
        transformedMouseY <= triangle.y + halfSize
      ) {
        isHoveringInteractive = true;
        break;
      }
    }

    // Check circles if not hovering over a triangle
    if (!isHoveringInteractive) {
      for (const circle of circleDecorationsRef.current) {
        const dx = transformedMouseX - circle.x;
        const dy = transformedMouseY - circle.y;
        if (dx * dx + dy * dy <= circle.radius * circle.radius) {
          isHoveringInteractive = true;
          break;
        }
      }
    }

    if (isHoveringInteractive) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "grab";
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draggingRef.current = false;

    canvas.style.cursor = "grab"; // Reset cursor to grab after drag ends

    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore
    }
  };

  // CORRECTION : Handle click navigation avec conversion correcte des coordonnées
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Don't navigate if we were dragging
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Convert click coordinates to transformed canvas space
    const transformedClickX =
      (clickX - offset.current.x - w / 2) / zoom.current + w / 2;
    const transformedClickY =
      (clickY - offset.current.y - h / 2) / zoom.current + h / 2;

    // Check for clicks on triangles
    for (const triangle of trianglePositionsRef.current) {
      // For simplicity, check if click is within a square bounding box of the triangle
      // This is a rough check, can be improved with more precise triangle hit testing
      const halfSize = triangle.size / 2;
      if (
        transformedClickX >= triangle.x - halfSize &&
        transformedClickX <= triangle.x + halfSize &&
        transformedClickY >= triangle.y - halfSize &&
        transformedClickY <= triangle.y + halfSize
      ) {
        router.push(triangle.route);
        return;
      }
    }

    // Check for clicks on circles
    for (const circle of circleDecorationsRef.current) {
      const dx = transformedClickX - circle.x;
      const dy = transformedClickY - circle.y;
      if (dx * dx + dy * dy <= circle.radius * circle.radius) {
        router.push(circle.route);
        return;
      }
    }
  };
  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background:
          "radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleCanvasClick}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          touchAction: "none",
          cursor: "grab",
        }}
      />

      {/* Subtle vignette effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
