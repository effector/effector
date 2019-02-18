import {presets} from './stylePresets';

const CLEAR_CONSOLE = true;
const PRINT_IN_GROUP = false;

export function printLogs(logs) {
  PRINT_IN_GROUP && console.group('runtime');
  CLEAR_CONSOLE && console.clear();

  for (const {method, args} of logs) {
    const styleArgs = [];
    if (method in presets) {
      styleArgs.push(
        '%c%s',
        presets[method],
        ` ${method.toLocaleUpperCase()} `,
      );
    }
    const resultArgs = styleArgs.concat(args);
    switch (method) {
      case 'log':
      case 'warn':
        console.log(...resultArgs);
        break;
      default:
        console[method].apply(console, resultArgs);
        break;
    }
  }
  PRINT_IN_GROUP && console.groupEnd('runtime');
}
