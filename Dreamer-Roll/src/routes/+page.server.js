import { pb } from "$lib/pocketbase.js";
import PocketBase from "pocketbase";
import { AllDiceRecords } from "$lib/Store.js";

export async function load() {

    try{
      const AllRollRecords = await getAllRollRecord()
      const AllModifierRecords = await getAllModifierRecord()
      const AllDiceRecords = await getAllDiceRecord()
      return {
        records: AllRollRecords
      }
    }catch (e) {
      console.log("Error: ", e);
    }
}
export async function getAllRollRecord(){
  const RollRecord = await pb.collection('roll').getFullList({
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  const results = RollRecord.map((record)=> {return {id:record.id, result:record.result, rolldies:record.expand.rolldies.map((record) => {return {id:record.id, diefaces:record.diefaces, dienames:record.dienames, rawresult:record.rawresult}}),
    rollmodifiers:record.expand.rollmodifiers.map((record)=>{return {id:record.id, modifiername:record.modifiername, modifiernumber:record.modifiernumber}})}})
  console.log('GetAllRollRecord = ' + RollRecord)
  return results
}

export async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('die').getFullList({
    sort: 'created',
  });
  const results = DiceRecord.map((record)=> {return {id:record.id, diefaces:record.diefaces, dienames:record.dienames, rawresult:record.rawresult}})
  console.log('GetAllDiceRecord = ' + DiceRecord)
  return results
}

export async function getAllModifierRecord(){
  const ModifierRecord = await pb.collection('modifier').getFullList({
    sort: 'created',
  });
  const results = ModifierRecord.map((record)=>{return {id:record.id, modifiername:record.modifiername, modifiernumber:record.modifiernumber}})
  console.log('GetAllModifierRecord = ' + ModifierRecord)
  return results
}

export async function getOneRollRecord(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id);
  console.log('GetOneRollRecord = ' + RollRecord)
  return RollRecord
}

export async function getOneDiceRecord(id){
  console.log('getOneDiceRecordRawId =' + id)
  const DiceRecord = await pb.collection('die').getOne(id);
  console.log('GetOneDiceRecord = ' + DiceRecord)
  return DiceRecord
}

export async function getOneModifierRecord(id){
  console.log('getOneModifierRecordRawId =' + id)
  const ModifierRecord = await pb.collection('modifier').getOne(id);
  console.log('GetOneModifierRecord = ' + ModifierRecord)
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
