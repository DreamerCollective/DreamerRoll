import { pb } from "$lib/pocketbase.js";

export async function getAllRollRecord(){
  const RollRecord = await pb.collection('roll').getFullList({
    sort: 'created',
    expand: 'rolldies, rollmodifiers'
  });
  console.log('GetAllRollRecord = ' + RollRecord)
  return RollRecord
}

export async function getAllDiceRecord(){
  const DiceRecord = await pb.collection('dice').getFullList(200,{
    sort: 'created',
  });
  console.log('GetAllDiceRecord = ' + DiceRecord)
  return DiceRecord
}

export async function getAllModifierRecord(){
  const ModifierRecord = await pb.collection('modifier').getFullList(200,{
    sort: 'created',
  });
  console.log('GetAllModifierRecord = ' + ModifierRecord)
  return ModifierRecord
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





