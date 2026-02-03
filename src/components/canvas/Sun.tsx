'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// --- Custom Shader Material ---
const SunMaterial = shaderMaterial(
  {
    uTime: 0,
    uScroll: 0,
    uState: 0, // 0: IDLE, 1: CHARGING, 2: CRITICAL
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vNoise;
    uniform float uTime;
    uniform float uScroll;
    uniform float uState; // Used for vertex chaos if needed

    // Simplex Noise (Keeping original function or optimized one)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // -- MORPH LOGIC --
      // Scroll 0.0: Spiky (High freq, High amp)
      // Scroll 0.5: Smooth (Low freq, Low amp)
      // Scroll 1.0: Boiling (Med freq, Med amp)
      
      float noiseFreq = mix(2.5, 1.0, uScroll); // 2.5 -> 1.0
      float noiseAmp  = mix(0.4, 0.1, uScroll);  // 0.4 -> 0.1
      
      // CRITICAL STATE OVERRIDES
      if (uState > 1.5) { // CRITICAL
         noiseFreq = 3.0; // High chaos
         noiseAmp = 0.3; // Distorted
      }
      
      // Make it boil faster at higher scroll?
      float timeSpeed = 0.5 + uScroll * 0.5;
      
      float noise = snoise(position * noiseFreq + uTime * timeSpeed);
      vNoise = noise; // Pass to frag
      
      // Displacement
      vec3 pos = position + normal * noise * noiseAmp;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vNoise;
    uniform float uTime;
    uniform float uScroll;
    uniform float uState; // 0: IDLE, 1: CHARGING, 2: CRITICAL

    void main() {
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = dot(normalize(vNormal), viewDir);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);

      // --- COLOR PALETTE EVOLUTION ---
      // 0.0: White/Holo Explosion
      vec3 colStart = vec3(1.2, 1.1, 1.4); // Bright white-blue
      vec3 colStartCore = vec3(0.1, 0.4, 0.8); // Deep blue core

      // 0.5: Cyan/Structure
      vec3 colMid = vec3(0.0, 1.0, 0.8); // Cyan
      vec3 colMidCore = vec3(0.0, 0.2, 0.2); // Dark teal

      // 1.0: Magma Red
      vec3 colEnd = vec3(1.0, 0.3, 0.1); // Orange
      vec3 colEndCore = vec3(0.5, 0.0, 0.0); // Dark Red
      
      // Mix based on scroll
      vec3 finalCore;
      vec3 finalRim;
      
      if (uScroll < 0.5) {
        float t = uScroll * 2.0;
        finalCore = mix(colStartCore, colMidCore, t);
        finalRim  = mix(colStart, colMid, t);
      } else {
        float t = (uScroll - 0.5) * 2.0;
        finalCore = mix(colMidCore, colEndCore, t);
        finalRim  = mix(colMid, colEnd, t);
      }
      
      // STANDARD COLOR
      vec3 color = mix(finalCore, finalRim, fresnel + vNoise * 0.2);
      
      // --- STATE OVERRIDES ---
      vec3 violetCore = vec3(0.2, 0.0, 0.4);
      vec3 violetRim = vec3(0.6, 0.2, 1.0); // Electric Violet
      
      float emissiveIntensity = 0.0;
      
      if (uState > 0.5 && uState < 1.5) {
         // CHARGING: Pulse Purple
         color = mix(color, violetRim, 0.5 + sin(uTime * 10.0) * 0.2);
         emissiveIntensity = 0.5; // Prompt Req: 0.5
      } else if (uState > 1.5) {
         // CRITICAL: Deep Violet / Black High Contrast
         color = mix(violetCore, violetRim, fresnel * 2.0); 
         color += vec3(0.4, 0.0, 1.0) * (vNoise * 3.0); // Lightning
         emissiveIntensity = 2.0; // Prompt Req: 2.0
      }
      
      // Add "heat" glow (base fresnel) adjusted by usage
      // Prompt says IDLE Emissive = 0. So we keep base color only.
      // We add the emissive glow on top
      
      color += violetRim * emissiveIntensity * fresnel;

      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ SunMaterial })

