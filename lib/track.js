// Generated by IcedCoffeeScript 1.6.3-g
(function() {
  var Track, constants, db, iced, log, __iced_k, __iced_k_noop;

  iced = require('iced-coffee-script/lib/coffee-script/iced').runtime;
  __iced_k = __iced_k_noop = function() {};

  db = require('./db').db;

  constants = require('./constants').constants;

  log = require('./log');

  exports.Track = Track = (function() {
    function Track(_arg) {
      this.uid = _arg.uid, this.local = _arg.local, this.remote = _arg.remote;
    }

    Track.prototype.load_local = function(cb) {
      var err, value, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      log.debug("+ getting local tracking info from DB");
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "src/track.iced",
          funcname: "Track.load_local"
        });
        db.get({
          type: constants.ids.local_track,
          key: _this.uid
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              err = arguments[0];
              return value = arguments[1];
            };
          })(),
          lineno: 15
        }));
        __iced_deferrals._fulfill();
      })(function() {
        _this.local = value;
        log.debug("- completed, with result: " + (!!value));
        return cb(err);
      });
    };

    Track.load = function(_arg, cb) {
      var err, remote, track, trackee, tracker, uid, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      tracker = _arg.tracker, trackee = _arg.trackee;
      log.debug("+ loading Tracking info w/ remote=" + (!!remote));
      uid = trackee.id;
      remote = tracker != null ? (_ref = tracker.sig_chain) != null ? _ref.get_track(uid) : void 0 : void 0;
      track = new Track({
        uid: uid,
        remote: remote
      });
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "src/track.iced",
          funcname: "Track.load"
        });
        track.load_local(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return err = arguments[0];
            };
          })(),
          lineno: 27
        }));
        __iced_deferrals._fulfill();
      })(function() {
        if (typeof err === "undefined" || err === null) {
          track = null;
        }
        log.debug("- loaded tracking info");
        return cb(err, track);
      });
    };

    return Track;

  })();

}).call(this);