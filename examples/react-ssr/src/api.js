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
  console.log('url', req.url)
  const url = req.url.replace(/\//g, '')
  if (data.hasOwnProperty(url)) {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    res.status(200).send(data[url])
  } else {
    res.status(404).send('not found')
  }
}
