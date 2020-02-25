import { useRouter } from 'next/router'

const ModulePage = () => {
  const router = useRouter()
  const { group, name } = router.query

  return <p>{group}: {name}</p>
}

export default ModulePage