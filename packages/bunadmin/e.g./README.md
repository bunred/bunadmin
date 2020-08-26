Copy files to the root path and rename to your custom name:
```shell script
cp e.g/env-*.env env-bunadmin-dev.env
cp e.g/env-*.env env-bunadmin-stag.env
...
cp e.g/deploy-*.sh deploy-bunadmin.sh
...
cp e.g/plugin-info.json plugin-info.json
```
Don't push them to Github please, you can see the rules in .gitignore.
