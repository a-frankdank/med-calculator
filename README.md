# this is the medallion calculator for warframe standing

it should be self explanatory to any players of this game.

## it was started as next js app initially:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### attempts with pkg
```
npm install -g pkg

npm run build

changed node version to 18

added server.js

changes package.json
    pkg
    bin

pkg .
    creates an exe file

still does not serve:



  "bin": "server.js",
  "pkg": {
    "assets": [
      "public/**/*",
      "app/**/*",
      ".next/**/*",
    ],
    "scripts": [
      ".next/**/*.js",
    ],
    "targets": [
      "node18-win-x64"
    ]
  }



.\med-calculator.exe

It looks like you're trying to use TypeScript but do not have the required package(s) installed.
Installing dependencies

If you are not trying to use TypeScript, please remove the tsconfig.json file from your package root (and any TypeScript files in your pages directory).


Installing devDependencies (npm):
- typescript
- @types/react
- @types/node


up to date, audited 282 packages in 2s

106 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

TypeError: Cannot read properties of undefined (reading 'endsWith')
    at Module.require (C:\snapshot\med-calculator\node_modules\next\dist\server\require-hook.js:61:17)
    at require (node:internal/modules/cjs/helpers:102:18)
    at verifyTypeScriptSetup (C:\snapshot\med-calculator\node_modules\next\dist\lib\verify-typescript-setup.js:114:42)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async verifyTypeScript (C:\snapshot\med-calculator\node_modules\next\dist\server\lib\router-utils\setup-dev-bundler.js:111:26)
    at async startWatcher (C:\snapshot\med-calculator\node_modules\next\dist\server\lib\router-utils\setup-dev-bundler.js:132:29)
    at async setupDevBundler (C:\snapshot\med-calculator\node_modules\next\dist\server\lib\router-utils\setup-dev-bundler.js:1757:20)
    at async initialize (C:\snapshot\med-calculator\node_modules\next\dist\server\lib\router-server.js:69:30)
    at async NextCustomServer.prepare (C:\snapshot\med-calculator\node_modules\next\dist\server\next.js:240:28)

---------


  "bin": "server.js",
  "pkg": {
    "assets": [
      "public/**/*",
      ".next/*",
      ".next/server/**/*",
      ".next/static/**/*"
    ],
    "scripts": [
      ".next/server/**/*.js",
      "require.js"
    ],
    "targets": [
      "node18-win-x64"
    ]
  }

a few days later:

.\med-calculator.exe
C:\snapshot\med-calculator\node_modules\next\dist\lib\find-pages-dir.js:42
        throw new Error("> Couldn't find any `pages` or `app` directory. Please create one under the project root");
              ^

Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
    at findPagesDir (C:\snapshot\med-calculator\node_modules\next\dist\lib\find-pages-dir.js:42:15)
    at initialize (C:\snapshot\med-calculator\node_modules\next\dist\server\lib\router-server.js:69:69)
    at async NextCustomServer.prepare (C:\snapshot\med-calculator\node_modules\next\dist\server\next.js:240:28)

doesn't work, forget it

I am beginning to think that next js is garbage
and pkg is garbage

and I can't believe that ppl are flaunting docker images that kinda just npm run dev with their app
as viable deployment solutions
jesus
```

yeah forget pkg, this crap just doesn't work.