import rxDb from "./rxConnect"

interface RxProps {
  collection: string
  sort?: any
  where?: any
  callback: (data: any) => void
}

export default async function rxQuery({
  collection,
  where,
  sort,
  callback
}: RxProps) {
  const db = await rxDb()

  const query = db[collection]
    .find()
    .where(where || {})
    .sort(sort || {})
  const results = await query.exec()

  callback(results)
}
