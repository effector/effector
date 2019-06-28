// @flow

import {styled} from 'linaria/react'

export const SettingsGroup = styled.div`
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

export const Label = styled.label`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: auto 1fr;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`

export const Section = styled.section`
  background-color: #fff;
  border-bottom: 15px solid #f7f7f7;

  & + & {
    border-top: 1px solid #ddd;
  }
`

export const Button = styled.button`
  --color-main: #e95801;
  display: inline-block;
  border: none;
  border-radius: 2px;
  border-width: 0;
  padding: 0.5rem 1rem;
  margin: 0;
  text-decoration: none;
  background: var(--color-main);
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
