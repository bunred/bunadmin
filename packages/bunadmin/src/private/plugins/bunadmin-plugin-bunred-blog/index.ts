import { IPluginData } from "@bunred/bunadmin"

export { default as post } from "./post"

const shared = {
  team: "bunred",
  group: "blog",
  customized: true
}

export const initData: IPluginData[] = [
  {
    ...shared,
    id: "bunred_blog",
    name: "bunred_blog",
    label: "Blog",
    icon_type: "eva",
    icon: "file-text-outline",
    ignore_schema: true
  },
  {
    ...shared,
    id: "bunred_blog_category",
    name: "category",
    label: "Category",
    icon_type: "eva",
    icon: "file-text-outline",
    parent: "bunred_blog"
  },
  {
    ...shared,
    id: "bunred_blog_post",
    name: "post",
    label: "Post",
    icon_type: "eva",
    icon: "file-text-outline",
    parent: "bunred_blog"
  }
]
