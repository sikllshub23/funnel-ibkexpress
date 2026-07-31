// Génère les icônes PWA (fond encre + éclair signal) sans dépendance de rasterisation :
// un petit encodeur PNG maison (RGBA brut -> zlib -> chunks PNG) suffit pour des aplats.
import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { ibkExpress } from '../config/ibkExpress.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

const INK = hexToRgb(ibkExpress.theme.ink)
const SIGNAL = hexToRgb(ibkExpress.theme.signal)

// Éclair signature (mêmes points que src/components/BoltMark.jsx), espace 0-100.
const BOLT = [
  [58, 6],
  [24, 54],
  [46, 54],
  [40, 94],
  [78, 42],
  [54, 42]
]
const BOLT_CENTER = [51, 50]

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)]
}

function pointInPolygon(x, y, polygon) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersects) inside = !inside
  }
  return inside
}

function drawIcon(size, { boltHeightRatio = 0.55 } = {}) {
  const buffer = new Uint8ClampedArray(size * size * 4)
  const scale = (boltHeightRatio * size) / 88
  const scaledBolt = BOLT.map(([bx, by]) => [
    size / 2 + (bx - BOLT_CENTER[0]) * scale,
    size / 2 + (by - BOLT_CENTER[1]) * scale
  ])

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const idx = (y * size + x) * 4
      const isBolt = pointInPolygon(x + 0.5, y + 0.5, scaledBolt)
      const [r, g, b] = isBolt ? SIGNAL : INK
      buffer[idx] = r
      buffer[idx + 1] = g
      buffer[idx + 2] = b
      buffer[idx + 3] = 255
    }
  }
  return buffer
}

function crc32(buf) {
  let crc = ~0
  for (let i = 0; i < buf.length; i += 1) {
    crc ^= buf[i]
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
    }
  }
  return ~crc >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lengthBuf = Buffer.alloc(4)
  lengthBuf.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([lengthBuf, typeBuf, data, crcBuf])
}

function encodePng(size, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const rowSize = size * 4
  const raw = Buffer.alloc((rowSize + 1) * size)
  for (let y = 0; y < size; y += 1) {
    raw[y * (rowSize + 1)] = 0 // no filter
    Buffer.from(rgba.buffer, y * rowSize, rowSize).copy(raw, y * (rowSize + 1) + 1)
  }
  const idat = deflateSync(raw)

  return Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

function writeIcon(fileName, size, options) {
  const rgba = drawIcon(size, options)
  const png = encodePng(size, rgba)
  writeFileSync(path.join(outDir, fileName), png)
  console.log(`✓ ${fileName} (${size}x${size})`)
}

writeIcon('icon-192.png', 192, { boltHeightRatio: 0.55 })
writeIcon('icon-512.png', 512, { boltHeightRatio: 0.55 })
writeIcon('icon-512-maskable.png', 512, { boltHeightRatio: 0.45 })
writeIcon('apple-touch-icon.png', 180, { boltHeightRatio: 0.55 })
writeIcon('favicon-32.png', 32, { boltHeightRatio: 0.55 })
