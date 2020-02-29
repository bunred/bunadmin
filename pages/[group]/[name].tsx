import React, {useEffect, useState} from "react"
import CommonSchema from "../../src/components/CommonSchema"
import DefaultLayout from "../../src/layouts/DefaultLayout"
import {useRouter} from "next/router"
import CorePages from "../../src/components"

interface Interface {
  group: string
  name: string
}

const ModulePage = () => {
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const { group, name } = (router.query as unknown) as Interface

  useEffect(() => {
    if (!group || !name) return
    setReady(true)
  }, [group])

  if (!ready) return null

  return (
    <DefaultLayout>
      {
        group === "core"
          ? <CorePages/>
          : <CommonSchema />
      }
    </DefaultLayout>
  )
}

export default ModulePage