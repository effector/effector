//@flow

import React from 'react'
import {createEvent, createEffect} from 'effector'
import {checkContent} from '../flow/domain'
import CodeMirror from 'codemirror'
//import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'

import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/wrap/hardwrap'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/keymap/sublime'
// import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/foldgutter.css'

function getAnnotations(text, callback, options, editor) {
  checkContent(text)
    .then(({code}) => code)
    .then(errors => {
      CodeMirror.signal(editor, 'flowErrors', errors)

      const lint = errors.map(err => {
        let messages = err.message
        let firstLoc = messages[0].loc
        let message = messages
          .map(msg => {
            return msg.descr
          })
          .join('\n')
        return {
          from: CodeMirror.Pos(
            firstLoc.start.line - 1,
            firstLoc.start.column - 1,
          ),
          to: CodeMirror.Pos(firstLoc.end.line - 1, firstLoc.end.column),
          severity: err.level,
          message,
        }
      })
      callback(lint)
    })
}
getAnnotations.async = true

export default class CodeMirrorPanel extends React.Component {
  static defaultProps = {
    lineNumbers: true,
    tabSize: 2,
    showCursorWhenSelecting: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    className: '',
    //keyMap: 'sublime',
    lineWrapping: false,
    passive: false,
    setCursor: createEvent(),
    markLine: createEffect(),
    onCursorActivity() {},
  }
  _textareaRef = React.createRef<HTMLTextAreaElement>()
  _codeMirror: any = null
  _cached = ''

  componentDidMount() {
    const {
      className,
      style,
      passive,
      value,
      onChange,
      codeSample,
      ...props
    } = this.props
    const options = {
      foldGutter: true,
      tabSize: 2,
      dragDrop: false,
      keyMap: 'sublime',
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      lint: {
        getAnnotations,
        lintOnChange: true,
      },
      ...props,
    }

    this._codeMirror = CodeMirror.fromTextArea(
      this._textareaRef.current,
      options,
    )
    this._codeMirror.on('change', this.handleChange)
    this._codeMirror.on('focus', this.handleFocus)
    this._codeMirror.on('cursorActivity', this.props.onCursorActivity)

    this._codeMirror.setValue((this._cached = this.props.value || ''))

    this.props.setCursor.watch(({line, column}) => {
      this._codeMirror.focus()
      this._codeMirror.setCursor({line: line - 1, ch: column})
    })

    this.props.markLine.use(({
      from, 
      to = {
        line: from.line,
        ch: this._codeMirror.getLine(from.line)?.length || from.ch
      },
      options
    }) => this._codeMirror.markText(from, to, options))
  }

  componentWillUnmount() {
    this._codeMirror && this._codeMirror.toTextArea()
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== this._cached && this.props.value != null) {
      this.updateValue(this.props.value)
    }
    if (this.props.mode !== prevProps.mode && this.props.mode != null) {
      this._codeMirror.setOption('mode', this.props.mode)
    }
  }

  updateValue(value) {
    this._cached = value
    if (this.props.passive) {
      this._codeMirror.setValue(value)
    }
  }

  handleFocus = (/* codeMirror, event */) => {
    if (this._codeMirror.getValue() === this.props.codeSample) {
      this._codeMirror.execCommand('selectAll')
    }
  }

  handleChange = (doc, change) => {
    //console.log('change.origin', change.origin);
    if (change.origin !== 'setValue') {
      this._cached = doc.getValue()
      this.props.onChange(this._cached)
    }
  }

  render() {
    const {className} = this.props
    return (
      <div className={'editor ' + className}>
        <textarea ref={this._textareaRef} />
      </div>
    )
  }
}
