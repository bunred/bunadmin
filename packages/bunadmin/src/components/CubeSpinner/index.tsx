import React from "react"

export default function CubeSpinner() {
  React.useEffect(() => {
    document.title = "Loading..."
  }, [])

  return (
    <>
      <div id="main">
        <span className="spinner" />
      </div>
    </>
  )
}
