<script>
  import Modifier from "../componets/Modifier.svelte";
  import Dice from "../componets/Dice.svelte";

  export let record

  let numberofDice
  let numberofModifiers
  function addDice(numberofDice)
  {

  }
  function addMofifiers(numberofModifiers)
  {

  }
</script>

<div class="mt-6 -my-1 divide-y divide-gray-500/25space-y-2 py-2 sm:py-12 lg:py-16">
  <div class="relative block rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <div>
      {#each record.data as recordDice}
        <Dice record="{recordDice}"/>
      {/each}
      <button type="button" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Add New Dice</span>
      </button>
    </div>
    <div>
      {#each record.data as recordModifier}
        <Modifier record="{recordModifier}"/>
      {/each}
      <button type="button" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Add New Modifier</span>
      </button>
    </div>
    <div class="flex">
      <button type="button" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Roll</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="{1.5}" stroke="currentColor" class=" w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
      </button>
    </div>
  </div>
</div>

