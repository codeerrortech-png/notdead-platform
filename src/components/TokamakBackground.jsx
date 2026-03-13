import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const SHELL_COLOR = '#00ff9c'
const PLASMA_COLOR = '#00ff9c'
const GRID_X = 400
const GRID_Y = 200
const PULSE_SPEED = 4.89
const GRID_GAP = 0.23
const GRID_OPACITY = 0.72
const BLOOM_STRENGTH = 0.55
const LINE_THICKNESS = 0.006
const TRAIL_COUNT = 36
const CAMERA_SPEED = 0.25

const vertexShaderShell = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShaderShell = `
  uniform float uTime;
  uniform vec2 uGridSize;
  uniform vec3 uColor;
  uniform float uPulseSpeed;
  uniform float uGap;
  uniform float uOpacity;
  varying vec2 vUv;
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  void main() {
    vec2 gridUV = vUv * uGridSize;
    vec2 cellID = floor(gridUV);
    vec2 cellUV = fract(gridUV);
    float padding = uGap;
    float square = step(padding, cellUV.x) * step(padding, cellUV.y) *
                   step(cellUV.x, 1.0 - padding) * step(cellUV.y, 1.0 - padding);
    float rnd = random(cellID);
    float pulse = 0.5 + 0.5 * sin(uTime * uPulseSpeed + rnd * 6.28);
    float alpha = square * (0.05 + 0.95 * pulse) * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`

const vertexShaderTrail = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShaderTrail = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uSpeedMult;
  uniform float uLength;
  uniform float uLengthMult;
  uniform float uOffset;
  uniform float uDirection;
  varying vec2 vUv;
  void main() {
    float finalSpeed = uSpeed * uSpeedMult;
    float progress = fract(vUv.x * 2.0 - (uTime * finalSpeed * uDirection) + uOffset);
    float finalLength = clamp(uLength * uLengthMult, 0.01, 0.99);
    float alpha = 0.0;
    if (uDirection > 0.0) {
      float tailStart = 1.0 - finalLength;
      alpha = smoothstep(tailStart, 1.0, progress);
    } else {
      float tailEnd = finalLength;
      alpha = 1.0 - smoothstep(0.0, tailEnd, progress);
    }
    alpha = pow(alpha, 3.0);
    gl_FragColor = vec4(uColor, alpha);
  }
`

export default function TokamakBackground() {
  const containerRef = useRef(null)
  const mountRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.12)

    const camera = new THREE.PerspectiveCamera(
      90,
      container.clientWidth / container.clientHeight,
      0.01,
      100
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.toneMapping = THREE.NoToneMapping
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = false

    const tokamakGroup = new THREE.Group()
    scene.add(tokamakGroup)

    const shellGeometry = new THREE.TorusGeometry(10, 3.0, 32, 100)
    const shellMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShaderShell,
      fragmentShader: fragmentShaderShell,
      uniforms: {
        uTime: { value: 0 },
        uGridSize: { value: new THREE.Vector2(GRID_X, GRID_Y) },
        uColor: { value: new THREE.Color(SHELL_COLOR) },
        uPulseSpeed: { value: PULSE_SPEED },
        uGap: { value: GRID_GAP },
        uOpacity: { value: GRID_OPACITY },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const tokamakShell = new THREE.Mesh(shellGeometry, shellMaterial)
    tokamakGroup.add(tokamakShell)

    const trailsGroup = new THREE.Group()
    tokamakGroup.add(trailsGroup)
    const trailMeshes = []

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const laneRadius = 7.5 + Math.random() * 5.0
      const geo = new THREE.TorusGeometry(laneRadius, LINE_THICKNESS, 4, 80)
      const mat = new THREE.ShaderMaterial({
        vertexShader: vertexShaderTrail,
        fragmentShader: fragmentShaderTrail,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(PLASMA_COLOR) },
          uSpeed: { value: 0.1 + Math.random() * 0.3 },
          uSpeedMult: { value: 1.0 },
          uLength: { value: 0.1 + Math.random() * 0.2 },
          uLengthMult: { value: 0.47 },
          uOffset: { value: Math.random() * 100.0 },
          uDirection: { value: 1.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = (Math.random() - 0.5) * 0.1
      mesh.position.z = (Math.random() - 0.5) * 0.5
      trailsGroup.add(mesh)
      trailMeshes.push(mat)
    }

    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5,
      0.4,
      0.85
    )
    bloomPass.threshold = 0.1
    bloomPass.strength = BLOOM_STRENGTH
    bloomPass.radius = 0.6

    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)

    const clock = new THREE.Clock()
    let cameraAngle = 0
    let rafId = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      if (document.hidden) return
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      cameraAngle += CAMERA_SPEED * delta
      const r = 10
      const camX = Math.cos(cameraAngle) * r
      const camY = Math.sin(cameraAngle) * r
      camera.position.set(camX, camY, 0.5)
      const lookAtAngle = cameraAngle + 0.1
      controls.target.set(
        Math.cos(lookAtAngle) * r,
        Math.sin(lookAtAngle) * r,
        0
      )
      controls.update()

      shellMaterial.uniforms.uTime.value = elapsedTime
      trailMeshes.forEach((mat) => {
        mat.uniforms.uTime.value = elapsedTime
      })
      composer.render()
    }
    animate()

    function onResize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      bloomPass.resolution.set(w, h)
    }
    window.addEventListener('resize', onResize)

    mountRef.current = {
      container,
      renderer,
      scene,
      shellGeometry,
      shellMaterial,
      trailMeshes,
      trailsGroup,
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      shellGeometry.dispose()
      shellMaterial.dispose()
      trailMeshes.forEach((m) => m.dispose())
      trailsGroup.children.forEach((child) => {
        if (child.geometry) child.geometry.dispose()
        if (child.material) child.material.dispose()
      })
      renderer.dispose()
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    />
  )
}
