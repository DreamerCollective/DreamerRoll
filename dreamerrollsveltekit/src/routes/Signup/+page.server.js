import {pb} from "$lib/server/pocketbase.js";


export const actions ={
  create: async({request})=>{
    try {
      const form = await request.formData();

      const email = form.get('email')?? '';
      const passwordConformed = form.get('passwordConformed')?? '';

      const NewRecord={
        email,
        passwordConformed
      }

      await pb.collection('users').create(NewRecord);

    }catch (e) {
      console.log(e);
    }
  }
}