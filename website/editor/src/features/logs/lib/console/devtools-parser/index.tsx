import Linkify from 'linkifyjs/html'
import {formatWithSubstitutionString} from './format-message'

/**
 * Formats a console log message using the Devtools parser and returns HTML
 * @param args The arguments passed to the console method
 */
export function formatMessage(args: any[]): {html: string; args: any[]} {
  const formattedResult = document.createElement('span')

  const {unusedSubstitutions = []} = formatWithSubstitutionString(
    args[0],
    args.slice(1),
    formattedResult,
  )

  return {
    html: Linkify(
      formattedResult.outerHTML.replace(/(?:\r\n|\r|\n)/g, '<br />'),
    ),
    args: unusedSubstitutions,
  }
}
