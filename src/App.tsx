
import { useState } from 'react'
import './index.css'

const palettes = [
  { name: 'Ocean', bg: '#eef5ff', primary: '#2456a6', accent: '#66b6c9' },
  { name: 'Rose', bg: '#fff0f3', primary: '#a72f58', accent: '#e9a2b5' },
  { name: 'Forest', bg: '#eef5ed', primary: '#285c43', accent: '#a8c68f' },
  { name: 'Sunset', bg: '#fff2e8', primary: '#b94f27', accent: '#f0b44d' },
  { name: 'Midnight', bg: '#202538', primary: '#ffffff', accent: '#9d8bff' },
  { name: 'Mono', bg: '#f4f4f4', primary: '#222222', accent: '#777777' },
]

const symbols = [
  { name: 'Star', icon: '✦' },
  { name: 'Flower', icon: '❋' },
  { name: 'Leaf', icon: '❧' },
  { name: 'Circle', icon: '●' },
  { name: 'Diamond', icon: '◆' },
  { name: 'Lightning', icon: 'ϟ' },
  { name: 'Crown', icon: '♛' },
  { name: 'Heart', icon: '♥' },
  { name: 'None', icon: '' },
]

const layouts = ['Stacked', 'Horizontal', 'Wordmark', 'Lettermark', 'Emblem']
const styles = ['Modern', 'Minimal', 'Bold', 'Elegant']

