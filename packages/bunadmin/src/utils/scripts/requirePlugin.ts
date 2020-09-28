export default function requirePlugin(path: string) {
  try {
    return require(`@plugins/${path}`)
  } catch (err) {
    return null
  }
}
