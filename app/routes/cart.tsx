import {useLoaderData} from '@remix-run/react';
import {
  json,
  DataFunctionArgs as DataFunctionArgsType,
} from '@shopify/remix-oxygen';
import {CartForm} from '@shopify/hydrogen';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';

export async function action({request, context}: DataFunctionArgsType) {
  const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    default:
      invariant(false, `${action} cart action is not defined`);
  }

  if (!result) {
    return json(result, {status: 200});
  }

  // The Cart ID might change after each mutation, so update it each time.
  const headers = cart.setCartId(result.cart.id);

  return json(result, {status: 200, headers});
}

export async function loader({context}: DataFunctionArgsType) {
  const {cart} = context;
  const cartData = await cart.get();
  return json({cart: cartData});
}

export default function Cart() {
  const {cart} = useLoaderData<typeof loader>();

  if (cart?.totalQuantity && cart?.totalQuantity > 0) {
    return (
      <div className="w-full max-w-6xl mx-auto pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12">
        <div className="flex-grow md:translate-y-4">
          <CartLineItems linesObj={cart.lines} />
        </div>
        <div className="fixed left-0 right-0 bottom-0 md:sticky md:top-[65px] grid gap-6 p-4 md:px-6 md:translate-y-4 bg-gray-100 rounded-md w-full">
          <CartSummary cost={cart.cost} />
          <CartActions checkoutUrl={cart.checkoutUrl} />
        </div>
      </div>
    );
  }
}
