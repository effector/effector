/**
 * Specs:
 * https://developer.chrome.com/devtools/docs/commandline-api#tabledata-columns
 * https://developer.mozilla.org/en-US/docs/Web/API/Console/table
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ThemeProvider from '../styles/ThemeProvider'
import createStyles from '../styles/createStyles'

import getHeaders from './getHeaders'
import DataContainer from './DataContainer'
import HeaderContainer from './HeaderContainer'

export default class TableInspector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sorted: false, // has user ever clicked the <th> tag to sort?
      sortIndexColumn: false, // is index column sorted?
      sortColumn: undefined, // which column is sorted?
      sortAscending: false, // is sorting ascending or descending?
    }
  }

  handleIndexTHClick() {
    this.setState(({sortIndexColumn, sortAscending}) => ({
      sorted: true,
      sortIndexColumn: true,
      sortColumn: undefined,
      // when changed to a new column, default to asending
      sortAscending: sortIndexColumn ? !sortAscending : true,
    }))
  }

  handleTHClick(col) {
    this.setState(({sortColumn, sortAscending}) => ({
      sorted: true,
      sortIndexColumn: false,
      // update sort column
      sortColumn: col,
      // when changed to a new column, default to asending
      sortAscending: col === sortColumn ? !sortAscending : true,
    }))
  }

  render() {
    const data = this.props.data
    const columns = this.props.columns

    const {theme} = this.props
    const styles = createStyles('TableInspector', theme)

    if (typeof data !== 'object' || data === null) {
      return <div />
    }

    let {rowHeaders, colHeaders} = getHeaders(data)

    // columns to be displayed are specified
    // NOTE: there's some space for optimization here
    if (columns !== undefined) {
      colHeaders = columns
    }

    let rowsData = rowHeaders.map(rowHeader => data[rowHeader])

    const sortIndexColumn = this.state.sortIndexColumn,
      sortColumn = this.state.sortColumn,
      sortAscending = this.state.sortAscending

    let columnDataWithRowIndexes /* row indexes are [0..nRows-1] */
    // TODO: refactor
    if (sortColumn !== undefined) {
      // the column to be sorted (rowsData, column) => [[columnData, rowIndex]]
      columnDataWithRowIndexes = rowsData.map((rowData, index) => {
        // normalize rowData
        if (
          typeof rowData === 'object' &&
          rowData !== null /*&& rowData.hasOwnProperty(sortColumn)*/
        ) {
          const columnData = rowData[sortColumn]
          return [columnData, index]
        }
        return [undefined, index]
      })
    } else {
      if (sortIndexColumn) {
        columnDataWithRowIndexes = rowHeaders.map((rowData, index) => {
          const columnData = rowHeaders[index]
          return [columnData, index]
        })
      }
    }
    if (columnDataWithRowIndexes !== undefined) {
      // apply a mapper before sorting (because we need to access inside a container)
      const comparator = (mapper, ascending) => {
        return (a, b) => {
          const v1 = mapper(a) // the datum
          const v2 = mapper(b)
          const type1 = typeof v1
          const type2 = typeof v2
          // use '<' operator to compare same type of values or compare type precedence order #
          const lt = (v1, v2) => {
            if (v1 < v2) {
              return -1
            } else if (v1 > v2) {
              return 1
            } else {
              return 0
            }
          }
          let result
          if (type1 === type2) {
            result = lt(v1, v2)
          } else {
            // order of different types
            const order = {
              string: 0,
              number: 1,
              object: 2,
              symbol: 3,
              boolean: 4,
              undefined: 5,
              function: 6,
            }
            result = lt(order[type1], order[type2])
          }
          // reverse result if descending
          if (!ascending) result = -result
          return result
        }
      }
      const sortedRowIndexes = columnDataWithRowIndexes
        .sort(comparator(item => item[0], sortAscending))
        .map(item => item[1]) // sorted row indexes
      rowHeaders = sortedRowIndexes.map(i => rowHeaders[i])
      rowsData = sortedRowIndexes.map(i => rowsData[i])
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <div style={styles.base}>
          <HeaderContainer
            columns={colHeaders}
            /* for sorting */
            sorted={this.state.sorted}
            sortIndexColumn={this.state.sortIndexColumn}
            sortColumn={this.state.sortColumn}
            sortAscending={this.state.sortAscending}
            onTHClick={this.handleTHClick.bind(this)}
            onIndexTHClick={this.handleIndexTHClick.bind(this)}
          />
          <DataContainer
            rows={rowHeaders}
            columns={colHeaders}
            rowsData={rowsData}
          />
        </div>
      </ThemeProvider>
    )
  }
}

TableInspector.propTypes = {
  /**
   * the Javascript object you would like to inspect, either an array or an object
   */
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /**
   * An array of the names of the columns you'd like to display in the table
   */
  columns: PropTypes.array,
}

TableInspector.defaultProps = {
  data: undefined,
  columns: undefined,
  theme: 'chromeLight',
}
