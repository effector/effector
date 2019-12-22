//@flow

import type {Methods} from './methods'

export type Message = {|
  method: Methods,
  data?: any[],
|}

export type MessageProps = {|
  log: Message,
|}

export type Theme = {|
  variant: Variants,
  styles: Styles,
|}

export type Context = {|
  ...Theme,
  method: Methods,
|}

export type Styles = {
  // Log colors
  // LOG_ICON => CSS background-image property
  LOG_COLOR?: string,
  LOG_ICON?: string,
  LOG_BACKGROUND?: string,
  LOG_BORDER?: string,

  LOG_INFO_COLOR?: string,
  LOG_INFO_ICON?: string,
  LOG_INFO_BACKGROUND?: string,
  LOG_INFO_BORDER?: string,

  LOG_COMMAND_COLOR?: string,
  LOG_COMMAND_ICON?: string,
  LOG_COMMAND_BACKGROUND?: string,
  LOG_COMMAND_BORDER?: string,

  LOG_RESULT_COLOR?: string,
  LOG_RESULT_ICON?: string,
  LOG_RESULT_BACKGROUND?: string,
  LOG_RESULT_BORDER?: string,

  LOG_WARN_COLOR?: string,
  LOG_WARN_ICON?: string,
  LOG_WARN_BACKGROUND?: string,
  LOG_WARN_BORDER?: string,

  LOG_ERROR_COLOR?: string,
  LOG_ERROR_ICON?: string,
  LOG_ERROR_BACKGROUND?: string,
  LOG_ERROR_BORDER?: string,

  // Fonts
  BASE_FONT_FAMILY?: any,
  BASE_FONT_SIZE?: any,
  BASE_LINE_HEIGHT?: any,

  // react-inspector
  BASE_BACKGROUND_COLOR?: any,
  BASE_COLOR?: any,

  OBJECT_NAME_COLOR?: any,
  OBJECT_VALUE_NULL_COLOR?: any,
  OBJECT_VALUE_UNDEFINED_COLOR?: any,
  OBJECT_VALUE_REGEXP_COLOR?: any,
  OBJECT_VALUE_STRING_COLOR?: any,
  OBJECT_VALUE_SYMBOL_COLOR?: any,
  OBJECT_VALUE_NUMBER_COLOR?: any,
  OBJECT_VALUE_BOOLEAN_COLOR?: any,
  OBJECT_VALUE_FUNCTION_KEYWORD_COLOR?: any,

  HTML_TAG_COLOR?: any,
  HTML_TAGNAME_COLOR?: any,
  HTML_TAGNAME_TEXT_TRANSFORM?: any,
  HTML_ATTRIBUTE_NAME_COLOR?: any,
  HTML_ATTRIBUTE_VALUE_COLOR?: any,
  HTML_COMMENT_COLOR?: any,
  HTML_DOCTYPE_COLOR?: any,

  ARROW_COLOR?: any,
  ARROW_MARGIN_RIGHT?: any,
  ARROW_FONT_SIZE?: any,

  TREENODE_FONT_FAMILY?: any,
  TREENODE_FONT_SIZE?: any,
  TREENODE_LINE_HEIGHT?: any,
  TREENODE_PADDING_LEFT?: any,

  TABLE_BORDER_COLOR?: any,
  TABLE_TH_BACKGROUND_COLOR?: any,
  TABLE_TH_HOVER_COLOR?: any,
  TABLE_SORT_ICON_COLOR?: any,
  TABLE_DATA_BACKGROUND_IMAGE?: any,
  TABLE_DATA_BACKGROUND_SIZE?: any,

  [style: string]: any,
  ...
}

export type Variants = 'light' | 'dark'

export type Props = {|
  logs: Message[],
  variant?: Variants,
  styles?: Styles,
  filter?: Methods[],
|}
