"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Carousel.module.css";

const FRAME_WIDTH = 340;
const ITEMS_PER_SECTION = 4;
const SPEED_PX_PER_SEC = 45;

export default function Carousel({ images = [] }) {
  const sectionWidth = useMemo(
    () => (FRAME_WIDTH * ITEMS_PER_SECTION) / 2, // 2 frames per row
    []
  );

  const [sections, setSections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Build sections when images change
  useEffect(() => {
    const data = [];
    for (let i = 0; i < images.length; i += ITEMS_PER_SECTION) {
      const idx = i / ITEMS_PER_SECTION;
      data.push({
        left: idx * sectionWidth,
        width: sectionWidth,
        urls: images.slice(i, i + ITEMS_PER_SECTION),
      });
    }
    setSections(data);
  }, [images, sectionWidth]);

  // Smooth animation loop
  useEffect(() => {
    if (sections.length === 0) return;

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const dx = SPEED_PX_PER_SEC * dt;

      setSections((prev) => {
        const n = prev.length;
        return prev.map((s) => {
          let newLeft = s.left - dx;

          // wrap when fully offscreen
          if (newLeft < -sectionWidth) {
            newLeft = (n - 1) * sectionWidth + (newLeft + sectionWidth);
          }

          return { ...s, left: newLeft };
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = 0;
    };
  }, [sections.length, sectionWidth]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const openModal = (url) => {
    setCurrentImage(url);
    setIsOpen(true);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        {sections.map((section, i) => (
          <div
            key={i}
            className={styles.carouselSect}
            style={{ left: `${section.left}px`, width: `${section.width}px` }}
          >
            {section.urls.map((url, idx) => (
              <div className={styles.imageFrame} key={`${i}-${idx}`}>
                <div className={styles.imageClick}>
                  <img
                    src={url}
                    alt=""
                    className={styles.framedImage}
                    loading="lazy"
                    onClick={() => openModal(url)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openModal(url);
                    }}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className={styles.popupOverlay}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>

          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={currentImage} alt="" className={styles.popupImage} />
          </div>
        </div>
      )}
    </div>
  );
}
