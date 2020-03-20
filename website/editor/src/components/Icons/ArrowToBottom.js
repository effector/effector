import React from 'react'
import {styled} from 'linaria/react'


export const ArrowToBottom = styled(({color = '#2680eb', weight = 2, width = 22, height = 22, ...props}) => (
  <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width={width} height={height} {...props}>
    <defs>
      <path d="M12 19.5L12 3" id="a1307m5Nem" />
      <path d="M18 15L12 19.5L6 15" id="c1mCRZYV5R" />
      <path d="M18 21.5L6.18 21.5" id="gSVe45uif" />
    </defs>
    <g>
      <g>
        <g>
          <g>
            <use
              href="#a1307m5Nem"
              opacity="1"
              fillOpacity="0"
              stroke={color}
              strokeWidth={weight}
              strokeOpacity="1"
            />
          </g>
        </g>
        <g>
          <g>
            <use
              href="#c1mCRZYV5R"
              opacity="1"
              fillOpacity="0"
              stroke={color}
              strokeWidth={weight}
              strokeOpacity="1"
            />
          </g>
        </g>
        <g>
          <g>
            <use
              href="#gSVe45uif"
              opacity="1"
              fillOpacity="0"
              stroke={color}
              strokeWidth={weight}
              strokeOpacity="1"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
))`
  :hover {
    opacity: .75;
  }
`
