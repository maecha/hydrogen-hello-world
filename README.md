# Hydrogen テンプレート: Hydrogen Hello World

Shopify のヘッドレスコマース用フルスタック Web フレームワーク Hydrogen ( [Remix](https://remix.run/) ) のスターターテンプレートです。このスターターにはコンポーネント、クエリ、ツールの最小限のセットアップが含まれています。

- [Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
- [Get familiar with Remix](https://remix.run/docs/en/2.0.0)

## 含まれるもの

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## はじめに

**必要条件:**

- Node.js のバージョンは 16.14.0 以上をご利用ください

```bash
npm create @shopify/hydrogen@latest -- --template hydrogen-hello-world
```

ご自身のショップのドメインと Storefront API トークンを`.env`に反映してください。

## 本番環境用のビルド

```bash
npm run build
```

## 開発環境の実行

```bash
npm run dev
```
