<script>
  import Modifier from "./Modifier.svelte";
  import Dice from "./Dice.svelte";
  import { pb } from "$lib/pocketbase.js";
  export let record

  let DiceComboBox = false
  let ModifierCombobox = false

  function expandDiceComboBox()
  {
    DiceComboBox = DiceComboBox !== true;
  }
  function expandModifierComboBox()
  {
    ModifierCombobox = ModifierCombobox !== true;
  }

  async function addDice()
  {

  }
  async function addMofifiers()
  {

  }



  async function getAllDiceRecord(){
    const DiceRecord = await pb.collection('Dice').getFullList(200,{
      sort: 'created',
    });
    console.log(DiceRecord)
    return DiceRecord
  }
</script>

<div class="mt-6 my-1 mx-0.5 divide-y divide-gray-500/25space-y-2 py-2 sm:py-12 lg:py-16">
  <div class="relative block rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <div class="flex-auto" >
      {#each record.rolldies as recordDice }
        <Dice record="{recordDice}"/>
      {/each}

      <span class="text-sm font-semibold leading-6 text-white">Add New Dice</span>
      {#if DiceComboBox}
        <label for="combobox" class="block text-sm font-medium leading-6 text-gray-900">Add Dice</label>
      <div class="relative mt-2">
        <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
        <button type="button" on:click={expandDiceComboBox} class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
        <DiceComboBox DiceComboBox="{getAllDiceRecord}" />
      </div>
      {/if}
      {#if !DiceComboBox}
      <label for="combobox" class="block text-sm font-medium leading-6 text-gray-900">Add Dice</label>
      <div class="relative mt-2">
        <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
        <button type="button" on:click={expandDiceComboBox} class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      {/if}
    </div>
    <div>
      {#each record.rollmodifiers as recordModifier }
        <Modifier record="{recordModifier}"/>
      {/each}
      <span class="text-sm font-semibold leading-6 text-white">Add New Modifier</span>
      {#if DiceComboBox}
        <label for="combobox" class="block text-sm font-medium leading-6 text-gray-900">Add Dice</label>
        <div class="relative mt-2">
          <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
          <button type="button" on:click={expandDiceComboBox} class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <DiceComboBox DiceComboBox="{getAllDiceRecord}" />
        </div>
      {/if}
      {#if !DiceComboBox}
        <label for="combobox" class="block text-sm font-medium leading-6 text-gray-900">Add Dice</label>
        <div class="relative mt-2">
          <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
          <button type="button" on:click={expandDiceComboBox} class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      {/if}

    </div>
    <div class="flex">
      <button type="button" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Roll</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="{1.5}" stroke="currentColor" class=" w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
      </button>
      <button type="button" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Remove Roll</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="{1.5}" stroke="currentColor" class=" w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
      </button>
    </div>
  </div>
</div>

