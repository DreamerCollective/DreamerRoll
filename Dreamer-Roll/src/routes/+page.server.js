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
async function getAllRollRecord() {
  const RollRecord = await pb.collection('roll').getFullList({
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  console.log(RollRecord)
  const results = RollRecord.map((record) =>
    {
      if(record.rolldies.length === 0)
      {
        const returnobject = {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: [],
          rollmodifiers: record.expand.rollmodifiers.map((record) => {
            return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
          })
        }
        console.log("GetOneRollRecordForUpdate rollmodifiers.length = 0")
        console.log(returnobject)
        return returnobject
      }
      else if(record.rollmodifiers.length === 0)
      {
        const returnobject = {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: record.expand.rolldies.map((record) => {
            return { id: record.id, diefaces: record.diefaces, diename: record.diename }
          }),
          rollmodifiers: []
        }
        console.log("GetOneRollRecordForUpdate rollmodifiers.length = 0")
        console.log(returnobject)
        return returnobject
      }
      else if(record.rolldies.length < 0 && record.rollmodifiers.length < 0)
      {
        const returnobject = {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: record.expand.rolldies.map((record) => {
            return { id: record.id, diefaces: record.diefaces, diename: record.diename }
          }),
          rollmodifiers: record.expand.rollmodifiers.map((record) => {
            return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
          })
        }
        console.log("GetOneRollRecordForUpdate rolldies and rollmodifiers")
        console.log(returnobject)
        return returnobject
      }
      else
      {
        const returnobject = {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: [],
          rollmodifiers: []
        }
        console.log("GetOneRollRecordForUpdate rollmodifiers.length = 0 rolldies.length = 0")
        console.log(returnobject)
        return returnobject
      }
    }
  )
  console.log("getAllRollRecord results")
  console.log(results)
  return results;
}

async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('die').getFullList({
    sort: 'created',
  });
  const results = DiceRecord.map((record)=> {return {id:record.id, diefaces:record.diefaces, diename:record.diename}})
  console.log('GetAllDiceRecord = ' + DiceRecord)
  return results
}

async function getAllModifierRecord(){
  const ModifierRecord = await pb.collection('modifier').getFullList({
    sort: 'created',
  });
  const results = ModifierRecord.map((record)=>{return {id:record.id, modifiername:record.modifiername, modifiernumber:record.modifiernumber}})
  console.log('GetAllModifierRecord = ' + ModifierRecord)
  return results
}

async function getWholeOneRollRecordForUpdate(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  if(RollRecord.rolldies.length === 0)
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
      })
    }
    console.log(returnobject)
    return returnobject;
  }
  else if(RollRecord.rollmodifiers.length === 0)
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return { id: record.id, diefaces: record.diefaces, diename: record.diename }
      }),
      rollmodifiers: []
    }
    console.log(returnobject)
    return returnobject;
  }
  else if(RollRecord.rollmodifiers.length === 0 && RollRecord.rolldies.length === 0)
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers:[]
    }
    console.log(returnobject)
    return returnobject;
  }
  else
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return { id: record.id, diefaces: record.diefaces, diename: record.diename }
      }),
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
      })
    }
    console.log(returnobject)
    return returnobject;
  }
}

async function getOneRollRecordForUpdate(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  console.log("GetOneRollRecordForUpdate RollRecord")
  console.log(RollRecord)
  if(RollRecord.rolldies.length === 0)
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return record.id
      })
    }
    console.log("GetOneRollRecordForUpdate rolldies.length = 0")
    console.log(returnobject)
    return returnobject;
  }
  else if(RollRecord.rollmodifiers.length === 0)
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return record.id
      }),
      rollmodifiers: []
    }
    console.log("GetOneRollRecordForUpdate rollmodifiers.length = 0")
    console.log(returnobject)
    return returnobject;
  }
  else if(RollRecord.rollmodifiers.length === 0 && RollRecord.rolldies.length === 0)
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: []
    }
    console.log("GetOneRollRecordForUpdate rolldies.length = 0 && rollmodifiers.length = 0")
    console.log(returnobject)
    return returnobject;
  }
  else
  {
    const returnobject = {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return record.id
      }),
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return record.id
      })
    }
    console.log("GetOneRollRecordForUpdate else")
    console.log(returnobject)
    return returnobject;
  }
}

