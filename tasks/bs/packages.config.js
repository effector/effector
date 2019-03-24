//@flow

export default {
  'bs-effector': {
    name: 'bs-effector',
    sources: {
      dir: 'src',
      subdirs: true,
    },
    'bsc-flags': ['-bs-no-version-header', '-bs-g'],
    reason: {
      'react-jsx': 2,
    },
    'bs-dev-dependencies': [],
    namespace: true,
    refmt: 3,
  },

  'bs-effector-react': {
    name: 'bs-effector-react',
    sources: {
      dir: 'src',
      subdirs: true,
    },
    'bs-dependencies': ['bs-effector', 'reason-react'],
    'bsc-flags': ['-bs-no-version-header', '-bs-g'],
    reason: {
      'react-jsx': 2,
    },
    'bs-dev-dependencies': [],
    namespace: true,
    refmt: 3,
  },
}