// TypeScript declaration for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      sunMaterial: any
    }
  }
}

export function Sun({ footerState }: { footerState?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  // Track rotation manually to prevent jumps when speed changes
  const rotationY = useRef(0)
  const rotationX = useRef(0)

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return

    // Calculate Scroll Progress (0 to 1)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = window.scrollY
    const rawProgress = maxScroll > 0 ? scrollTop / maxScroll : 0

    // DIRECT: No damping for offset
    const offset = rawProgress

    // Determine numeric state for shader
    let stateNum = 0
    if (footerState === 'CHARGING') stateNum = 1
    if (footerState === 'CRITICAL') stateNum = 2

    // Pass to shader
    materialRef.current.uState = stateNum

    // Time & Scroll Uniforms
    // Slow internal boiling
    // Speed up boiling if charging or critical
    let boilSpeed = 0.1
    if (footerState === 'CHARGING') boilSpeed = 0.5
    if (footerState === 'CRITICAL') boilSpeed = 2.0

    materialRef.current.uTime = state.clock.elapsedTime * boilSpeed
    materialRef.current.uScroll = offset

    // --- 1. PLANETARY REVOLUTION (X-Axis Position) ---
    // Sections Logic:
    // 0.0 - 0.15: HERO (Center)
    // 0.15 - 0.35: ABOUT (Right)
    // 0.35 - 0.55: WORKS (Left)
    // 0.55 - 0.75: SERVICES (Right)
    // 0.75 - 1.00: FOOTER (Center)

    let targetX = 0
    let targetY = 0
    let targetZ = 0

    if (offset < 0.15) {
      // Hero: Center
      targetX = 0
      targetZ = 0
    } else if (offset < 0.35) {
      // About: Move Right (Slide 0.15 -> 0.25)
      const sectionP = (offset - 0.15) / 0.2
      if (sectionP < 0.5) targetX = sectionP * 2 * 2.5
      else targetX = 2.5
      targetZ = -1
    } else if (offset < 0.55) {
      // Works: Move Right -> Left (Slide 0.35 -> 0.45)
      const sectionP = (offset - 0.35) / 0.2
      if (sectionP < 0.5) targetX = 2.5 - (sectionP * 2 * 5.0)
      else targetX = -2.5
      targetZ = -0.5
    } else if (offset < 0.75) {
      // Services: Move Left -> Right (Slide 0.55 -> 0.65)
      const sectionP = (offset - 0.55) / 0.2
      if (sectionP < 0.5) targetX = -2.5 + (sectionP * 2 * 5.0)
      else targetX = 2.5
      targetZ = -1
    } else {
      // Footer: Move Right -> Center (Slide 0.75 -> 1.0)
      const sectionP = (offset - 0.75) / 0.25
      targetX = 2.5 - (sectionP * 2.5)
      targetY = -1.5 * sectionP
      targetZ = 1 * sectionP
    }

    const responsiveX = window.innerWidth < 768 ? 0 : targetX

    // Apply position DIRECTLY (with tiny lerp for frame smoothness only)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, responsiveX, 0.2)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.2)
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.2)

    // --- 2. THE ROTATION (Spin) ---
    // If charging, spin violently (high speed accumulator)
    // Normal: 0.2 rad/s approx
    // Charging: 5.0 base speed.
    // Critical: 20.0 base speed
    let spinSpeed = 0.2
    if (footerState === 'CHARGING') spinSpeed = 5.0
    if (footerState === 'CRITICAL') spinSpeed = 20.0

    rotationY.current += delta * spinSpeed
    rotationX.current += delta * (spinSpeed * 0.5)

    meshRef.current.rotation.y = rotationY.current
    meshRef.current.rotation.x = rotationX.current
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.9, 128, 128]} />
      {/* High poly for spikes */}
      {/* @ts-ignore */}
      <sunMaterial ref={materialRef} transparent />
    </mesh>
  )
}
