<script>
  import {enhance} from '$app/forms'
  export let allModifierRecord
  export let RollRecordId
</script>

<form method="POST" action="?/UpdateRollRecordWithNewModifier">
  <div class="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    <div class="relative cursor-default select-none pl-8 pr-4 text-gray-900">
      <input name="rollrecordid" id="rollrecordid" type="hidden" value="{RollRecordId}"/>
      <input name="modifierid" id="modifierid" type="hidden" value="{allModifierRecord.id}"/>
      <button type="submit">
        <span class="block truncate">Name {allModifierRecord.modifiername} Dice Faces {allModifierRecord.modifiernumber}</span>
      </button>
    </div>
  </div>
</form>