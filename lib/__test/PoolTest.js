var expect = require('chai').expect;

var Pool = require('../util/Pool');

describe('Pool', function() {
  it('Pool', function() {

    var pool = new Pool({
      create : function() {
        return {
          created : true,
          busy : false,
          discarded : false,
        };
      },
      allocate : function(obj) {
        obj.busy = true;
      },
      release : function(obj) {
        obj.busy = false;
      },
      discard : function(obj) {
        obj.discarded = true;
      },
      max : 1
    });

    var a = pool.allocate();
    var b = pool.allocate();

    expect(a.created).be.true;
    expect(a.busy).be.true;
    expect(a.discarded).be.false;

    pool.release(a);
    expect(a.busy).be.false;
    expect(a.discarded).be.false;

    pool.release(b);
    expect(b.discarded).be.true;

  });
});
