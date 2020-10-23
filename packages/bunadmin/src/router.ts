import { useParams, useLocation, useHistory } from "react-router-dom"

export type Router = {
  asPath: any
  query: any
  route: string
  push: (url: string, url2?: string) => void
  replace: (url: string) => void
}

export function useRouter(): Router {
  const history = useHistory()

  const query: any = useParams()
  let route: any = useLocation()
  route = route.pathname

  const push = async (url: string, url2?: string) => {
    if (url && !url2) history.push(url)
    if (url2) history.push(url2)
  }
  const replace: any = async (url: string) => {
    history.push(url)
  }

  return {
    asPath: route,
    query,
    route,
    push,
    replace
  }
}
