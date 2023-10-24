<script>
  import Modifier from "./Modifier.svelte";
  import Dice from "./Dice.svelte";
  import DiceComboBox from "$lib/componets/Rolls/DiceComboBox.svelte";
  import ModifierComboBox from "$lib/componets/Rolls/ModifierComboBox.svelte";
  import AddNewModifier from "$lib/componets/Rolls/AddNewModifier.svelte";
  import AddNewDice from "$lib/componets/Rolls/AddNewDice.svelte";

  import {enhance} from '$app/forms'
  export let record
  export let recordindex
  export let recordsGroupId
  export let diceRecord
  export let modifierRecord

  let BoolIsRollVisible = true;
  let BoolIsRollDiceVisible = true;
  let BoolIsRollModifiersVisible = true;
  let BoolIfDiceInRoll = IfDiceInRoll()
  let BollIfModifierInRoll = IfModifierInRoll()

  function IfDiceInRoll()
  {
    return record.rolldies !== null;
  }

  function IfModifierInRoll()
  {
    return record.rollmodifiers !== null;
  }

  function IsRollVisible()
  {
    BoolIsRollVisible = BoolIsRollVisible !== true;
  }

  function IsRollDiceVisible()
  {
    BoolIsRollDiceVisible = BoolIsRollDiceVisible !== true;
  }

  function IsRollModifiersVisible()
  {
    BoolIsRollModifiersVisible = BoolIsRollModifiersVisible !== true;
  }

</script>
<div class="mx-0.5">
  <div class="relative block rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <div>
      <button type="button" on:click={IsRollVisible} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
        Roll - {record.rollname}
        {#if BoolIsRollVisible}
        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
        {/if}
      </button>
    </div>
    {#if BoolIsRollVisible}
    <div>
      <form method="POST" action="?/UpdateRollRecordWithNewName" use:enhance>
        <div class="flex">
          <div>
            <input type="hidden" required name="rollid" id="rollid" value="{record.id}">
            <div class="block text-sm font-semibold leading-6 text-white">Roll Name - {record.rollname}</div>
            <input type="text" required name="rollname" id="rollname" class="m-2 mx-5 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{record.rollname}" value="{record.rollname}">
          </div>
          <div>
            <button type="submit" class="m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <span class="text-sm font-semibold leading-6 text-white">Save Roll</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div>
        <button type="button" on:click={IsRollDiceVisible} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
          Dice
          <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      {#if BoolIsRollDiceVisible}
        <div class="text-sm font-semibold leading-6 text-white">Dice</div>
        {#if BoolIfDiceInRoll}
          {#each record.rolldies as recordDice, i}
            <Dice record="{recordDice}" rollrecordid="{record.id}" recordid="{i}"/>
          {/each}
          <DiceComboBox allDiceRecords="{diceRecord}" recordId="{record.id}"/>
          <AddNewDice />
        {/if}
        {#if !BoolIfDiceInRoll}
          <DiceComboBox allDiceRecords="{diceRecord}" recordId="{record.id}"/>
          <AddNewDice />
        {/if}
      {/if}
    </div>

    <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div>
        <button type="button" on:click={IsRollModifiersVisible} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
          Modifiers
          <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      {#if BoolIsRollModifiersVisible}
        <div class="text-sm font-semibold leading-6 text-white">Modifiers</div>
        {#if BollIfModifierInRoll}
          {#each record.rollmodifiers as recordModifier, i}
            <Modifier record="{recordModifier}" rollrecordid="{record.id}" recordid="{i}"/>
          {/each}
          <ModifierComboBox allModifierRecords="{modifierRecord}" recordId="{record.id}" />
          <AddNewModifier />
        {/if}
        {#if !BollIfModifierInRoll}
          <ModifierComboBox allModifierRecords="{modifierRecord}" recordId="{record.id}" />
          <AddNewModifier />
        {/if}
      {/if}
    </div>

    <div class="flex">
      <form method="POST" action="?/UpdateRollRecordWithNewRollResult" use:enhance>
        <input type="hidden" required name="rollid" id="rollid" value="{record.id}">
        <button type="submit" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span class="text-sm font-semibold leading-6 text-white">Roll</span>
          <svg fill="none" viewBox="0 0 24 24" stroke-width="{1.5}" stroke="currentColor" class=" w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
          </svg>
        </button>
      </form>
      <div class="text-sm py-4 px-2.5 font-semibold leading-6 text-white">Result = {record.result}</div>
      <form method="POST" action="?/UpdateRollGroupRecordToRemoveRoll" use:enhance>
        <input type="hidden" required name="recordindex" id="recordindex" value="{recordindex}">
        <input type="hidden" required name="rollgroupid" id="rollgroupid" value="{recordsGroupId}">
        <button type="submit" class="flex m-2 rounded-md bg-red-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          <span class="text-sm font-semibold leading-6 text-white">Remove Roll</span>
        </button>
      </form>
    </div>
    {/if}
  </div>
</div>

