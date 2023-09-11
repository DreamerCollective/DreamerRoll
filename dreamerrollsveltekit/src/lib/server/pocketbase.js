import PocketBase from 'pocketbase';
import {PRIVATE_POCKETBASE_URL, PRIVATE_ADMIN_EMAIL, PRIVATE_ADMIN_PASSWORD} from '$env/static/private'
import {writable} from 'svelte/store';

export const pb = new PocketBase(PRIVATE_POCKETBASE_URL);

await pb.admins.authWithPassword(PRIVATE_ADMIN_EMAIL,PRIVATE_ADMIN_PASSWORD);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) =>{
 console.log('authStore changed', auth);
 currentUser.set(pb.authStore.model);
})

