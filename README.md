# BunAdmin

A simple graphql admin dashboard(Front-End Only). Easy to expand with the flexible plugin. Graphql first, also supports api. Based on React, Next.js, Material-UI, Realtime RxDB, Formik, I18N. Free and Open Source for personal and commercial purposes.

## Feature

* ✅ &nbsp; Package / Use as a node module *
* ✅ &nbsp; Plugins / One-click Update Plugins *
* ✅️ &nbsp; Multi-user *
* ✅️ &nbsp; Multi-language
* ✅ &nbsp; Data migration *
* ✅ &nbsp; Log / message *
* ✅ &nbsp; Common Components
* ✅ &nbsp; MDX Documentation
* ✅ &nbsp; Dockerfile & Deploy Shell

## Quick Start

```shell script
yarn create react-app my-admin --template bunadmin
cd my-admin
yarn update-plugins && yarn dev
```

Open [http://localhost:1911/](http://localhost:1911/)

[Example Code](https://github.com/bunred/bunadmin-example.git)

## Screenshot
Sign in
![Sign in](https://gblobscdn.gitbook.com/assets%2F-M1ZbjnBaWO_NJOdj8_A%2F-M6mhhE1-tUO_GCYLgQI%2F-M6miE4Tjmp-npJcYvYz%2Fsign-in.png)

Data Migration
![Data Migration](https://gblobscdn.gitbook.com/assets%2F-M1ZbjnBaWO_NJOdj8_A%2F-M6mrbAysZsBxMpDj2In%2F-M6mj7lcCEI3UeWeLkip%2Fcore-migration.png)

[More screenshots](https://chris533.gitbook.io/bunadmin/screenshot)

## Plugins

*Functions need to be implemented by plugins, you need to build and update plugin-info*
```json
[
  {
    "enable": true,
    "plugin-id": "bunadmin-plugin-auth",
    "plugin-folder": "buncms-user"
  }
]
```

**Required**

[User Auth](https://github.com/bunred/bunadmin-plugin-buncms-user): api example

Examples

[Strapi User](https://github.com/bunred/bunadmin-plugin-buncms-strapi-user): api example

[File Explore](https://github.com/bunred/bunadmin-plugin-buncms-file): graphql example

[Data Source Strapi](https://github.com/bunred/bunadmin-plugin-data-source-strapi): data source api example

[Strapi Blog](https://github.com/bunred/bunadmin-plugin-strapi-blog-example): api example

---

#### Plugin structure

- /plugins/[team]-[group]
    - /[name]
        - index.tsx
        - column.tsx
        - types.ts
    - /[name]
        - index.tsx
        - column.tsx
        - types.ts
    - /utils
        - i18n/
            - en.ts
            - zh.ts
        - initData.ts
    - package.json

Example:
- /plugins/bunadmin-blog
    - /post
        - index.tsx
        - column.tsx
    - /category
        - index.tsx
    - /utils
        - initData.ts
    - package.json
    
## Develop

#### intData

Used to generate schema and menus data. [example code](https://github.com/bunred/bunadmin-plugin-strapi-blog-example/blob/master/utils/initData.tsx)

#### Column
Column define how your data looks. [example code](https://github.com/bunred/bunadmin-plugin-buncms-user/blob/master/list/columns.tsx) | [read more](https://material-table.com/#/docs/get-started)

#### Theme

There is only one theme for now which refers to [ngx-admin](https://github.com/akveo/ngx-admin).

#### Deployment
```
cp e.g./deploy-*.sh deploy-my-admin.sh
./deploy.sh
```
AliCloud:

*Append the following content to* `deploy.sh`
```
docker tag ${container} registry.cn-shenzhen.aliyuncs.com/bunlu/${container}:1.0.1
docker push registry.cn-shenzhen.aliyuncs.com/bunlu/${container}:1.0.1
```

Heroku:
*Checkout the branch* `delpoy_heroku_example`
*Replace the following content to* `deploy.sh`
```
heroku container:push web
heroku container:release web
```

## Demo
[Online Demo](https://strapi-demo.bunadmin.com/)

[Documentation](https://strapi-demo.bunadmin.com/doc/components/table)

Username / password: `bunadmin_test`

See more on [bunadmin-example-strapi](https://github.com/bunred/bunadmin-example-strapi)

#### Backup private files
Usually you need to manually backup the following files

* env-prod.env
* deploy-my-admin.sh

#### Create your own document
*Use mdx to combine your own components.*

Add these two plugins to `plugin-info.json`
[doc](https://github.com/bunred/bunadmin-plugins/blob/master/navigation/documentation/bunred/bunadmin-plugin-doc.json) [file](https://github.com/bunred/bunadmin-plugins/blob/master/navigation/file-upload/bunred/bunadmin-plugin-buncms-file.json)

Refer to [bunadmin-plugin-doc](https://github.com/bunred/bunadmin-plugin-doc.git) to make your document

#### Thanks

[material-ui](https://github.com/mui-org/material-ui)
[material-table](https://github.com/mbrn/material-table)
[next.js](https://github.com/zeit/next.js)
[rxdb](https://github.com/pubkey/rxdb)
[formik](https://github.com/jaredpalmer/formik)
[ngx-admin](https://github.com/akveo/ngx-admin)
[ant-design-pro](https://github.com/ant-design/ant-design-pro)
[react-admin](https://github.com/marmelab/react-admin)
...

❤️🎉
