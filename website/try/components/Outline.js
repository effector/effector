//@flow

import * as React from 'react'
import {styled} from 'linaria/react'

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

const mapper = item => {
  const name = item?.compositeName?.fullName || item?.shortName || item.id
  return <li key={item.kind + item.id + name}>{name}</li>
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
      <OutlineSection list={store} title="Storages" />
      <OutlineSection list={effect} title="Effects" />
      <OutlineSection list={domain} title="Domains" />
    </Outline>
  )
}