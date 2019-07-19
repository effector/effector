//@flow

import React from 'react'

export function VersionSelector({
  versions,
  selected,
  onChange,
}: {|
  versions: string[],
  selected: string,
  onChange: (value: string) => mixed,
|}) {
  return (
    <div className="versions">
      <select value={selected} onChange={e => onChange(e.currentTarget.value)}>
        {versions.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}
