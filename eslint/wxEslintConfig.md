## 原生小程序 eslint配置

```json
<!-- .eslintrc.json 文件 -->
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
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
globals全局配置可以避免小程序定义的方法检测报错

![eslint 配置指南](https://cn.eslint.org/docs/user-guide/getting-started)
