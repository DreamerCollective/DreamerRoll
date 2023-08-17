import { pb } from "$lib/server/pocketbase.js";
import random from "random";

export async function load()
{
    const AllRollRecords = await getAllRollRecord()
    const AllRollGroupRecords = await getAllRollGroupRecord()
    const AllModifierRecords = await getAllModifierRecord()
    const AllDiceRecords = await getAllDiceRecord()
    return {
      records: {
        AllRollRecords: AllRollRecords,
        AllRollGroupRecords: AllRollGroupRecords,
        AllModifierRecords: AllModifierRecords,
        AllDiceRecords: AllDiceRecords
      }
    }

}
async function getAllRollRecord() {
  const RollRecord = await pb.collection('roll').getFullList({
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  console.log("New RollRecord")
  console.log(RollRecord)
  return RollRecord.map((record) =>
    {
      if (record.rolldies.length === 0 && record.rollmodifiers.length > 0)
      {
        return{
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: [],
          rollmodifiers: record.expand.rollmodifiers.map((record) =>
          {
            return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
          })
        }
      }
      else if (record.rollmodifiers.length === 0 && record.rolldies.length > 0)
      {
        return{
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: record.expand.rolldies.map((record) => {
            return { id: record.id, diefaces: record.diefaces, diename: record.diename }
          }),
          rollmodifiers: []
        }
      }
      else if (record.rollmodifiers === null && record.rolldies === null)
      {
        console.log("error")
        return {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: [],
          rollmodifiers: [],
        }
      }
      else if (record.rollmodifiers.length > 0 && record.rolldies.length > 0) {
        return {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: record.expand.rolldies.map((record) => {
            return { id: record.id, diefaces: record.diefaces, diename: record.diename }
          }),
          rollmodifiers: record.expand.rollmodifiers.map((record) => {
            return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
          })
        }
      }
      else
      {
        console.log("error")
        console.log(record.id)
        return {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: [],
          rollmodifiers: [],
        }
      }
    }
  );
}

async function getAllRollGroupRecord() {
  const RollGroupRecord = await pb.collection('rollgroup').getFullList({
    sort: 'created',
    expand: 'rolls',
  });
  console.log("New RollRecord")
  console.log(RollGroupRecord)
  return RollGroupRecord.map((record) =>
    {
      if (record.rolls.length > 0) {
        return {
          id: record.id, rollgroupname: record.rollgroupname,
          rolls: record.expand.rolls.map(async (record) => {
            await getWholeOneRollRecordForUpdate(record.id)
          }),
        }
      }
      if (record.rolls.length === 0)
      {
        return {
          id: record.id, rollgroupname: record.rollgroupname,
          rolls: [],
        }
      }
    }
  );
}

async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('die').getFullList({
    sort: 'created',
  });
  console.log("New DiceRecord")
  console.log(DiceRecord)
  return DiceRecord.map((record) => {
    return { id: record.id, diefaces: record.diefaces, diename: record.diename }
  })
}

async function getAllModifierRecord(){
  const ModifierRecord = await pb.collection('modifier').getFullList({
    sort: 'created',
  });
  console.log("New ModifierRecord")
  console.log(ModifierRecord)
  return ModifierRecord.map((record) => {
    return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
  })
}

async function getWholeOneRollRecordForUpdate(id){
  console.log('getOneRollRecordRawId =' + id)
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  if(RollRecord.rolldies.length === 0 && RollRecord.rollmodifiers.length > 0)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
      })
    }
  }
  else if(RollRecord.rollmodifiers.length === 0 && RollRecord.rolldies.length > 0)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return { id: record.id, diefaces: record.diefaces, diename: record.diename }
      }),
      rollmodifiers: []
    }
  }
  else if(RollRecord.rollmodifiers === null && RollRecord.rolldies === null)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: [],
    }
  }
  else if(RollRecord.rollmodifiers.length > 0 && RollRecord.rolldies.length > 0)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return { id: record.id, diefaces: record.diefaces, diename: record.diename }
      }),
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
      })
    }
  }
  else
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: [],
    }
  }
}

async function getOneRollRecordForUpdate(id){
  const RollRecord = await pb.collection('roll').getOne(id, {
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  if(RollRecord.rolldies.length === 0 && RollRecord.rollmodifiers.length > 0)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return record.id
      })
    };
  }
  else if(RollRecord.rollmodifiers.length === 0 && RollRecord.rolldies.length > 0)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return record.id
      }),
      rollmodifiers: []
    };
  }
  else if(RollRecord.rollmodifiers === null && RollRecord.rolldies === null)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: []
    };
  }
  else if(RollRecord.rollmodifiers.length > 0 && RollRecord.rolldies.length > 0)
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: RollRecord.expand.rolldies.map((record) => {
        return record.id
      }),
      rollmodifiers: RollRecord.expand.rollmodifiers.map((record) => {
        return record.id
      })
    };
  }
  else
  {
    return {
      id: RollRecord.id, rollname: RollRecord.rollname, result: RollRecord.result,
      rolldies: [],
      rollmodifiers: [],
    }
  }
}

// async function getOneDiceRecord(id){
//   console.log('getOneDiceRecordRawId =' + id)
//   const DiceRecord = await pb.collection('die').getOne(id);
//   console.log('GetOneDiceRecord = ' + DiceRecord)
//   const DiceRecordClean = {
//     id: DiceRecord.id,
//     diename: DiceRecord.diename,
//     diefaces: DiceRecord.diefaces
//   }
//   console.log('Returning record = ' + DiceRecordClean)
//   return DiceRecordClean
// }
//
// async function getOneModifierRecord(id){
//   const ModifierRecord = await pb.collection('modifier').getOne(id);
//   return {
//     id: ModifierRecord.id,
//     modifiername: ModifierRecord.modifiername,
//     modifiernumber: ModifierRecord.modifiernumber
//   }
// }

function rollRoll(record)
{
  let roll = 0;
  if(record.rolldies.length === 0)
  {
    for (let i = 0; i < record.rollmodifiers.length; i++)
    {
      roll += record.rollmodifiers[i].modifiernumber
    }
    return roll;
  }
  else if(record.rollmodifiers.length === 0)
  {
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

    const rollname = form.get('RollName') ?? '';
    const result = 0;
    const rolldies = [];
    const rollmodifiers = [];

    const CreateRecord = {
      rollname,
      result,
      rolldies,
      rollmodifiers
    }

    await pb.collection('roll').create(CreateRecord)
  },

  CreateRollGroupRecord: async ({ request }) => {
    const form = await request.formData()

    const rollgroupname = form.get('RollGroupName') ?? '';
    const rolls = [];

    const CreateRecord = {
      rollgroupname,
      rolls,
    }

    await pb.collection('roll').create(CreateRecord)
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

    await pb.collection('die').update(id, UpdatedRecord)
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

    await pb.collection('modifier').update(id, UpdatedRecord)
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

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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

    RollRecordToUpdateObject.rolldies.splice(dieid,1)

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
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

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
  },

  DeleteDiceRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('dieid') ?? '';

    await pb.collection('die').delete(id)
  },

  DeleteModifierRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('modifierid') ?? '';

    await pb.collection('modifier').delete(id)
  },

  DeleteRollRecord: async ({ request }) => {
    const form = await request.formData()
    const id = form.get('dieid') ?? '';

    await pb.collection('roll').delete(id)
  }
}
