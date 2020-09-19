import React, { useEffect, useState } from "react"
import DefaultLayout from "@/layouts/DefaultLayout"
import CommonError from "@/components/CommonError"
import { Type } from "@/core/menu/types"
import { Box } from "@material-ui/core"
import dynamic from "next/dynamic"
import TableSkeleton from "@/components/CommonTable/components/TableSkeleton"
import Head from "next/head"
import { MDXProvider } from "@mdx-js/react"
import Highlight, { defaultProps } from "prism-react-renderer"
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { ENV } from "@/utils";
// import theme from "prism-react-renderer/themes/vsDark"

export default function DocCategorySlug() {
  const router = useRouter()
  const { category, slug } = router.query as ParsedUrlQuery

  const [menuData, setMenuData] = useState<Type[]>([])

  const bunadminDocPath = "bunadmin-docs"

  useEffect(() => {
    ;(async () => {
      try {
        const content = await import(`@plugins/${bunadminDocPath}/menus`)
        const menuData = content && (content.default as Type[])
        setMenuData(menuData)
      } catch (e) {}
    })()
  }, [])

  const DocComponent = dynamic({
    loader: () => import(`@plugins/${bunadminDocPath}/${category}/${slug}.mdx`),
    loading: () => <TableSkeleton title={`${slug} loading...`} />
  })

  const pCss = "/assets/css/prism.css"

  return (
    <>
      <Head>
        <title>{slug} - {category} - {ENV.SITE_NAME}</title>
        {<link rel="stylesheet" href={pCss} />}
      </Head>
      <DefaultLayout leftMenu={{ data: menuData, offLeftSetting: true }}>
        {slug ? (
          <Box p={3} pt={1}>
            <MDXProvider components={{ code: Code }}>
              <DocComponent />
            </MDXProvider>
          </Box>
        ) : (
          <CommonError statusCode={404} hasLayout={false} />
        )}
      </DefaultLayout>
    </>
  )

  function Code({ children, className }: any) {
    if (!className) return null
    const language = className.replace(/language-/, "")
    return (
      <Highlight
        {...defaultProps}
        theme={undefined}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  }
}
