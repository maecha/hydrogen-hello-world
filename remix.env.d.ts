/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// TypeScriptの組み込み型定義を強化
import '@total-typescript/ts-reset';

import type {Storefront} from '@shopify/hydrogen';
import type {HydrogenSession} from './server';
import type {HydrogenCart} from '@shopify/hydrogen';

declare global {
  /**
   * グローバルな`process`オブジェクトは、NODE_ENVにアクセスするためのビルド中にのみ利用可能
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * フェッチハンドラ内で予期されるEnvパラメータの宣言
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
  }
}

/**
 * `server.ts`で注入したセッションユーティリティを含めるために、`AppLoadContext`へのローカルな追加を宣言
 */
declare module '@shopify/remix-oxygen' {
  export interface AppLoadContext {
    env: Env;
    storefront: Storefront;
    session: HydrogenSession;
    waitUntil: ExecutionContext['waitUntil'];
    cart: HydrogenCart;
  }
}
