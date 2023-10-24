import { pb } from "$lib/server/pocketbase.js";
import random from "random";

export async function getAllRollRecord() {
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
        return {
          id: record.id, rollname: record.rollname, result: record.result,
          rolldies: [],
          rollmodifiers: [],
        }
      }
    }
  );
}

export async function getAllRollGroupRecord() {
  const RollGroupRecord = await pb.collection('rollgroup').getFullList({
    sort: 'created',
    expand: 'rolls, rolls.rolldies, rolls.rollmodifiers',
  });
  console.log("New RollGroupRecord")
  console.log(RollGroupRecord)
  return RollGroupRecord.map((record) =>
    {
      if (record.rolls.length > 0) {
        return {
          id: record.id, rollgroupname: record.rollgroupname,
          rolls: record.expand.rolls.map((record) => {
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
              return {
                id: record.id, rollname: record.rollname, result: record.result,
                rolldies: [],
                rollmodifiers: [],
              }
            }
          }),
        }
      }
      else if (record.rolls.length === 0)
      {
        return {
          id: record.id, rollgroupname: record.rollgroupname,
          rolls: [],
        }
      }
    }
  );
}

export async function getOneRollGroupRecordWhole(id) {
  const RollGroupRecord = await pb.collection('rollgroup').getOne(id,{
    sort: 'created',
    expand: 'rolls,rolls.rolldies,rolls.rollmodifiers',
  });
  if (RollGroupRecord.rolls.length > 0) {
    return {
      id: RollGroupRecord.id, rollgroupname: RollGroupRecord.rollgroupname,
      rolls: RollGroupRecord.expand.rolls.map((record) => {
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
          return {
            id: record.id, rollname: record.rollname, result: record.result,
            rolldies: [],
            rollmodifiers: [],
          }
        }
      }),
    }
  }
  else if (RollGroupRecord.rolls.length === 0)
  {
    return {
      id: RollGroupRecord.id, rollgroupname: RollGroupRecord.rollgroupname,
      rolls: [],
    }
  }
}

export async function getOneRollGroupRecordToUpdate(id) {
  const RollGroupRecord = await pb.collection('rollgroup').getOne(id,{
    sort: 'created',
    expand: 'rolls',
  });
  if (RollGroupRecord.rolls.length > 0) {
    return {
      id: RollGroupRecord.id, rollgroupname: RollGroupRecord.rollgroupname,
      rolls: RollGroupRecord.expand.rolls.map((record) => {
        return record.id
      }),
    }
  }
  else if (RollGroupRecord.rolls.length === 0)
  {
    return {
      id: RollGroupRecord.id, rollgroupname: RollGroupRecord.rollgroupname,
      rolls: [],
    }
  }
}

export async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('die').getFullList({
    sort: 'created',
  });
  console.log("New DiceRecord")
  console.log(DiceRecord)
  return DiceRecord.map((record) => {
    return { id: record.id, diefaces: record.diefaces, diename: record.diename }
  })
}

export async function getAllModifierRecord(){
  const ModifierRecord = await pb.collection('modifier').getFullList({
    sort: 'created',
  });
  console.log("New ModifierRecord")
  console.log(ModifierRecord)
  return ModifierRecord.map((record) => {
    return { id: record.id, modifiername: record.modifiername, modifiernumber: record.modifiernumber }
  })
}

export async function getWholeOneRollRecordForUpdate(id){
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

export async function getOneRollRecordForUpdate(id){
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

// export async function getOneDiceRecord(id){
//   const DiceRecord = await pb.collection('die').getOne(id);
//   return = {
//     id: DiceRecord.id,
//     diename: DiceRecord.diename,
//     diefaces: DiceRecord.diefaces
//   }
// }
//
// export async function getOneModifierRecord(id){
//   const ModifierRecord = await pb.collection('modifier').getOne(id);
//   return {
//     id: ModifierRecord.id,
//     modifiername: ModifierRecord.modifiername,
//     modifiernumber: ModifierRecord.modifiernumber
//   }
// }

export function rollRoll(record)
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