//@flow

import {styled} from 'linaria/react'

export const Tooltip = styled.span`
  position: absolute;
  z-index: 100;
  top: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.15em 0.8em;
  border-radius: 0.25em;
  font-size: 0.8rem;
`

export const Arrow = styled.span`
  position: absolute;
  content: '';
  bottom: 100%;
  height: 0;
  width: 0;
  border: 0.5em solid transparent;
  pointer-events: none;
  border-bottom-color: rgba(0, 0, 0, 0.6);
  margin-left: 0.5em;
`

export const TryButton = styled.div`
  position: relative;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  padding: 1em 2em;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  & input {
    background: #f6f4f4;
    transition: all 250ms;
    width: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  &:hover input {
    width: 15vw;
    margin-right: 1em;
  }

  & ${Tooltip} {
    display: none;
    right: 1em;
    white-space: nowrap;
  }

  &:hover ${Tooltip} {
    display: block;
  }

  & ${Tooltip} ${Arrow} {
    right: 2.5em;
  }
`
