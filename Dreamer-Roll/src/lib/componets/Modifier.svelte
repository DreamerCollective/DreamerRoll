<script>
  import { pb } from "$lib/pocketbase.js";
  import { onMount } from "svelte";

  export let record;

  console.log(record)
  //onMount(async () => {})
  async function getModifierRecord(){
    const modifierrecord = await pb.collection('modifier').getOne(record)
    console.log(modifierrecord)
    return modifierrecord
  }

  let getmodifierRecord = getModifierRecord()




</script>
{#await getmodifierRecord then modifierrecord}
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <form method="POST" action="?/UpdateDiceFacesRecord">
    <div class="text-sm font-semibold leading-6 text-white">Name - {modifierrecord.modifiername}</div>
    <div class="flex">
      <input type="text" name="modifiername" id="modifiername" class="m-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{modifierrecord.modifiername}">
      <button type="button" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Edit Die Name</span>
      </button>
    </div>
  </form>
  <form method="POST">
    <div class="text-sm font-semibold leading-6 text-white">Die faces - {modifierrecord.modifiernumber}</div>
    <div class="flex">
      <input type="text" name="DiceFaces" id="DiceFaces" class="m-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{modifierrecord.modifiernumber}">
      <button type="button" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="text-sm font-semibold leading-6 text-white">Edit Die Faces</span>
      </button>
    </div>
  </form>
</div>
{/await}