<script>
  import {enhance} from '$app/forms'
  export let record;
</script>
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <form method="POST" action="?/UpdateDiceRecord" use:enhance>
    <input type="hidden" required name="dieid" id="dieid" value="{record.id}">
    <div class="text-sm font-semibold leading-6 text-white">Name - {record.dienames}</div>
    <input type="text" required name="diename" id="diename" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{record.dienames}" value="{record.dienames}">
    <div class="text-sm font-semibold block leading-6 text-white">Die faces - {record.diefaces}</div>
    <input type="number" name="diefaces" id="dicefaces" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{record.diefaces}" value="{record.diefaces}">
    <button type="submit" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <span class="text-sm font-semibold leading-6 text-white">Edit Die</span>
    </button>
  </form>
  <form method="POST" action="?/DeleteDiceFacesRecord" use:enhance>
    <input type="hidden" required name="dieid" id="dieid" value="{record.id}">
    <button type="submit" class="m-3.5 rounded-md bg-red-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
      <span class="text-sm font-semibold leading-6 text-white">Remove Die</span>
    </button>
  </form>
</div>