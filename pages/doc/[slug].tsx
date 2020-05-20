import React, { useEffect, useState } from "react"
import matter from "gray-matter"
import DefaultLayout from "@/layouts/DefaultLayout"
import CommonError from "@/components/CommonError"
import { Type } from "@/core/menu/types"
import Markdown from "markdown-to-jsx"
import { Box } from "@material-ui/core"

export default function PostTemplate({ content, data }: any) {
  const [menuData, setMenuData] = useState<Type[]>([])

  // This holds the data between `---` from the .md file
  const mdData = data

  useEffect(() => {
    ;(async () => {
      try {
        const content = await import(`@plugins/bunadmin-doc/menus`)
        const menuData = content && (content.default as Type[])
        setMenuData(menuData)
      } catch (e) {}
    })()
  }, [])

  return (
    <DefaultLayout leftMenu={{ data: menuData, offLeftSetting: true }}>
      {mdData.title ? (
        <Box p={3} pt={1}>
          <Markdown>{content}</Markdown>
        </Box>
      ) : (
        <CommonError statusCode={404} hasLayout={false} />
      )}
    </DefaultLayout>
  )
}

PostTemplate.getInitialProps = async (context: { query: { slug: any } }) => {
  const { slug } = context.query
  // Import our .md file using the `slug` from the URL
  let content = { default: "" }
  try {
    content = await import(`@plugins/bunadmin-doc/components/${slug}.md`)
  } catch (e) {}

  // Parse .md data through `matter`
  const data = matter(content.default)

  // Pass data to the component props
  return { ...data }
}
