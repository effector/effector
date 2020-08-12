import React, {useRef} from 'react'
import {useStore} from 'effector-react'
import {getShareListByAuthor, shareCode} from '../graphql'
import {ShareButton, ShareGroup} from './styled'
import {sharing} from './controller'
import {Section} from '../settings/view'
import {isShareAPISupported} from '../device'
import {handleInput, handleKeyDown, onTextChange, removeShare, setCurrentShareId, setFilterMode} from './index'
import {$currentShareId, $filterMode, $shareDescription} from './state'
import {styled} from 'linaria/react'
import {CopyIcon} from '../components/Icons/CopyIcon'
import {ShareIcon} from '../components/Icons/ShareIcon'
import {LoadingIcon} from '../components/Icons/LoadingIcon'
import {$sortedShareList} from './init'
import {IconButton} from '../components/IconButton'
import {theme} from '../components/Console/theme/default'
import {getUserInfo} from '~/github/init'
import {FilterIcon} from '~/share/filterIcon'
import {$debouncedInput, resetInput} from '~/share/debounceInput'
import {RemoveIcon} from '~/share/RemoveIcon'


const Save = props => {
  const pending = useStore(shareCode.pending)
  return (
    <ShareButton
      {...props}
      onClick={shareCode}
      disabled={props.disabled || pending}>
      {pending && <LoadingIcon style={{marginRight: 10}} />}
      Save
    </ShareButton>
  )
}

const ShareItem = styled.a`
  display: block;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  border-left: 3px solid
    ${props => (props.active ? 'var(--primary-color)' : 'transparent')};
`

const ShareRow = styled.div`
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShareDate = styled.time`
  text-align: left;
  color: #999;
  font-size: 12px;
`

const ShareDescription = styled.div`
  flex: 1 1 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    color: var(--link-color);
  }
  max-width: calc(100vw - 100px);
  @media (min-width: 699px) {
    max-width: calc(100% - 70px);
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

const status = {
  loading: 'Loading user share list...',
  signing: 'Loading user info...',
  empty: 'No shares found by the author',
}

const dateStringFormatter = new Intl.DateTimeFormat(['en-US'], {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const timeStringFormatter = new Intl.DateTimeFormat(['en-US'], {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
})

const ShareList = ({filterMode, description}) => {
  let sortedShareList = useStore($sortedShareList)
  const currentShareId = useStore($currentShareId)
  const loading = useStore(getShareListByAuthor.pending)
  const signing = useStore(getUserInfo.pending)
  const isEmpty = sortedShareList.length === 0

  if (loading || signing || isEmpty) {
    return (
      <h2
        style={{
          color: '#aaa',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 30,
        }}>
        {loading
          ? status.loading
          : signing
            ? status.signing
            : status.empty
        }
      </h2>
    )
  }

  if (filterMode && description) {
    sortedShareList = sortedShareList.filter(share => share?.description && (
      share?.description?.trim().toLowerCase().indexOf(description) !== -1
      || share?.code?.trim().indexOf(description) !== -1
    ))
  }

  return sortedShareList.map(share => {
    const d = new Date(share.created * 1000)
    const dateString = dateStringFormatter.format(d)
    const timeString = timeStringFormatter.format(d)
    const dateISO = d.toISOString()

    const shareLink = e => {
      e.preventDefault()
      e.stopPropagation()
      sharing({
        slug: share.slug,
        sharedUrl: `https://share.effector.dev/${share.slug}`,
      })
    }

    const copyLink = e => {
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
        style={{
          color:
            currentShareId === share.slug ? 'var(--primary-color)' : '#333',
        }}>
        <ShareRow>
          <ShareDescription>
            {typeof share.description === 'undefined' || share.description === null ? `<${share.slug}>` : share.description}
          </ShareDescription>
          <div style={{marginLeft: 10, position: 'relative'}}>
            {isShareAPISupported ? (
              <MiniButton title="Share" onClick={shareLink}>
                <ShareIcon width="20px" height="20px" />
              </MiniButton>
            ) : (
              <MiniButton title="Copy to clipboard" onClick={copyLink}>
                <CopyIcon width="20px" height="20px" />
              </MiniButton>
            )}
            <IconButton
              title="Delete"
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
          <ShareDate dateTime={dateISO}>
            {dateString} {timeString}
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
  const filterMode = useStore($filterMode)
  const descRef = useRef(null)
  const debouncedInput = useStore($debouncedInput)

  return (
    <ShareGroup>
      <Section
        style={{
          backgroundColor: '#f0f0f0',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          margin: 0,
          border: 'none',
          borderBottom: '1px solid #ddd',
        }}>
        <FilterIcon
          color={filterMode ? 'hsl(213,100%,46%)' : 'lightgray'}
          style={{width: 20, margin: '0 10px', cursor: 'pointer'}}
          onClick={() => {
            setFilterMode(!filterMode)
            setTimeout(() => descRef?.current?.focus())
          }}
        />
        <div style={{position: 'relative', width: '100%'}}>
          <ValidatedInput
            ref={descRef}
            type="text"
            className="share-description"
            style={{width: '100%', padding: '4px 24px 4px 4px', height: 32}}
            placeholder="Share description required"
            value={shareDescription || ''}
            onKeyDown={handleKeyDown}
            onChange={handleInput}
            autoFocus={false}
            // required
          />
          <RemoveIcon
            color="gray"
            style={{width: 16, cursor: 'pointer', position: 'absolute', right: 4, top: 8}}
            onClick={() => onTextChange('')}
          />
        </div>
        <Save disabled={saving} />
      </Section>

      <Section
        style={{
          margin: 0,
          padding: 0,
          overflowY: 'auto',
          borderTop: 'none',
          borderBottom: 'none',
          height: 'calc(100% - 42px)',
        }}>
        <ShareList filterMode={filterMode}
                   description={debouncedInput.trim().toLowerCase()}
        />
      </Section>
    </ShareGroup>
  )
}
