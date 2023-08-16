<script>
  import AddNewModifier from "$lib/componets/AddNewModifier.svelte";
  import AddNewDice from "$lib/componets/AddNewDice.svelte";
  import ModifierList from "$lib/componets/ModifierList.svelte";
  import DiceList from "$lib/componets/DiceList.svelte";

  export let diceRecord
  export let modifierRecord

  let DiceModifierListComboBoxButton = true
  function expandDiceModifierListComboBox()
  {
    DiceModifierListComboBoxButton = DiceModifierListComboBoxButton !== true;
  }

  let DiceListComboBoxButton = true
  function expandDiceListComboBox()
  {
    DiceListComboBoxButton = DiceListComboBoxButton !== true;
  }

  let ModifierListComboBoxButton = true
  function expandModifierListComboBox()
  {
    ModifierListComboBoxButton = ModifierListComboBoxButton !== true;
  }

</script>
<div class="flex flex-col flex-wrap">
  <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <button type="button" on:click={expandDiceModifierListComboBox} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Dice and Modifier List
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  {#if DiceModifierListComboBoxButton}
  <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <button type="button" on:click={expandDiceListComboBox} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Dice List
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
    {#if DiceListComboBoxButton}
    <div class="flex flex-row flex-wrap">
      {#each diceRecord as recordDice }
        <DiceList record="{recordDice}"/>
      {/each}
      <AddNewDice />
    </div>
    {/if}
  </div>
  <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <button type="button" on:click={expandModifierListComboBox} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Modifier List
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
    {#if ModifierListComboBoxButton}
    <div class="flex flex-row flex-wrap">
      {#each modifierRecord as recordModifier }
        <ModifierList record="{recordModifier}"/>
      {/each}
      <AddNewModifier />
    </div>
    {/if}
  </div>
  {/if}
  </div>
</div>