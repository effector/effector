//@flow

import * as React from 'react'
import {styled} from 'linaria/react'
import {codeSetCursor} from '../domain'

const Outline = styled('div')`
  grid-column: 1 / span 1;
  grid-row: 11 / span 1;
  background-color: #fff;
  font-size: 0.8rem;
  
  @media (min-width: 700px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 5;
  }
`

const Header = styled('div')`
  padding: 3px 5px;
  background: #f7f7f7;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`

const Section = styled('section')`
  padding: 5px;
`

const Item = styled('li')`
  cursor: ${props => Boolean(props.loc) ? 'pointer': 'inherit'};
`

const mapper = item => {
  const loc = item?.defaultConfig?.loc
  const name = item?.compositeName?.fullName || item?.shortName || item.id
  const onClick = () => {
    if (loc) codeSetCursor(loc)
  }
  return <Item loc={loc} onClick={onClick} key={item.kind + item.id + name}>{name}</Item>
}

const OutlineSection = ({list, title}) => {
  if (list.length === 0) return null
  return <>
    <Header>{title}</Header>
    <Section><ol>{list.map(mapper)}</ol></Section>
  </>
}

export default function({domain, event, effect, store}) {
  return (
    <Outline>
      <OutlineSection list={event} title="Events" />
      <OutlineSection list={effect} title="Effects" />
      <OutlineSection list={store} title="Storages" />
      <OutlineSection list={domain} title="Domains" />
    </Outline>
  )
}