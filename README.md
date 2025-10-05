# @luanroger/notion-astro-loader

> [!NOTE]  
> This is a fork version of [KiritoKing](https://github.com/KiritoKing/notion-astro-loader) Notion Loader, with updated Notion API (using data source) and Astro 5 support.

[Notion](https://developers.notion.com/) loader for the [Astro Content Collections](https://docs.astro.build/en/guides/content-collections). It allows you to load pages from a Notion data source then render them as pages in a collection.

## Installation

```sh
# npm
npm install @luanroger/notion-astro-loader --save-dev
# pnpm
pnpm add @luanroger/notion-astro-loader -D
# yarn
yarn add @luanroger/notion-astro-loader -D
# bun
bun add @luanroger/notion-astro-loader -D
```

## Usage

Here it will not show how to create a Notion integration and connect it to your database. Please refer to the [official Notion documentation](https://developers.notion.com/docs/getting-started) for that.

### 1. Get Notion API Token & data source ID

Create a `.env` file in the root of your project and add the following environment variables:

```sh
# /.env
NOTION_TOKEN=your-notion-token
NOTION_DATA_SOURCE_ID=your-data-source-id
```

### 2. Use the loader

In your `src/content.config.ts` use the Notion loader in an collection:

```ts
import { defineCollection } from 'astro:content';
import { notionLoader } from '@luanroger/notion-astro-loader';

const database = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    dataSourceId: import.meta.env.NOTION_DATA_SOURCE_ID,
    // Optional: tell loader where to store downloaded aws images, relative to 'src' directory
    // Default value is 'assets/images/notion'
    imageSavePath: 'assets/images/notion',
    // Use Notion sorting and filtering with the same options like notionhq client
    filter: {
      property: 'Hidden',
      checkbox: { equals: false },
    },
  }),
});

export const collections = { database };
```
