
# laser.js

> Laser-precision animation sequencing with granular controls on a strong Event based architecture.

### Why?

**More Control:**

jQuery uses an animation queue by default. This is great if you're animating one or two items. If you have a very precise set of animations that you would like to create, modify, and call at an exact time in a sequence; this solves those problems.

### Usage ala [candidblend.github.io/laser.js](http://candidblend.github.io/laser.js)

```javascript

/**
 * @description basic example of laser.js capabilities/usage
 * @url http://candidblend.github.io/laser.js
 */

$(function() {

  // initialize new laser.js instance
  var seq = new Laser();

  // custom easing fn
  seq.addEasing('bounceOut', 'cubic-bezier(.33,1.66,.08,-1.71)');

  // on animation completed
  seq.on('animation:completed', function(id) {
    console.log('> animation completed with id: %s', id);
  });

  // on sequence start
  seq.on('sequence:started', function(total) {
    console.log('> sequence started with (%s) animations', total);
  });

  // on sequence complete
  seq.on('sequence:completed', function(elapsed) {
    console.log('> sequence completed in: %s milliseconds', elapsed);
  });

  // add to sequence, easing defaults to 'easeOutExpo'
  seq
    .add('#box-1', { top : 50,  left : 80 }, { duration : 1000, when : 0 })
    .add('#box-2', { top : 100, left : 80 }, { duration : 1000, when : 0 })
    .add('#box-3', { top : 150, left : 80 }, { duration : 1000, when : 0 })
    .add('#box-4', { top : 200, left : 80 }, { duration : 1000, when : 0 })
    .add('#box-5', { top : 250, left : 80 }, { duration : 1000, when : 0 })
    .add('#box-6', { top : 300, left : 80 }, { duration : 1000, when : 0 })

    .add('#box-1', { width : 40,  left : 0   }, { duration : 150,  when : 1250 })
    .add('#box-2', { width : 80,  left : 40  }, { duration : 300,  when : 1250 })
    .add('#box-3', { width : 120, left : 120 }, { duration : 450,  when : 1250 })
    .add('#box-4', { width : 160, left : 80  }, { duration : 600,  when : 1250 })
    .add('#box-5', { width : 200, left : 40  }, { duration : 750,  when : 1250 })
    .add('#box-6', { width : 240, left : 0   }, { duration : 1000, when : 1250 })

    .add('#box-1', { width : 40, left : 0   }, { duration : 1000, when : 2250 })
    .add('#box-2', { width : 40, left : 100 }, { duration : 750,  when : 2250 })
    .add('#box-3', { width : 40, left : 200 }, { duration : 600,  when : 2250 })
    .add('#box-4', { width : 40, left : 300 }, { duration : 450,  when : 2250 })
    .add('#box-5', { width : 40, left : 400 }, { duration : 300,  when : 2250 })
    .add('#box-6', { width : 40, left : 500 }, { duration : 150,  when : 2250 })

    .add('#box-1', { left : 275, top : 160 }, { duration : 250,  when : 3500 })
    .add('#box-2', { left : 275, top : 160 }, { duration : 500,  when : 3500 })
    .add('#box-3', { left : 275, top : 160 }, { duration : 750,  when : 3500 })
    .add('#box-4', { left : 275, top : 160 }, { duration : 1000, when : 3500 })
    .add('#box-5', { left : 275, top : 160 }, { duration : 1250, when : 3500 })
    .add('#box-6', { left : 275, top : 160 }, { duration : 1500, when : 3500 })

    .add('#box-1', { scale : 1.5 }, { duration : 250,  easing : 'bounceOut', when : 5000 })
    .add('#box-2', { scale : 3.0 }, { duration : 500,  easing : 'bounceOut', when : 5000 })
    .add('#box-3', { scale : 4.5 }, { duration : 750,  easing : 'bounceOut', when : 5000 })
    .add('#box-4', { scale : 6.0 }, { duration : 1000, easing : 'bounceOut', when : 5000 })
    .add('#box-5', { scale : 7.5 }, { duration : 1250, easing : 'bounceOut', when : 5000 })
    .add('#box-6', { scale : 8.0 }, { duration : 1500, easing : 'bounceOut', when : 5000 });

  // play sequence
  seq.play();

});

```

### Dependencies

**jQuery:**

Since `laser.js` is an extension of jQuery's .animate method, and is quite common in most projects, it's a dependency.

**Underscore.js/Lodash:**

Many use it, some don't. TODO: add non-polyfill version.

### Highly Recommended:

**jQuery Transit**

Speed, sexy - [jQuery Transit](http://ricostacruz.com/jquery.transit/). `jQuery Transit` extends jQuery .animate with CSS3 transitions (hardware acceleration = speed) where possible and many other features. Although not required, highly recommended.

### License (MIT)

Copyright (c) 2013, Edward Hotchkiss

