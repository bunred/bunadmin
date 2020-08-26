import { IPluginData } from "@bunred/bunadmin"

export default {
  plugin: "strapi-blog-example",
  data: [
    {
      id: "strapi_blog",
      group: "blog",
      name: "blog",
      label: "Blog",
      team: "bunadmin",
      icon_type: "eva",
      icon: "file-text-outline",
      rank: "100",
      ignore_schema: true
    },
    {
      id: "strapi_blog_post",
      group: "blog",
      name: "post",
      label: "Post",
      team: "bunadmin",
      customized: true,
      icon_type: "eva",
      icon: "file-text-outline",
      rank: "100",
      parent: "blog"
    },
    {
      id: "strapi_blog_category",
      group: "blog",
      name: "category",
      label: "Categorie",
      team: "bunadmin",
      customized: true,
      icon_type: "eva",
      icon: "clipboard-outline",
      rank: "90",
      parent: "blog"
    }
  ] as IPluginData[]
}
