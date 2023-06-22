<script>
  export let AttachedRollId;
</script>

<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <form method="POST" action="?/CreateModifierRecord">
    <div class="text-sm font-semibold leading-6 text-white">New Modifier</div>
    <input type="hidden" required name="RollId" id="RollId" value="{AttachedRollId}">
    <input type="text" required name="ModifierName" id="ModifierName" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="New Modifier Name">
    <input type="number" required name="ModifierNumber" id="ModifierNumber" class="w-full my-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="New Modifier Number">
    <button type="submit" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <span class="text-sm font-semibold leading-6 text-white">Add Modifier</span>
    </button>
  </form>
</div>