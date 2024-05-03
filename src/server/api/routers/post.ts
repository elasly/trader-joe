import { z } from "zod";
import { eq } from 'drizzle-orm';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { indicator, posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure
  .input(z.object({ name: z.string().min(1) }))
  .query(({ input }) => {
    return  db.select({
      field1: indicator.name,
    }).from(indicator).where(eq(indicator.group, inout));
    
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getindicatorOfGroup: protectedProcedure
  .input(z.object({ text: z.string() }))
  .query(async ({ input  }) => {
    return ctx.db.query.indicator.findMany({ where:  eq(indicator.group, input) });
    
  }),
});
