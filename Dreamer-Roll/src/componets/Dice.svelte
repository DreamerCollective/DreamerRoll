<script>
  import random from "random"

  export let seed
  export let min
  export let max

  function rollDice(min, max)
  {
    random.use(seed)
    return random.int(min, max)
  }

</script>