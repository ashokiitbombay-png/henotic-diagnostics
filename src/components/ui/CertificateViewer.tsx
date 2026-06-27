"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, ArrowLeft } from "lucide-react";

interface CertificateViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/**
 * 🔍 Premium Certificate Lightbox Viewer
 * Features:
 * - Pinch-to-zoom on mobile (touch gestures)
 * - Scroll/button zoom on desktop
 * - Pan/drag when zoomed in
 * - Zoom controls overlay
 * - Keyboard shortcuts (Escape to close, +/- to zoom)
 * - Smooth animations
 */
export default function CertificateViewer({ src, alt, onClose }: CertificateViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDist, setLastPinchDist] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") resetZoom();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.5, MAX_SCALE));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => {
      const next = Math.max(prev - 0.5, MIN_SCALE);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const fitToScreen = useCallback(() => {
    setScale(2.5);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setScale(prev => {
      const next = Math.min(Math.max(prev + delta, MIN_SCALE), MAX_SCALE);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Mouse drag (pan when zoomed)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for pinch-to-zoom
  const getTouchDist = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setLastPinchDist(getTouchDist(e.touches));
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  }, [scale, position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastPinchDist > 0) {
      e.preventDefault();
      const currentDist = getTouchDist(e.touches);
      const delta = (currentDist - lastPinchDist) * 0.01;
      setScale(prev => Math.min(Math.max(prev + delta, MIN_SCALE), MAX_SCALE));
      setLastPinchDist(currentDist);
    } else if (e.touches.length === 1 && isDragging) {
      setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
    }
  }, [lastPinchDist, isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastPinchDist(0);
  }, []);

  // Double-tap to zoom
  const lastTapRef = useRef(0);
  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.5);
    }
  }, [scale, resetZoom]);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ animation: 'certFadeIn 0.3s ease-out' }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Top Control Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3 bg-black/60 border-b border-white/10">
        {/* Left: Back/Close + Certificate title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm transition-all cursor-pointer"
            aria-label="Close and go back"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <span className="text-white font-bold text-sm md:text-base truncate max-w-[150px] md:max-w-none">
            {alt}
          </span>
        </div>

        {/* Center: Zoom Controls */}
        <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1 border border-white/10">
          <button 
            type="button"
            onClick={zoomOut}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-white font-bold text-sm min-w-[50px] text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button 
            type="button"
            onClick={zoomIn}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <div className="w-px h-5 bg-white/20 mx-1" />
          <button 
            type="button"
            onClick={resetZoom}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Reset Zoom"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            type="button"
            onClick={fitToScreen}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fit to Screen"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Right: Prominent Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 border border-red-400/30 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg hover:shadow-red-500/30"
          aria-label="Close Certificate Viewer"
        >
          <X size={18} />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Mobile Bottom Bar — Zoom Controls + Close */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-black/90 border-t border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={zoomOut} className="p-3 rounded-xl bg-white/10 text-white active:bg-white/20 cursor-pointer" aria-label="Zoom Out">
            <ZoomOut size={18} />
          </button>
          <span className="text-white font-bold text-sm min-w-[50px] text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button type="button" onClick={zoomIn} className="p-3 rounded-xl bg-white/10 text-white active:bg-white/20 cursor-pointer" aria-label="Zoom In">
            <ZoomIn size={18} />
          </button>
          <button type="button" onClick={resetZoom} className="p-2.5 rounded-xl bg-white/10 text-white active:bg-white/20 cursor-pointer" aria-label="Reset">
            <RotateCcw size={16} />
          </button>
        </div>
        {/* Prominent mobile close button */}
        <button 
          type="button" 
          onClick={onClose} 
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-sm tracking-wide cursor-pointer shadow-lg active:scale-95 transition-all"
          aria-label="Close Certificate"
        >
          <X size={18} />
          Close
        </button>
      </div>

      {/* Image Viewport */}
      <div 
        ref={containerRef}
        className="relative flex-1 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{ touchAction: 'none' }}
      >
        <div 
          className="transition-transform duration-150 ease-out will-change-transform"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <Image 
            src={src}
            alt={alt}
            width={1200}
            height={900}
            quality={95}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl select-none pointer-events-none"
            style={{ 
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
              imageRendering: scale > 2 ? 'auto' : 'auto'
            }}
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1200px"
            draggable={false}
            priority
          />
        </div>

        {/* Zoom hint — only on first view */}
        {scale === 1 && (
          <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl text-white text-xs font-bold flex items-center gap-2 pointer-events-none animate-pulse">
            <ZoomIn size={14} />
            <span className="hidden sm:inline">Scroll to zoom · Drag to pan · Double-click to zoom 250%</span>
            <span className="sm:hidden">Pinch to zoom · Double-tap to zoom · Drag to pan</span>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes certFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
