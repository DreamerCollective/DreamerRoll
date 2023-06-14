import { pb } from "$lib/pocketbase.js";
import PocketBase from "pocketbase";
import { getAllRollRecord } from "$lib/Store.js";

export async function load() {
    try{
      const records = await getAllRollRecord()

      const results = records.map((record)=> {return {result:record.result, rolldies:record.rolldies,rollmodifiers:record.rollmodifiers}})
      return {
        records: results
      }
    }catch (e) {
      console.log("Error: ", e);
    }


}
