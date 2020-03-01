import React, { useEffect, useState } from "react"
import Head from "next/head"

function genSpan(len: number) {
  const indents = []
  for (let i = 0; i < len; i++) {
    indents.push(<span key={i} />)
  }
  return indents
}

const bgs = [
  {
    css: "/assets/css/blurBg.css",
    html: <div className="blurBg">{genSpan(20)}</div>
  },
  {
    css: "/assets/css/circlesBg.css",
    html: (
      <div className="circlesBg">
        <ul className="circles">{genSpan(10)}</ul>
      </div>
    )
  }
]

function AnimatedRandomBG() {
  const [bg, setBg] = useState()

  useEffect(() => {
    const bg = bgs[parseInt(String(Math.random() * bgs.length))]
    setBg(bg)
  }, [])

  return (
    <>
      <Head>
        <title>Login</title>
        {bg && <link rel="stylesheet" href={bg.css} />}
      </Head>
      {bg && bg.html}
    </>
  )
}

export default AnimatedRandomBG
