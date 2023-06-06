import { pb } from "$lib/pocketbase.js";
import { redirect } from "@sveltejs/kit";

// @ts-ignore
export const actions ={
  Login: async({ cookies, request })=>{
    try {
      const form = await request.formData();

      const email = form.get('email')?? '';
      const passwordConformed = form.get('passwordConformed')?? '';

      const loginRecord={
        email,
        passwordConformed
      }

      await pb.collection('users').authWithPassword(loginRecord.email, loginRecord.passwordConformed);

    }catch (e) {
      console.log(e);
    }
    throw redirect(303, '/')
  }
}