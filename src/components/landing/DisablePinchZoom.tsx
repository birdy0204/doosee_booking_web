"use client";

import { useEffect } from "react";

/**
 * 阻止移動端 pinch-to-zoom 手勢
 * iOS Safari 會忽略 viewport 的 user-scalable=no，
 * 必須透過 JS 攔截 gesturestart / touchmove(多指) 來防止縮放
 */
const DisablePinchZoom = () => {
  useEffect(() => {
    // Safari 專用：gesturestart / gesturechange
    const preventGesture = (e: Event) => e.preventDefault();

    // 通用：兩指以上的 touchmove
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener("gesturestart", preventGesture, {
      passive: false,
    });
    document.addEventListener("gesturechange", preventGesture, {
      passive: false,
    });
    document.addEventListener("touchmove", preventMultiTouch, {
      passive: false,
    });

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("touchmove", preventMultiTouch);
    };
  }, []);

  return null;
};

export default DisablePinchZoom;
