<script>
  import Modifier from "./Modifier.svelte";
  import Dice from "./Dice.svelte";
  import DiceComboBox from "$lib/componets/DiceComboBox.svelte";
  import ModifierComboBox from "$lib/componets/ModifierComboBox.svelte";
  import AddNewModifier from "$lib/componets/AddNewModifier.svelte";
  import AddNewDice from "$lib/componets/AddNewDice.svelte";
  import random from "random";
  export let record
  export let diceRecord
  export let modifierRecord

  function rollRoll(roll)
  {
    let rollresult = 0;
    for (let i = 0; i < record.rolldies.length - 1; i++)
    {
      rollresult += random.int(1, record.rolldies[i].diefaces)
    }
    for (let i = 0; i < 0; i++)
    {
      rollresult += record.rollmodifiers[i].modifiernumber
    }
  }

</script>
{@debug record}
<div class="mt-6 my-1 mx-0.5 divide-y divide-gray-500/25space-y-2 py-2 sm:py-12 lg:py-16">
  <div class="relative block rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <div class="text-sm font-semibold leading-6 text-white">Roll Name - {record.rollname}</div>
    <input type="text" name="DiceNames" id="DieNames" class="m-2 mx-20 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{record.rollname}">
    <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div class="text-sm font-semibold leading-6 text-white">Dice</div>
      {#each record.rolldies as recordDice }
        {@debug recordDice}
        <Dice record="{recordDice}"/>
      {/each}
      <DiceComboBox allDiceRecords="{diceRecord}" />
      <AddNewDice />
      </div>
    <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div class="text-sm font-semibold leading-6 text-white">Modifiers</div>
      {#each record.rollmodifiers as recordModifier }
        {@debug recordModifier}
        <Modifier record="{recordModifier}"/>
      {/each}
      <ModifierComboBox allModifierRecords="{modifierRecord}" />
      <AddNewModifier />
    </div>
    <div class="flex">
      <button type="button" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Roll</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="{1.5}" stroke="currentColor" class=" w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
      </button>
      <button type="button" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Save Roll</span>
      </button>
      <button type="button" class="flex m-2 rounded-md bg-red-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
        <span class="text-sm font-semibold leading-6 text-white">Remove Roll</span>
      </button>
      <div class="text-sm py-4 px-2.5 font-semibold leading-6 text-white">Result = {record.result}</div>
    </div>
  </div>
</div>

