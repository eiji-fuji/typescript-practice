import { css } from '@emotion/react'

type Props = {
  add: () => void
  reset: () => void
}

const wrap = css({
  display: 'flex',
  width: '100%',
  height: '40px',
  background: '#92CC0A',
})

const button = css`
  width: 150px;
  height: 30px;
  margin: 5px;
  color: black;
  background-color: white;
  border-bottom: 5px solid #CCCCCC;
  &:hover {
    color: black;
    background: #DDDDDD;
    border-bottom: 2px solid #CCCCCC;
  }
  -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
  box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
`

const subtitle = css({
  fontSize: '24px',
  alignSelf: 'center',
  color: 'white',
  marginLeft: '20px',
  fontFamily: 'monospace',
})

const Bar = ({ add, reset }: Props) => {
  return (
    <div css={wrap}>
      <button css={button} onClick={() => add()}>
        ＋ add card
      </button>
      <button css={button} onClick={() => reset()}>
        reset card
      </button>
    </div>
  )
}

export default Bar
