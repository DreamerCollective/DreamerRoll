<script>
  import RollInGroup from "$lib/componets/RollInGroup.svelte";
  import NewRoll from "$lib/componets/NewRoll.svelte";
  import NewRollComboBox from "$lib/componets/NewRollComboBox.svelte";
  import {enhance} from '$app/forms'
  export let rollGroupRecord
  export let rollRecord
  export let diceRecord
  export let modifierRecord

  let BoolIsRollListVisible = true;
  let BoolIfRollsInRollGroup = IfRollsInRollGroup()

  function IsRollListVisible()
  {
    BoolIsRollListVisible = BoolIsRollListVisible !== true;
  }
  function IfRollsInRollGroup()
  {
    return rollGroupRecord.rolls !== null;
  }

</script>
<div class=" relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <div>
    <button type="button" on:click={IsRollListVisible} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Roll List - {rollGroupRecord.rollgroupname}
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  {#if BoolIsRollListVisible}
  <div>
    <form method="POST" action="?/UpdateRollGroupRecordWithNewName" use:enhance>
      <div class="flex">
        <div>
          <input type="hidden" required name="rollgroupid" id="rollgroupid" value="{rollGroupRecord.id}">
          <div class="block text-sm font-semibold leading-6 text-white">Roll Name - {rollGroupRecord.rollgroupname}</div>
          <input type="text" required name="rollgroupname" id="rollgroupname" class="m-2 mx-5 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{rollGroupRecord.rollgroupname}" value="{rollGroupRecord.rollgroupname}">
        </div>
        <div>
          <button type="submit" class="m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span class="text-sm font-semibold leading-6 text-white">Save Roll Group</span>
          </button>
        </div>
      </div>
    </form>
  </div>

    <div class="flex flex-wrap">
    {#if BoolIfRollsInRollGroup}
      {#each rollGroupRecord.rolls as record, i}
        <RollInGroup record = {record} recordsGroupId = {rollGroupRecord.id} recordindex={i} diceRecord = {diceRecord} modifierRecord = {modifierRecord}/>
      {/each}
      <div class="flex flex-col">
        <NewRoll />
        <NewRollComboBox allRollRecords = {rollRecord} recordGroupId = {rollGroupRecord.id} />
      </div>
    {/if}
    {#if !BoolIfRollsInRollGroup}
      <div class="flex flex-col">
        <NewRoll />
        <NewRollComboBox allRollRecords = {rollRecord} recordGroupId = {rollGroupRecord.id} />
      </div>
    {/if}
    </div>
    <form method="POST" action="?/DeleteRollGroupRecord" use:enhance>
      <input type="hidden" required name="rollgrouprecordid" id="rollgrouprecordid" value="{rollGroupRecord.id}">
      <button type="submit" class="flex m-2 rounded-md bg-red-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
        <span class="text-sm font-semibold leading-6 text-white">Remove Roll Group</span>
      </button>
    </form>
  {/if}
</div>