const test = require('tape');

test('TitleComponent',(t) => {

  t.test('should return true if true', (assert) => {
    assert.equal(true, true);
    assert.equal(!false, false);
    assert.end();
  });

  t.test('should return false if false', (assert) => {
    assert.equal(false, false);
    assert.end();
  });

  t.end();
});

test('1 is truthy', (assert) => {
  assert.equal(1 == true, false);
  assert.end();
});
