
/**
 * @library laser.js
 * @author CandidBlend, LLC <hi@candidblend.la>
 * @description Laser-precision animation sequencing and chaining
 * with granular controls on a strong Event based architecture.
 * @license MIT
 */

(function() {

  'use strict';

  /**
   * @method Laser
   * @description constructor fn
   */

  var Laser = window.Laser = function Laser(params) {
    this.cache = {};
    this.listeners = {};
    this.animations = [];
    return _.extend(this, params);
  };

  /**
   * @private _isTransition
   * @description determine whether jQuery transit is available
   * @return {Boolean} availability
   */

  function _isTransition(alias, easing) {
    return (typeof(jQuery().transition) === 'function') ? true : false;
  }

  /**
   * @private _isValidEasing
   * @description invalid easing method aliases bork .animate/.transition
   * check that the alias exists in the dictionary
   * @param {String} ea easing alias
   * @return {Boolean} exists or doesn't
   */

  function _isValidEasing(alias) {
    if (_isTransition() === true) {
      // css3 easing cubic-bezier strings
      return ($.cssEase[alias] !== undefined) ? true : false;
    } else if (_isTransition() === false) {
      // standard easing fns
      return ($.easing[alias] !== undefined) ? true : false;
    }
  }

  /**
   * @description extend our constructor protoype with public methods
   */

  _.extend(Laser.prototype, {

    /**
     * @method get
     * @param {String} attr instance attribute
     * @param {Object} where set of key/values to match
     * @description instance attribute getter
     */

    get: function(attr, where) {
      if (where === undefined) {
        return this[attr];
      } else {
        return _.where(this[attr], where);
      }
    },

    /**
     * @method set
     * @param {String} attr instance attribute
     * @param {Object} where set of key/values to match
     * @param {Object} params set of key/values to set
     * @description instance attribute getter
     */

    set: function(attr, where, params) {
      var item = this.get(attr, where);
      if (item === undefined) {
        return undefined;
      } else {
        _.forEach(params, function(val, key) {
          result[key] = val;
        }, ctx);
        return obj;
      }
    },

    /**
     * @method getCache
     * @param {String} s css selector
     * @description gets cached jQuery element
     * @return {Function} jQuery wrapped element
     */

    getCache: function(s) {
      return this.cache[s];
    },

    /**
     * @method setCache
     * @param {String} s css selector
     * @description first checks for cached jQuery element by selector,
     * otherwise caches reference to the jQuery element
     * @return {Function} jQuery wrapped element
     */

    setCache: function(s) {
      this.cache[s] = this.getCache(s) || $(s);
      return this.cache[s];
    },

    /**
     * @method on
     * @param {String} n event name
     * @param {Function} fn trigger function to store
     * @description bind function to event name
     */

    on: function(n, fn) {
      this.listeners[n] = this.listeners[n] || [];
      this.listeners[n].push(fn);
    },

    /**
     * @method off
     * @param {String} n event name
     * @param {Function} fn trigger function to remove
     * @description remove event listener
     */

    off: function(n, fn) {
      if (this.listeners[n]) {
        this.listeners[n].splice(this.listeners[n].indexOf(fn), 1);
      }
    },

    /**
     * @method trigger
     * @param {String} n event name
     * @description trigger event listener
     */

    trigger: function(n) {
      if (this.listeners[n]) {
        var args = Array.prototype.slice.call(arguments, 1);
        _.forEach(this.listeners[n], function(v, i, obj) {
          v.apply(this, args);
        }, this);
      }
    },

    /**
     * @method id
     * @description generate a new id. method exists
     * in the case they we switch to a UUID in the future
     * @return {Number} animation's index
     */

    id: function() {
      return this.get('animations').length;
    },

    /**
     * @method _createAnimation
     * @description creates a new animation object
     * @param {Object} obj params
     * @return {Object} jQuery ready animation obj
     */

    createAnimation: function(obj) {
      // complete callback
      obj.options.complete = _.bind(function() {
        obj.state = 'COMPLETE';
        this.remaining--;
        if (this.remaining === 0) {
          this.finishedAt = new Date().getTime();
          var elapsed = this.finishedAt - this.startedAt;
          this.trigger('sequence:completed', elapsed);
        }
        this.trigger('animation:completed', obj.id);
        clearTimeout(obj.timeout);
      }, this);
      // fn call entry point
      obj.fn = _.bind(function() {
        // timeout reference for future 'when'
        obj.timeout = setTimeout(_.bind(function() {
          if (_isTransition() === true) {
            obj.$elem.transition(obj.params, obj.options.duration, obj.options.easing, obj.options.complete);
          } else {
            obj.$elem.animate(obj.params, obj.options);
          }
        }, this), obj.when);
        obj.state = 'ON_STACK';
      }, this);
      return obj;
    },

    /**
     * @method addEasing
     * @description add either a css3 cubic-bezier ease or a jquery easing fn
     */

    addEasing: function(alias, easing) {
      if (typeof(easing) === 'string') {
        $.cssEase[alias] = easing;
      } else {
        $.easing[alias] = easing;
      }
      return this;
    },

    /**
     * @method add
     * @description sets up params via arguments for a
     * new animation object to push onto the sequence stack
     * @param {String} s css selector for element to animate
     * @param {Object} p jQuery standard animation parameters
     * @param {Object} o jQuery standard animation options,
     * excluding the 'when' attribute
     */

    add: function(s, p, o) {
      var w, i = this.id(), e = this.setCache(s);
      // get then remove 'when' from standard options
      w = o.when || 0;
      delete o.when;
      // defaults
      o.queue = false;
      o.easing = o.easing || 'easeOutExpo';
      if (!_isValidEasing(o.easing)) {
        throw new Error('Easing method not defined! - '+o.easing);
      }
      o.duration = o.duration || 500;
      // push new animation onto sequence
      this.animations.push(
        this.createAnimation({
          id       : i,
          when     : w,
          params   : p,
          options  : o,
          $elem    : e
        })
      );
      return this;
    },

    /**
     * @method play
     * @description plays animation sequence
     */
  
    play: function() {
      var stack = this.get('animations');
      this.startedAt = new Date().getTime();
      this.remaining = stack.length;
      this.trigger('sequence:started', stack.length);
      _.map(stack, function(val, index) {
        stack[index].fn.call(this);
      }, this);
      return this;
    },

    /**
     * @method stop
     * @param {Number} when time in milliseconds through sequence to stop at
     * @description clear all active animations, and stop currents
     */

    stop: function(when) {
      var timeout = setTimeout(_.bind(function() {
        clearTimeout(timeout);
        _.map(this.get('animations', { state : 'ON_STACK' }), function(item) {
          clearTimeout(item.timeout);
          item.$elem.stop(true, false);
          item.state = 'STOPPED';
          this.trigger('animation:stopped', item.id);
        }, this);
      }, this), when || 0);
      return this;
    }

  });
  
}());

/* EOF */