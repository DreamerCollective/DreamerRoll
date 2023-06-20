<script>
  export let allModifierRecord
</script>


<ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox">
  <li class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900" id="option-0" role="option" tabindex="-1">
    <span class="block truncate">Name {allModifierRecord.modifiername} Dice Faces {allModifierRecord.modifiernumber}</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600"></span>
  </li>
</ul>