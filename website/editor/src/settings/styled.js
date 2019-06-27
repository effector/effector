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
