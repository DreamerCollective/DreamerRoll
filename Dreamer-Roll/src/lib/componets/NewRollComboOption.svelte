<script>
  import {enhance} from '$app/forms'
  export let allRollRecord
  export let RollGroupRecordId
</script>

<form method="POST" action="?/UpdateRollGroupRecordToAddRoll" use:enhance>
  <div class="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    <div class="relative cursor-default select-none pl-8 pr-4 text-gray-900">
      <input required name="rollrecordid" id="rollrecordid" type="hidden" value="{allRollRecord.id}"/>
      <input required name="rollgroupid" id="rollgroupid" type="hidden" value="{RollGroupRecordId}"/>
      <button type="submit">
        <span class="block truncate">Name {allRollRecord.rollname}</span>
      </button>
    </div>
  </div>
</form>