import rxDb from "./rxConnect"

interface RxSubscribeProps {
  collection: string
  sort?: any
  callback: (data: any) => void
}

export default async function rxSubscribe({
  collection,
  sort,
  callback
}: RxSubscribeProps) {
  const db = await rxDb()
  db[collection]
    .find()
    .sort(sort || {})
    .$.subscribe((data: any) => {
      if (!data) return
      callback(data)
    })
}
