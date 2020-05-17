import React, {useRef, useState} from 'react'
import {useStore, useStoreMap} from 'effector-react'
import {Button} from '../share/styled'
import {$gist} from './init'
import {login, setApiKeyRemember} from './index'


export const Gist = () => {
  const gist = useStore($gist)
  const [apiKey, setApiKey] = useState(gist.gistApiKey)

  const handleLogin = () => {
    console.log('handle', apiKey, !apiKey.trim())
    if (!apiKey.trim()) return
    login(apiKey)
  }

  return (
    <section style={{
      // border: '1px solid red',
      padding: 20,
    }}>
      <label style={{cursor: 'pointer'}}>
        <div>Gist API key</div>
        <div style={{display: 'flex'}}>
          <input type="text"
                 style={{width: '100%', padding: 4}}
                 placeholder="API key with gist scope"
                 value={apiKey}
                 onChange={e => setApiKey(e.target.value)}
          />
          <Button
            style={{marginLeft: 8, height: 28, fontSize: '.9em', lineHeight: 0.1}}
            disabled={!apiKey.trim()}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </label>
      <label style={{display: 'flex', alignItems: 'center', marginTop: 5, cursor: 'pointer'}}>
        <input type="checkbox"
               checked={gist.gistRemember}
               onChange={e => setApiKeyRemember(e.target.checked)}
               style={{margin: '0 6px 0 0', height: 16, width: 16}}
        />
        <div>Remember key</div>
      </label>
      <p style={{marginTop: 5, color: '#555', fontSize: '.9em'}}>
        Personal access tokens function like ordinary OAuth access tokens.
        They can be used instead of a password for Git over HTTPS,
        or can be used to authenticate to the API over Basic Authentication.
      </p>
    </section>
  )
}
