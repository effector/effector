import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './CodeMirrorPanel';
import {parse} from 'react-docgen';
import fetch from 'cross-fetch';
import {
  createEvent,
  createEffect,
  createStore,
  combine,
  createDomain,
  forward,
} from 'effector';
import {createComponent} from 'effector-react';

import 'codemirror/lib/codemirror.css';
import './styles.css';

async function prettier(code) {
  const req = await fetch('http://codebox.now.sh/prettier', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({code}),
  });
  const resp = await req.json();
  if (resp.success === true) {
    return String(resp.code);
  }
  console.error(resp.error);
  return '"error!"';
}
const combineFn = combine;
const changeSources = createEvent('change sources');
const realmEvent = createEvent('realm event created');
const resetRealmSession = createEvent('reset realm session');
const evalEffect = createEffect('eval realm code', {
  async handler(code) {
    resetRealmSession();
    const createEvent = evalRealm.event;
    const createStore = evalRealm.store;
    const combine = combineFn;
    function runtime(code) {
      eval(code);
    }
    runtime(code);
  },
});
evalEffect.done.watch(e => console.log(`evalEffect done`, e));
evalEffect.fail.watch(e => console.log(`evalEffect fail`, e, e.error.message));
realmEvent.watch(e => console.log('realmEvent', e));
changeSources.watch(e => console.log('changeSources', e));
const evalRealm = createDomain('EvalRealm');

evalRealm.onCreateEvent(realmEvent);
const sourceCodeSample = `//@flow
const e1 = createEvent('[source code] e1');
const s1 = createStore(0).on(e1, n => n + 1);
const s2 = s1.map(n => n.toString(36));
const s3 = combine(s1, s2, (s1, s2) => ({s1, s2}));
console.log(e1, s1, s2, s3);
`;
const sourceCode = createStore(sourceCodeSample);

const graphite = createStore({})
  .on(realmEvent, (state, event) => {
    let result;
    if (state.__shouldReset === true) result = {};
    else result = {...state};
    result[event.getType()] = event.graphite.seq;
    return result;
  })
  .on(resetRealmSession, e => {
    e.__shouldReset = true;
    return e;
  });

const graphiteCode = graphite.map(e => {
  const result = {};
  for (const key in e) {
    result[key] = traverse(e[key]);
  }
  return JSON.stringify(result, null, 2);
});
function traverse(e) {
  if (!('group' in e)) return {type: 'noop'};
  if (e.group === 'cmd') {
    return {
      type: e.type,
      group: e.group,
      data: e.data,
    };
  }
  switch (e.type) {
    case 'seq':
    case 'multi':
      return {
        type: e.type,
        group: e.group,
        child: e.data.map(traverse),
      };
    case 'single':
    default:
      return {
        type: e.type,
        group: e.group,
        child: traverse(e.data),
      };
  }
}
forward({
  from: changeSources,
  to: sourceCode,
});
sourceCode.watch(e => evalEffect(e));

const jsonRef = React.createRef();
const GraphiteView = createComponent(graphiteCode, ({sources}, graphite) => (
  <>
    <Panel
      className="sources"
      value={sources}
      mode="text/jsx"
      codeSample={sourceCodeSample}
      onChange={changeSources}
    />
    <Panel
      className="results"
      readOnly={true}
      passive
      ref={jsonRef}
      value={graphite}
      mode="application/json"
    />
  </>
));
const CodeView = createComponent(sourceCode, ({}, sources) => (
  <GraphiteView sources={sources} />
));

const codeSample = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * General component description.
 */
class MyComponent extends Component {
  render() {
    // ...
  }
}
MyComponent.propTypes = {
  /**
   * Description of prop "foo".
   */
  foo: PropTypes.number.isRequired,
  /**
   * Description of prop "bar" (a custom validation function).
   */
  bar: function(props, propName, componentName) {
    // ...
  },
  baz: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};
MyComponent.defaultProps = {
  foo: 42,
  bar: 21
};
export default MyComponent;
`;
const e1 = createEvent('e1');
const s1 = createStore(0).on(e1, n => n + 1);
const s2 = s1.map(n => n.toString(36));
const s3 = combine(s1, s2, (s1, s2) => ({s1, s2}));
class App extends React.Component {
  _jsonRef = React.createRef();

  state = {
    value: JSON.stringify(e1.graphite.seq, null, 2), //this.compile(codeSample),
    mode: 'application/json',
    content: codeSample,
  };

  compile(value) {
    return JSON.stringify(parse(value), null, 2);
  }

  handleChange = value => {
    let result;
    let mode = 'text/plain';
    console.log(value);
    try {
      result = this.compile(value);
      mode = 'application/json';
    } catch (err) {
      result = String(err);
    }
    this.setState({value: result, mode, content: value});
  };
  handleChange2 = async value => {
    let result;
    let mode = 'text/plain';
    try {
      result = await prettier(value);
      mode = 'text/jsx';
    } catch (err) {
      result = String(err);
    }
    this.setState({value: result, mode, content: value});
  };
  render() {
    return (
      <>
        <Panel
          className="sources"
          value={this.state.content}
          mode="text/jsx"
          codeSample={codeSample}
          onChange={this.handleChange2}
        />
        <Panel
          className="results"
          readOnly={true}
          passive
          ref={this._jsonRef}
          value={this.state.value}
          mode={this.state.mode}
        />
      </>
    );
  }
}

ReactDOM.render(<CodeView />, document.getElementById('root'));
