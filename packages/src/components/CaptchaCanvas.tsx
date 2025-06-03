import React, { useRef, useEffect, useCallback } from 'react'

interface CaptchaCanvasProps {
  onCaptchaCode?: (code: string) => void
  refreshTrigger?: number
}

interface CaptchaConfig {
  code: string
  canvasWidth: number
  canvasHeight: number
  fontSize: number
  fontFamily: string
  fontStyle: string
  padding: number
  bgColor: string
  codeChars: string
  codeLen: number
  pointNum: number
  lineNum: number
}

const getRandomInt = (max: number) =>
  Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * max)

const getRandomColor = () =>
  `rgb(${getRandomInt(150)},${getRandomInt(150)},${getRandomInt(150)})`

const CaptchaCanvas: React.FC<CaptchaCanvasProps> = ({ refreshTrigger, onCaptchaCode = () => {} }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const configRef = useRef<CaptchaConfig>({
    code: '',
    canvasWidth: 100,
    canvasHeight: 42,
    fontSize: 28,
    fontFamily: 'Verdana',
    fontStyle: 'bold',
    padding: 10,
    bgColor: '#f0f0f0',
    codeChars: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    codeLen: 4,
    pointNum: 60,
    lineNum: 5,
  })

  const generateCode = () => {
    const chars = configRef.current.codeChars
    configRef.current.code = Array.from({ length: configRef.current.codeLen }, () =>
      chars[getRandomInt(chars.length)]
    ).join('')
  }

  const drawNoise = (ctx: CanvasRenderingContext2D) => {
    const { pointNum, lineNum, canvasWidth, canvasHeight } = configRef.current
    for (let i = 0; i < pointNum; i++) {
      const x = getRandomInt(canvasWidth)
      const y = getRandomInt(canvasHeight)
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, 2 * Math.PI)
      ctx.fillStyle = getRandomColor()
      ctx.fill()
    }
    for (let i = 0; i < lineNum; i++) {
      const x1 = getRandomInt(canvasWidth)
      const y1 = getRandomInt(canvasHeight)
      const x2 = getRandomInt(canvasWidth)
      const y2 = getRandomInt(canvasHeight)
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = getRandomColor()
      ctx.stroke()
    }
  }

  const drawCode = (ctx: CanvasRenderingContext2D) => {
    const cfg = configRef.current
    ctx.font = `${cfg.fontStyle} ${cfg.fontSize}px ${cfg.fontFamily}`
    ctx.textBaseline = 'middle'
    const charWidth = (cfg.canvasWidth - cfg.padding * 2) / cfg.code.length

    for (let i = 0; i < cfg.code.length; i++) {
      const x = cfg.padding + i * charWidth + charWidth / 2
      const y = cfg.canvasHeight / 2
      ctx.fillStyle = getRandomColor()
      ctx.fillText(cfg.code[i], x, y)
    }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cfg = configRef.current
    canvas.width = cfg.canvasWidth
    canvas.height = cfg.canvasHeight
    ctx.fillStyle = cfg.bgColor
    ctx.fillRect(0, 0, cfg.canvasWidth, cfg.canvasHeight)
    drawNoise(ctx)
    drawCode(ctx)
  }, [])

  const refresh = useCallback(() => {
    generateCode()
    draw()
    onCaptchaCode(configRef.current.code)
  }, [draw, onCaptchaCode])

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      refresh()
    }
  }, [refreshTrigger])

  return <canvas className=" " ref={canvasRef} onClick={refresh} />
}

export default CaptchaCanvas
