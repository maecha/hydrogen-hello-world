import {useLoaderData} from '@remix-run/react';
import {json, DataFunctionArgs} from '@shopify/remix-oxygen';
import {getPaginationVariables} from '@shopify/hydrogen';
import ProductGrid from '../components/ProductGrid';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';

// root.tsxで定義したmeta関数を呼び出す
export function meta({data}: any) {
  return [
    {title: data?.collection?.title ?? 'Collection'},
    {description: data?.collection?.description},
  ];
}

// Doc: https://shopify.dev/docs/custom-storefronts/hydrogen/building/collection-page#step-6-seo
// https://remix.run/docs/en/1.19.3/route/handle
const seo = ({data}: any) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});
export const handle = {
  seo,
};

export async function loader({params, context, request}: DataFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });
  const {handle} = params;
  const {collection} = await context.storefront.query<{collection: Collection}>(
    COLLECTION_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle,
      },
    },
  );

  // Handle 404 errors
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  });
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
      <ProductGrid
        collection={collection}
        url={`/collections/${collection.handle}`}
      />
    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
      ) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  `;
