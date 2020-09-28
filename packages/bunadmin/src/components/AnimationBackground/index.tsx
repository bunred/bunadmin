import React, { ReactElement } from "react"
import Head from "next/head"

function genSpan(len: number) {
  const indents = []
  for (let i = 0; i < len; i++) {
    indents.push(<span key={i} />)
  }
  return indents
}

interface BgsType {
  css: string
  html: ReactElement
}

const bg: BgsType = {
  css: "/assets/css/blurBg.css",
  html: <div className="blurBg">{genSpan(20)}</div>
}

export default function AnimatedRandomBG() {
  return (
    <>
      <Head>
        <title>Login</title>
        {<link rel="stylesheet" href={bg.css} />}
      </Head>
      {bg.html}
    </>
  )
}
