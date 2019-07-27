// @flow

import {styled} from 'linaria/react'

export const SidebarHeader = styled.div`
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  @media (max-width: 699px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  @media (min-width: 700px) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }
`
