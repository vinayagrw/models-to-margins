// Storage backends for visitor events. KvStore is primary in production;
// MemoryStore is the universal fallback that never throws.

export class MemoryStore {
  constructor(cap = 1000) {
    this.cap = cap;
    this.events = []; // newest-first
  }
  async put(evt) {
    this.events.unshift(evt);
    if (this.events.length > this.cap) this.events.length = this.cap;
  }
  async list({ limit = 1000 } = {}) {
    return this.events.slice(0, limit);
  }
}

// Reverse-timestamp key so KV list (lexicographic) returns newest first.
function kvKey(evt) {
  const rev = (1e15 - Number(evt.ts || 0)).toString().padStart(16, '0');
  const rand = Math.random().toString(36).slice(2, 8);
  return `evt:${rev}:${rand}`;
}

export class KvStore {
  constructor(kv, fallback, warn = console.warn) {
    this.kv = kv;
    this.fallback = fallback;
    this.warn = warn;
  }
  async put(evt) {
    try {
      await this.kv.put(kvKey(evt), JSON.stringify(evt));
    } catch (err) {
      this.warn(`[analytics] KV write failed, buffering in memory: ${err.message}`);
      await this.fallback.put(evt);
    }
  }
  async list({ limit = 1000 } = {}) {
    try {
      const { keys } = await this.kv.list({ prefix: 'evt:', limit });
      const values = await Promise.all(keys.map((k) => this.kv.get(k.name)));
      const fromKv = values.filter(Boolean).map((v) => JSON.parse(v));
      const fromMem = await this.fallback.list({ limit });
      return [...fromMem, ...fromKv].slice(0, limit);
    } catch (err) {
      this.warn(`[analytics] KV list failed, serving memory only: ${err.message}`);
      return this.fallback.list({ limit });
    }
  }
}

// Module-level singleton so the in-memory buffer survives across requests
// within the same worker isolate.
const sharedMemory = new MemoryStore(1000);

export function selectStore(env) {
  if (env && env.ANALYTICS && typeof env.ANALYTICS.put === 'function') {
    return new KvStore(env.ANALYTICS, sharedMemory);
  }
  console.warn('[analytics] No KV binding found; using in-memory store only.');
  return sharedMemory;
}
