"use strict";
import { assert } from 'chai';
import { quf } from '../unionFind.js';

describe("unionFind.js tests", function() {
  describe("tests quf(3)", function() {
    let n = 3
    let uf = quf(n);
    it('uf.getParent() shows initialized parent[0,1,2]', function() {
      let result = uf.getParent();
      assert.sameOrderedMembers(result, [0,1,2]);
    });
    it("validate(2) should not throw error", function(){
      assert.doesNotThrow(() => { uf.validate(2) }, Error);
    })
    it("validate(3) should throw error", function(){
      assert.throws(() => { uf.validate(3) }, Error, 'invalid p');
    })
    it("validate(-1) should throw error", function(){
      assert.throws(() => { uf.validate(-1) }, Error, 'invalid p');
    })
  })
});
