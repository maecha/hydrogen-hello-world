import {DataFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request, context}: DataFunctionArgs) {
  // TODO: ここにサイトマップの生成処理を書く
  return new Response('[page_data]', {
    headers: {
      contentType: 'application/xml',
      cacheControl: `max-age=${60 * 60 * 24}`,
    },
  });
}
