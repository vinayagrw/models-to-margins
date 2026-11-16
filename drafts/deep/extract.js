const fs=require('fs');
function arr(file){const t=fs.readFileSync(file,'utf8');const i=t.indexOf('const F=[');const j=t.indexOf('\n];',i);return eval(t.slice(i+8,j+3));}
const s=arr(process.argv[2]), f=arr(process.argv[3]);
fs.writeFileSync(process.argv[4],JSON.stringify({search:s,frontier:f},null,1));
console.log(s.length,f.length,Object.keys(s[0]).join(','),'|',Object.keys(f[0]).join(','));
