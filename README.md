# Hydrogen テンプレート: Hydrogen Hello World

Shopify のヘッドレスコマース用フルスタック Web フレームワーク Hydrogen (Remix) のスターターテンプレートです。このスターターにはコンポーネント、クエリ、ツールの最小限のセットアップが含まれています。

- [Hydrogen ドキュメント](https://shopify.dev/custom-storefronts/hydrogen)
- [Remix ドキュメント](https://remix.run/docs/en/2.0.0)

## 開発ツール

- Hydrogen (v2)
- Remix
- Shopify CLI
- ESLint
- Prettier
- TypeScript
- PostCSS
- Headless UI
- Vitest

## はじめに

**必要条件:**

- Node.js のバージョンは 18.16.0 をご利用ください

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
