# Relationship graph example

This example addresses #91 with stores, events, effects and actual graph relationships. It uses this checkout's explicit `inspectGraph({fn, onNode})` option, not the unmerged `includeLinks` proposal or an external service.

From this directory, install the example's development dependency, run `npm run build`, then `npm start`. Open http://127.0.0.1:8875. The build bundles the current checkout, so installing a released Effector package does not provide the new option. No runtime CDN, backend, browser extension, telemetry or account is required.

Start `captureGraph()` **before** creating your application. Mount with `mountGraph(element, capture)`, and call the returned `refresh()` after graph changes. Capture holds references so that sample/map links completed after their declaration are read at snapshot time. It does not change nodes, copy values or display store values. Live node references can retain the connected graph and application data until `capture.dispose()` releases them. Declaration delivery without `onNode` is unchanged. Capture cannot recover disconnected nodes created before it starts.

The default view collapses internal operation nodes and shows real directed propagation paths between units. Enable **Show internal nodes and ownership** to inspect the complete structural graph: `next` is propagation, `owners` is ownership, and `links` is a family relationship. Ownership is not presented as proof that a value propagates along that edge. Search matches names or IDs and includes direct neighbours. Cyclic components share a column; arrows have routed paths and tooltips. The viewport scrolls and zoom buttons change its scale.

All nodes remain in the snapshot. Rendering is limited to 250 nodes, with a visible message when truncated; search still operates on the complete captured graph. This bounds the SVG DOM size but does not claim that an arbitrary application graph fits on one screen. Refresh takes a synchronous snapshot and is explicit, rather than polling the application.

`viewer.dispose()` removes its DOM and event listeners. `capture.dispose()` unsubscribes and releases its node references; later snapshots are empty. Dispose both when the debugging session ends. Node references are read-only by contract; mutating them can change application behaviour. This tool displays graph structure, not time travel, arbitrary state restoration or a production monitoring service.
