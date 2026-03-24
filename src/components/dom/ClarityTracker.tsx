'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function ClarityTracker() {
  useEffect(() => {
    // Initialize Microsoft Clarity tracking securely on the client side
    if (typeof window !== 'undefined') {
      try {
        Clarity.init("w0vlhbf1lr");
      } catch (error) {
        console.error("Clarity init error:", error);
      }
    }
  }, []);

  return null;
}
