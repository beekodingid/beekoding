import os
import json
import re

# Template generator matching sesi-01/index.html strictly
def generate_slide_deck_html(session_data):
    s_num = session_data["num"]
    num_str = f"{s_num:02d}"
    prev_str = f"{s_num - 1:02d}"
    next_str = f"{s_num + 1:02d}" if s_num < 24 else None
    
    title_meta = f"Slide Mengajar: Sesi {num_str} - {session_data['title']} | Beekoding Academy"
    
    # Navigation toolbar links
    prev_btn_html = f'<a href="/slides/sesi-{prev_str}/index.html" class="btn-nav-sesi">← Sesi {prev_str}</a>'
    next_btn_html = f'<a href="/slides/sesi-{next_str}/index.html" class="btn-nav-sesi">Sesi {next_str} →</a>' if next_str else ''

    # Slides HTML
    slides_html_list = []
    for idx, slide in enumerate(session_data["slides"], start=1):
        active_class = " active" if idx == 1 else ""
        points_li = "".join([f'<li style="margin-bottom: 8px; line-height: 1.5;">{pt}</li>' for pt in slide["points"]])
        
        slide_markup = f"""      <!-- ================= SLIDE {idx}: {slide['badge']} ================= -->
      <div class="slide{active_class}" data-time="{slide['time']}">
        <div class="slide-header">
          <div class="badge-session">{slide['badge']}</div>
          <div class="badge-time">{slide['time']}</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              {slide['title']}
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 12px 0 16px; line-height: 1.55;">
              {slide['text']}
            </p>
            <div class="concept-card" style="padding: 16px 20px;">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13.5px;">
                {points_li}
              </ul>
            </div>
          </div>

          <div class="visual-column">
            {slide['visual_html']}
          </div>
        </div>

        <div class="slide-footer">
          <div class="footer-hints">Panduan Guru: {slide['badge']}</div>
          <div class="nav-buttons">
            <button class="btn-nav" onclick="prevSlide()">&larr;</button>
            <div class="slide-counter"><span>{idx}</span> / 10</div>
            <button class="btn-nav" onclick="nextSlide()">&rarr;</button>
          </div>
        </div>
      </div>
"""
        slides_html_list.append(slide_markup)

    all_slides_markup = "\n".join(slides_html_list)

    # Teacher notes JSON
    notes_json = json.dumps(session_data["notes"], indent=6, ensure_ascii=False)

    html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title_meta}</title>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Fredoka:wght@600;700&family=Space+Grotesk:wght@700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      background-color: #0b0f19;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      user-select: none;
    }}

    /* Top Navigation Toolbar */
    .top-toolbar {{
      background: #111827;
      border-bottom: 2px solid #1f2937;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }}

    .brand-tag {{
      display: flex;
      align-items: center;
      gap: 14px;
    }}

    .brand-link {{
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
    }}

    .brand-logo-wrap {{
      position: relative;
      display: inline-flex;
    }}

    .brand-logo-box {{
      width: 40px;
      height: 40px;
      border-radius: 14px;
      background: linear-gradient(135deg, #fbbf24, #f59e0b, #eab308);
      padding: 2px;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .brand-link:hover .brand-logo-box {{
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.55);
      transform: translateY(-1px);
    }}

    .brand-logo-inner {{
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background: #121520;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }}

    .brand-logo-img {{
      width: 28px;
      height: 28px;
      object-fit: contain;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }}

    .brand-link:hover .brand-logo-img {{
      transform: scale(1.12);
    }}

    .brand-sparkle-ping {{
      position: absolute;
      top: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      display: flex;
    }}

    .brand-sparkle-ping .ping-ring {{
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #fbbf24;
      opacity: 0.75;
      animation: brandPing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
    }}

    .brand-sparkle-ping .ping-dot {{
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #f59e0b;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.8);
    }}

    @keyframes brandPing {{
      75%, 100% {{
        transform: scale(2.2);
        opacity: 0;
      }}
    }}

    .brand-text-col {{
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }}

    .brand-title {{
      font-family: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }}

    .brand-title .accent {{
      color: #f59e0b;
    }}

    .brand-subtitle {{
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(251, 191, 36, 0.85);
      margin-top: 1px;
    }}

    .brand-stage-badge {{
      background: #1f2937;
      border: 1px solid #374151;
      color: #fbbf24;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
      padding: 4px 12px;
      border-radius: 999px;
      white-space: nowrap;
    }}

    @media (max-width: 768px) {{
      .brand-subtitle {{
        display: none;
      }}
      .brand-stage-badge {{
        font-size: 10px;
        padding: 3px 8px;
      }}
    }}

    .toolbar-actions {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .btn {{
      background: #1f2937;
      color: #e5e7eb;
      border: 1px solid #374151;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}

    .btn:hover {{
      background: #374151;
      color: #fff;
    }}

    .btn-toggle-notes {{
      background: #f59e0b;
      color: #000;
      border-color: #d97706;
    }}

    .btn-toggle-notes:hover {{
      background: #fbbf24;
      color: #000;
    }}

    /* Main Presentation Stage (16:9 Aspect Ratio) */
    .stage-wrapper {{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 24px;
      position: relative;
      min-height: 0;
    }}

    .slide-viewport {{
      width: 100%;
      max-width: 1400px;
      aspect-ratio: 16 / 9;
      max-height: calc(100vh - 74px);
      background: #1e293b;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      position: relative;
      border: 2px solid #334155;
      display: flex;
      flex-direction: column;
    }}

    :fullscreen .stage-wrapper,
    :-webkit-full-screen .stage-wrapper {{
      padding: 0;
      height: 100vh;
      width: 100vw;
    }}

    :fullscreen .slide-viewport,
    :-webkit-full-screen .slide-viewport {{
      max-width: min(100vw, calc(100vh * 16 / 9));
      max-height: 100vh;
      width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }}

    .slide-canvas {{
      flex: 1;
      position: relative;
      overflow: hidden;
    }}

    .slide {{
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px 48px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    }}

    .slide.active {{
      display: flex;
    }}

    /* Slide Header */
    .slide-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .badge-session {{
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
      font-weight: 800;
      font-size: 13px;
      padding: 6px 14px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .badge-time {{
      color: #94a3b8;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    /* Slide Content Typography */
    .slide-title {{
      font-family: 'Fredoka', cursive;
      font-size: 34px;
      color: #ffffff;
      line-height: 1.2;
      margin-top: 8px;
    }}

    .slide-title span {{
      color: #fbbf24;
    }}

    .slide-body {{
      flex: 1;
      display: flex;
      align-items: center;
      gap: 36px;
      margin: 18px 0;
    }}

    .text-column {{
      flex: 1.2;
    }}

    .visual-column {{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }}

    .hero-img {{
      width: 100%;
      height: 100%;
      max-height: 380px;
      object-fit: cover;
      border-radius: 16px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
      border: 3px solid rgba(251, 191, 36, 0.4);
    }}

    .concept-card {{
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 16px;
      margin-top: 10px;
    }}

    .slide .slide-footer {{
      display: none !important;
    }}

    /* Bottom Controller & Navigation */
    .slide-footer {{
      background: #0f172a;
      border-top: 1px solid #1e293b;
      padding: 14px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 20;
    }}

    .footer-left {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .slide-progress-dots {{
      display: flex;
      gap: 8px;
      align-items: center;
    }}

    .slide-progress-dots .dot {{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #374151;
      cursor: pointer;
      transition: all 0.2s;
    }}

    .slide-progress-dots .dot:hover {{
      background: #9ca3af;
    }}

    .slide-progress-dots .dot.active {{
      background: #f59e0b;
      width: 24px;
      border-radius: 4px;
    }}

    .slide-counter {{
      color: #94a3b8;
      font-size: 13px;
      font-weight: 700;
    }}

    .footer-controls {{
      display: flex;
      gap: 12px;
    }}

    .btn-nav {{
      background: #1f2937;
      color: #e5e7eb;
      border: 1px solid #374151;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}

    .btn-nav:hover:not(:disabled) {{
      background: #374151;
      color: #ffffff;
      border-color: #4b5563;
    }}

    .btn-nav:disabled {{
      opacity: 0.4;
      cursor: not-allowed;
    }}

    .btn-nav.primary {{
      background: #d97706;
      border-color: #b45309;
      color: #ffffff;
    }}

    .btn-nav.primary:hover:not(:disabled) {{
      background: #f59e0b;
      color: #000000;
    }}

    .btn-nav-sesi {{
      background: #1f2937;
      color: #d1d5db;
      border: 1px solid #374151;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}
    .btn-nav-sesi:hover {{
      background: #374151;
      color: #ffffff;
      border-color: #4b5563;
    }}

    /* Teacher Speaker Notes Drawer */
    .teacher-notes-panel {{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #090d16;
      border-top: 3px solid #f59e0b;
      padding: 16px 28px;
      box-shadow: 0 -15px 30px rgba(0,0,0,0.6);
      transform: translateY(100%);
      transition: transform 0.3s ease;
      z-index: 200;
      max-height: 40vh;
      overflow-y: auto;
    }}

    .teacher-notes-panel.open {{
      transform: translateY(0);
    }}

    .notes-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }}

    .notes-title {{
      color: #fbbf24;
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .notes-close {{
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 18px;
      cursor: pointer;
    }}

    .notes-content {{
      font-size: 13.5px;
      line-height: 1.55;
      color: #e2e8f0;
    }}

    .notes-script {{
      background: rgba(245, 158, 11, 0.08);
      border-left: 3px solid #f59e0b;
      padding: 8px 12px;
      margin-top: 6px;
      border-radius: 0 8px 8px 0;
      font-style: italic;
    }}
  </style>
</head>
<body>

  <!-- Top Toolbar -->
  <div class="top-toolbar">
    <div class="brand-tag">
      <a href="/" class="brand-link" title="Kembali ke Beranda Beekoding">
        <div class="brand-logo-wrap">
          <div class="brand-logo-box">
            <div class="brand-logo-inner">
              <img src="/beekoding-logo.png" alt="Beekoding Logo" class="brand-logo-img" />
            </div>
          </div>
          <span class="brand-sparkle-ping">
            <span class="ping-ring"></span>
            <span class="ping-dot"></span>
          </span>
        </div>
        <div class="brand-text-col">
          <span class="brand-title">Bee<span class="accent">koding</span></span>
          <span class="brand-subtitle">Platform Edukasi Koding & AI</span>
        </div>
      </a>
      <span class="brand-stage-badge">STAGE 2: SESI {num_str}</span>
    </div>

    <div class="toolbar-actions">
      {prev_btn_html}
      {next_btn_html}
      <button class="btn btn-toggle-notes" onclick="toggleNotes()">
        📋 Catatan Guru (N)
      </button>
      <button class="btn" onclick="toggleFullscreen()">
        ⛶ Layar Penuh (F)
      </button>
    </div>
  </div>

  <!-- Stage Presentation -->
  <div class="stage-wrapper">
    <div class="slide-viewport">
      <div class="slide-canvas">

{all_slides_markup}

      </div> <!-- /.slide-canvas -->

      <!-- Slide Footer Bar -->
      <footer class="slide-footer">
        <div class="footer-left">
          <div class="slide-progress-dots" id="progressDots"></div>
          <span class="slide-counter" id="slideCounter">Slide 1 / 10</span>
        </div>
        <div class="footer-controls">
          <button class="btn-nav" id="prevBtn" disabled>◀ Sebelumnya</button>
          <button class="btn-nav primary" id="nextBtn">Selanjutnya ▶</button>
        </div>
      </footer>
    </div>
  </div>

  <!-- Teacher / Speaker Notes Bottom Panel (Toggled via 'N' or Button) -->
  <div class="teacher-notes-panel" id="notesPanel">
    <div class="notes-header">
      <div class="notes-title">
        📝 CATATAN INSTRUKTUR / GURU &bull; <span id="notesTime" style="color:#e2e8f0; font-weight:600;"></span>
      </div>
      <button class="notes-close" onclick="toggleNotes()">✕</button>
    </div>
    <div class="notes-content" id="notesContent">
      <!-- Injected dynamically via JS based on current slide -->
    </div>
  </div>

  <script>
    // Presenter Notes Database for Session {num_str}
    const teacherNotesData = {notes_json};

    let currentSlide = 1;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressDots = document.getElementById('progressDots');
    const notesPanel = document.getElementById('notesPanel');

    // Create progress dots
    for (let i = 1; i <= totalSlides; i++) {{
      const dot = document.createElement('div');
      dot.className = `dot ${{i === 1 ? 'active' : ''}}`;
      dot.addEventListener('click', () => goToSlide(i));
      progressDots.appendChild(dot);
    }}

    const dots = document.querySelectorAll('.dot');

    function updateSlide() {{
      slides.forEach((s, idx) => {{
        s.classList.toggle('active', idx + 1 === currentSlide);
      }});

      dots.forEach((dot, idx) => {{
        dot.classList.toggle('active', idx + 1 === currentSlide);
      }});

      if (slideCounter) {{
        slideCounter.textContent = `Slide ${{currentSlide}} / ${{totalSlides}}`;
      }}
      if (prevBtn) prevBtn.disabled = currentSlide === 1;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

      // Update Teacher Notes
      const note = teacherNotesData[currentSlide - 1];
      if (note) {{
        const timeEl = document.getElementById('notesTime');
        if (timeEl) timeEl.innerText = `${{note.time}}`;
        const contentEl = document.getElementById('notesContent');
        if (contentEl) {{
          contentEl.innerHTML = `
            <h4 style="color:#fbbf24; font-size:14px; margin-bottom:4px;">${{note.title}}</h4>
            <p><strong>🎯 Panduan Aktivitas Guru:</strong> ${{note.instructions}}</p>
            <div class="notes-script">
              <strong>🗣️ Contoh Script Kata-Kata Guru:</strong><br>
              "${{note.script}}"
            </div>
          `;
        }}
      }}
    }}

    function goToSlide(n) {{
      currentSlide = Math.max(1, Math.min(totalSlides, n));
      updateSlide();
    }}

    function nextSlide() {{ goToSlide(currentSlide + 1); }}
    function prevSlide() {{ goToSlide(currentSlide - 1); }}

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    function toggleNotes() {{
      if (notesPanel) notesPanel.classList.toggle('open');
    }}

    function toggleFullscreen() {{
      if (!document.fullscreenElement) {{
        document.documentElement.requestFullscreen().catch(() => {{}});
      }} else {{
        if (document.exitFullscreen) {{
          document.exitFullscreen().catch(() => {{}});
        }}
      }}
    }}

    function triggerConfetti() {{
      if (typeof confetti === 'function') {{
        confetti({{
          particleCount: 100,
          spread: 70,
          origin: {{ y: 0.6 }}
        }});
      }}
    }}

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {{
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {{
        goToSlide(currentSlide + 1);
      }} else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {{
        goToSlide(currentSlide - 1);
      }} else if (e.key === 'n' || e.key === 'N') {{
        toggleNotes();
      }} else if (e.key === 'f' || e.key === 'F') {{
        toggleFullscreen();
      }}
    }});

    // Initialize
    updateSlide();
  </script>
</body>
</html>
"""
    return html_content

print("Template builder loaded")
