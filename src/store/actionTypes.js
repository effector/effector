//@flow

/* eslint-disable prefer-template */

export const INIT =
 '@@redux/INIT' +
 Math.random()
  .toString(36)
  .substring(7)
  .split('')
  .join('.')

export const REPLACE =
 '@@redux/REPLACE' +
 Math.random()
  .toString(36)
  .substring(7)
  .split('')
  .join('.')
