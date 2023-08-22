<script>
  import RollInGroup from "$lib/componets/RollInGroup.svelte";
  import NewRoll from "$lib/componets/NewRoll.svelte";
  import NewRollComboBox from "$lib/componets/NewRollComboBox.svelte";
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
    <div class="flex flex-wrap">
    {#if BoolIfRollsInRollGroup}
      {#each rollGroupRecord.rolls as record, i}
        <RollInGroup record = {record} recordsGroupId = {rollGroupRecord.id} diceRecord = {diceRecord} modifierRecord = {modifierRecord}/>
      {/each}
      <NewRoll />
      <NewRollComboBox allRollRecords = {rollRecord} recordGroupId = {rollGroupRecord.id} />
    {/if}
    {#if !BoolIfRollsInRollGroup}
      <NewRoll />
      <NewRollComboBox />
    {/if}
    </div>
  {/if}
</div>