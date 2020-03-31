export const userInfo = `
  query userInfo {
    viewer {
      email
      avatarUrl(size: 64)
      name
      url
    }
  }
`
