/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-4-dice-race

1. Complete the function `rollDice()` by using `.map()` on the `dice` array 
   to create an array of promises for use with `Promise.race()`.
2. Refactor the function `main()` using async/await and try/catch.
3. Once you got this working, you may observe that some dice continue rolling 
   for some undetermined time after the promise returned by `Promise.race()` 
   resolves. Do you know why? Add your answer as a comment to the bottom of the 
   file.
------------------------------------------------------------------------------*/
// ! Do not remove these lines
import { rollDie } from '../../helpers/pokerDiceRoller.js';
/** @import {DieFace} from "../../helpers/pokerDiceRoller.js" */

export function rollDice() {
  const dice = [1, 2, 3, 4, 5];

  const diceRolls = dice.map(rollDie);

  return Promise.race(diceRolls);
}

// Refactor this function to use async/await and try/catch
async function main() {
  try {
    const result = await rollDice();
    console.log('resolved:', result);
  } catch (error) {
    console.error('rejected :', error.message);
  }
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

/*
When you use Promise.race(), it starts all the promises at once and gives you the result of the first one that done, regardless of whether it resolved  or rejected, However the other promises don’t stop—they keep running in the background. If you need to cancel those extra promises, you'd have to use something like AbortController or add your own logic. It’s not as simple as just calling Promise.race()*/
