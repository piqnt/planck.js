var expect = require('./testutil/expect');

var Pool = require('../lib/util/Pool');

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

    expect(a.created).be.ok;
    expect(a.busy).be.ok;
    expect(a.discarded).not.be.ok;

    pool.release(a);
    expect(a.busy).not.be.ok;
    expect(a.discarded).not.be.ok;

    pool.release(b);
    expect(b.discarded).be.ok;

  });
});
