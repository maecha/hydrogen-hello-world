import {Link} from '@remix-run/react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen-react';
import {CartForm} from '@shopify/hydrogen';
import type {
  CartCost,
  BaseCartLineConnection,
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen/storefront-api-types';

type CartLineItemsProps = {
  linesObj: BaseCartLineConnection;
};

export function CartLineItems({linesObj}: CartLineItemsProps) {
  const lines = flattenConnection(linesObj);
  return (
    <div className="space-y-8">
      {lines.map((line) => {
        return <LineItem key={line.id} lineItem={line} />;
      })}
    </div>
  );
}

type LineItemProps = {lineItem: CartLine | ComponentizableCartLine};

function LineItem({lineItem}: LineItemProps) {
  const {merchandise, quantity} = lineItem;

  return (
    <div className="flex gap-4">
      <Link
        to={`/products/${merchandise.product.handle}`}
        className="flex-shrink-0"
      >
        {merchandise.image ? (
          <Image data={merchandise.image} width={110} height={110} />
        ) : (
          <p>商品画像がありません。</p>
        )}
      </Link>
      <div className="flex-1">
        <Link
          to={`/products/${merchandise.product.handle}`}
          className="no-underline hover:underline"
        >
          {merchandise.product.title}
        </Link>
        <div className="text-gray-800 text-sm">{merchandise.title}</div>
        <div className="text-gray-800 text-sm">Qty: {quantity}</div>
        <ItemRemoveButton lineId={lineItem.id} />
      </div>
      <Money data={lineItem.cost.totalAmount} />
    </div>
  );
}

type ItemRemoveButtonProps = {lineId: string};

function ItemRemoveButton({lineId}: ItemRemoveButtonProps) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds: [lineId]}}
    >
      <button
        className="bg-white border-black text-black hover:text-white hover:bg-black rounded-md font-small text-center my-2 max-w-xl leading-none border w-10 h-10 flex items-center justify-center"
        type="submit"
      >
        <IconRemove />
      </button>
    </CartForm>
  );
}

function IconRemove() {
  return (
    <svg
      fill="transparent"
      stroke="currentColor"
      viewBox="0 0 20 20"
      className="w-5 h-5"
    >
      <title>削除</title>
      <path
        d="M4 6H16"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 6L6 17H14L14.5 6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6"
        strokeWidth="1.25"
      />
    </svg>
  );
}

type CartSummaryProps = {
  cost: CartCost;
};

export function CartSummary({cost}: CartSummaryProps) {
  return (
    <>
      <dl className="space-y-2">
        <div className="flex items-center justify-between">
          <dt>小計</dt>
          <dd>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center">
            <span>配送料の見積もり</span>
          </dt>
          <dd className="text-green-600">送料無料、カーボンニュートラル</dd>
        </div>
      </dl>
    </>
  );
}

type CartActionsProps = {checkoutUrl?: string};

export function CartActions({checkoutUrl}: CartActionsProps) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a
        href={checkoutUrl}
        className="bg-black text-white px-6 py-3 w-full rounded-md text-center font-medium"
      >
        チェックアウト
      </a>
    </div>
  );
}
