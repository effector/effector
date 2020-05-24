import React from 'react'
import PropTypes from 'prop-types'
import createStyles from '../styles/createStyles'
import ObjectValue from '../object/ObjectValue'

const DataContainer = ({rows, columns, rowsData}, {theme}) => {
  const styles = createStyles('TableInspectorDataContainer', theme)
  const borderStyles = createStyles('TableInspectorLeftBorder', theme)

  return (
    <div style={styles.div}>
      <table style={styles.table}>
        <colgroup />
        <tbody>
          {rows.map((row, i) => (
            <tr key={row} style={styles.tr}>
              <td style={{...styles.td, ...borderStyles.none}}>{row}</td>

              {columns.map(column => {
                const rowData = rowsData[i]
                // rowData could be
                //  object -> index by key
                //    array -> index by array index
                //    null -> pass
                //  boolean -> pass
                //  string -> pass (hasOwnProperty returns true for [0..len-1])
                //  number -> pass
                //  function -> pass
                //  symbol
                //  undefined -> pass
                if (
                  typeof rowData === 'object' &&
                  rowData !== null &&
                  rowData.hasOwnProperty(column)
                ) {
                  return (
                    <td
                      key={column}
                      style={{...styles.td, ...borderStyles.solid}}>
                      <ObjectValue object={rowData[column]} />
                    </td>
                  )
                } else {
                  return (
                    <td
                      key={column}
                      style={{...styles.td, ...borderStyles.solid}}
                    />
                  )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

DataContainer.contextTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default DataContainer
