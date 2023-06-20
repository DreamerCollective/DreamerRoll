<script>
  import { NewRoll } from "$lib/Store.js"
  import Modifier from "./Modifier.svelte";
  import Dice from "./Dice.svelte";
  import DiceComboBox from "$lib/componets/DiceComboBox.svelte";
  import ModifierComboBox from "$lib/componets/ModifierComboBox.svelte";
  import AddNewModifier from "$lib/componets/AddNewModifier.svelte";
  import AddNewDice from "$lib/componets/AddNewDice.svelte";

  export let diceRecord
  export let modifierRecord
</script>

<div class="mt-6 my-1 mx-0.5 divide-y divide-gray-500/25space-y-2 py-2 sm:py-12 lg:py-16">
  <div class="relative block rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <div class="text-sm font-semibold leading-6 text-white">New Roll</div>
    <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div class="text-sm font-semibold leading-6 text-white">Dice</div>
      <!--{#each $NewRoll.rolldies as recordDice }
        {@debug recordDice}
        <Dice record="{recordDice}"/>
      {/each}-->
      <DiceComboBox allDiceRecords="{diceRecord}" />
      <AddNewDice />
    </div>
    <div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div class="text-sm font-semibold leading-6 text-white">Modifiers</div>
      <!--{#each $NewRoll.rollmodifiers as recordModifier }
        {@debug recordModifier}
        <Modifier record="{recordModifier}"/>
      {/each}-->
      <ModifierComboBox allModifierRecords="{modifierRecord}" />
      <AddNewModifier />
    </div>
    <div class="flex">
      <button type="button" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Add New Roll</span>
      </button>
    </div>
  </div>
</div>