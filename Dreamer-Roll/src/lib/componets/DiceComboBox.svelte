<script>


  let DiceComboBoxButtion = false
  function expandDiceComboBox()
  {
    DiceComboBoxButtion = DiceComboBoxButtion !== true;
  }

  let allDiceRecords

</script>
{@debug allDiceRecords}
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
<span class="text-sm font-semibold text-white">Add New Dice</span>
{#if DiceComboBoxButtion}
  <label for="combobox" class="block text-sm font-medium leading-none text-gray-900">Add Dice</label>
  <div class="relative mt-2">
    <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
    <button type="button" on:click={expandDiceComboBox} class="absolute inset-y-0 right-0 items-center rounded-r-md px-2 focus:outline-none">
      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
    {#each allDiceRecords as allDiceRecord}
    <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox">
      <li class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900" id="option-0" role="option" tabindex="-1">
        <span class="block truncate">Name {allDiceRecord.dicename} Dice Faces {allDiceRecord.dicefaces}</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600"></span>
      </li>
    </ul>
    {/each}
  </div>
{/if}
{#if !DiceComboBoxButtion}
  <label for="combobox" class="block text-sm font-medium leading-none text-gray-900">Add Dice</label>
  <div class="relative mt-2">
    <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
    <button type="button" on:click={expandDiceComboBox} class="absolute inset-y-0 right-0 items-center rounded-r-md px-2 focus:outline-none">
      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
{/if}
</div>

