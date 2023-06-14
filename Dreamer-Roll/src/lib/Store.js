import { pb } from "$lib/pocketbase.js";

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

export async function getOneRollRecord(id){
  const RollRecord = await pb.collection('roll').getOne(id);
  console.log(RollRecord)
  return RollRecord
}

export async function getOneDiceRecord(id){
  const DiceRecord = await pb.collection('dice').getOne(id);
  console.log(DiceRecord)
  return DiceRecord
}

export async function getOneModifierRecord(id){
  const ModifierRecord = await pb.collection('modifier').getOne(id);
  console.log(ModifierRecord)
  return ModifierRecord
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



