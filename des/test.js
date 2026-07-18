const assert = require('assert');
const DES = require('./app.js');

function encryptHex(plaintext, key) {
  return DES.runDes(DES.hexToBin(plaintext), DES.hexToBin(key), 'encrypt').outputHex;
}

function decryptHex(ciphertext, key) {
  return DES.runDes(DES.hexToBin(ciphertext), DES.hexToBin(key), 'decrypt').outputHex;
}

assert.strictEqual(encryptHex('A1B2C3D4E5F60718', '0F1571C947D9E859'), 'D1E4A966815BFC44');
assert.strictEqual(decryptHex('D1E4A966815BFC44', '0F1571C947D9E859'), 'A1B2C3D4E5F60718');

// Vektor DES klasik sebagai pemeriksaan silang.
assert.strictEqual(encryptHex('0123456789ABCDEF', '133457799BBCDFF1'), '85E813540F0AB405');
assert.strictEqual(decryptHex('85E813540F0AB405', '133457799BBCDFF1'), '0123456789ABCDEF');

console.log('Semua pengujian DES berhasil.');
