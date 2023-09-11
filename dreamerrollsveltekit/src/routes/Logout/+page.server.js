import { pb } from "$lib/server/pocketbase.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  logout: async ({locals}) => {
    pb.authStore.clear();
    locals.user = null;
  }
}