function App() {
  const [brand, setBrand] = useState('Rose Studio')
  const [tagline, setTagline] = useState('Made with creativity')
  const [industry, setIndustry] = useState('Creative studio')
  const [layout, setLayout] = useState('Stacked')
  const [style, setStyle] = useState('Modern')
  const [symbol, setSymbol] = useState('Star')
  const [paletteName, setPaletteName] = useState('Rose')
  const [showTagline, setShowTagline] = useState(true)

  const palette = palettes.find((p) => p.name === paletteName) || palettes[0]
  const mark = symbols.find((s) => s.name === symbol)?.icon || ''
  const initials = brand.trim().split(/\s+/).map((word) => word[0]).join('').slice(0, 3).toUpperCase()
  const fontFamily = style === 'Elegant' ? 'Georgia, serif' : style === 'Bold' ? 'Impact, sans-serif' : style === 'Minimal' ? 'Arial, sans-serif' : 'Inter, Arial, sans-serif'
  const weight = style === 'Bold' ? 900 : style === 'Minimal' ? 400 : 700

  function getLogoSvg() {
    const horizontal = layout === 'Horizontal'
    const wordmark = layout === 'Wordmark'
    const lettermark = layout === 'Lettermark'
    const emblem = layout === 'Emblem'
    const symbolX = horizontal ? 125 : 400
    const symbolY = horizontal ? 190 : 125
    const nameY = horizontal ? 205 : layout === 'Stacked' ? 285 : emblem ? 260 : 235
    const nameX = horizontal ? 390 : 400
    const nameSize = brand.length > 18 ? 35 : brand.length > 12 ? 42 : 52
    const decoration = emblem
      ? `<rect x="180" y="65" width="440" height="290" rx="28" fill="none" stroke="${palette.primary}" stroke-width="4"/>`
      : ''

    return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
      <rect width="800" height="420" rx="24" fill="${palette.bg}"/>
      ${decoration}
      ${!wordmark && !lettermark && mark ? `<text x="${symbolX}" y="${symbolY}" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="${horizontal ? 82 : 90}" fill="${palette.accent}">${mark}</text>` : ''}
      ${lettermark ? `<circle cx="400" cy="130" r="64" fill="${palette.primary}"/><text x="400" y="151" text-anchor="middle" font-family="${fontFamily}" font-size="58" font-weight="700" fill="${palette.bg}">${initials || 'L'}</text>` : ''}
      <text x="${nameX}" y="${nameY}" text-anchor="middle" font-family="${fontFamily}" font-size="${nameSize}" font-weight="${weight}" letter-spacing="${style === 'Elegant' ? 3 : 0}" fill="${palette.primary}">${escapeXml(brand || 'Your Brand')}</text>
      ${showTagline && tagline.trim() && !lettermark ? `<text x="${nameX}" y="${nameY + 43}" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" letter-spacing="1.5" fill="${palette.accent}">${escapeXml(tagline)}</text>` : ''}
      <text x="400" y="390" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="${palette.accent}" opacity=".8">${escapeXml(industry.toUpperCase())}</text>
    </svg>`
  }

  function escapeXml(value: string) {
    return value.replace(/[<>&"']/g, (char) => ({
      '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
    })[char] || char)
  }

  function downloadSvg() {
    const blob = new Blob([getLogoSvg()], { type: 'image/svg+xml;charset=utf-8' })
    saveFile(blob, `${brand || 'logo'}.svg`)
  }

  function saveFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename.replace(/[^a-z0-9._-]/gi, '-')
    link.click()
    URL.revokeObjectURL(url)
  }

  function downloadPng() {
    const blob = new Blob([getLogoSvg()], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1600
      canvas.height = 840
      const context = canvas.getContext('2d')
      if (!context) return
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((png) => {
        if (png) saveFile(png, `${brand || 'logo'}.png`)
        URL.revokeObjectURL(url)
      }, 'image/png')
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      alert('PNG export failed. Please try downloading SVG instead.')
    }
    image.src = url
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand-mark" href="#" aria-label="LogoLift home"><span>✳</span> LogoLift</a>
        <span className="top-note">YOUR BRAND STARTS HERE</span>
      </header>

      <section className="intro">
        <div className="eyebrow">✦ YOUR CREATIVE WORKSPACE</div>
        <h1>Make a logo that feels <span>like you.</span></h1>
        <p>Build a polished brand identity in minutes. Make it yours, then download it.</p>
      </section>

      <div className="workspace">
        <section className="panel controls">
          <div className="panel-heading"><span className="step-number">01</span><div><h2>Your brand</h2><p>Start with the essentials</p></div></div>

          <label>Business name
            <input value={brand} onChange={(e) => setBrand(e.target.value)} maxLength={32} placeholder="Your business name" />
          </label>
          <label>Tagline <span className="optional">OPTIONAL</span>
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={48} placeholder="A few words about your business" />
          </label>
          <label>Industry
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
              {['Creative studio', 'Beauty & wellness', 'Food & drink', 'Home services', 'Technology', 'Retail', 'Fitness', 'Professional services', 'Other'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <div className="section-divider" />
          <div className="panel-heading"><span className="step-number">02</span><div><h2>Choose a layout</h2><p>Find your brand's shape</p></div></div>
          <div className="choice-grid">
            {layouts.map((item) => <button key={item} className={`choice ${layout === item ? 'selected' : ''}`} onClick={() => setLayout(item)} type="button">{item}</button>)}
          </div>

          <label>Design style</label>
          <div className="choice-grid four">
            {styles.map((item) => <button key={item} className={`choice ${style === item ? 'selected' : ''}`} onClick={() => setStyle(item)} type="button">{item}</button>)}
          </div>

          <div className="section-divider" />
          <div className="panel-heading"><span className="step-number">03</span><div><h2>Make it yours</h2><p>Colour and personality</p></div></div>
          <label>Symbol</label>
          <div className="symbol-grid">
            {symbols.map((item) => <button key={item.name} type="button" title={item.name} aria-label={item.name} className={`symbol-choice ${symbol === item.name ? 'selected' : ''}`} onClick={() => setSymbol(item.name)}>{item.icon || '×'}<small>{item.name}</small></button>)}
          </div>
          <label>Colour palette</label>
          <div className="palette-grid">
            {palettes.map((item) => <button type="button" key={item.name} className={`palette-choice ${paletteName === item.name ? 'selected' : ''}`} onClick={() => setPaletteName(item.name)} aria-label={`${item.name} colour palette`} title={item.name}><span style={{ background: item.primary }} /><span style={{ background: item.accent }} /><span style={{ background: item.bg }} /><small>{item.name}</small></button>)}
          </div>
          <label className="toggle-row"><input type="checkbox" checked={showTagline} onChange={(e) => setShowTagline(e.target.checked)} /><span>Show tagline on logo</span></label>
        </section>

        <section className="preview-column">
          <div className="preview-top"><div><span className="live-dot" /> LIVE PREVIEW<h2>Your logo, taking shape</h2></div><span className="format-pill">SVG + PNG</span></div>
          <div className="preview-card"><div className="preview-canvas" dangerouslySetInnerHTML={{ __html: getLogoSvg() }} /></div>
          <div className="preview-meta"><span>✦ {layout} layout</span><span>● {palette.name} palette</span><span>✳ {style} style</span></div>
          <div className="download-card"><div><h3>Ready to make it official?</h3><p>Download your logo to use on your website, socials, and more.</p></div><div className="download-actions"><button className="download-secondary" type="button" onClick={downloadSvg}>↓ Download SVG</button><button className="download-primary" type="button" onClick={downloadPng}>↓ Download PNG</button></div></div>
          <p className="fine-print">Your design stays in your browser. No account needed.</p>
        </section>
      </div>
      <footer>Made for the next big thing. <strong>Make it yours.</strong></footer>
    </main>
  )
}

export default App
