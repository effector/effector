//@flow

import {styled} from 'linaria/react'

export const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: hsl(213, 100%, 46%);
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 70ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover,
  &:focus {
    background: #0053ba;
  }

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: hsl(213, 50%, 45%);
    color: hsla(0, 0%, 100%, 0.9);
    cursor: not-allowed;
  }
`

export const SharedUrl = styled.input`
  border-radius: 2px;
  background: #fff;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  width: 100%;

  &[value=''] {
    visibility: hidden;
  }
`

export const ShareButton = styled(Button)`
  border-radius: 2px;
  padding: 0.5rem 1rem;
  border-width: 0;
  margin: 1rem;
  align-self: center;
`

export const ShareGroup = styled.div`
  width: calc(100% - 1.5rem * 2);
  display: flex;
  flex-wrap: wrap;
  grid-column: 3 / span 1;
  grid-row: 2 / span 3;
  @media (max-width: 699px) {
    grid-column: 1 / span 1;
    grid-row: 6 / span 4;
  }
`
