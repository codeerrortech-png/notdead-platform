import { useRef, useEffect, forwardRef } from 'react'

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_tap;
  uniform float u_speed;
  uniform float u_amplitude;
  uniform float u_pulseMin;
  uniform float u_pulseMax;
  uniform float u_noiseType;

  float hash(float n) {
    return fract(sin(n) * 753.5453123);
  }
  float noiseHash(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 157.0;
    return mix(
      mix(hash(n + 0.0), hash(n + 1.0), f.x),
      mix(hash(n + 157.0), hash(n + 158.0), f.x),
      f.y
    );
  }
  float noiseTrig(vec2 p) {
    float x = p.x, y = p.y;
    float n = sin(x * 1.0 + sin(y * 1.3)) * 0.5;
    n += sin(y * 1.0 + sin(x * 1.1)) * 0.5;
    n += sin((x + y) * 0.5) * 0.25;
    n += sin((x - y) * 0.7) * 0.25;
    return n * 0.5 + 0.5;
  }
  float noise(vec2 p) {
    if (u_noiseType < 0.5) return noiseHash(p);
    return noiseTrig(p);
  }
  float fbm(vec2 p, vec3 a) {
    float v = 0.0;
    v += noise(p * a.x) * 0.50;
    v += noise(p * a.y) * 1.50;
    v += noise(p * a.z) * 0.0125;
    return v;
  }
  vec3 drawLines(vec2 uv, vec3 fbmOffset, vec3 color1, float secs) {
    float timeVal = secs * 0.1;
    vec3 finalColor = vec3(0.0);
    vec3 colorSets[4];
    colorSets[0] = vec3(0.7, 0.05, 1.0);
    colorSets[1] = vec3(1.0, 0.19, 0.0);
    colorSets[2] = vec3(0.0, 1.0, 0.3);
    colorSets[3] = vec3(0.0, 0.38, 1.0);
    for(int i = 0; i < 4; i++) {
      float indexAsFloat = float(i);
      float amp = u_amplitude + (indexAsFloat * 0.0);
      float period = 2.0 + (indexAsFloat + 2.0);
      float thickness = mix(0.4, 0.2, noise(uv * 2.0));
      float t = abs(1.0 / (sin(uv.y + fbm(uv + timeVal * period, fbmOffset)) * amp) * thickness);
      finalColor += t * colorSets[i];
    }
    for(int i = 0; i < 4; i++) {
      float indexAsFloat = float(i);
      float amp = (u_amplitude * 0.5) + (indexAsFloat * 5.0);
      float period = 9.0 + (indexAsFloat + 2.0);
      float thickness = 0.1;
      float t = abs(1.0 / (sin(uv.y + fbm(uv + timeVal * period, fbmOffset)) * amp) * thickness);
      finalColor += t * colorSets[i] * color1;
    }
    return finalColor;
  }
  void main() {
    vec2 uv = (gl_FragCoord.xy / u_resolution.x) * 1.0 - 1.0;
    uv *= 1.5;
    vec3 lineColor1 = vec3(1.0, 0.0, 0.5);
    vec3 lineColor2 = vec3(0.3, 0.5, 1.5);
    float spread = abs(u_tap);
    vec3 finalColor = vec3(0.0);
    float t = sin(u_time) * 0.5 + 0.5;
    float pulse = mix(u_pulseMin, u_pulseMax, t);
    finalColor = drawLines(uv, vec3(65.2, 40.0, 4.0), lineColor1, u_time * u_speed) * pulse;
    finalColor += drawLines(uv, vec3(5.0 * spread / 2.0, 2.1 * spread, 1.0), lineColor2, u_time * u_speed);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

const RESTING = {
  speed: 0.35,
  amplitude: 80,
  pulseMin: 0.05,
  pulseMax: 0.2,
  tap: 1.0,
}
const ACTIVE = {
  speed: 2.8,
  amplitude: 10,
  pulseMin: 0.05,
  pulseMax: 0.4,
  tap: 1.0,
}
const LERP = 0.12
const REST_LERP = 0.04

function lerp(a, b, t) {
  return a + (b - a) * t
}

const ChaosButton = forwardRef(function ChaosButton(
  { children, className = '', style = {}, as: Component = 'button', ...props },
  ref
) {
  const buttonRef = useRef(null)
  const setRef = (el) => {
    buttonRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const uniformsRef = useRef(null)
  const phaseRef = useRef(0)
  const lastTimeRef = useRef(0)
  const currentRef = useRef({ ...RESTING })
  const targetRef = useRef({ ...RESTING })
  const rafRef = useRef(0)
  const frameCountRef = useRef(0)

  useEffect(() => {
    const button = buttonRef.current
    const canvas = canvasRef.current
    if (!button || !canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true })
    if (!gl) return
    glRef.current = gl

    function compileShader(type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    programRef.current = program
    gl.useProgram(program)

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      tap: gl.getUniformLocation(program, 'u_tap'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      amplitude: gl.getUniformLocation(program, 'u_amplitude'),
      pulseMin: gl.getUniformLocation(program, 'u_pulseMin'),
      pulseMax: gl.getUniformLocation(program, 'u_pulseMax'),
      noiseType: gl.getUniformLocation(program, 'u_noiseType'),
    }
    uniformsRef.current = uniforms

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const rect = button.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
    }

    resize()

    const activate = () => {
      targetRef.current = { ...ACTIVE }
    }
    const deactivate = () => {
      targetRef.current = { ...RESTING }
    }

    button.addEventListener('mousedown', activate)
    button.addEventListener('mouseup', deactivate)
    button.addEventListener('mouseleave', deactivate)
    button.addEventListener('touchstart', (e) => {
      e.preventDefault()
      activate()
    })
    button.addEventListener('touchend', deactivate)
    window.addEventListener('resize', resize)

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      const tar = targetRef.current
      const isActive = tar.speed > 1
      frameCountRef.current += 1
      if (!isActive && frameCountRef.current % 2 !== 0) return
      const now = performance.now() / 1000
      const dt = now - lastTimeRef.current
      lastTimeRef.current = now

      const cur = currentRef.current
      const t = isActive ? LERP : REST_LERP
      cur.speed = lerp(cur.speed, tar.speed, t)
      cur.amplitude = lerp(cur.amplitude, tar.amplitude, t)
      cur.pulseMin = lerp(cur.pulseMin, tar.pulseMin, t)
      cur.pulseMax = lerp(cur.pulseMax, tar.pulseMax, t)
      cur.tap = lerp(cur.tap, tar.tap, t)

      phaseRef.current += dt * cur.speed
      if (phaseRef.current > 1000) phaseRef.current = phaseRef.current % 1000

      gl.uniform1f(uniforms.time, phaseRef.current)
      gl.uniform1f(uniforms.tap, cur.tap)
      gl.uniform1f(uniforms.speed, 1.0)
      gl.uniform1f(uniforms.amplitude, cur.amplitude)
      gl.uniform1f(uniforms.pulseMin, cur.pulseMin)
      gl.uniform1f(uniforms.pulseMax, cur.pulseMax)
      gl.uniform1f(uniforms.noiseType, 1.0)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      button.removeEventListener('mousedown', activate)
      button.removeEventListener('mouseup', deactivate)
      button.removeEventListener('mouseleave', deactivate)
      button.removeEventListener('touchstart', activate)
      button.removeEventListener('touchend', deactivate)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <Component
      ref={setRef}
      className={`chaos-button relative border-none bg-transparent p-0 cursor-pointer overflow-hidden rounded-[150px] min-h-[48px] min-w-[140px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:scale-100 ${className}`}
      style={{
        background: 'linear-gradient(180deg, #1a2332 0%, #0b0f17 100%)',
        border: '1px solid rgba(0,255,156,0.25)',
        boxShadow: '0 0 20px rgba(0,255,156,0.15)',
        ...style,
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="chaos-canvas absolute inset-[2px] block w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-[inherit]"
        aria-hidden
      />
      <span className="chaos-label relative z-[1] flex items-center justify-center gap-2 py-3 px-6 text-white font-mono text-sm font-semibold tracking-wide pointer-events-none active:mix-blend-difference">
        {children}
      </span>
    </Component>
  )
})

export default ChaosButton
