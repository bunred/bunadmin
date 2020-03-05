export const Primary = "id"

export const Schema = {
  title: "Schema Manager",
  description: "Manage schemas with dynamic routes",
  version: 0,
  type: "object",
  properties: {
    [Primary]: {
      type: "string",
      primary: true
    },
    created_at: {
      type: "number",
      index: true
    },
    updated_at: {
      type: "number",
      index: true
    },
    team: {
      type: "string"
    },
    group: {
      type: "string"
    },
    name: {
      type: "string"
    },
    label: {
      type: "string"
    },
    path: {
      type: "string"
    },
    columns: {
      type: "string"
      // items: {
      //   type: "object"
      // properties: {
      //   title: {
      //     type: "string"
      //   },
      //   field: {
      //     type: ["string", "null"]
      //   },
      //   editable: {
      //     type: "string",
      //     enum: ["always", "onUpdate", "onAdd", "never"]
      //   },
      //   hidden: {
      //     type: "boolean"
      //   }
      // },
      // required: ["title", "field", "editable"]
      // } // items
    } // columns
  },
  required: ["team", "group", "name", "columns"]
}
