import type {Actions} from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({locals, request}) => {
    const records = await locals.pb.collection('roll').getFullList({
      sort: '-created',
    });


    try {

    }catch (e) {
      console.error(e);
      throw e;
    }

    return records;
  }
}