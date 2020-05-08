# BunAdmin

A simple graphql admin dashboard(Front-End Only). Easy to expand with the flexible plugin. Graphql first, also supports api. Based on React, Material-UI, Realtime RxDB, Formik, I18N. Free and Open Source for personal and commercial purposes.

## Main Feathers

* [✔️] Plugin *
* [✔️] Multi-user *
* [✔️] Multi-language
* [✔️] Data migration *
* [✔️] Log / message *
* [✔️] Dockerfile & Deploy Shell

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
yarn run dev
```

## Plugin

Required plugin:
[User Auth](https://github.com/bunred/bunadmin-plugin-buncms-user): use api

Example plugin: 
[File Explore](https://github.com/bunred/bunadmin-plugin-buncms-file): use graphql

A new plugin's structure should look like this:

- /plugins/[team]-[group]
    - /[name]
        - index.tsx
    - /[name]
        - index.tsx
    - package.json

Example:
- /plugins/bunadmin-blog
    - /post
        - index.tsx
    - /category
        - index.tsx
    - package.json

[User Auth Plugin](https://github.com/bunred/bunadmin-plugin-buncms-user)
[File Explore Plugin](https://github.com/bunred/bunadmin-plugin-buncms-file)

#### About intData file

Used to generate menus and data models

#### Theme

There is only one theme for now, borrowed style from [ngx-admin](https://github.com/akveo/ngx-admin)

#### Thanks

[material-ui](https://github.com/mui-org/material-ui)
[material-table](https://github.com/mbrn/material-table)
[rxdb](https://github.com/pubkey/rxdb)
[formik](https://github.com/jaredpalmer/formik)
[ngx-admin](https://github.com/akveo/ngx-admin)
[ant-design-pro](https://github.com/ant-design/ant-design-pro)
[react-admin](https://github.com/marmelab/react-admin)
...

❤️🎉
