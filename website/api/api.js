const data = {
  alice: {
    name: 'alice',
    friends: ['bob', 'carol'],
  },
  bob: {
    name: 'bob',
    friends: ['alice'],
  },
  carol: {
    name: 'carol',
    friends: ['alice'],
  },
  charlie: {
    name: 'charlie',
    friends: [],
  },
}

module.exports = async(req, res) => {
  const url = req.url.replace(/\//g, '').replace('/ssr/api/', '')
  console.log('url', req.url, url)
  if (data.hasOwnProperty(url)) {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    res.status(200).send(data[url])
  } else {
    res.status(404).send('not found')
  }
}
