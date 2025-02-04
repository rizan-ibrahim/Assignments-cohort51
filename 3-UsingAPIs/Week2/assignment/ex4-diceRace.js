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
When you use Promise.race(), it’s like starting a bunch of races at once and declaring a winner as soon as the first one finishes—whether it succeeds or fails. But here’s the catch: even after that first result comes in, the other promises you passed to race() don’t just disappear. They keep chugging away in the background because JavaScript doesn’t have a built-in way to halt promises once they’ve started. Imagine rolling five virtual dice with Promise.race()—the moment the first die lands, you get your result, but the other four? They’re still spinning, and there’s no way to magically freeze them mid-air.

If you really need to stop those leftover promises (like saving resources or avoiding unnecessary work), things get trickier. You’d have to roll up your sleeves and use tools like AbortController to manually signal cancellation, or come up with your own cleanup logic. It’s doable, but it’s definitely not as simple as just calling Promise.race() and calling it a day.*/
