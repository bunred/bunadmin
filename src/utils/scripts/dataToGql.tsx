/**
 * Material Table Data to Gql string
 */

interface Props {
  data: any
  nulls?: any | { parent_id: true }
}

export default function dataToGql({ data, nulls }: Props) {
  const fields: string[] = []
  Object.keys(data).map(key => {
    const value = data[key]
    const valueType = typeof value

    // key null for key in nulls
    if (!value && nulls && nulls[key]) {
      fields.push(`${key}: null`)
      return
    }

    if (!value) return

    if (valueType === "object") return

    fields.push(`${key}: "${value}"`)
  })

  const objects = fields.join(", ")
  return `{${objects}}`
}
