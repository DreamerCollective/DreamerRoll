<script>
  import {enhance} from '$app/forms'
  export let record;
  export let recordid;

  let BoolIsRollModifiersVisible = true;

  function IsRollModifiersVisible()
  {
    BoolIsRollModifiersVisible = BoolIsRollModifiersVisible !== true;
  }
</script>
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <div>
    <button type="button" on:click={IsRollModifiersVisible} class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Modifier - {record.modifiername}
        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
    </button>
  </div>
  {#if BoolIsRollModifiersVisible}
  <form method="POST" action="?/UpdateModifierRecord" use:enhance>
    <input type="hidden" required name="modifierid" id="modifierid" value="{record.id}">
    <div class="text-sm font-semibold leading-6 text-white">Name - {record.modifiername}</div>
    <input type="text" required name="modifiername" id="modifiername" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 leading-6" placeholder="{record.modifiername}" value="{record.modifiername}">
    <div class="text-sm font-semibold leading-6 text-white">Modifer - {record.modifiernumber}</div>
    <input type="number" required name="modifiernumber" id="modifiernumber" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{record.modifiernumber}" value="{record.modifiernumber}">
    <button type="submit" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <span class="text-sm font-semibold leading-6 text-white">Edit Modifier</span>
    </button>
  </form>
  <form method="POST" action="?/DeleteModifierRecord" use:enhance>
    <input type="hidden" required name="modifierid" id="modifierid" value="{record.id}">
    <button type="submit" class="m-3.5 rounded-md bg-red-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
      <span class="text-sm font-semibold leading-6 text-white">Remove Modifier</span>
    </button>
  </form>
  {/if}
</div>