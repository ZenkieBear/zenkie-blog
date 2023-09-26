---
title: 'Linters make collaboration better'
date: '2023-09-25'
---

# What are linters & Why should we use them

Linter is a type of tool that helps us **unify** our development style, it’s very common in opensource **collaboration**. It helps us find and resolve our logical problems, make our code styke prettier. By using them, our development level will be improved and team collaboration will be smooth.

# Which linter we should use?

There’re many linters:

- JavaScript: [ESLint](https://eslint.org/), [JSLint](https://www.jslint.com/), [JSHint](https://jshint.com/), ...
- Python: [Flake8](https://flake8.pycqa.org/en/latest/), [Pylint](https://pylint.readthedocs.io/en/latest/), ...
- Ruby: [RuboCop](https://github.com/rubocop/rubocop), ...

I recommended you use ESLint, it could find our problem, potential errors, and it could support not just JavaScript. You could configure plugins to check other languages.
You can choose some popular rule-set such as standardjs, eslint-config-airbnb, then you don’t need to manage your rules, and these style is accepted.

## ESLint Core Concepts

I just explain these **key concepts** and **how to use it**, if you wanna implement some advance features, you need to read the [ESLint document](https://eslint.org/docs/latest/use/getting-started).

- **Rules**: validate if your code meets a certain expectation, and what to do if it doesn’t meet that expectation.
- **Plugins**: an npm module contain a **set of ESLint rules**, configurations, processors and environments.
- **Parser**: convert code into an AST(abstract syntax tree) that ESLint can evalution. Custom parser let ESLint parse non-standard JavaScript syntax, such as TypeScript, Vue, and even Markdown.

## Build ESLint app

Build an ESLint project:

```shell
npm init @eslint/config
```

Import to your project:

```shell
npx eslint --init
```

## Linting

Let’s create a `test.js` in our project:

```js
const a = 1024;
const b;
```

Test:

```shell
npx eslint test.ts

.../test.ts
  1:7  error  'a' is assigned a value but never used  no-unused-vars
  2:7  error  'b' is defined but never used           no-unused-vars

✖ 2 problems (2 errors, 0 warnings)
```

## Configuration

There should be an `.eslintrc.{js,yml,json}` file in your project directory:

```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
  //...
}
```

The “semi” and “quotes” are ESLint built-in rules.
The first value is the error level of the rule and can be one of these values:

- `"off" or 0` - turn the rule off
- `"warn" or 1` - turn the rule on as a warning (doesn’t affect exit code)
- `"error" or 2` - turn the rule on as an error (exit code will be 1)

The `eslint:recommended` is a set of rules, put it into “extends” means turn all these rules on.

## StandardJS

Manage the configuration file is complex, you can use [StandardJS](https://standardjs.com/readme-en), it’s easy to understand, no configuring, and it’s build with ESLint. So you can customize rules further.

# Prettier

ESLint could find our problems and keep our code consistent, If we want to make our code style consistent, we could import [Prettier](https://prettier.io/) to our project. It could adjust our code style to the standardized style.

As far as I know, ESLint is gradually implementing this feature, but I recommend you choose Prettier. This allows us to focus on style, rather than mixing logic and style together.

It's simplify to configure with Prettier, follow my steps:

## Install

**Without ESLint**

```shell
npm install --save-dev prettier
```

**With ESLint**

```shell
npm install --save-dev eslint-config-prettier
```

`eslint-config-prettier` can make ESLint and Prettier [play nice](https://prettier.io/docs/en/install#eslint-and-other-linters) with each other. Remember put `prettier` at the last one of `extends`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@next/next/recommended"
    "prettier",
  ]
}
```

## Configuration

Choose your configuration file [type](https://prettier.io/docs/en/configuration), I use JSON here:

```json
{
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true
}
```

You can find these [options](https://prettier.io/docs/en/options) refer to Prettier document.

## Execute

Check propblems:

```shell
npx prettier -c .
```

Format and Write to origin file:

```shell
npx prettier -w .
```

I recommend straight use `-w`, because prettier don’t change your logic.

# Git Hooks

You can run Prettier as a `pre-commit` hook, this makes sure all your commits are linted and formatted.

```shell
npm install --save-dev husky lint-staged
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

This command:

1. Installed `Husky` and `lint-staged`. [Husky](https://github.com/typicode/husky) could help you make git hooks.
   [lint-staged](https://github.com/okonet/lint-staged) Let you process something to staged files.
2. Added a script to `package.json` - `scripts`, "hustky install" let husky install necessary contents.
3. Added a command to `pre-commit` hook, the command processed `lint-staged`.

## Configure lint-staged

We need to configure `lint-staged` behaviors, create a `.lintstagedrc.js` in you project root directory:

```js
const path = require('path')

const testEslint = names =>
  `eslint ${names.map(name => path.relative(process.cwd(), name)).join(' ')}`
const prettiering = names =>
  `prettier -w ${names
    .map(name => path.relative(process.cwd(), name))
    .join(' ')}`
module.exports = {
  '*.{ts,tsx,js,jsx}': [testEslint, prettiering]
}
```

`testEslint` and `prettiering` are functions that generates the command with filenames.

# Ending

This is the workflow model: Commit -> lint-staged -> ESLint & Prettier -> Commit Success.
Thank you for reading!
