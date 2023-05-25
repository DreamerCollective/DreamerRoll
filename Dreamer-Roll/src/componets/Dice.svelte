<script>
  import random from "random"

  export let record;

  let seed
  let min
  let max

  function rollDice(min, max)
  {
    random.use(seed)
    return random.int(min, max)
  }

</script>

<div class="relative block w-90% rounded-lg border-2 border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  <input type="email" name="DiceFaces" id="DiceFaces" class="m-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Dice Faces {record.diefaces}">
</div>