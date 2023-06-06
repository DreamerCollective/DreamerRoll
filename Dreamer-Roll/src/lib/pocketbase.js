import PocketBase from 'pocketbase';
import {PUBLIC_POCKETBASE_URL, PUBLIC_ADMIN_EMAIL, PUBLIC_ADMIN_PASSWORD} from '$env/static/public'
import{writable} from 'svelte/store';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

await pb.admins.authWithPassword(PUBLIC_ADMIN_EMAIL,PUBLIC_ADMIN_PASSWORD);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) =>{
 console.log('authStore changed', auth);
 currentUser.set(pb.authStore.model);
})

