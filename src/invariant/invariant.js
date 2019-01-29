//@noflow
/* eslint-disable */
import {__DEV__, __DEBUG__} from 'effector/flags'

var invariant = function(condition) {
  if (!condition) {
    var error = new Error(
      'Minified exception occurred; use the non-minified dev environment ' +
      'for the full error message and additional helpful warnings.'
    );
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

if (__DEV__) {
  invariant = function(condition, format, a, b, c, d, e, f) {
    if (__DEBUG__) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
    if (!condition) {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      var error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  }
}

export default invariant
