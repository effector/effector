import React from 'react'

export default function Stats({event, store}) {
  const mapper = item => (
    <li key={item.kind + item.id + item.shortName}>
      {item.compositeName ? item.compositeName.fullName || item.shortName : item.shortName}
    </li>
  )
  return (
    <div className="stats">
      <div>
        <b>events</b>
        <ol>{event.map(mapper)}</ol>
      </div>
      <div>
        <b>storages</b>
        <ol>{store.map(mapper)}</ol>
      </div>
    </div>
  )
}
