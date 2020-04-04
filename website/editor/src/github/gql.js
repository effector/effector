export const userInfo = `
  query userInfo {
    viewer {
      databaseId
      avatarUrl(size: 64)
      name
      url
    }
  }
`
