import { pb } from "$lib/pocketbase.js";
import PocketBase from "pocketbase";
import { getAllRollRecord } from "$lib/Store.js";

export async function load() {
    try{
      const records = await getAllRollRecord()

      const results = records.map((record)=> {return {id:record.id, result:record.result, rolldies:record.expand.rolldies.map((record) => {return {id:record.id, diefaces:record.diefaces, dienames:record.dienames, rawresult:record.rawresult}}),
        rollmodifiers:record.expand.rollmodifiers.map((record)=>{return {id:record.id, modifiername:record.modifiername, modifiernumber:record.modifiernumber}})}})
      return {
        records: results
      }

    }catch (e) {
      console.log("Error: ", e);
    }
}
export const actions = {
  CreateDiceRecord: async ({ request }) => {
    const form = await request.formData()

    const DiceNames = form.get('Dice') ?? '';
    const DiceFace = form.get('Dice') ?? '';
    const RawDiceResults = form.get('passwordConformed') ?? '';

    const UpdatedRecord = {
      DiceNames,
      DiceFace,
      RawDiceResults
    }

    const updateDiceRecord = await pb.collection('die').update('1', UpdatedRecord)
    console.log(updateDiceRecord)
  },

  CreateModifierRecord: async ({ request }) => {
    const form = await request.formData()

    const ModifiersNames = form.get('Dice') ?? '';
    const ModifiersNumbers = form.get('Dice') ?? '';

    const UpdatedRecord = {
      ModifiersNames,
      ModifiersNumbers
    }

    const updateModifierRecord = await pb.collection('modifier').update('1', UpdatedRecord)
    console.log(updateModifierRecord)
  },

  CreateRollRecord: async ({ request }) => {
    const form = await request.formData()

    const ModifiersNames = form.get('Dice') ?? '';
    const ModifiersNumbers = form.get('Dice') ?? '';

    const UpdatedRecord = {
      ModifiersNames,
      ModifiersNumbers
    }

    const updateRollRecord = await pb.collection('roll').update('1', UpdatedRecord)
    console.log(updateRollRecord)
  },


  UpdateDiceRecord: async ({ request }) => {
    const form = await request.formData()

    const DiceNames = form.get('Dice') ?? '';
    const DiceFace = form.get('Dice') ?? '';
    const RawDiceResults = form.get('passwordConformed') ?? '';

    const UpdatedRecord = {
      DiceNames,
      DiceFace,
      RawDiceResults
    }

    const updateDiceRecord = await pb.collection('die').update('1', UpdatedRecord)
    console.log(updateDiceRecord)
  },

  UpdateModifierRecord: async ({ request }) => {
    const form = await request.formData()

    const ModifiersNames = form.get('Dice') ?? '';
    const ModifiersNumbers = form.get('Dice') ?? '';

    const UpdatedRecord = {
      ModifiersNames,
      ModifiersNumbers
    }

    const updateModifierRecord = await pb.collection('modifier').update('1', UpdatedRecord)
    console.log(updateModifierRecord)
  },

  UpdateRollRecord: async ({ request }) => {
    const form = await request.formData()

    const ModifiersNames = form.get('Dice') ?? '';
    const ModifiersNumbers = form.get('Dice') ?? '';

    const UpdatedRecord = {
      ModifiersNames,
      ModifiersNumbers
    }

    const updateRollRecord = await pb.collection('roll').update('1', UpdatedRecord)
    console.log(updateRollRecord)
  },

  DeleteDiceRecord: async ({ request }) => {
    const deleteDiceRecord = await pb.collection('die').delete('1')
    console.log(deleteDiceRecord)
  },

  DeleteModifierRecord: async ({ request }) => {
    const deleteModifierRecord = await pb.collection('modifier').delete('1')
    console.log(deleteModifierRecord)
  },

  DeleteRollRecord: async ({ request }) => {
    const deleteRollRecord = await pb.collection('roll').delete('1')
    console.log(deleteRollRecord)
  }
}
