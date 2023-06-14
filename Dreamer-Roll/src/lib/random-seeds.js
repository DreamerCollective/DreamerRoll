import random, { Random } from 'random'
export const get = async () => ({
  body: {
    // use your favorite algorithm for this
    seed: new Random()
  },
})

let seed
let min
let max

function rollDice(min, max)
{
  random.use(seed)
  return random.int(min, max)
}