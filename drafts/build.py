import re,sys,os
P=os.path.dirname(os.path.abspath(__file__))
SRC=sys.argv[1] if len(sys.argv)>1 else 'src.html'
OUT=sys.argv[2] if len(sys.argv)>2 else 'where-ai-search-breaks.html'
TEST=sys.argv[3] if len(sys.argv)>3 else 'test.html'
src=open(P+'/'+SRC).read()
svg=open(os.path.expanduser('~/.claude/skills/presales-meeting-prep/assets/iso-tile-icons.svg')).read()
used=set(re.findall(r'"(i-[a-z0-9-]+)"',src))|set(re.findall(r'#(i-[a-z0-9-]+)',src))
defs=re.search(r'<defs>.*?</defs>',svg,re.S).group(0)
syms=[m.group(0) for m in re.finditer(r'<symbol id="([^"]+)".*?</symbol>',svg,re.S) if m.group(1) in used]
missing=used-set(re.findall(r'<symbol id="([^"]+)"',svg))
sprite='<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">'+defs+''.join(syms)+'</svg>'
out=src.replace('<!--SPRITE-->',sprite)
open(P+'/'+OUT,'w').write(out)
test='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>'+out+'</body></html>'
open(P+'/'+TEST,'w').write(test)
print('symbols',len(syms),'missing',missing,'bytes',len(out))
