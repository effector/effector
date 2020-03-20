import {styled} from 'linaria/react'


export const IconButton = styled.abbr`
  display: inline-block;
  background: ${props => props.icon};
  background-size: contain;
  background-repeat: no-repeat;
  width: ${props => props.size || '22px'};
  height: ${props => props.size || '22px'};
  padding: 2px 5px;
  margin: 0 4px;
  cursor: pointer;
  :hover {
    opacity: .75;
  }
`
