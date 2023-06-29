import { pb } from "$lib/pocketbase.js";
import random from "random";

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
export async function getAllRollRecord() {
  const RollRecord = await pb.collection('roll').getFullList({
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  const results = RollRecord.map((record) => {
      return {
        id: record.id, rollname: record.rollname, result: record.result,
        rolldies: record.expand.rolldies.map((record) => {
          return { id: record.id, diefaces: record.diefaces, dienames: record.dienames }
        }),
        rollmodifiers: record.expand.rollmodifiers.map((record) => {
          return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
        })
      }
    }
  )
  console.log('GetAllRollRecord = ' + RollRecord)
  let RollRecordResult = []
  for (let i = 0; i < results.length; i++)
  {
    if (RollRecord[i].rolldies.length === 0)
    {
      RollRecordResult[i].id = results[i].id
      RollRecordResult[i].results = results[i].result
      RollRecordResult[i].rolldies = []
      RollRecordResult[i].rollmodifiers = results[i].rollmodifiers
      RollRecordResult[i].rollname = results[i].rollname

    }
    if (RollRecord[i].modifier.length === 0)
    {
      RollRecordResult[i].id = results[i].id
      RollRecordResult[i].results = results[i].result
      RollRecordResult[i].rolldies = results[i].rolldies
      RollRecordResult[i].rollmodifiers = []
      RollRecordResult[i].rollname = results[i].rollname
    }
    else
    {
      RollRecordResult[i].id = results[i].id
      RollRecordResult[i].results = results[i].result
      RollRecordResult[i].rolldies = results[i].rolldies
      RollRecordResult[i].rollmodifiers = results[i].rollmodifiers
      RollRecordResult[i].rollname = results[i].rollname
    }
  }
  return RollRecordResult
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

export async function getWholeOneRollRecordForUpdate(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  return {
    id: RollRecord.id,
    result: RollRecord.result,
    rolldies: RollRecord.expand.rolldies.map((record) => {
      return { id: record.id, diefaces: record.diefaces, dienames: record.dienames }
    }),
    rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
      return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
    })
  }
}

export async function getOneRollRecordForUpdate(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  return {
    id: RollRecord.id,
    result: RollRecord.result,
    rollname: RollRecord.rollname,
    rolldies: RollRecord.expand.rolldies.map((record) => {
      return record.id
    }),
    rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
      return record.id
    })
  }
}

export async function getOneDiceRecord(id){
  console.log('getOneDiceRecordRawId =' + id)
  const DiceRecord = await pb.collection('die').getOne(id);
  console.log('GetOneDiceRecord = ' + DiceRecord)
  const DiceRecordClean = {
    id: DiceRecord.id,
    diename: DiceRecord.dienames,
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

function rollRoll(record)
{
  let roll = 0
  console.log("This is what number at the start " + roll)
  console.log(record.rolldies.length)
  for (let i = 0; i < record.rolldies.length; i++)
  {
    console.log("This is what number that the diefaces is " + record.rolldies[i].diefaces)
    roll += random.int(1, record.rolldies[i].diefaces)
    console.log("This is what number was rolled " + roll)
  }
  console.log(record.rollmodifiers.length)
  for (let i = 0; i < record.rollmodifiers.length; i++)
  {
    console.log("This is what number that the modifier is " + record.rollmodifiers[i].modifiernumber)
    roll += record.rollmodifiers[i].modifiernumber
    console.log("This is what number that the modifier modified " + roll)
  }
  console.log("This is what number was rolled " + roll)
  return roll;
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

    await pb.collection('die').create(CreateRecord)
  },

  CreateModifierRecord: async ({ request }) => {
    const form = await request.formData()

    const modifiername = form.get('modifiername') ?? '';
    const modifiernumber = form.get('modifiernumber') ?? '';

    const CreateRecord = {
      modifiername,
      modifiernumber
    }

    await pb.collection('modifier').create(CreateRecord)
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

    const dieid = form.get('dieid') ?? '';
    const RollId = form.get('rollrecordid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }

    RollRecordToUpdateObject.rolldies.push(dieid)

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log(RollRecordToUpdateObject)
  },

  UpdateRollRecordToRemoveDice: async ({ request }) => {
    const form = await request.formData()

    const dieid = form.get('dieid') ?? '';
    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    console.log("index trying to remove from " + dieid)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }

    RollRecordToUpdateObject.rolldies.splice(dieid,1)


    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log(RollRecordToUpdateObject)
  },

  UpdateRollRecordWithNewModifier: async ({ request }) => {
    const form = await request.formData()

    const modifierid = form.get('modifierid') ?? '';
    const RollId = form.get('rollrecordid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }

    RollRecordToUpdateObject.rollmodifiers.push(modifierid)

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log(RollRecordToUpdateObject)
  },

  UpdateRollRecordToRemoveModifier: async ({ request }) => {
    const form = await request.formData()

    const modifierid = form.get('modifierid') ?? '';
    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    console.log("index trying to remove from " + modifierid)

    RollRecordToUpdate.rollmodifiers.splice(modifierid,1)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log(RollRecordToUpdateObject)
  },

  UpdateRollRecordWithNewName: async ({ request }) => {
    const form = await request.formData()

    const rollname = form.get('rollname') ?? '';
    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: rollname
    }

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log(updateRollRecord)
  },

  UpdateRollRecordWithNewRollResult: async ({ request }) => {
    const form = await request.formData()

    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getWholeOneRollRecordForUpdate(RollId)

    let RollResult = rollRoll(RollRecordToUpdate)

    let RollRecordToUpdateWithOnlyId = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      result: RollResult,
      rolldies: RollRecordToUpdateWithOnlyId.rolldies,
      rollmodifiers: RollRecordToUpdateWithOnlyId.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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
