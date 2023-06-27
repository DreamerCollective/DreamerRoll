<script>
  import {enhance} from '$app/forms'
  export let record;
  export let recordid;
  export let rollrecordid
</script>
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
  <form method="POST" action="?/UpdateRollRecordToRemoveModifier" use:enhance>
    <input type="hidden" required name="rollid" id="rollid" value="{rollrecordid}">
    <input type="hidden" required name="modifierid" id="modifierid" value="{recordid}">
    <button type="submit" class="m-3.5 rounded-md bg-red-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
      <span class="text-sm font-semibold leading-6 text-white">Remove Modifier</span>
    </button>
  </form>
</div>