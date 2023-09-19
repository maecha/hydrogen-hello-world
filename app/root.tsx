import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import {Layout} from './components/Layout';
import {Seo} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {DataFunctionArgs, LinksFunction} from '@shopify/remix-oxygen';
import {useNonce} from '@shopify/hydrogen';
import {LAYOUT_QUERY} from '~/lib/queries/root';
// TODO: https://shopify.dev/docs/custom-storefronts/hydrogen/migrate-hydrogen-remix#step-12-add-a-404-page
// import {useCatch} from '@remix-run/react';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';

// https://remix.run/docs/en/main/components/links
export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export async function loader({context}: DataFunctionArgs) {
  const {cart} = context;

  return defer({
    cart: await cart.get(),
    layout: await context.storefront.query<{shop: Shop}>(LAYOUT_QUERY),
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const {shop} = data.layout;

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout title={shop.name}>
          <Outlet />
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
