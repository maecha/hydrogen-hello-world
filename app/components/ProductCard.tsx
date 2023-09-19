import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

type Props = {
  product: Product;
};

export default function ProductCard({product}: Props) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount
    ? compareAtPrice.amount > price?.amount
    : false;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        <div className="shadow-sm rounded relative">
          {isDiscounted && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label className=" absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs subpixel-antialiased">
              お買い得商品
            </label>
          )}
          {product.variants.nodes[0].image ? (
            <Image data={product.variants.nodes[0].image} alt={product.title} />
          ) : (
            <p>商品画像がありません。</p>
          )}
        </div>
        <div className="grid gap-1">
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
            {product.title}
          </h3>
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && compareAtPrice && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
