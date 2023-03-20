import type {Actions} from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({locals, request}) => {
    const data = Object.fromEntries(await request.formData()) as {

    };

    try {

    }catch (e) {
      console.error(e);
      throw e;
    }
    throw redirect(303, '/')
  }
}