import RxDB from "rxdb"
import { rxCollections } from "./rxCollections"
import { RxDatabase } from "rxdb/dist/typings/types"

RxDB.plugin(require("pouchdb-adapter-idb"))
RxDB.plugin(require("pouchdb-adapter-memory"))
RxDB.plugin(require("pouchdb-adapter-http")) //enable syncing over http

const adapter = process.env.NODE_ENV === "test" ? "memory" : "idb"

let dbPromise = false as boolean | Promise<RxDatabase<any>>

const _create = async () => {
  const db = await RxDB.create({
    name: "bunadmin", // <- name
    adapter: adapter, // <- storage-adapter
    password: "JUUFblX8pY9BeBs9RF68N7n", // <- password (optional)
    multiInstance: true, // <- multiInstance (optional, default: true)
    queryChangeDetection: false, // <- queryChangeDetection (optional, default: false)
    ignoreDuplicate: true
  })
  // console.log("DatabaseService: created database")

  // create collections
  await Promise.all(rxCollections.map(collObj => db.collection(collObj)))
  // console.log("DatabaseService: create collections")

  return db
}

export default function rxDb() {
  if (!dbPromise) dbPromise = _create()
  return dbPromise
}
