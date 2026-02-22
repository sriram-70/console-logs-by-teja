'use client'

import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'

const SunMaterial = shaderMaterial(
  {
    uTime: 0,
    uScroll: 0,
    uState: 0,
    uIsWizard: 0,
    uIsThinking: 0,
  },
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vNoise;
    uniform float uTime;
    uniform float uScroll;
    uniform float uState;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vNormal = normalize(normalMatrix * normal);
      float noiseFreq = mix(2.5, 1.0, uScroll);
      float noiseAmp = mix(0.4, 0.1, uScroll);
      if (uState > 1.5) { noiseFreq = 3.0; noiseAmp = 0.3; }
      float noise = snoise(position * noiseFreq + uTime * (0.5 + uScroll * 0.5));
      vNoise = noise;
      vec3 pos = position + normal * noise * noiseAmp;
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vNoise;
    uniform float uTime;
    uniform float uScroll;
    uniform float uState;
    uniform float uIsWizard;
    uniform float uIsThinking;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = dot(normalize(vNormal), viewDir);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);

      vec3 colStart = vec3(1.2, 1.1, 1.4);
      vec3 colStartCore = vec3(0.1, 0.4, 0.8);
      vec3 colViolet = vec3(0.7, 0.4, 1.0);
      vec3 colVioletCore = vec3(0.2, 0.1, 0.4);
      vec3 colMid = vec3(0.0, 1.0, 0.8);
      vec3 colMidCore = vec3(0.0, 0.2, 0.2);
      vec3 colAmber = vec3(1.0, 0.7, 0.2);
      vec3 colAmberCore = vec3(0.4, 0.15, 0.0);
      vec3 colEnd = vec3(1.4, 0.35, 0.08);
      vec3 colEndCore = vec3(0.7, 0.08, 0.0);

      vec3 finalCore;
      vec3 finalRim;
      if (uScroll < 0.25) {
        float t = uScroll * 4.0;
        finalCore = mix(colStartCore, colVioletCore, t);
        finalRim = mix(colStart, colViolet, t);
      } else if (uScroll < 0.50) {
        float t = (uScroll - 0.25) * 4.0;
        finalCore = mix(colVioletCore, colMidCore, t);
        finalRim = mix(colViolet, colMid, t);
      } else if (uScroll < 0.75) {
        float t = (uScroll - 0.50) * 4.0;
        finalCore = mix(colMidCore, colAmberCore, t);
        finalRim = mix(colMid, colAmber, t);
      } else {
        float t = (uScroll - 0.75) * 4.0;
        finalCore = mix(colAmberCore, colEndCore, t);
        finalRim = mix(colAmber, colEnd, t);
      }

      vec3 color = mix(finalCore, finalRim, fresnel + vNoise * 0.2);

      if (uScroll > 0.75) {
        float glowT = (uScroll - 0.75) / 0.25;
        vec3 fireGlow = vec3(1.2, 0.4, 0.1);
        color += fireGlow * glowT * 0.5 * (0.5 + fresnel);
      }

      if (uIsWizard > 0.5) {
        vec3 vantaBlack = vec3(0.001, 0.001, 0.001);
        vec3 vampireBlack = vec3(0.03, 0.015, 0.01);
        vec3 richBlack = vec3(0.01, 0.02, 0.03);
        vec3 baseMix = mix(vantaBlack, vampireBlack, vNoise * 0.5 + 0.5);
        float rim = pow(fresnel, 4.0);
        color = mix(baseMix, richBlack, rim * 0.8);
      }

      if (uIsThinking > 0.5) {
        // Solid Volumetric Blue/Purple core with Cyan stroke rim
        vec3 blueprintCore = vec3(0.0, 0.28, 0.67); // Royal Blue #0047AB 
        vec3 cyanRim = vec3(0.0, 0.95, 1.0);        // High-intensity Cyan #00F2FF
        
        // Clean, clamped rim lighting mixed with gentle noise to avoid tearing
        float bpRim = pow(fresnel, 1.5);
        float mixFactor = clamp(bpRim + (vNoise * 0.2), 0.0, 1.0);
        color = mix(blueprintCore, cyanRim, mixFactor);
      }

      vec3 sunsetCore = vec3(0.5, 0.0, 0.0);
      vec3 goldenRim = vec3(1.0, 0.6, 0.0);
      float emissiveIntensity = 0.0;
      if (uState > 0.5 && uState < 1.5) {
        color = mix(color, goldenRim, 0.5 + sin(uTime * 10.0) * 0.2);
        emissiveIntensity = 0.5;
      } else if (uState > 1.5) {
        color = mix(sunsetCore, goldenRim, fresnel * 2.0);
        color += vec3(1.0, 0.8, 0.2) * (vNoise * 3.0);
        emissiveIntensity = 2.0;
      }
      color += goldenRim * emissiveIntensity * fresnel;
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ SunMaterial })

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

  const rotationY = useRef(0)
  const rotationX = useRef(0)
  const lastProcessProgress = useRef(0)
  const smoothedSpeedRef = useRef(0)
  const diagnosticBlendRef = useRef(0)
  const worksSectionBlendRef = useRef(0)
  const thinkingBlendRef = useRef(0)

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollTop = window.scrollY
    const rawProgress = maxScroll > 0 ? scrollTop / maxScroll : 0
    const offset = rawProgress

    let stateNum = 0
    if (footerState === 'CHARGING') stateNum = 1
    if (footerState === 'CRITICAL') stateNum = 2
    materialRef.current.uState = stateNum

    const { processProgress, isDiagnosticActive } = useScrollStore.getState()
    const progressDelta = processProgress - lastProcessProgress.current
    lastProcessProgress.current = processProgress
    const currentScrollSpeed = delta > 0 ? Math.abs(progressDelta) / delta : 0
    smoothedSpeedRef.current = THREE.MathUtils.lerp(smoothedSpeedRef.current, currentScrollSpeed, 0.1)

    diagnosticBlendRef.current = THREE.MathUtils.lerp(diagnosticBlendRef.current, isDiagnosticActive ? 1 : 0, 0.08)
    const diagnosticBlend = diagnosticBlendRef.current

    const { isThinkingActive } = useScrollStore.getState()
    thinkingBlendRef.current = THREE.MathUtils.lerp(thinkingBlendRef.current, isThinkingActive ? 1 : 0, 0.08)
    const thinkingBlend = thinkingBlendRef.current

    materialRef.current.wireframe = false

    let worksBlend = 0
    const worksEl = document.getElementById('works')
    if (worksEl) {
      const rect = worksEl.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top <= vh && rect.bottom >= 0) {
        if (rect.top > 0) worksBlend = Math.max(0, (vh - rect.top) / vh)
        else if (rect.bottom < vh) worksBlend = Math.max(0, rect.bottom / vh)
        else worksBlend = 1
      }
    }
    worksSectionBlendRef.current = THREE.MathUtils.lerp(worksSectionBlendRef.current, worksBlend, 0.1)
    const worksSectionBlend = worksSectionBlendRef.current

    let boilSpeed = 0.1
    let spinSpeed = 0.2
    if (footerState === 'CHARGING') { boilSpeed = 0.5; spinSpeed = 5.0; }
    if (footerState === 'CRITICAL') { boilSpeed = 2.0; spinSpeed = 20.0; }
    boilSpeed = THREE.MathUtils.lerp(boilSpeed, 0.045, diagnosticBlend)
    spinSpeed = THREE.MathUtils.lerp(spinSpeed, 0.03, diagnosticBlend)
    spinSpeed = THREE.MathUtils.lerp(spinSpeed, 0.05, worksSectionBlend)

    // Slow heavily exactly during thinking process blueprint mode
    spinSpeed = THREE.MathUtils.lerp(spinSpeed, 0.015, thinkingBlend)
    boilSpeed = THREE.MathUtils.lerp(boilSpeed, 0.08, thinkingBlend)

    let defaultX = 0
    let defaultY = 0
    let defaultZ = 0
    let defaultScale = 1

    if (offset < 0.15) {
      defaultX = 0; defaultZ = 0
    } else if (offset < 0.30) {
      const sectionP = (offset - 0.15) / 0.05
      if (sectionP < 1.0) defaultX = sectionP * 2.5
      else defaultX = 2.5
      defaultZ = -1
    } else if (offset < 0.45) {
      defaultX = 2.5; defaultZ = -1
    } else if (offset < 0.60) {
      const sectionP = (offset - 0.45) / 0.15
      defaultX = 2.5 - (sectionP * 5.0); defaultZ = -0.5
    } else if (offset < 0.75) {
      const sectionP = (offset - 0.60) / 0.15
      defaultX = -2.5 + (sectionP * 5.0); defaultZ = -1
    } else {
      const sectionP = Math.min(1.0, (offset - 0.75) / 0.25)
      defaultX = 2.5 - (sectionP * 2.5)
      defaultY = -1.5 * sectionP
      defaultZ = 1 * sectionP
      defaultScale = 1.0 + (sectionP * 0.5)
    }

    let pBlend = 0
    const processEl = document.getElementById('process')
    if (processEl) {
      const rect = processEl.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top <= vh && rect.bottom >= 0) {
        if (rect.top > 0) pBlend = Math.max(0, (vh - rect.top) / vh)
        else if (rect.bottom < vh) pBlend = Math.max(0, rect.bottom / vh)
        else pBlend = 1
      }
    }

    const smoothBlend = Math.sin((pBlend * Math.PI) / 2)
    if (pBlend > 0.05) {
      materialRef.current.uScroll = THREE.MathUtils.lerp(offset, 0.7, smoothBlend)
    } else {
      materialRef.current.uScroll = offset
    }

    let targetX = THREE.MathUtils.lerp(defaultX, 0, smoothBlend)
    let targetY = THREE.MathUtils.lerp(defaultY, 0, smoothBlend)
    let targetZ = THREE.MathUtils.lerp(defaultZ, 0, smoothBlend)
    let targetScale = THREE.MathUtils.lerp(defaultScale, 0.4, smoothBlend)

    targetX = THREE.MathUtils.lerp(targetX, 1.55, diagnosticBlend)
    targetY = THREE.MathUtils.lerp(targetY, 0.05, diagnosticBlend)
    targetZ = THREE.MathUtils.lerp(targetZ, -0.8, diagnosticBlend)
    targetScale = THREE.MathUtils.lerp(targetScale, 0.72, diagnosticBlend)
    materialRef.current.uScroll = THREE.MathUtils.lerp(materialRef.current.uScroll, 0.16, diagnosticBlend)

    targetX = THREE.MathUtils.lerp(targetX, -1.8, worksSectionBlend)
    targetY = THREE.MathUtils.lerp(targetY, 0, worksSectionBlend)
    targetZ = THREE.MathUtils.lerp(targetZ, 0.1, worksSectionBlend)
    targetScale = THREE.MathUtils.lerp(targetScale, 0.84, worksSectionBlend)

    if (footerState === 'FORM' || footerState === 'FLASH') {
      targetX = 0
      targetY = -1.5
      targetZ = 2.2
      targetScale = 1
      materialRef.current.uScroll = 1.0
      materialRef.current.uIsWizard = 1.0
      diagnosticBlendRef.current = 0
      worksSectionBlendRef.current = 0
    } else {
      materialRef.current.uIsWizard = 0.0
    }

    // Thinking Blueprint target logic
    materialRef.current.uIsThinking = thinkingBlend

    // Tunnel mode centers the blob completely instead of pushing it left
    targetX = THREE.MathUtils.lerp(targetX, 0.0, thinkingBlend)
    targetY = THREE.MathUtils.lerp(targetY, 0.0, thinkingBlend)
    targetZ = THREE.MathUtils.lerp(targetZ, -2.5, thinkingBlend)
    targetScale = THREE.MathUtils.lerp(targetScale, 0.0, thinkingBlend) // scale to 0 to remove

    const responsiveX = window.innerWidth < 768 ? 0 : targetX
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, responsiveX, 0.2)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.2)
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.2)
    meshRef.current.scale.set(targetScale, targetScale, targetScale)

    const baseOpacity = THREE.MathUtils.clamp(1 - diagnosticBlend * 0.45 - worksSectionBlend * 0.1 - thinkingBlend * 1.0, 0.0, 1)
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity ?? 1, baseOpacity, 0.12)
    materialRef.current.uTime = state.clock.elapsedTime * (boilSpeed * (1 - diagnosticBlend * 0.25))

    rotationY.current += delta * spinSpeed
    rotationX.current += delta * (spinSpeed * 0.5)
    meshRef.current.rotation.y = rotationY.current
    meshRef.current.rotation.x = rotationX.current
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.9, 128, 128]} />
      {/* @ts-ignore */}
      <sunMaterial ref={materialRef} transparent depthWrite={true} />
    </mesh>
  )
}
