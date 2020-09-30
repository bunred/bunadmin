import { IPluginData } from "@bunred/bunadmin"
const plugin = "strapi-example-blog"
const commonProps = {
  team: "example",
  group: "blog",
  customized: true
}
const data: IPluginData[] = [
  {
    ...commonProps,
    id: "example_blog",
    name: "example_blog",
    label: "Blog",
    icon_type: "eva",
    icon: "file-text-outline",
    ignore_schema: true
  },
  {
    ...commonProps,
    id: "example_blog_post",
    name: "post",
    label: "Post",
    parent: "example_blog"
  },
  {
    ...commonProps,
    id: "example_blog_category",
    name: "category",
    label: "Category",
    parent: "example_blog"
  }
]

export default { plugin, data }
