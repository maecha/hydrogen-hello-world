import {useLoaderData, Link} from '@remix-run/react';
import {DataFunctionArgs} from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import {COLLECTIONS_QUERY} from '~/lib/queries/index';

type Collection = {
  id: string;
  title: string;
  handle: string;
  image: ImageType;
};

// `root.tsx`で定義したmeta関数を呼び出す
export function meta() {
  return [
    {title: 'Hydrogen テスト'},
    {description: 'カスタムフロント powered by Hydrogen'},
  ];
}

export async function loader({context}: DataFunctionArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const data = useLoaderData();

  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        コレクション
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {data?.collections.nodes.map((collection: Collection) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              <div className="grid gap-4">
                {collection?.image && (
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    crop="center"
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                  {collection.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
