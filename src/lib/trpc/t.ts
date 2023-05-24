import type { Context } from '$lib/trpc/context';
import type { router } from '$lib/trpc/router';
import { initTRPC, type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

export const t = initTRPC.context<Context>().create();

export type Router = typeof router;

export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
