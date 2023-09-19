import {Pagination} from '@shopify/hydrogen';
import ProductCard from './ProductCard';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';

type Props = {
  collection: Collection;
  url: string;
};

export default function ProductGrid({collection, url}: Props) {
  return (
    <section className="w-full gap-4 md:gap-8 grid">
      <Pagination connection={collection.products}>
        {({nodes, NextLink, PreviousLink, isLoading}) => (
          <>
            <div className="flex items-center justify-center mt-6">
              <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border w-full cursor-pointer">
                {isLoading ? 'Loading...' : 'Load previous products'}
              </PreviousLink>
            </div>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {nodes.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex items-center justify-center mt-6">
              <NextLink className="inline-block rounded font-medium text-center py-3 px-6 border w-full cursor-pointer">
                {isLoading ? '読み込み中...' : 'もっと商品を読み込む'}
              </NextLink>
            </div>
          </>
        )}
      </Pagination>
    </section>
  );
}
