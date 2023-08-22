import { pb } from "$lib/server/pocketbase.js";
import random from "random";
import {getAllRollRecord, getAllDiceRecord, getAllModifierRecord, getOneRollRecordForUpdate, getAllRollGroupRecord, getOneRollGroupRecordToUpdate, getWholeOneRollRecordForUpdate, rollRoll, getOneRollGroupRecordWhole}from "$lib/server/pocketbaseCRUD.js";

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

    await pb.collection('rollgroup').create(CreateRecord)
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

    RollRecordToUpdateObject.rolldies.splice(dieid.index,1)

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

    RollRecordToUpdate.rollmodifiers.splice(modifierid,1)

    await pb.collection('roll').update(RollId, RollRecordToUpdateObject)
  },

  UpdateRollGroupRecordToRemoveRoll: async ({ request }) => {
    const form = await request.formData()

    const rollid = form.get('rollid') ?? '';
    const rollgroupid = form.get('rollgroupid') ?? '';

    let RollGroupRecordToUpdate = await getOneRollGroupRecordToUpdate(rollgroupid)

    console.log(RollGroupRecordToUpdate)

    const RollRecordToUpdateObject = {
      rollgroupname: RollGroupRecordToUpdate.rollgroupname,
      rolls: RollGroupRecordToUpdate.rolls,
    }

    RollRecordToUpdateObject.rolls.splice(rollid, 1)

    await pb.collection('rollgroup').update(rollgroupid, RollRecordToUpdateObject)
  },

  UpdateRollGroupRecordToAddRoll: async ({ request }) => {
    const form = await request.formData()

    const rollrecordid = form.get('rollrecordid') ?? '';
    const rollgroupid = form.get('rollgroupid') ?? '';

    let RollGroupRecordToUpdate = await getOneRollGroupRecordToUpdate(rollgroupid)

    const RollRecordToUpdateObject = {
      rollgroupname: RollGroupRecordToUpdate.rollgroupname,
      rolls: RollGroupRecordToUpdate.rolls,
    }

    RollRecordToUpdateObject.rolls.push(rollrecordid)

    await pb.collection('rollgroup').update(rollgroupid, RollRecordToUpdateObject)
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

  UpdateRollGroupRecordWithNewName: async ({ request }) => {
    const form = await request.formData()

    const rollgroupname = form.get('rollgroupname') ?? '';
    const rollgrouprolls = form.get('rollgrouprolls') ?? '';
    const RollId = form.get('rollid') ?? '';

    let RollRecordToUpdate = await getOneRollRecordForUpdate(RollId)

    const RollRecordToUpdateObject = {
      rollgroupname: rollgroupname,
      rolls: RollRecordToUpdate.rollmodifiers,
    }

    await pb.collection('rollgroup').update(RollId, RollRecordToUpdateObject)
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
    const id = form.get('rollid') ?? '';

    await pb.collection('roll').delete(id)
  },

  DeleteRollGroupRecord: async ({ request }) => {
    const form = await request.formData()

    const id = form.get('RollGroupid') ?? '';

    await pb.collection('rollgroup').delete(id)
  },
}
