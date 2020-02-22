import { RefObject } from "react"

interface Interface {
  myRef: RefObject<HTMLDivElement>
}

export function addTdController({ myRef }: Interface) {
  setTimeout(() => {
    // waiting for create <tr mode='add' /> element

    if (!myRef.current) return
    myRef.current.focus()
    const boxNode = myRef.current.parentNode

    if (!boxNode) return
    const tempTrNode = boxNode.querySelector(
      "[class^='MuiTableRow-root'][mode='add']"
    )

    const tdNode = document.createElement("td")
    tdNode.classList.add(
      "MuiTableCell-root",
      "MuiTableCell-body",
      "MuiTableCell-paddingNone"
    )

    if (!tempTrNode) return
    tempTrNode.insertBefore(tdNode, tempTrNode.firstChild)
  }, 500)
}
