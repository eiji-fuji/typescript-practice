import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { css } from '@emotion/react'

type Props = {
  children?: ReactNode
}

const header = css({
  display: 'flex',
  width: '100%',
  height: '60px',
  background: '#0BCBA4',
})

const homeIcon = css({
  height: '40px',
  margin: '10px',
})

const subtitle = css({
  fontSize: '24px',
  alignSelf: 'center',
  color: 'white',
  marginLeft: '20px',
  fontFamily: 'monospace',
})

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>MyTag</title>
      </Head>

      <header css={header}>
        <Link href='/'><img css={homeIcon} src='/home.svg' /></Link>
        <p css={subtitle}>Add stickies and store ideas!</p>
      </header>

      <div className='content'>{children}</div>

      <footer className=''></footer>
    </div>
  )
}

export default Layout
