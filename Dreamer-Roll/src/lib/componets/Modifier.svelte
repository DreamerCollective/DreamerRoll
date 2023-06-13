<script>
  import { pb } from "$lib/pocketbase.js";
  import { onMount } from "svelte";
  import { StoreDice, StoreModifier } from "$lib/Store.js";

  export let record;

  console.log(record)
  //onMount(async () => {})
  async function getModifierRecord(){
    const modifierrecord = await pb.collection('modifier').getOne(record)
    console.log(modifierrecord)
    $StoreModifier.push(modifierrecord)
    console.log("StoreModifier = ",$StoreModifier)
    return modifierrecord
  }

  let getmodifierRecord = getModifierRecord()




</script>
{#await getmodifierRecord then modifierrecord}
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <form method="POST" action="?/UpdateDiceFacesRecord">
    <div class="text-sm font-semibold leading-6 text-white">Name - {modifierrecord.modifiername}</div>
    <input type="text" name="modifiername" id="modifiername" class="m-2 mx-20 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{modifierrecord.modifiername}">
    <div class="text-sm font-semibold leading-6 text-white">Modifer - {modifierrecord.modifiernumber}</div>
    <input type="number" name="modifiernumber" id="modifiernumber" class="m-2 mx-20 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{modifierrecord.modifiernumber}">
    <button type="button" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <span class="text-sm font-semibold leading-6 text-white">Edit Modifier</span>
    </button>
    <button type="button" class="m-3.5 rounded-md bg-red-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
      <span class="text-sm font-semibold leading-6 text-white">Remove Modifier</span>
    </button>
  </form>
</div>
{/await}
