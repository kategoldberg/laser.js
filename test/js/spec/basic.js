
/**
 * @description basic test coverage
 */

$(function() {

  new Kale('basic laser.js DOM related sync & async tests')

    .setup([ /* ----- */ ], function() {
      var $box = $('<div id="box"></div>')
        .css({
          top        : '50px',
          left       : '50px',
          width      : '50px',
          height     : '50px',
          border     : '1px solid #dddddd',
          position   : 'absolute',
          background : '#eeeeee'
        })
        .appendTo($('body'));
    })

    .addTest('#box should be present in the DOM', function() {
      this.assertInDOM('#box');
    })

    .addTest('#box should be present in the DOM, even after 100ms', function() {
      var _this = this;
      setTimeout(function() {
        _this.assertInDOM('#box');
      }, 100);
    })

    .addTest('#boxx should NOT be present in the DOM', function() {
      this.assertNotInDOM('#boxx');
    })

    .addTest('#boxx should be present in the DOM, even after 100ms', function() {
      var _this = this;
      setTimeout(function() {
        _this.assertNotInDOM('#boxx');
      }, 100);
    })

    .addTest('laser should be able to create new instances', function() {
      this.assertTrue(new Laser() instanceof Laser);
    })

    .addTest('#box should be animated to `left` `500px` after 300ms', function() {
      var basicSeq = new Laser();
      basicSeq.add('#box', { left : 500 }, { duration : 300, when : 0 });
      basicSeq.on('sequence:completed', _.bind(function() {
        this.assertEqual($('#box').css('left'), '500px');
      }, this));
      basicSeq.play();
    })

    // `true` flag means remove all .setup resources / reset the DOM to an emtpty state
    .tearDown(true, function() {
      /* ----- */
    })

    .run();

});

/* EOF */