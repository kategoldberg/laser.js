
/**
 * @description basic example of laser.js capabilities/usage
 */

$(function() {

  // initialize new Laser instance
  var boxDemoSequence = new Laser();
  
  // animation completed
  boxDemoSequence.on('animation:completed', function(id) {
    console.log('> animation completed with id: %s', id);
  });

  // sequence started playing
  boxDemoSequence.on('sequence:started', function(count) {
    console.log('> sequence started with (%s) animations', count);
  });

  // sequence completed
  boxDemoSequence.on('sequence:completed', function(elapsed) {
    console.log('> sequence completed in: %s milliseconds', elapsed);
  });
  
  // the 'when' param defaults to 0
  boxDemoSequence
    .add('#box-1', { left : 100, top : 160 }, { duration : 250 })
    .add('#box-2', { left : 280, top : 160 }, { duration : 750 })
    .add('#box-3', { left : 460, top : 160 }, { duration : 500 })

    .add('#box-1', { scale : 1.5 }, { duration : 500, easing : 'easeOutBack', when : 750 })
    .add('#box-2', { scale : 2.0 }, { duration : 500, easing : 'easeOutBack', when : 750 })
    .add('#box-3', { scale : 2.5 }, { duration : 500, easing : 'easeOutBack', when : 750 })

    .add('#box-1', { scale : 1 }, { duration : 500, easing : 'easeInBack', when : 1250 })
    .add('#box-2', { scale : 1 }, { duration : 500, easing : 'easeInBack', when : 1250 })
    .add('#box-3', { scale : 1 }, { duration : 500, easing : 'easeInBack', when : 1250 })

    .add('#box-1', { left : 0, width : 30, height : 30 }, { duration : 1000, when : 2500 })
    .add('#box-2', { left : 40, width : 60, height : 60 }, { duration : 1000, when : 2500 })
    .add('#box-3', { left : 110, width : 90, height : 90 }, { duration : 1000, when : 2500 })

    .add('#box-1', { top : 0, width : 40, height : 40 }, { duration : 500, when : 3700 })
    .add('#box-2', { top : 0, left : 50, width : 40, height : 40 }, { duration : 500, when : 3700 })
    .add('#box-3', { top : 0, left : 100, width : 40, height : 40 }, { duration : 500, when : 3700 })

    .add('#box-1', { opacity : 0.5 }, { duration : 100, when : 4500 })
    .add('#box-2', { opacity : 0.5 }, { duration : 100, when : 4700 })
    .add('#box-3', { opacity : 0.5 }, { duration : 100, when : 4900 })

    .add('#box-1', { opacity : 1 }, { duration : 100, when : 5100 })
    .add('#box-2', { opacity : 1 }, { duration : 100, when : 5300 })
    .add('#box-3', { opacity : 1 }, { duration : 100, when : 5500 });

    // play sequence
    boxDemoSequence.play();

});

/* EOF */