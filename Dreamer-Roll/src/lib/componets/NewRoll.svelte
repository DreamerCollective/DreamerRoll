<script>
  import {enhance} from '$app/forms'
  let BoolIsNewRollVisible = true;

  function IsNewRollVisible()
  {
    BoolIsNewRollVisible = BoolIsNewRollVisible !== true;
  }

</script>

<div class="mt-3 my-1 mx-0.5 divide-y divide-gray-500/25space-y-2 py-2 sm:py-6 lg:py-6">
  <div class="relative block rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <button type="button" on:click={IsNewRollVisible} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      New Roll
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
    {#if BoolIsNewRollVisible}
    <form method="POST" action="?/CreateRollRecord" use:enhance>
      <div class="flex">
        <button type="submit" class="flex m-2 rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span class="text-sm font-semibold leading-6 text-white">Add New Roll</span>
        </button>
        <input type="text" name="RollName" id="RollName" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="New Roll Name">
      </div>
    </form>
    {/if}
  </div>
</div>