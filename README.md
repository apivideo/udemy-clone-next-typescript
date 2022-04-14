<p align="center">
<a  href="https://github.com/muxinc/stream.new">
    <img src="https://github.com/apivideo/api.video-api-specification/blob/master/apivideo_banner.png?raw=true" alt="Api.video Logo" width="100%" >
</a>
</p>
<h1 align="center">Udemy clone with api.video + Next.js + Typescript 🔥</h1>
<div align="center">
    <a href="https://twitter.com/intent/follow?screen_name=api_video"><img src="https://img.shields.io/twitter/follow/api_video?style=social" alt="Twitter Badge"/></a>
    <a href="https://community.api.video"><img src="https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video" alt="Pull Requests Badge"/></a>
</div>
<br />

<p align="center">
An open-source example application that allows users to create a learning plaform like Udemy with<a href="https://api.video" target="_blank" >api.video</a>
<br />
 <br />
<a href="#link to demo">View Demo</a>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#step-1-clone">Step 1. Clone</a></li>
        <li><a href="#step-2-create-an-account">Step 2. Create an Account</a></li>
        <li><a href="#step-3-set-up-environment-variables">Step 3. Set Up Environment Variables</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About The Project

### Api.video:

- [@api.video/nodejs-client.](https://github.com/apivideo/api.video-nodejs-client) - api.video's Node.js is a lightweight client built in TypeScript that streamlines the coding process. Chunking files is handled for you, as is pagination and refreshing your tokens.

### NextJS:

- [`/pages/api`](pages/api) routes — a couple endpoints for making requests to the api.video API.
- Dynamic routes to display a specific video.
- Usage of [React API Context](https://fr.reactjs.org/docs/context.html) to store a new ApiKey

<!-- GETTING STARTED -->

# Getting Started

## Step 1. Clone

First we need to clone the project

```bash
git clone git@github.com:apivideo/udemy-clone-next-typescript.git
cd udemy-clone-next-typescript

# run the development server
npm run dev
# or
yarn dev
```

## Step 2. Create an account

All you need to set this up is a [api.video account](https://dashboard.api.video). You can sign up for free. You can use our services in sandbox environment but the videos you upload will last 24 hours.

Once you signed up, you will have a sandbox API Key available on the home page.

## Step 3. Set Up Environment Variables

In order to see your videos by default, all you have to do is to use your API Key. You need to create a environment variable at the root of the project.

```bash
touch .env.development
```

Then edit the file like `API_KEY` should be your `API_KEY` available on the dashboard

```javascript
API_KEY = XXXXXXXXXXXXXXXXXXXXXXXXXXX;
```
## Project Configurations
**Configuration styled-components**

Since 12.1, Next.js added support to the Next.js Compiler for [styled-components](https://nextjs.org/docs/advanced-features/compiler#styled-components), update your `next.config.js` file:

```json
// next.config.js
module.exports = { 
	compiler: {
		styledComponents: true,
},
```

**[Create a custom _document.js file](https://www.notion.so/Blog-post-Udemy-clone-089f8a5b04374257acd54cb8bc2e8f49)**

To render our styled-components at the server-side, we need to override `_document.js.` For this, create a `_document.js` file under the pages folder and add the following content into it. We will use also use the google font [Roboto](https://fonts.google.com/specimen/Roboto).

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

**Typescript configuration**

In your root folder, create a `tsconfig.json`  file and copy the following TS configuration. I like to use absolute imports with `@` throughout the project.

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "allowSyntheticDefaultImports": true,
    "types": [
      "@typescript-eslint/eslint-plugin"
    ],
    "paths": {
      "@public/*": [
        "public/*"
      ],
      "@components/*": [
        "src/components/*"
      ],
			"@utils/*": [
        "src/utils/*"
      ]
    },
    "incremental": true
  },
  "include": [
    "next-env.d.ts",
    "@types/*.d.ts",
    "**/**/*.ts",
    "**/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
  ]
}
```

**Configuring next.config.js for SVG imports**

We are using some SVG imports in the project, so to make it work we need to install [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack) and add a little configuration in our `next.config.js` file. 

```bash
npm i @svgr/webpack
```

Copy this configuration to your `next.config.js` file:

```jsx
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
```