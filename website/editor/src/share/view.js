//@flow

import * as React from 'react'
import {useStore} from 'effector-react'
import {shareCode} from '../graphql'
import {ShareButton, SharedUrl, ShareGroup} from './styled'
import {canShare, clickShare, sharedUrl, sharing, urlRef} from './controller'
import {Section} from '../settings/view'
import {isShareAPISupported} from '../device'
import {handleInput, handleKeyDown, removeShare, setCurrentShareId} from './index'
import {$currentShareId, $shareDescription} from './state'
import {styled} from 'linaria/react'
import {CopyIcon} from '../components/Icons/CopyIcon'
import {ShareIcon} from '../components/Icons/ShareIcon'
import {LoadingIcon} from '../components/Icons/LoadingIcon'
import {$sortedShareList} from './init'
import {IconButton} from '../components/IconButton'
import {theme} from '../components/Console/theme/default'


const Save = (props) => {
  const pending = useStore(shareCode.pending)
  return (
    <ShareButton {...props} onClick={shareCode} disabled={props.disabled || pending}>
      {pending && <LoadingIcon style={{marginRight: 10}} />}
      Save
    </ShareButton>
  )
}

const Copy = () => {
  const shareAllowed = useStore(canShare)
  return (
    <ShareButton onClick={clickShare} disabled={!shareAllowed}>
      {isShareAPISupported ? 'Share' : 'Copy to clipboard'}
    </ShareButton>
  )
}

const Url = () => {
  const url = useStore(sharedUrl)
  return (
    url && (
      <Section>
        <SharedUrl ref={urlRef} value={url} readOnly />
      </Section>
    )
  )
}


const ShareItem = styled.a`
  display: block;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  border-left: 3px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
`

const ShareRow = styled.div`
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShareDate = styled.div`
  text-align: left;
  color: #999;
  font-size: 12px;
`

const ShareDescription = styled.div`
  flex: 1 1 100%;
  white-space: nowrap;
  &:hover {
    color: var(--link-color);
  }
`

const MiniButton = styled.button`
  color: #888888;
  border: none;
  outline: none;
  background-color: transparent !important;
  border-radius: 5px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 40px;
  padding: 2px 0;
  &:hover {
    color: var(--link-color);
  }
`

const ShareList = () => {
  const sortedShareList = useStore($sortedShareList)
  const currentShareId = useStore($currentShareId)

  if (sortedShareList.length === 0) {
    return <h2 style={{color: '#aaa', fontWeight: 'bold', textAlign: 'center', marginTop: 30}}>
      No shares found by the author
    </h2>
  }

  return sortedShareList.map(share => {
    const d = new Date(share.created * 1000)
    const DD = String(d.getDate()).padStart(2, 0)
    const MM = String(d.getMonth()).padStart(2, 0)
    const YYYY = String(d.getFullYear())
    const HH = String(d.getHours()).padStart(2, 0)
    const mm = String(d.getMinutes()).padStart(2, 0)
    const strDate = `${YYYY}-${MM}-${DD} ${HH}:${mm}`

    const shareLink = (e) => {
      e.preventDefault()
      e.stopPropagation()
      sharing({slug: share.slug, sharedUrl: `https://share.effector.dev/${share.slug}`})
    }

    const copyLink = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const tmp = document.createElement('input')
      tmp.contentEditable = true
      tmp.readOnly = false
      tmp.value = `${location.origin}/${share.slug}`
      document.body.appendChild(tmp)
      tmp.select()
      document.execCommand('copy')
      document.body.removeChild(tmp)
      window.scrollY = 0
    }

    return (
      <ShareItem
        key={share.slug}
        onClick={() => setCurrentShareId(share.slug)}
        active={currentShareId === share.slug}
        href={`${location.origin}/${share.slug}`}
        style={{color: currentShareId === share.slug ? 'var(--primary-color)' : '#333'}}
      >
        <ShareRow>
          <ShareDescription>
            {share.description || `<${share.slug}>`}
          </ShareDescription>
          <div style={{marginLeft: 10, position: 'relative'}}>
            {isShareAPISupported
              ? (
                <MiniButton title="Share" onClick={shareLink}>
                  <ShareIcon width="20px" height="20px" />
                </MiniButton>
              )
              : (
                <MiniButton
                  title="Copy to clipboard"
                  onClick={copyLink}
                >
                  <CopyIcon width="20px" height="20px" />
                </MiniButton>
              )
            }
            <IconButton title="Delete"
                        icon={theme.styles.TRASH_ICON}
                        style={{
                          position: 'absolute',
                          right: 0,
                          width: 24,
                          height: 24,
                          fill: 'red',
                        }}
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (confirm('Are you sure delete this share?')) {
                            removeShare(share.slug)
                          }
                        }}
            />
          </div>
        </ShareRow>
        <ShareRow>
          <ShareDate>
            {strDate}
          </ShareDate>
        </ShareRow>
      </ShareItem>
    )
  })
}

const ValidatedInput = styled.input`
  outline: none;
  border: none;
  box-shadow: 0 0 1px black;
  :invalid {
    box-shadow: 0 0 4px red;
  }
`

export const Share = () => {
  const shareDescription = useStore($shareDescription)
  const saving = useStore(shareCode.pending)

  return (
    <ShareGroup>
      <Section style={{
        backgroundColor: '#f0f0f0',
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        border: 'none',
        borderBottom: '1px solid #ddd',
      }}>
        <ValidatedInput type="text"
                        className="share-description"
                        style={{width: '100%', padding: 4, height: 32}}
                        placeholder="Share description required"
                        value={shareDescription || ''}
                        onKeyDown={handleKeyDown}
                        onChange={handleInput}
                        autoFocus={false}
                        required
        />
        <Save disabled={saving} />
      </Section>

      <Section style={{
        margin: 0,
        padding: 0,
        overflowY: 'auto',
        borderTop: 'none',
        borderBottom: 'none',
        height: 'calc(100% - 54px)',
      }}>
        <ShareList />
      </Section>
    </ShareGroup>
  )
}
