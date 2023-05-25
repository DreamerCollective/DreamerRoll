import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({locals, request}) => {
    try{
      let records = await locals.pb.collection('roll').getFullList({
        sort: 'created',
      });
      return records.items;
    } catch (err) {
      console.log('Error: ', err)
    }
  }
}