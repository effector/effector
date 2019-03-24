//@flow
import {html, type TemplateResult} from 'lit-html'
import {
  createStore,
  createEvent,
  createStoreObject,
  createApi,
  combine,
  type Store,
} from 'effector'

const source: Store<'grafo' | 'xShape' | 'zherebko'> = createStore('grafo')
const layering: Store<
  'simplex' | 'longestPath' | 'coffmanGraham',
> = createStore('simplex')
const decrossing: Store<'optimal' | 'twoLayer' | 'twoLayerOpt'> = createStore(
  'optimal',
)
const coords: Store<
  'vertical' | 'minimumCurves' | 'greedy' | 'center',
> = createStore('vertical')
const layout: Store<'sugiyama'> = createStore('sugiyama')

export const dagConfig = createStoreObject({
  source,
  layering,
  decrossing,
  coords,
  layout,
})

const switcher = {
  source: createApi(source, {
    grafo: () => 'grafo',
    xShape: () => 'xShape',
    zherebko: () => 'zherebko',
  }),
  layering: createApi(layering, {
    simplex: () => 'simplex',
    longestPath: () => 'longestPath',
    coffmanGraham: () => 'coffmanGraham',
  }),
  coords: createApi(coords, {
    vertical: () => 'vertical',
    minimumCurves: () => 'minimumCurves',
    greedy: () => 'greedy',
    center: () => 'center',
    next(state) {
      const cases = ['vertical', 'minimumCurves', 'greedy', 'center']
      const current = cases.indexOf(state)
      if (current < 0 || current + 1 >= cases.length) return cases[0]
      return cases[current + 1]
    },
  }),
  layout: createApi(layout, {
    sugiyama: () => 'sugiyama',
  }),
}
const DecrossingView = coords.map(
  val => html`
    <b class="text">coords</b>
    <span class="text">${val}</span>
    <button @click=${switcher.coords.next}>next</button>
  `,
)
const HeaderView = html`
  <header>
    <h1>Hello</h1>
  </header>
`
export const View: Store<TemplateResult> = combine(
  DecrossingView,
  Decrossing => html`
    ${HeaderView} ${Decrossing}
  `,
)
