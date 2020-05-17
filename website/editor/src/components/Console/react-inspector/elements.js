import {styled} from 'linaria/react'
import {Context} from '../index.h'

type Props = {
  theme: Context,
}

/**
 * Object root
 */
export const Root = styled.div`
  display: inline-block;
  word-break: break-all;

  &::after {
    content: ' ';
    display: inline-block;
  }

  & > li {
    background-color: transparent !important;
    display: inline-block;
  }

  & ol:empty {
    padding-left: 0 !important;
  }
`

/**
 * Table
 */
export const Table = styled.span`
  & > li {
    display: inline-block;
    margin-top: 5px;
  }
`

/**
 * HTML
 */
export const HTML = styled.span`
  display: inline-block;

  & div:hover {
    background-color: rgba(255, 220, 158, 0.05) !important;
    border-radius: 2px;
  }
`

/**
 * Object constructor
 */
export const Constructor = styled.span`
  & > span > span:nth-child(1) {
    opacity: 0.6;
  }
`
