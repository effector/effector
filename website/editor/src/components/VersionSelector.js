//@flow

import React from 'react'

export function VersionSelector({versions, selected, onChange}: {|
  versions: string[],
  selected: string,
  onChange: (value: string) => mixed,
|}) {
  const mapper = item => (
    <option key={item} value={item}>
      {item}
    </option>
  )
  return (
    <div className="versions">
      <select value={selected} onChange={e => onChange(e.currentTarget.value)}>
        {versions.map(mapper)}
      </select>
    </div>
  )
}
