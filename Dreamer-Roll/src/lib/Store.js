import { pb } from "$lib/pocketbase.js";

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
  const DiceRecord = await pb.collection('dice').getFullList({
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





