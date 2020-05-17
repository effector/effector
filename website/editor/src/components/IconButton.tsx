import {styled} from 'linaria/react'


export const IconButton = styled.button`
  display: inline-block;
  background: ${props => props.icon};
  background-size: contain;
  background-repeat: no-repeat;
  width: ${props => props.size || '22px'};
  height: ${props => props.size || '22px'};
  padding: 0;
  margin: 0 4px;
  cursor: pointer;
  border: none;
  outline: none;
  :hover {
    opacity: .75;
  }
`
