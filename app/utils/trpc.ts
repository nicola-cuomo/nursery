import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/trpc";

export default createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://nursery-api.up.railway.app",
      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});
