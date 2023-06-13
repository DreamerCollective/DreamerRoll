<script>
  import random from "random"
  import { pb } from "$lib/pocketbase.js";
  import { StoreDice } from "$lib/Store.js";

  export let record;

  let seed
  let min
  let max

  function rollDice(min, max)
  {
    random.use(seed)
    return random.int(min, max)
  }

  async function getDiceRecord(){
    const dicerecord = await pb.collection('die').getOne(record)
    console.log(dicerecord)
    $StoreDice.push(dicerecord)
    console.log("StoreDice = ",$StoreDice)
    return dicerecord
  }
  let getdiceRecord = getDiceRecord()
</script>
{#await getdiceRecord then dicerecord}
<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <form method="POST" action="?/UpdateDiceFacesRecord">
    <div class="text-sm font-semibold leading-6 text-white">Name - {dicerecord.dienames}</div>
    <input type="text" name="DiceNames" id="DieNames" class="m-2 mx-20 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{dicerecord.dienames}">
    <div class="text-sm font-semibold leading-6 text-white">Die faces - {dicerecord.diefaces}</div>
    <input type="number" name="DiceFaces" id="DiceFaces" class="m-2 mx-20 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="{dicerecord.diefaces}">
    <button type="button" class="m-3.5 rounded-md bg-indigo-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <span class="text-sm font-semibold leading-6 text-white">Edit Die</span>
    </button>
    <button type="button" class="m-3.5 rounded-md bg-red-600 py-1 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
      <span class="text-sm font-semibold leading-6 text-white">Remove Die</span>
    </button>
  </form>
</div>
{/await}