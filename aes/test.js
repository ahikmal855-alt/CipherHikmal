const assert = require('assert');
const AES128 = require('./aes.js');

function block(hex, label) {
  return AES128.hexToBlock(hex, label);
}

// Data contoh aplikasi (NIST SP 800-38A, blok pertama ECB).
const sampleKey = block('2b7e151628aed2a6abf7158809cf4f3c', 'key');
const samplePlaintext = block('6bc1bee22e409f96e93d7e117393172a', 'plaintext');
const sampleCiphertext = '3ad77bb40d7a3660a89ecaf32466ef97';
assert.strictEqual(AES128.encryptBlockTrace(samplePlaintext, sampleKey).outputHex, sampleCiphertext);
assert.strictEqual(AES128.decryptBlockTrace(block(sampleCiphertext, 'ciphertext'), sampleKey).outputHex, '6bc1bee22e409f96e93d7e117393172a');

// Vektor pemeriksaan silang FIPS-197.
const fipsKey = block('000102030405060708090a0b0c0d0e0f', 'key');
const fipsPlaintext = block('00112233445566778899aabbccddeeff', 'plaintext');
assert.strictEqual(AES128.encryptBlockTrace(fipsPlaintext, fipsKey).outputHex, '69c4e0d86a7b0430d8cdb78070b4c55a');
assert.strictEqual(AES128.gfMul(0x57, 0x13), 0xfe);
assert.strictEqual(AES128.keyExpansion(fipsKey).words.length, 44);

for (let i = 0; i < 32; i += 1) {
  const data = Array.from({ length: 16 }, (_, j) => (i * 17 + j * 29) & 0xff);
  const key = Array.from({ length: 16 }, (_, j) => (i * 31 + j * 7) & 0xff);
  assert.deepStrictEqual(AES128.decryptBlock(AES128.encryptBlock(data, key), key), data);
}

console.log('Semua pengujian AES-128 berhasil.');
