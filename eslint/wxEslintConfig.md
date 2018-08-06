## 原生小程序 eslint配置

```
<!-- .eslintrc.json 文件 -->
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": 0
    },
    "globals": {
        "Page": false,
        "Component": false,
        "wx": false,
        "App": false,
        "getApp": false,
        "getCurrentPages": false
    }
}
```
