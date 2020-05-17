import React, {useEffect, useRef} from 'react'
import {styled} from 'linaria/react'
import debounce from 'lodash.debounce'


const setBorder = dir => props => props.direction === dir ? `1px solid ${props.border}` : 'none'

const StyledSizer = styled.div`
  flex: 0 0 ${props => props.size};
  width: ${props => props.direction === 'vertical' ? props.size : '100%'};
  height: ${props => props.direction === 'horizontal' ? props.size : '100%'};
  background-color: ${props => props.color};
  cursor: ${props => props.direction === 'horizontal' ? 'row-resize' : 'col-resize'};
  border-left: ${setBorder('vertical')};
  border-right: ${setBorder('vertical')};
  border-top: ${setBorder('horizontal')};
  border-bottom: ${setBorder('horizontal')};
  &:hover {
    opacity: ${props => props.hover || .5};
  }
`

const background = document.getElementById('dimmer')

function getCoords(elem) {
  var box = elem.getBoundingClientRect()

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    width: box.width,
    height: box.height,
  }
}

let bodyUserSelect
let params = {start: null, param: null}

const saveSettings = debounce((key, value) => {
  try {
    const settings = JSON.parse(localStorage.getItem('layout-settings')) || {}
    settings[key] = value
    localStorage.setItem('layout-settings', JSON.stringify(settings))
  } catch (e) {
    console.error(e)
  }
}, 250)

let lastClick = 0
const DOUBLE_CLICK_TIMEOUT = 250
let lastZoom = '0'

const Sizer = ({
  direction,
  color = '#ddd',
  border = 'rgba(0, 0, 0, .15)',
  size = '6px',
  style,
  cssVar,
  container,
  sign,
  children,
  max = direction === 'horizontal' ? window.innerHeight : window.innerWidth,
  min = 0,
  middle = 0,
  ...props
}) => {
  const ref = useRef(null)
  const handleMouseMove = e => {
    const shift = (direction === 'vertical' ? e.pageX : e.pageY) - params.start
    const newValue = `${Math.floor(params.param + shift * sign)}px`
    document.body.style.setProperty(cssVar, newValue)
    saveSettings(cssVar, newValue)
  }

  const handleMouseUp = e => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    background.style.display = 'none'
    document.body.style['user-select'] = bodyUserSelect
  }

  const handleMouseDown = e => {
    const prevLastClick =  lastClick
    lastClick = Date.now()
    if (Date.now() - prevLastClick < DOUBLE_CLICK_TIMEOUT) {
      const currentValue = String(document.body.style.getPropertyValue(cssVar))
      console.log(currentValue, lastZoom, min, max)
      let zoom
      if (currentValue === min || currentValue === max) {
        zoom = middle
        lastZoom = currentValue
      } else if (lastZoom === min) {
        zoom = max
        lastZoom = max
      } else if (lastZoom === max) {
        zoom = min
        lastZoom = min
      }
      document.body.style.setProperty(cssVar, zoom)
      saveSettings(cssVar, zoom)
      return
    }
    background.style.cursor = direction === 'vertical' ? 'col-resize' : 'row-resize'
    background.style.display = 'block'
    bodyUserSelect = document.body.style['user-select'] || ''
    document.body.style['user-select'] = 'none'

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    if (direction === 'vertical') {
      params.start = e.pageX
      params.param = getCoords(container).width
    } else {
      params.start = e.pageY
      params.param = getCoords(container).height
    }
  }

  useEffect(() => {
    ref.current.addEventListener('mousedown', handleMouseDown)
    return () => {
      ref.current.removeEventListener('mousedown', handleMouseDown)
    }
  }, [container])

  return (
    <StyledSizer
      className="layout-sizer"
      ref={ref}
      direction={direction}
      color={color}
      border={border}
      size={size}
      style={style}
      {...props}
    >
      {children}
    </StyledSizer>
  )
}

export default Sizer
