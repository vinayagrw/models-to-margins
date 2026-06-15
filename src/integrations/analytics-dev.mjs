import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { extractGeo, parseUserAgent, sanitizeClient } from '../../functions/_shared/enrich.js';

const FILE = '.analytics/events.jsonl';
const memory = []; // fallback buffer if the file write fails

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8');
}

// In dev there is no Cloudflare cf object; synthesize a minimal request shape.
function devRequestShape(req) {
  return {
    cf: { timezone: '', httpProtocol: req.httpVersion ? `HTTP/${req.httpVersion}` : '' },
    headers: { get: (k) => req.headers[k.toLowerCase()] || '' }
  };
}

export default function analyticsDev() {
  return {
    name: 'analytics-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url || '';
          if (req.method === 'POST' && url.startsWith('/api/collect')) {
            try {
              const client = sanitizeClient(JSON.parse((await readBody(req)) || '{}'));
              const shaped = devRequestShape(req);
              const ua = req.headers['user-agent'] || '';
              const event = {
                id: randomUUID(), ts: Date.now(),
                session: client.session, visitCount: client.visitCount,
                page: client.page, geo: extractGeo(shaped),
                device: { ...client.device, ...parseUserAgent(ua) },
                fingerprint: client.fingerprint,
                net: { tls: '', httpProtocol: shaped.cf.httpProtocol },
                behavior: client.behavior, userAgent: ua
              };
              try {
                await mkdir('.analytics', { recursive: true });
                await appendFile(FILE, JSON.stringify(event) + '\n');
              } catch (err) {
                console.warn(`[analytics] dev file write failed, buffering in memory: ${err.message}`);
                memory.unshift(event);
              }
              res.statusCode = 202;
              res.setHeader('Content-Type', 'application/json');
              return res.end('{"ok":true}');
            } catch (err) {
              console.warn(`[analytics] dev collect error: ${err.message}`);
              res.statusCode = 202; return res.end('{"ok":false}');
            }
          }
          if (req.method === 'GET' && url.startsWith('/api/events')) {
            const token = new URL(url, 'http://localhost').searchParams.get('key');
            if (!process.env.INSIGHTS_TOKEN || token !== process.env.INSIGHTS_TOKEN) {
              res.statusCode = 404; return res.end('Not found');
            }
            let fileEvents = [];
            try {
              const text = await readFile(FILE, 'utf8');
              fileEvents = text.split('\n').filter(Boolean).map((l) => JSON.parse(l)).reverse();
            } catch { /* no file yet */ }
            const events = [...memory, ...fileEvents].slice(0, 5000);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ events, count: events.length }));
          }
          return next();
        });
      }
    }
  };
}
