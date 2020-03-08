# BunAdmin

## How to use

Download the code [or clone the repo](https://github.com/bunred/bunadmin):

```sh
git clone https://github.com/bunred/bunadmin.git
cd bunadmin
```

Install it and run:

```sh
npm install
npm run dev
```

## Plugin

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