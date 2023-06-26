import { pb } from "$lib/pocketbase.js";
import PocketBase from "pocketbase";
import { AllDiceRecords } from "$lib/Store.js";

export async function load() {
    try{
      const AllRollRecords = await getAllRollRecord()
      const AllModifierRecords = await getAllModifierRecord()
      const AllDiceRecords = await getAllDiceRecord()
      return {
        records: {
          AllRollRecords: AllRollRecords,
          AllModifierRecords: AllModifierRecords,
          AllDiceRecords: AllDiceRecords
        }
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
  const results = RollRecord.map((record)=> {return {id:record.id, rollname:record.rollname, result:record.result, rolldies:record.expand.rolldies.map((record) => {return {id:record.id, diefaces:record.diefaces, dienames:record.dienames}}),
    rollmodifiers:record.expand.rollmodifiers.map((record)=>{return {id:record.id, modifiername:record.modifiername, modifiernumber:record.modifiernumber}})}})
  console.log('GetAllRollRecord = ' + RollRecord)
  return results
}

export async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('die').getFullList({
    sort: 'created',
  });
  const results = DiceRecord.map((record)=> {return {id:record.id, diefaces:record.diefaces, dienames:record.dienames}})
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

export async function getWholeOneRollRecord(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  const RollRecordClean= {
    id: RollRecord.id,
    result: RollRecord.result,
    rolldies: RollRecord.expand.rolldies.map((record) => {return {id:record.id, diefaces:record.diefaces, dienames:record.dienames}}),
    rollmodifier: RollRecord.expand.rollmodifiers.map((record)=>{return {id:record.id, modifiername:record.modifiername, modifiernumber:record.modifiernumber}})
  }
  return RollRecordClean
}

export async function getOneRollRecordForUpdate(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  const RollRecordClean= {
    id: RollRecord.id,
    result: RollRecord.result,
    rolldies: RollRecord.expand.rolldies.map((record) => {return {id:record.id}}),
    rollmodifier: RollRecord.expand.rollmodifiers.map((record)=>{return {id:record.id}})
  }
  return RollRecordClean
}

export async function getOneDiceRecord(id){
  console.log('getOneDiceRecordRawId =' + id)
  const DiceRecord = await pb.collection('die').getOne(id);
  console.log('GetOneDiceRecord = ' + DiceRecord)
  const DiceRecordClean = {
    id: DiceRecord.id,
    diename: DiceRecord.diename,
    diefaces: DiceRecord.diefaces
  }
  console.log('Returning record = ' + DiceRecordClean)
  return DiceRecordClean
}

export async function getOneModifierRecord(id){
  console.log('getOneModifierRecordRawId =' + id)
  const ModifierRecord = await pb.collection('modifier').getOne(id);
  console.log('GetOneModifierRecord = ' + ModifierRecord)
  const ModifierRecordClean = {
    id: ModifierRecord.id,
    modifiername: ModifierRecord.modifiername,
    modifiernumber: ModifierRecord.modifiernumber
  }
  console.log('Returning modifier record = ' + ModifierRecordClean)
  return ModifierRecordClean
}


export const actions = {
  CreateDiceRecord: async ({ request }) => {
    const form = await request.formData()

    const dienames = form.get('DiceNames') ?? '';
    const diefaces = form.get('DiceFaces') ?? '';

    const CreateRecord = {
      dienames,
      diefaces,
    }

    const updateDiceRecord = await pb.collection('die').create(CreateRecord)
  },

  CreateModifierRecord: async ({ request }) => {
    const form = await request.formData()

    const modifiersname = form.get('ModifierNames') ?? '';
    const modifiersnumber = form.get('ModifierNumber') ?? '';

    const CreateRecord = {
      modifiersname,
      modifiersnumber
    }

    const updateModifierRecord = await pb.collection('modifier').create(CreateRecord)
  },

  CreateRollRecord: async ({ request }) => {
    const form = await request.formData()

    const rollname = form.get('ModifierNames') ?? '';

    const updateRollRecord = await pb.collection('roll').create( UpdatedRecord)
    console.log(updateRollRecord)
  },


  UpdateDiceRecord: async ({ request }) => {
    const form = await request.formData()

    const dienames = form.get('diename') ?? '';
    const diefaces = form.get('diefaces') ?? '';
    const id = form.get('dieid') ?? '';

    const UpdatedRecord = {
      dienames,
      diefaces,
    }

    const updateDiceRecord = await pb.collection('die').update(id, UpdatedRecord)
    console.log(updateDiceRecord)
  },

  UpdateModifierRecord: async ({ request }) => {
    const form = await request.formData()

    const modifiername = form.get('modifiername') ?? '';
    const modifiernumber = form.get('modifiernumber') ?? '';
    const id = form.get('modifierid') ?? '';

    const UpdatedRecord = {
      modifiername,
      modifiernumber
    }

    const updateModifierRecord = await pb.collection('modifier').update(id, UpdatedRecord)
    console.log(updateModifierRecord)
  },

  UpdateRollRecordWithNewDice: async ({ request }) => {
    const form = await request.formData()

    const dieid = form.get('diceid') ?? '';
    const RollId = form.get('rollrecordid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    RollRecordToUpdate.rolldies.push(dieid)

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdate)
    console.log(updateRollRecord)
  },

  UpdateRollRecordWithNewModifier: async ({ request }) => {
    const form = await request.formData()

    const modifiersid = form.get('modifierid') ?? '';
    const RollId = form.get('rollrecordid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    RollRecordToUpdate.rollmodifier.push(modifiersid)

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdate)
    console.log(updateRollRecord)
  },

  UpdateRollRecordWithNewName: async ({ request }) => {
    const form = await request.formData()

    const DiceNames = form.get('rollname') ?? '';
    const id = form.get('rollid') ?? '';

    const updateRollRecord = await pb.collection('roll').update('1', UpdatedRecord)
    console.log(updateRollRecord)
  },

  DeleteDiceRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('dieid') ?? '';

    const deleteDiceRecord = await pb.collection('die').delete(id)
    console.log(deleteDiceRecord)
  },

  DeleteModifierRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('modifierid') ?? '';

    const deleteModifierRecord = await pb.collection('modifier').delete(id)
    console.log(deleteModifierRecord)
  },

  DeleteRollRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('rollid') ?? '';

    const deleteRollRecord = await pb.collection('roll').delete(id)
    console.log(deleteRollRecord)
  }
}
