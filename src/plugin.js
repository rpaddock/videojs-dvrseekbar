'use strict';
/**
 * @file plugin.js
 * @module dvrseekbarPlugin
 */
import videojs from 'video.js';
import DVRLiveControl from './components/dvr-live-control';

// Default options for the plugin.
const defaults = {
  startTime: 0,
  disableDVRslider: false
};

const VALID_OPTIONS = {
  startTime: 'number',
  disableDVRslider: 'boolean'
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function dvrseekbarPlugin
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const dvrseekbarPlugin = function(options) {

  // If explicity set options to false disable plugin:
  if (typeof(options) === 'boolean' && options === false ) {
    return;
  }

  if (!options || options === {}) {
    options = defaults;
  }

  // Check if options are valid:
  let props = Object.keys(options);
  for (let i = 0, len = props.length; i < len; i++) {
    let key = props[i];

    if (!VALID_OPTIONS.hasOwnProperty(key)) {
      console.warn('${key} option is not a valid property, ignored.');
      delete options[key];
    } else {

      if (typeof(options[key]) !== VALID_OPTIONS[key]) {
        console.warn('${key} option value must be ${VALID_OPTIONS[key]}, ignored.');
        delete options [key];
      }
    }
  }

  this.controlBar.removeChild('progressControl');
  this.controlBar.removeChild('timeDivider');
  this.controlBar.removeChild('durationDisplay');

  if (options.disableDVRslider) {
    return;
  }

  this.controlBar.liveDisplay.hide();
  this.controlBar.addChild('DVRLiveControl');
  const fullscreenToggle = this.controlBar.getChild('fullscreenToggle');
  const dvrLiveControl = this.controlBar.getChild('DVRLiveControl');
  this.controlBar.el().insertBefore(dvrLiveControl.el(), fullscreenToggle.el());
/*
  this.one('durationchange', (e) => {
    const IS_LIVE_STREAM = this.duration() > Infinity; //1e+300;

    if (IS_LIVE_STREAM) {
      this.controlBar.removeChild('progressControl');
      this.controlBar.removeChild('timeDivider');
      this.controlBar.removeChild('durationDisplay');

      this.controlBar.liveDisplay.addChild('DVRseekBar');
      this.controlBar.liveDisplay.show();
    } else {
      if(this.controlBar.liveDisplay.getChild('DVRseekBar') !== undefined) {
        this.controlBar.liveDisplay.removeChild('DVRseekBar');

        this.controlBar.addChild('timeDivider');
        this.controlBar.addChild('durationDisplay');
        this.controlBar.addChild('progressControl');
      }
    }
  });*/
};

// Include the version number.
dvrseekbarPlugin.VERSION = '__VERSION__';

// Register the plugin with video.js.
// Updated for video.js 6 - https://github.com/videojs/video.js/wiki/Video.js-6-Migration-Guide
const registerPlugin = videojs.registerPlugin || videojs.plugin;

registerPlugin('dvrseekbar', dvrseekbarPlugin);
export default dvrseekbarPlugin;
////////////////////////////////
