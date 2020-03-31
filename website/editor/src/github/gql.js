export const userInfo = `
  query userInfo {
    viewer {
      email
      avatarUrl(size: 32)
      name
    }
  }
`
