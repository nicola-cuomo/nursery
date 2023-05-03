import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/trpc";

export default createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://192.168.1.63:3000",
      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});
