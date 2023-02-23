'use strict';

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// // Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const displayMovements = function (movements) {
//   containerMovements.innerHTML = '';
//   movements.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//      <div class="movements__row">
//       <div class="movements__type movements__type--${type}">${
//       i + 1
//     }${type}</div>
//         <div class="movements__value">${mov}</div>
//     </div>
//     `;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////// SIMPLE ARRAYS METHODS

///////////////////////////////////////////////// SLICE METHOD
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2)); // output expected [c,d,e]
// console.log(arr.slice(2, 4)); // output expected [2,4]
// console.log(arr.slice(-2)); // output expected [d, e]
// console.log(arr.slice(-1)); // output expected [e]
// console.log(arr.slice(1, -2)); // output expected [b,c] extracts everything from the first parameter until -2
// console.log(arr.slice()); // output expected ['a', 'b', 'c', 'd', 'e']
// console.log([...arr]); // output expected with spread operator['a', 'b', 'c', 'd', 'e']

// ///////////////////////////////////////////////// SPICE METHOD / REMOVE THE ELEMENTS IN THE ARRAY AFTER APPLY THE SPLICE METHOD
// // console.log(arr.splice(2)); //output expected [c,d,e]
// // console.log(arr); //  output expected after applied splice [a, b]
// console.log(arr.splice(-1)); // removed the last one [e]
// console.log(arr); // output expected [a,b,c,d]
// console.log(arr.splice(1, 2)); // it deleted [ b,c ]
// console.log(arr); // output expected [a,d]

// ///////////////////////////////////////////////// REVERSE METHOD

// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // output expected [f,g,h,i,j]

// ///////////////////////////////////////////////// CONCAT METHOD
// const letters = arr.concat(arr2);
// console.log(letters); // output expected [a,,b,d,e,f,g,h,i,j,]
// console.log([...arr, ...arr2]); // output expected using spread operator [a,,b,d,e,f,g,h,i,j,]

// ///////////////////////////////////////////////// JOIN METHOD
// console.log(letters.join(' - ')); // output expected [-a-,-b-,-d-,-e-,-f-,-g-,-h-,-i-,-j-]

///////////////////////////////////////////////// AT METHOD

// const arr = [23, 45, 77];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting the last array element
// console.log(arr[arr.length - 1]); // 77
// console.log(arr.slice(-1)[0]); // 77
// console.log(arr.at(-2)); // 45
// console.log('isela'.at(0)); // i
// console.log('isela'.at(-1)); //a

///////////////////////////////////////////////// FOR EACH

// const movements = [200, 300, -400, -500, 600];
// // // using for loop

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   } else {
//     console.log(`you deposited ${Math.abs(movement)}`); //math.abs to remove el sign : -
//   }
// }

// // using for each - is exactly the same
// console.log('------FOR EACH------');

// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   } else {
//     console.log(`you deposited, you withdrew ${Math.abs(movement)}`); //math.abs to remove el sign : -
//   }
// });

// /////////////////////////////////////////////// ENTRIES - THIS METHOD RETURNS A KEY AND VALUE
// // using for loop

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`you deposited ${i + 1}`);
//   } else {
//     console.log(`you deposited , you withdrew ${Math.abs(i + 1)}`); //math.abs to remove el sign : -
//   }
// }

// // using for each - is exactly the same
// console.log('------FOR EACH------');

// movements.forEach(function (move, i, arr) {
//   if (move > 0) {
//     console.log(`your movement number ${i + 1} you deposited ${move}`);
//   } else {
//     console.log(`your movement number ${i + 1} you withdrew ${Math.abs(move)}`); //math.abs to remove el sign : -
//   }
// });

// /////////////////////////////////////////////// FOR EACH WITH MAPS AND SETS
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`the value ${value} the key ${key}`);
// });
// // output expected: USD: United States dollar, EUR, Euro, GBP, Pound sterling

// // /////////////////////////////////////////////// SETS

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EURO', 'EURO']);

