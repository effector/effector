//@flow

export const minifyConfig = ({beautify}: {|beautify: boolean|}) => ({
  parse: {
    bare_returns: false,
    ecma: 8,
    html5_comments: false,
    shebang: true,
  },
  compress: {
    global_defs: {
      // __DEV__: false,
      // 'process.env.NODE_ENV': 'production',
    },
    arrows: true,
    arguments: true,
    booleans: true,
    booleans_as_integers: true,
    collapse_vars: true,
    comparisons: true,
    computed_props: true,
    conditionals: true,
    dead_code: true,
    directives: true,
    drop_console: false,
    drop_debugger: true,
    ecma: 8,
    evaluate: true,
    expression: true, //?
    hoist_funs: true, //?
    hoist_props: true,
    hoist_vars: false,
    if_return: true,
    inline: true,
    join_vars: true, //?

    defaults: false,
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    loops: true,
    module: true,
    properties: true,
    pure_getters: true,
    reduce_funcs: true,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    switches: true,
    toplevel: true,

    typeofs: true,
    unused: true,
    passes: 3,

    unsafe_arrows: true,
    unsafe_Function: true,
    unsafe_math: true,
    unsafe_proto: true,
  },
  mangle: {
    reserved: ['effector', 'effectorVue', 'effectorReact', 'it', 'test'],
    eval: true,
    keep_classnames: false,
    keep_fnames: false,
    module: true,
    toplevel: true, //?
    safari10: false,
    // properties: {
    //   builtins: false,
    //   debug: false,
    //   keep_quoted: false, //?
    //   reserved: ['test', 'it'],
    // },
  },
  output: {
    ascii_only: false,
    braces: false, //?
    // comments: /#/i,
    comments: false,
    ecma: 8,
    beautify,
    indent_level: 2,
    inline_script: false, //?
    keep_quoted_props: false, //?
    quote_keys: false,
    quote_style: 3, //?
    safari10: false,
    semicolons: true, //?
    shebang: true,
    webkit: false,
    wrap_iife: false,
  },
  // sourceMap: {
  //     // source map options
  // },
  ecma: 8,
  keep_classnames: false,
  keep_fnames: false,
  ie8: false,
  module: true,
  nameCache,
  safari10: false,
  toplevel: true,
  warnings: true,
})
