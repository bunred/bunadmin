import React from "react"
import Error from "../src/private/Error"

export default function Error404() {
  return <Error statusCode={404} hasLayout={false} />
}
