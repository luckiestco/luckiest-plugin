# Inject the real Luckiest SVG paths into the showreel source. Run: python3 build.py
import re
wm=open('assets/logos/luckiest-wordmark.svg').read()
paths=''.join(re.findall(r'<path class="st[23]"[^>]*/>',wm))  # letters only; the coral i-dot is #idot
mark=open('assets/logos/luckiest-mark.svg').read()
glyph=''.join(re.findall(r'<path class="st[13]" d="[^"]*"/>',mark))
svg=lambda fill: f'<svg viewBox="6.5 4.5 12 13.5">{glyph.replace("class=\"st1\"","").replace("class=\"st3\"","")}</svg>'.replace('<path ',f'<path fill="{fill}" ')
src=open('../showreel/showreel.src.html').read()  # run from <run-dir>/composition
out=src.replace('%%WM_PATHS%%',re.sub(r' class="st[23]"','',paths)).replace('%%MARK_WHITE%%',svg('#fff')).replace('%%MARK_INK%%',svg('#0A0A0A'))
open('index.html','w').write(out); print('ok', len(paths), len(glyph))
