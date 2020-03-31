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
  background: #fff;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  width: 100%;
  border-bottom: 1px solid #ddd;

  &[value=''] {
    visibility: hidden;
  }
`

export const ShareButton = styled(Button)`
  border-radius: 2px;
  padding: 0.5rem 1rem;
  border-width: 0;
  margin: 1rem 0;
  margin-left: 1rem;
  white-space: nowrap;
  &:first-child {
    margin-left: 1rem;
  }
  &:last-child {
    margin-right: 1rem;
  }
`

export const ShareGroup = styled.div`
  background-color: #f7f7f7;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  grid-column: 3 / span 1;
  grid-row: 3 / span 2;

  @media (max-width: 699px) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 7;
  }
`

export const Label = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`
