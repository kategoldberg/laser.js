
/**
 * @library kale.js
 * @author Edward Hotchkiss <edward@candidblend.la>
 * @description kale, it's just reliable. simple client-side testing framework.
 * @license MIT
 */

(function() {

  'use strict';

  /**
   * @method Kale
   * @description test suite constructor
   */

  var Kale = window.Kale = function Kale(name) {
    this.name = name;
    this.done = 0;
    this.tests = [];
    this.report = {};
    this.totalTests = 0;
    this.MAX_TIMEOUT = 500;
    return this;
  };

  /**
   * @prototype methods for `Kale`
   */

  Kale.prototype = {

    /**
     * @method inject
     * @description inject a resource into the DOM
     * @param {String} src valid resource source location
     */

    inject: function(src) {
      var script;
      if (/\.js/.test(src)) {
        /* ----- */
      } else {
        throw new Error('Invalid file type: "'+src+'"');
      }
    },

    /**
     * @method setup
     * @description inject resources w/ a pre-test fn
     * @optional {Array} resources list of resources to inject
     * @param {Function} pre-test fn
     */

    setup: function(resources, fn) {
      _.forEach(resources, function(src, index) {
        this.inject(src);
      }, this);
      fn.call(this);
      return this;
    },

    /**
     * @method addTest
     * @description add a new Test instance to the suite
     * @param {String} name test expectations
     * @param {Function} fn test function
     */

    addTest: function(name, fn) {
      this.tests.push(new Test(name, fn));
      this.totalTests++;
      return this;
    },

    /**
     * @method tearDown
     * @description destroy injected resources w/ a post-test fn
     * @param {Boolean} reset set DOM state to initial setup
     * @param {Function} post-test fn
     */

    tearDown: function(reset, fn) {
      fn.call(this);
      return this;
    },

    /**
     * @method reporter
     * @description displays report
     */

    reporter: function(test) {
      var i = 0;
      this.report.passed = 0;
      this.report.failed = 0;
      _.forEach(this.tests, function(test, index) {
        this.report[test.name] = test.passed;
        // note errors
        if (!test.passed) {
          this.report.failed++;
        } else {
          this.report.passed++;
        }
        i++;
      }, this);
      console.log('[%d] tests PASSED', this.report.passed);
      console.log('[%d] tests FAILED', this.report.failed);
      if (this.report.failed !== 0) {
        throw new Error('TEST SUITE FAILED: '+this.report.failed+'/'+i);
      }
    },

    /**
     * @method run
     * @description execute tests in suite
     */

    run: function() {
      var test;
      _.forEach(this.tests, function(test, i) {
        if (test.run().passed === undefined) {
          // track timeouts
        }
      }, this);
      if (this.done === this.tests.length) {
        this.reporter();
      } else {
        setTimeout(_.bind(function() {
          this.reporter();
        }, this), this.MAX_TIMEOUT);
      }
    }
  };

  /**
   * @class Test
   * @description creates a Test instance
   * @param {String} name test expectations
   * @param {Function} fn test function
   */

  var Test = function(name, fn) {
    this.fn = fn;
    this.name = name;
  };

  /**
   * @prototype methods for `Test`
   */

  Test.prototype = {

    /**
     * @metho assertTrue
     * @description tests if a a value is true
     */

    assertTrue: function(val) {
      if (val === false) {
        this.fail();
      } else {
        this.ok();
      }
    },

    /**
     * @metho assertEqual
     * @description tests if actual result equals expected
     */

    assertEqual: function (expected, actual) {
      if (expected !== actual) {
        this.fail();
      } else {
        this.ok();
      }
    },

    /**
     * @method assertInDOM
     * @param {String} selector jquery selector
     * @description tests if elem exists in DOM
     */

    assertInDOM: function(selector) {
      var $elem = $(selector);
      if ($elem.length === 1) {
        this.ok();
      } else {
        this.fail();
      }
    },

    /**
     * @method assertNotInDOM
     * @param {String} selector jquery selector
     * @description tests if elem DOES NOT exists in DOM
     */

    assertNotInDOM: function(selector) {
      var $elem = $(selector);
      if ($elem.length === 1) {
        this.fail();
      } else {
        this.ok();
      }
    },

    /**
     * @metho ok
     * @description notes test as passed
     */

    ok: function() {
      this.passed = true;
    },

    /**
     * @metho ok
     * @description notes test as failed
     */

    fail: function() {
      this.passed = false;
    },

    /**
     * @metho run
     * @description runs individual test
     */

    run: function() {
      this.fn.call(this);
      return this;
    }

  };

}());

/* EOF */