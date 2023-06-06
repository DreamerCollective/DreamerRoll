import { pb } from "$lib/pocketbase.js";

import PocketBase from "pocketbase";

export async function load() {
    try{

      const records = await pb.collection('roll').getFullList(200,{
        sort: 'created',
      });

      const results = records.map((record)=> {return {result:record.result, rolldies:record.rolldies,rollmodifiers:record.rollmodifiers}})
      return {
        records: results
      }
    }catch (e) {
      console.log("Error: ", e);

    }
}