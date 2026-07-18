const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

function dummyElement() {
  return {
    value: '',
    textContent: '',
    innerHTML: '',
    classList: { add() {}, remove() {}, toggle() {}, contains() { return true; } },
    addEventListener() {},
    focus() {},
  };
}

const sandbox = {
  console,
  document: {
    getElementById() { return dummyElement(); },
    querySelector() { return { value: 'encrypt', checked: true }; },
    querySelectorAll() { return []; },
  },
};

vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(require.resolve('./script.js'), 'utf8'), sandbox);

function process(input, key, mode) {
  return vm.runInContext(`processSDES('${input}', '${key}', '${mode}').result`, sandbox);
}

assert.strictEqual(process('11010111', '1010000010', 'encrypt'), '10101000');
assert.strictEqual(process('10101000', '1010000010', 'decrypt'), '11010111');
assert.strictEqual(process('10111101', '1010010010', 'encrypt'), '01110000');
assert.strictEqual(process('01110000', '1010010010', 'decrypt'), '10111101');

console.log('Semua pengujian S-DES berhasil.');
