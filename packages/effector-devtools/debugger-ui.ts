import type {Devtools, StoreInfo, EventInfo, EffectInfo, GraphNode, GraphEdge} from './devtools'

/**
 * Create a visual debugger UI
 */
export function createDebuggerUI(devtools: Devtools): {
  mount: (container?: HTMLElement | string) => void
  unmount: () => void
} {
  let container: HTMLElement | null = null
  let unsubscribe: (() => void) | null = null

  function mount(target: HTMLElement | string = 'effector-debugger') {
    if (typeof target === 'string') {
      container = document.getElementById(target)
      if (!container) {
        container = document.createElement('div')
        container.id = target
        document.body.appendChild(container)
      }
    } else {
      container = target
    }

    renderUI()
    setupEventListeners()

    // Subscribe to updates
    unsubscribe = devtools.subscribe((update) => {
      refreshUI()
    })
  }

  function unmount() {
    unsubscribe?.()
    if (container) {
      container.innerHTML = ''
    }
  }

  function renderUI() {
    if (!container) return

    container.innerHTML = `
      <style>
        .effector-debugger {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          max-height: 600px;
          overflow: auto;
        }
        .debugger-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #333;
        }
        .debugger-title {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
        }
        .debugger-tabs {
          display: flex;
          gap: 8px;
        }
        .debugger-tab {
          background: #333;
          border: none;
          color: #d4d4d4;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .debugger-tab:hover {
          background: #444;
        }
        .debugger-tab.active {
          background: #007acc;
          color: #fff;
        }
        .debugger-content {
          display: none;
        }
        .debugger-content.active {
          display: block;
        }
        .store-item, .event-item, .effect-item {
          background: #252526;
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 4px;
          border-left: 3px solid transparent;
        }
        .store-item {
          border-left-color: #7e57c2;
        }
        .event-item {
          border-left-color: #9ccc65;
        }
        .effect-item {
          border-left-color: #26a69a;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .item-name {
          font-weight: 600;
          color: #fff;
        }
        .item-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          text-transform: uppercase;
        }
        .badge-store { background: #7e57c2; }
        .badge-event { background: #9ccc65; color: #000; }
        .badge-effect { background: #26a69a; }
        .badge-pending { background: #ffa726; color: #000; }
        .badge-done { background: #66bb6a; }
        .badge-fail { background: #ef5350; }
        .item-value {
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 12px;
          background: #1e1e1e;
          padding: 8px;
          border-radius: 4px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .item-meta {
          font-size: 11px;
          color: #666;
          margin-top: 8px;
        }
        .graph-container {
          background: #252526;
          padding: 16px;
          border-radius: 4px;
          min-height: 300px;
        }
        .graph-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
        }
        .stat-item {
          text-align: center;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 600;
          color: #fff;
        }
        .stat-label {
          font-size: 12px;
          color: #666;
        }
        .graph-nodes {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 8px;
        }
        .graph-node {
          background: #333;
          padding: 12px;
          border-radius: 4px;
          border-left: 3px solid;
        }
        .graph-node.store { border-left-color: #7e57c2; }
        .graph-node.event { border-left-color: #9ccc65; }
        .graph-node.effect { border-left-color: #26a69a; }
        .node-id {
          font-size: 10px;
          color: #666;
          margin-bottom: 4px;
        }
        .node-name {
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .node-type {
          font-size: 10px;
          text-transform: uppercase;
          color: #999;
        }
        .empty-state {
          text-align: center;
          padding: 48px;
          color: #666;
        }
      </style>
      <div class="effector-debugger">
        <div class="debugger-header">
          <div class="debugger-title">☄️ Effector Debugger</div>
          <div class="debugger-tabs">
            <button class="debugger-tab active" data-tab="stores">Stores</button>
            <button class="debugger-tab" data-tab="events">Events</button>
            <button class="debugger-tab" data-tab="effects">Effects</button>
            <button class="debugger-tab" data-tab="graph">Graph</button>
          </div>
        </div>
        <div class="debugger-content active" data-content="stores">
          <div id="stores-list"></div>
        </div>
        <div class="debugger-content" data-content="events">
          <div id="events-list"></div>
        </div>
        <div class="debugger-content" data-content="effects">
          <div id="effects-list"></div>
        </div>
        <div class="debugger-content" data-content="graph">
          <div class="graph-container">
            <div class="graph-stats">
              <div class="stat-item">
                <div class="stat-value" id="stat-stores">0</div>
                <div class="stat-label">Stores</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="stat-events">0</div>
                <div class="stat-label">Events</div>
              </div>
              <div class="stat-item">
                <div class="stat-value" id="stat-effects">0</div>
                <div class="stat-label">Effects</div>
              </div>
            </div>
            <div class="graph-nodes" id="graph-nodes"></div>
          </div>
        </div>
      </div>
    `
  }

  function setupEventListeners() {
    if (!container) return

    const tabs = container.querySelectorAll('.debugger-tab')
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab')

        // Update active tab
        tabs.forEach((t) => t.classList.remove('active'))
        tab.classList.add('active')

        // Update active content
        container
          ?.querySelectorAll('.debugger-content')
          .forEach((c) => c.classList.remove('active'))
        container
          ?.querySelector(`[data-content="${tabName}"]`)
          ?.classList.add('active')
      })
    })

    refreshUI()
  }

  function refreshUI() {
    if (!container) return

    // Update stores
    const storesList = container.querySelector('#stores-list')
    if (storesList) {
      const stores = devtools.getStores()
      if (stores.length === 0) {
        storesList.innerHTML = `
          <div class="empty-state">No stores found</div>
        `
      } else {
        storesList.innerHTML = stores
          .map(
            (store) => `
          <div class="store-item">
            <div class="item-header">
              <span class="item-name">${escapeHtml(store.name)}</span>
              <span class="item-badge badge-store">Store</span>
            </div>
            <div class="item-value">${formatValue(store.value)}</div>
            ${store.derived ? '<div class="item-meta">Derived</div>' : ''}
          </div>
        `
          )
          .join('')
      }
    }

    // Update events
    const eventsList = container.querySelector('#events-list')
    if (eventsList) {
      const events = devtools.getEvents().slice(-20).reverse()
      if (events.length === 0) {
        eventsList.innerHTML = `
          <div class="empty-state">No events recorded</div>
        `
      } else {
        eventsList.innerHTML = events
          .map(
            (event) => `
          <div class="event-item">
            <div class="item-header">
              <span class="item-name">${escapeHtml(event.name)}</span>
              <span class="item-badge badge-event">Event</span>
            </div>
            <div class="item-value">${formatValue(event.payload)}</div>
            <div class="item-meta">${formatTime(event.timestamp)}</div>
          </div>
        `
          )
          .join('')
      }
    }

    // Update effects
    const effectsList = container.querySelector('#effects-list')
    if (effectsList) {
      const effects = devtools.getEffects().slice(-20).reverse()
      if (effects.length === 0) {
        effectsList.innerHTML = `
          <div class="empty-state">No effects recorded</div>
        `
      } else {
        effectsList.innerHTML = effects
          .map(
            (effect) => `
          <div class="effect-item">
            <div class="item-header">
              <span class="item-name">${escapeHtml(effect.name)}</span>
              <span class="item-badge badge-${effect.status}">${effect.status}</span>
            </div>
            <div class="item-value">${formatValue(effect.params)}</div>
            ${
              effect.result !== undefined
                ? `<div class="item-value" style="margin-top: 8px;">→ ${formatValue(effect.result)}</div>`
                : ''
            }
            ${
              effect.error !== undefined
                ? `<div class="item-value" style="margin-top: 8px; color: #ef5350;">✗ ${formatValue(effect.error)}</div>`
                : ''
            }
            <div class="item-meta">
              ${effect.duration ? `${effect.duration}ms · ` : ''}
              ${formatTime(effect.timestamp)}
            </div>
          </div>
        `
          )
          .join('')
      }
    }

    // Update graph stats
    const graph = devtools.getGraph()
    const storesCount = graph.nodes.filter((n) => n.type === 'store').length
    const eventsCount = graph.nodes.filter((n) => n.type === 'event').length
    const effectsCount = graph.nodes.filter((n) => n.type === 'effect').length

    const statStores = container.querySelector('#stat-stores')
    const statEvents = container.querySelector('#stat-events')
    const statEffects = container.querySelector('#stat-effects')

    if (statStores) statStores.textContent = String(storesCount)
    if (statEvents) statEvents.textContent = String(eventsCount)
    if (statEffects) statEffects.textContent = String(effectsCount)

    // Update graph nodes
    const graphNodes = container.querySelector('#graph-nodes')
    if (graphNodes) {
      if (graph.nodes.length === 0) {
        graphNodes.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">No nodes found</div>
        `
      } else {
        graphNodes.innerHTML = graph.nodes
          .map(
            (node) => `
          <div class="graph-node ${node.type}">
            <div class="node-id">${node.id.slice(0, 8)}</div>
            <div class="node-name">${escapeHtml(node.name)}</div>
            <div class="node-type">${node.type}${node.derived ? ' (derived)' : ''}</div>
          </div>
        `
          )
          .join('')
      }
    }
  }

  return {mount, unmount}
}

function escapeHtml(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value === 'string') return `"${escapeHtml(value)}"`
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return String(value)
  if (value instanceof Error) return `Error: ${escapeHtml(value.message)}`
  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value.slice(0, 5).map(formatValue)
    if (value.length > 5) items.push('...')
    return `[${items.join(', ')}]`
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).slice(0, 5)
    if (entries.length === 0) return '{}'
    const formatted = entries
      .map(([k, v]) => `${k}: ${formatValue(v)}`)
      .join(', ')
    const more = Object.keys(value).length > 5 ? ', ...' : ''
    return `{ ${formatted}${more} }`
  }
  return String(value)
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}
