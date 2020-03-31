export const userInfo = `
  query userInfo {
    viewer {
      id
      avatarUrl(size: 64)
      name
      url
    }
  }
`
