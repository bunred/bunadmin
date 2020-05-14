# BunAdmin

A simple graphql admin dashboard(Front-End Only). Easy to expand with the flexible plugin. Graphql first, also supports api. Based on React, Next.js, Material-UI, Realtime RxDB, Formik, I18N. Free and Open Source for personal and commercial purposes.

## Feature

* [✔️] Plugin *
* [✔️] Multi-user *
* [✔️] Multi-language
* [✔️] Data migration *
* [✔️] Log / message *
* [✔️] Dockerfile & Deploy Shell

### Demo
[Online demo](http://bunadmin-example-strapi.herokuapp.com/)

Username / password: `bunadmin_test`

See more on [bunadmin-example-strapi](https://github.com/bunred/bunadmin-example-strapi)

## Screenshot
Sign in
![Sign in](https://gblobscdn.gitbook.com/assets%2F-M1ZbjnBaWO_NJOdj8_A%2F-M6mhhE1-tUO_GCYLgQI%2F-M6miE4Tjmp-npJcYvYz%2Fsign-in.png)

Data Migration
![Data Migration](https://gblobscdn.gitbook.com/assets%2F-M1ZbjnBaWO_NJOdj8_A%2F-M6mrbAysZsBxMpDj2In%2F-M6mj7lcCEI3UeWeLkip%2Fcore-migration.png)

[More screenshots](https://chris533.gitbook.io/bunadmin/screenshot)


## How to use
Download the code [or clone the repo](https://github.com/bunred/bunadmin):

```sh
git clone https://github.com/bunred/bunadmin.git
cd bunadmin
```

Install it and run: (You can [install the Yarn v1.2.0+ package here](https://yarnpkg.com/))

```sh
yarn
cp env-example.js env.js
yarn run dev
```
Open [http://localhost:1911/](http://localhost:1911/)
```
cd plugins
git clone https://github.com/bunred/bunadmin-plugin-buncms-user.git buncms-user
yarn
```
Refresh preview.

## Plugin

**Required plugin:**

[User Auth](https://github.com/bunred/bunadmin-plugin-buncms-user): api example

Example plugin: 

[Strapi User](https://github.com/bunred/bunadmin-plugin-buncms-strapi-user): api example

[File Explore](https://github.com/bunred/bunadmin-plugin-buncms-file): graphql example

[Data Source Strapi](https://github.com/bunred/bunadmin-plugin-data-source-strapi): data source api example

[Strapi Blog](https://github.com/bunred/bunadmin-plugin-strapi-blog-example): api example

*You should clone to build your own plugin*

A new plugin's structure demo:

- /plugins/[team]-[group]
    - /[name]
        - index.tsx
        - column.tsx
        - /utils
            - initData.tsx
    - /[name]
        - index.tsx
    - package.json

Example:
- /plugins/bunadmin-blog
    - /post
        - index.tsx
        - column.tsx
        - /utils
            - initData.tsx
    - /category
        - index.tsx
    - package.json

#### intData

Used to generate schema and menus data. [example code](https://github.com/bunred/bunadmin-plugin-strapi-blog-example/blob/master/utils/initData.tsx)

#### Column
Column define how your data looks. [example code](https://github.com/bunred/bunadmin-plugin-buncms-user/blob/master/list/columns.tsx) | [read more](https://material-table.com/#/docs/get-started)

#### Theme

There is only one theme for now which refers to [ngx-admin](https://github.com/akveo/ngx-admin).

#### Deployment
```
cp deploy-example.sh deploy.sh
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
