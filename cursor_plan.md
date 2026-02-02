# Plan: Magnetic "Gen-Z" Cursor Implementation

## Objective
Replace the current "Hook" cursor with a hyper-modern, fluid "Magnetic Circle" cursor that aligns with Gen-Z aesthetics (minimalist, physics-based, blended interaction).

## Design Philosophy
- **Fluid Physics**: The cursor should feel organic, not robotic. We'll use a dual-layer system (Dot + Ring) with different inertia values.
- **Mix-Blend-Exclusion**: Ensures visibility against the volatile 3D sun background (inverts colors dynamically).
- **Magnetic Feedback**: Clear visual indication when hovering interactables.

## Technical Components

### 1. Global Styles (`globals.css`)
- **Action**: Hide the default system cursor globally to ensure immersion.
- **CSS**: `* { cursor: none !important; }` (with a fallback for mobile/touch devices where custom cursor is hidden).

### 2. Cursor Architecture (`Cursor.tsx`)
We will rebuild `Cursor.tsx` with two main moving parts managed by GSAP:

#### A. The "Core" (Pointer)
- **Visual**: A small (8px), solid white dot.
- **Physics**: Follows mouse position almost instantly (`duration: 0.1` or `quickTo`).
- **Function**: precise pointing.

#### B. The "Aura" (Magnetic Ring)
- **Visual**: A standard stroke circle (~40px) that surrounds the Core.
- **Physics**: Lags behind significantly (`duration: 0.5`, `ease: 'power3.out'`) to create a "liquid" trail effect.
- **Blend Mode**: `mix-blend-exclusion`.

### 3. Interactive States
We will attach event listeners to all interactive elements (`a`, `button`, `.interactive`).

| State | Visual Change | Physics |
| :--- | :--- | :--- |
| **Idle** | Core + Ring visible. Independent movement. | Ring follows Core sluggishly. |
| **Hover** | Ring expands (scale: 2.5), opacity drops, border thins. Core might hide or stay center. | Ring "snaps" to the element center (optional) or just gets "excited". |
| **Click** | Ring contracts rapidly (scale: 0.8). | Snappy spring animation. |

## Implementation Steps
1.  **Update CSS**: Hide system default cursor.
2.  **Rewrite `Cursor.tsx`**:
    -   Remove SVG Hook.
    -   Implement `div` based Core and Ring.
    -   Use `gsap.quickTo` for performance optimized movement.
    -   Add `scale` and `magnetic` logic on hover.
3.  **Verify**: Ensure it floats clearly above the Three.js canvas.

## "Gen-Z" Touches
- **True Inversion**: The blend mode will make it look like looking through a negative lens.
- **Text Selection**: Handle text cursor changes (maybe fallback / hide ring).
