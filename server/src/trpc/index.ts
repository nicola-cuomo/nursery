import { prisma } from "..";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

const appRouter = router({
  getActivities: publicProcedure.query(async () => {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
    });
    return activities;
  }),
  getActivity: publicProcedure.input(z.string()).query(async ({ input }) => {
    const activity = await prisma.activity.findUnique({
      where: { id: input },
    });
    return activity;
  }),
  addActivity: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const activity = await prisma.activity.create({
      data: {
        text: input,
      },
    });
    return activity;
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
export default appRouter;