// // we use a throwaway parametere because the parameter key here, is useless, we changed the (value, key, map) for (value, _ , map)
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value} :${value}`);
// });
// output expected: USD:USD, GBP:GBP, EURO:EURO

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// INITIAL DATA
// const kateArr = [4, 1, 15, 8, 3];
// const juliaWrongArr = [3, 5, 2, 12, 7];
// const juliaArr = [...juliaWrongArr].slice(1, 3);

// const dogs = kateArr.concat(juliaArr);
// // const dogs1 = [...kateArr, ...juliaArr];
// // const dogs2 = [kateArr, juliaArr].flat();

// // DEFINITIONS
// const filterCats = array => {
//   return [...array].slice(1, 3);
// };
// const mergeDogs = (array1, array2) => {
//   return array1.concat(array2);
// };
// const checkAge = array => {
//   return array.forEach(function (age, index) {
//     if (age > 3) {
//       console.log(`the dog number ${index + 1} is an adult: ${age} years`);
//     } else {
//       console.log(
//         `the dog number ${index + 1} is still a puppy 🐶: ${age} years`
//       );
//     }
//   });
// };

// const main = (array1, array2) => {
//   const correctArray1 = filterCats(array1);
//   const correctArray2 = array2;
//   const mergedArrays = mergeDogs(correctArray1, correctArray2);
//   return checkAge(mergedArrays);
// };

// // INVOCATIONS
// main([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// main([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// SOLUTION 2

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// // /////////////////////////////////////////////// THE MAP METHOD

// /// The map Method
// const eurToUsd = 1.1;

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// // const movementsUSDfor = [];
// // for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// // console.log(movementsUSDfor);

// const movementsDescriptions = movements.map((move, i, arr) => {
//   if (move > 0) {
//     return `your movement number ${i + 1} you deposited ${move}`;
//   } else {
//     return `your movement number ${i + 1} you withdrew ${Math.abs(move)}`; //math.abs to remove el sign : -
//   }
// });
// console.log(movementsDescriptions);

// // /////////////////////////////////////////////// COMPUTING USERNAMES
// const user = 'Isela Yasojara Valdez Alarcón';
// const justInitials = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0]);
// // .join('');

// // output expected 'i','y','v','a'
// console.log(justInitials);
// // output with join iyva

// // /////////////////////////////////////////////// callback function
// const createUserName = function (user) {
//   const justInitials = user
//     .toLowerCase()
//     .split(' ')
//     .map(name => name[0])
//     .join('');
//   return justInitials;
// };

// console.log(createUserName('Benito LIMOusine'));

// const createUserName = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };
// console.log(accounts);
// console.log(createUserName(accounts));

// // /////////////////////////////////////////////// FILTER METHOD

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// // using  FOR
// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// }
// console.log(depositsFor);

// // withdrawals for

// const withdrawals = [];
// for (const mov of movements) {
//   if (mov < 0) {
//     withdrawals.push(mov);
//   }
// }
// console.log(withdrawals);

// withdrawals filter

// const withdrawalsDeposits = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdrawalsDeposits);

// withdrawals filter arrow function
// const withdrawalsDeposits = movements.filter(mov => mov < 0);
// console.log(withdrawalsDeposits);

// // /////////////////////////////////////////////// REDUCE METHOD
// accumulator snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`the position ${i} and acumulator is ${acc}`);
//   return acc + cur;
//   0;
// });
// console.log(balance);

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// for refuce

// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov;
// }
// console.log(balance2);

// manipulating the display balance DOM with reduce

// const calcDisplayBalance = function (movements) {
//   const balance = movements.reduce((acc, cur) => acc + cur, 0);
//   labelBalance.textContent = `${balance} EURO`;
// };

// calcDisplayBalance(account1.movements);

// GETTING THE MAX VALUE WITH REDUCE

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc;
//   } else return mov;
// }, movements[0]);

// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//data
const data1 = [5, 2, 4, 1, 15, 8, 3]; //44
const data2 = [16, 6, 10, 5, 6, 1, 4]; // 47.3

// accumulator
const calcAverageHumanAge = [];

// creating the formula to turn dogs age to human age

const humanAge = data2.map(age => {
  if (age <= 2) {
    return age * 2;
  } else if (age > 2) {
    return age * 4 + 16;
  }
});

// // Exclude all dogs that are less than 18 human years old
const adultDogs = function () {
  for (const dog of humanAge) {
    if (dog > 18) {
      calcAverageHumanAge.push(dog);
    }
  }
};
adultDogs();
console.log(calcAverageHumanAge);

// store the calcAverageHumanAge function into a variable
const calcAvg = calcAverageHumanAge;

// Calculate the average human age of all adult dogs
const avgAdultDogs = function () {
  const avg = calcAvg.reduce((acc, cur) => acc + cur / calcAvg.length, 0);
  console.log(`the avg is ${avg}`);
};
avgAdultDogs();
