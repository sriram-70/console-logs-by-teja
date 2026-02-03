'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleReactorProps {
    footerState: string // 'IDLE' | 'CHARGING' | 'CRITICAL'
}

export function ParticleReactor({ footerState }: ParticleReactorProps) {
    const count = 1600
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const { viewport } = useThree()

    // Particle State
    // [x, y, z, speed, active, ...pad]
    const particles = useMemo(() => {
        const data = new Float32Array(count * 5)
        for (let i = 0; i < count; i++) {
            resetParticle(data, i, viewport.width, viewport.height, true)
        }
        return data
    }, [viewport])

    const dummy = new THREE.Object3D()
    const colorViolet = new THREE.Color('#4c1d95')
    const colorBlack = new THREE.Color('#000000')
    const colorElectric = new THREE.Color('#8b5cf6') // Light Violet

    useEffect(() => {
        // Initial color set
        if (meshRef.current) {
            updateColors('IDLE')
        }
    }, [])

    // React to state changes for color
    useEffect(() => {
        if (meshRef.current) {
            updateColors(footerState)
        }
    }, [footerState])

    const updateColors = (state: string) => {
        if (!meshRef.current) return
        for (let i = 0; i < count; i++) {
            // IDLE: Mixed Black/Violet
            // CHARGING: More Violet
            // CRITICAL: Electric Violet
            if (state === 'CRITICAL') {
                meshRef.current.setColorAt(i, colorElectric)
            } else if (state === 'CHARGING') {
                meshRef.current.setColorAt(i, Math.random() > 0.3 ? colorViolet : colorBlack)
            } else {
                meshRef.current.setColorAt(i, Math.random() > 0.7 ? colorBlack : colorBlack) // Mostly black/dark in idle?
                // Prompt says: IDLE color = Black.
                // Let's stick to Black with hint of violet
                meshRef.current.setColorAt(i, Math.random() > 0.9 ? colorViolet : colorBlack)
            }
        }
        meshRef.current.instanceColor!.needsUpdate = true
    }

    useFrame((state, delta) => {
        if (!meshRef.current) return

        const targetX = 0
        const targetY = -2.0

        // PHYSICS CONFIG
        let speedMult = 1.0
        let suction = 1.0

        if (footerState === 'IDLE') {
            speedMult = 0.01 // Slow hypnotic (Prompt Req: 0.01)
            suction = 1.0
        } else if (footerState === 'CHARGING') {
            speedMult = 0.05 // Accel (Prompt Req: 0.05)
            suction = 2.0
        } else if (footerState === 'CRITICAL') {
            speedMult = 0.2 // Super fast (Prompt Req: 0.2)
            suction = 5.0
        }

        for (let i = 0; i < count; i++) {
            const i5 = i * 5

            let x = particles[i5]
            let y = particles[i5 + 1]
            let z = particles[i5 + 2]
            let speed = particles[i5 + 3]

            const dx = targetX - x
            const dy = targetY - y
            const dz = 0 - z

            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (dist > 0.01) {
                x += (dx / dist) * speed * delta * suction * speedMult
                y += (dy / dist) * speed * delta * suction * speedMult
                z += (dz / dist) * speed * delta * suction * speedMult
            }

            // Turbulence
            x += (Math.random() - 0.5) * 0.05 * speedMult
            y += (Math.random() - 0.5) * 0.05 * speedMult

            // Dissolve 
            if (dist < 1.0) {
                resetParticle(particles, i, viewport.width, viewport.height, false)
                x = particles[i5]
                y = particles[i5 + 1]
                z = particles[i5 + 2]
            }

            particles[i5] = x
            particles[i5 + 1] = y
            particles[i5 + 2] = z

            dummy.position.set(x, y, z)
            dummy.rotation.x += speed * delta
            dummy.rotation.y += speed * delta

            // Scale Calculation
            let scale = Math.min(1.0, (dist - 0.8) * 2.0)

            // Scroll Logic
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            const scrollP = maxScroll > 0 ? window.scrollY / maxScroll : 0
            if (scrollP < 0.75) scale = 0

            if (scale < 0) {
                dummy.scale.set(0, 0, 0)
            } else {
                dummy.scale.set(scale, scale, scale)
            }

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            {/* Reverted to 0.02 as requested in Part B */}
            <meshStandardMaterial
                color="#ffffff"
                roughness={0.4}
                metalness={0.8}
                emissive="#1a0b2e"
            />
        </instancedMesh>
    )
}

function resetParticle(data: Float32Array, i: number, vw: number, vh: number, randomStart: boolean) {
    const i5 = i * 5
    const side = Math.random() > 0.5 ? 1 : -1

    // Spawn X: Edges
    data[i5] = (vw / 2) * side * 1.1

    // Spawn Y: Bottom 50% Restriction
    // vh/2 is top, -vh/2 is bottom. Center is 0.
    // We want range [-vh/2, 0]
    data[i5 + 1] = (Math.random() * (vh / 2)) - (vh / 2)

    // Spawn Z
    data[i5 + 2] = (Math.random() - 0.5) * 2

    data[i5 + 3] = 2.0 + Math.random() * 3.0 // Base Speed
}