async function getOneDiceRecord(id){
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

async function getOneModifierRecord(id){
  const ModifierRecord = await pb.collection('modifier').getOne(id);
  return {
    id: ModifierRecord.id,
    modifiername: ModifierRecord.modifiername,
    modifiernumber: ModifierRecord.modifiernumber
  }
}

function rollRoll(record)
{
  let roll = 0;
  if(record.rolldies.length === 0){
    for (let i = 0; i < record.rollmodifiers.length; i++)
    {
      roll += record.rollmodifiers[i].modifiernumber
    }
    return roll;
  }
  else if(record.rollmodifiers.length === 0){
    for (let i = 0; i < record.rolldies.length; i++)
    {
      roll += random.int(1, record.rolldies[i].diefaces)
    }
    return roll;
  }
  else if(record.rolldies.length === 0 && record.rollmodifiers.length === 0)
  {
    return 0;
  }
  else
  {
    for (let i = 0; i < record.rolldies.length; i++)
    {
      roll += random.int(1, record.rolldies[i].diefaces)
    }
    for (let i = 0; i < record.rollmodifiers.length; i++)
    {
      roll += record.rollmodifiers[i].modifiernumber
    }
    return roll;
  }
}
export const actions = {
  CreateDiceRecord: async ({ request }) => {
    const form = await request.formData()

    const diename = form.get('diename') ?? '';
    const diefaces = form.get('diefaces') ?? '';

    const CreateRecord = {
      diename,
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
  },


  UpdateDiceRecord: async ({ request }) => {
    const form = await request.formData()

    const diename = form.get('diename') ?? '';
    const diefaces = form.get('diefaces') ?? '';
    const id = form.get('dieid') ?? '';

    const UpdatedRecord = {
      diename,
      diefaces
    }

    const updateDiceRecord = await pb.collection('die').update(id, UpdatedRecord)
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
    console.log("UpdateRollRecordWithNewDice = " )
    console.log(RollRecordToUpdateObject)

    RollRecordToUpdateObject.rolldies.push(dieid)
    console.log("UpdateRollRecordWithNewDice after push = " )
    console.log( RollRecordToUpdateObject)

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log("UpdateRollRecordWithNewDice after update = ")
    console.log(updateRollRecord)
  },

  UpdateRollRecordToRemoveDice: async ({ request }) => {
    const form = await request.formData()

    const dieid = form.get('dieid') ?? '';
    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }
    console.log(RollRecordToUpdateObject)
    console.log("UpdateRollRecordWithNewDice = " )

    RollRecordToUpdateObject.rolldies.splice(dieid,1)
    console.log(RollRecordToUpdateObject)
    console.log("UpdateRollRecordWithNewDice after splice = " )

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log("UpdateRollRecordWithNewDice after update = ")
    console.log(updateRollRecord)
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
    console.log(RollRecordToUpdateObject)
    console.log("UpdateRollRecordWithNewModifier = " )

    RollRecordToUpdateObject.rollmodifiers.push(modifierid)
    console.log(RollRecordToUpdateObject)
    console.log("UpdateRollRecordWithNewModifier after push = " )

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
    console.log(updateRollRecord)
    console.log("UpdateRollRecordWithNewModifier after Pocketbase update = " )
  },

  UpdateRollRecordToRemoveModifier: async ({ request }) => {
    const form = await request.formData()

    const modifierid = form.get('modifierid') ?? '';
    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      results: RollRecordToUpdate.result,
      rolldies: RollRecordToUpdate.rolldies,
      rollmodifiers: RollRecordToUpdate.rollmodifiers,
      rollname: RollRecordToUpdate.rollname
    }

    console.log(RollRecordToUpdateObject)

    RollRecordToUpdate.rollmodifiers.splice(modifierid,1)

    console.log(RollRecordToUpdateObject)

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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
  },

  UpdateRollRecordWithNewRollResult: async ({ request }) => {
    const form = await request.formData()

    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getWholeOneRollRecordForUpdate(RollId)

    let RollResult = rollRoll(RollRecordToUpdate)

    const RollRecordToUpdateObject = {
      result: RollResult,
      rolldies: RollRecordToUpdate.rolldies.id,
      rollmodifiers: RollRecordToUpdate.rollmodifiers.id,
      rollname: RollRecordToUpdate.rollname
    }

    const updateRollRecord = await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
  },

  DeleteDiceRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('dieid') ?? '';

    const deleteDiceRecord = await pb.collection('die').delete(id)
  },

  DeleteModifierRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('modifierid') ?? '';

    const deleteModifierRecord = await pb.collection('modifier').delete(id)
  },

  DeleteRollRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('rollid') ?? '';

    const deleteRollRecord = await pb.collection('roll').delete(id)
  }
}
