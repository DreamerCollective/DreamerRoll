<script>
  import { pb } from "$lib/pocketbase.js";

  export let record;

  console.log(record)

  async function getModifierRecord(){
    const modifierrecord = await pb.collection('modifier').getOne(record)
    console.log(modifierrecord)
    return modifierrecord
  }

  let getmodifierRecord = getModifierRecord()


</script>
{#await getmodifierRecord then modifierrecord}
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <input type="email" name="Modifier" id="Modifier" class="m-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Modifier = { modifierrecord.modifiernumber}">
</div>
{/await}