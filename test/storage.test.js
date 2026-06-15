import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MemoryStore, KvStore } from '../functions/_shared/storage.js';

test('MemoryStore stores and lists newest-first, capped', async () => {
  const m = new MemoryStore(3);
  await m.put({ id: 'a', ts: 1 });
  await m.put({ id: 'b', ts: 2 });
  await m.put({ id: 'c', ts: 3 });
  await m.put({ id: 'd', ts: 4 });
  const all = await m.list();
  assert.equal(all.length, 3);
  assert.equal(all[0].id, 'd'); // newest first
  assert.equal(all.some((e) => e.id === 'a'), false); // oldest evicted
});

test('KvStore falls back to memory + warns when KV.put throws', async () => {
  const warnings = [];
  const badKv = {
    put: async () => { throw new Error('kv down'); },
    list: async () => ({ keys: [] }),
    get: async () => null
  };
  const fallback = new MemoryStore(10);
  const store = new KvStore(badKv, fallback, (msg) => warnings.push(msg));
  await store.put({ id: 'x', ts: 1 });
  assert.equal(warnings.length, 1);
  const listed = await store.list();
  assert.equal(listed[0].id, 'x'); // served from memory fallback
});

test('KvStore writes to KV and lists from KV on success', async () => {
  const data = new Map();
  const goodKv = {
    put: async (k, v) => { data.set(k, v); },
    list: async () => ({ keys: [...data.keys()].map((name) => ({ name })) }),
    get: async (k) => data.get(k) || null
  };
  const store = new KvStore(goodKv, new MemoryStore(10), () => {});
  await store.put({ id: 'y', ts: 5 });
  const listed = await store.list();
  assert.equal(listed[0].id, 'y');
});
