/**
 * A processor file to be used in tests.
 *
 */
'use strict';

const { DelayedError } = require('../../dist/cjs/classes/delayed-error');
const delay = require('./delay');

module.exports = function (job, token) {
  if (job.attemptsMade == 1) {
    return delay(250)
      .then(() => {
        job.moveToDelayed(2500, token);
        return delay(500);
      })
      .then(() => {
        throw new DelayedError();
      });
  }
};
