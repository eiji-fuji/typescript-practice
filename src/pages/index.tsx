import type { NextPage } from 'next'
import { css } from '@emotion/react'
// component
import Contents from '@/components/Contents'

const wrapper = css({
  height: '100%',
})

const Home: NextPage = () => {
  return (
    <div css={wrapper}>
      <Contents />
    </div>
  )
}

export default Home
