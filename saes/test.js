const assert = require('assert');

const SBOX = [0x9,0x4,0xA,0xB,0xD,0x1,0x8,0x5,0x6,0x2,0x0,0x3,0xC,0xE,0xF,0x7];
const INV_SBOX = [0xA,0x5,0x9,0xB,0x1,0x7,0x8,0xF,0x6,0x0,0x2,0x3,0xC,0x4,0xD,0xE];
const RCON1 = 0x80;
const RCON2 = 0x30;
const wordToState = w => [(w >>> 12) & 15, (w >>> 8) & 15, (w >>> 4) & 15, w & 15];
const stateToWord = s => (s[0] << 12) | (s[1] << 8) | (s[2] << 4) | s[3];
const xorState = (a, b) => a.map((v, i) => v ^ b[i]);
const shiftRows = s => [s[0], s[3], s[2], s[1]];
const substitute = (s, box) => s.map(v => box[v]);
function mul(a, b) { let p = 0; for (let i = 0; i < 4; i += 1) { if (b & 1) p ^= a; const carry = a & 8; a = (a << 1) & 15; if (carry) a ^= 3; b >>>= 1; } return p & 15; }
function mix(s, matrix) { const out = []; for (let c = 0; c < 2; c += 1) { const i = c * 2; out[i] = mul(matrix[0][0], s[i]) ^ mul(matrix[0][1], s[i + 1]); out[i + 1] = mul(matrix[1][0], s[i]) ^ mul(matrix[1][1], s[i + 1]); } return out; }
const rotNib = w => ((w & 15) << 4) | (w >>> 4);
const subByte = w => (SBOX[w >>> 4] << 4) | SBOX[w & 15];
function keys(key) { const w0 = key >>> 8; const w1 = key & 255; const w2 = w0 ^ subByte(rotNib(w1)) ^ RCON1; const w3 = w2 ^ w1; const w4 = w2 ^ subByte(rotNib(w3)) ^ RCON2; const w5 = w4 ^ w3; return [(w0 << 8) | w1, (w2 << 8) | w3, (w4 << 8) | w5]; }
function encrypt(plaintext, key) { const [k0, k1, k2] = keys(key).map(wordToState); let s = xorState(wordToState(plaintext), k0); s = substitute(s, SBOX); s = shiftRows(s); s = mix(s, [[1,4],[4,1]]); s = xorState(s, k1); s = substitute(s, SBOX); s = shiftRows(s); s = xorState(s, k2); return stateToWord(s); }
function decrypt(ciphertext, key) { const [k0, k1, k2] = keys(key).map(wordToState); let s = xorState(wordToState(ciphertext), k2); s = shiftRows(s); s = substitute(s, INV_SBOX); s = xorState(s, k1); s = mix(s, [[9,2],[2,9]]); s = shiftRows(s); s = substitute(s, INV_SBOX); s = xorState(s, k0); return stateToWord(s); }

const cases = [
  [0xD728, 0x4AF5, 0x24EC],
  [0x1234, 0x5678, 0x0AEB],
  [0x6F6B, 0xA73B, 0x0738],
];
for (const [plaintext, key, ciphertext] of cases) {
  assert.strictEqual(encrypt(plaintext, key), ciphertext);
  assert.strictEqual(decrypt(ciphertext, key), plaintext);
}
for (let i = 0; i < 256; i += 1) {
  const plaintext = (i * 257) & 0xffff;
  const key = (i * 4099) & 0xffff;
  assert.strictEqual(decrypt(encrypt(plaintext, key), key), plaintext);
}

console.log('Semua pengujian S-AES berhasil.');
