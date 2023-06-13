import { pb } from "$lib/pocketbase.js";
import PocketBase from "pocketbase";

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
export async function getAllRollRecord(){
  const RollRecord = await pb.collection('roll').getFullList(200,{
    sort: 'created',
  });
  console.log(RollRecord)
  return RollRecord
}

export async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('dice').getFullList(200,{
    sort: 'created',
  });
  console.log(DiceRecord)
  return DiceRecord
}

export async function getAllModifierRecord(){
  const ModifierRecord = await pb.collection('modifier').getFullList(200,{
    sort: 'created',
  });
  console.log(ModifierRecord)
  return ModifierRecord
}

export const actions = {
  UpdateDiceRecord: async({request}) => {
    const form = await request.formData()

    const DiceNames = form.get('Dice')?? '';
    const DiceFace = form.get('Dice')?? '';
    const RawDiceResults = form.get('passwordConformed')?? '';

    const UpdatedRecord={
      DiceNames,
      DiceFace,
      RawDiceResults
    }

    const updateDiceRecord = await pb.collection('die').update('1',UpdatedRecord)
    console.log(updateDiceRecord)
  },

  UpdateModifierRecord: async({request}) => {
    const form = await request.formData()

    const ModifiersNames = form.get('Dice')?? '';
    const ModifiersNumbers = form.get('Dice')?? '';

    const UpdatedRecord={
      ModifiersNames,
      ModifiersNumbers
    }

    const updateModifierRecord = await pb.collection('modifier').update('1',UpdatedRecord)
    console.log(updateModifierRecord)
  },

  UpdateRollRecord: async({request}) => {
    const form = await request.formData()

    const ModifiersNames = form.get('Dice')?? '';
    const ModifiersNumbers = form.get('Dice')?? '';

    const UpdatedRecord={
      ModifiersNames,
      ModifiersNumbers
    }

    const updateRollRecord = await pb.collection('roll').update('1',UpdatedRecord)
    console.log(updateRollRecord)
  }


}