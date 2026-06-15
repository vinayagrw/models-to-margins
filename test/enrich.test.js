import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseUserAgent, extractGeo, sanitizeClient } from '../functions/_shared/enrich.js';

test('parseUserAgent detects Chrome on Windows desktop', () => {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  const r = parseUserAgent(ua);
  assert.equal(r.browser, 'Chrome');
  assert.equal(r.browserVersion, '120');
  assert.equal(r.os, 'Windows');
  assert.equal(r.deviceType, 'desktop');
});

test('parseUserAgent detects Safari on iPhone as mobile', () => {
  const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
  const r = parseUserAgent(ua);
  assert.equal(r.browser, 'Safari');
  assert.equal(r.os, 'iOS');
  assert.equal(r.deviceType, 'mobile');
});

test('parseUserAgent handles empty UA without throwing', () => {
  const r = parseUserAgent('');
  assert.equal(r.browser, 'Unknown');
  assert.equal(r.deviceType, 'desktop');
});

test('extractGeo reads cf object and headers', () => {
  const req = {
    headers: new Map([['cf-connecting-ip', '203.0.113.5']]),
    cf: { country: 'GB', region: 'England', city: 'London', latitude: '51.5', longitude: '-0.1', postalCode: 'EC1', timezone: 'Europe/London', asn: 5089, asOrganization: 'Virgin', colo: 'LHR', tlsVersion: 'TLSv1.3', httpProtocol: 'HTTP/2' }
  };
  req.headers.get = (k) => new Map([['cf-connecting-ip', '203.0.113.5']]).get(k);
  const g = extractGeo(req);
  assert.equal(g.ip, '203.0.113.5');
  assert.equal(g.country, 'GB');
  assert.equal(g.city, 'London');
  assert.equal(g.isp, 'Virgin');
  assert.equal(g.colo, 'LHR');
});

test('sanitizeClient keeps only whitelisted fields and caps clicks', () => {
  const dirty = {
    page: { path: '/x', title: 't', referrer: 'r', url: 'u', landing: '/x', entry: true, utm: { source: 's' } },
    device: { browser: 'ignored-from-client', screen: '1920x1080', evil: 'drop-me' },
    fingerprint: { canvas: 'abc', webgl: 'def' },
    session: 'sess-1', visitCount: 2,
    behavior: { timeOnPage: 1234, clicks: new Array(500).fill({ href: '/a', text: 'a', ts: 1 }) },
    injected: 'nope'
  };
  const clean = sanitizeClient(dirty);
  assert.equal(clean.injected, undefined);
  assert.equal(clean.device.evil, undefined);
  assert.equal(clean.page.path, '/x');
  assert.ok(clean.behavior.clicks.length <= 100);
});
