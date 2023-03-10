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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
     <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
        <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// // Display balance in the DOM
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // using maths.abs to remove de negative sign
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interes = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log('array', arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interes}€`;
};

calcDisplaySummary(account1);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);

// create a function to updating the ui and reuse it in login and transfer
const updateUi = function (acc) {
  // display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // The preventDefault() method prevents form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI message
    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    // to blured pin
    inputLoginPin.blur();

    // update ui
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUi(currentAccount);
  }
});

//loan btn

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // update ui
    updateUi(currentAccount);

    // crear the input field
    inputLoanAmount.value = '';
  }
});

// close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  )
    console.log('close account!!');
  const index = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );
  console.log(index);

  //delete account
  accounts.splice(index, 1);

  // hide UI
  containerApp.style.opacity = 0;
  inputCloseUsername.value = inputClosePin.value = '';
});

// stablishing sorted is false por default
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // using a truthy or falsy value to return the array depending if its sorted or not (!)
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log('MOVEMENTS', movementsUI);

  // also this is the same but then we need to add the map separately
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////// SIMPLE ARRAYS METHODS

///////////////////////////////////////////////// SLICE METHOD  The slice() method returns selected elements in an array, as a new array.
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

/// The map Method
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

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
///////////////// SOLUTION 1
// //data
// const data1 = [5, 2, 4, 1, 15, 8, 3]; //44
// const data2 = [16, 6, 10, 5, 6, 1, 4]; // 47.3

// // accumulator
// const calcAverageHumanAge = [];

// // creating the formula to turn dogs age to human age

// const humanAge = data2.map(age => {
//   if (age <= 2) {
//     return age * 2;
//   } else if (age > 2) {
//     return age * 4 + 16;
//   }
// });

// // // Exclude all dogs that are less than 18 human years old
// const adultDogs = function () {
//   for (const dog of humanAge) {
//     if (dog > 18) {
//       calcAverageHumanAge.push(dog);
//     }
//   }
// };
// adultDogs();
// console.log(calcAverageHumanAge);

// // store the calcAverageHumanAge function into a variable
// const calcAvg = calcAverageHumanAge;

// // Calculate the average human age of all adult dogs
// const avgAdultDogs = function () {
//   const avg = calcAvg.reduce((acc, cur) => acc + cur / calcAvg.length, 0);
//   console.log(`the avg is ${avg}`);
// };
// avgAdultDogs();

///////////////// SOLUTION 2

// const avgTotal = function (ages) {
//   const dogAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = dogAges.filter(age => age > 18);
//   const avg = adults.reduce((acc, cur) => acc + cur / adults.length, 0);
//   // const avg = adults.reduce (( accu, age,  i, arr) => acc + age / arr. length 0)
//   return avg;
// };

// const avg1 = [5, 2, 4, 1, 15, 8, 3];
// const avg2 = [16, 6, 10, 5, 6, 1, 4];

// const test1 = avgTotal(avg1);
// const test2 = avgTotal(avg2);

// console.log('test1', test1);
// console.log('test2', test2);

// /////////////////////////////////////// THE CHAINING METHOD
// // data
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroUsd = 1.1;
// // console.log(movements);
// // Pipeline
// const totalDepostitUsd = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     //removing all the negative values
//     //console.log(arr);
//     return mov * euroUsd;
//     //.map(mov => mov * euroUsd)
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepostitUsd);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const testAvg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const testAvg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log('test Avg', testAvg1, testAvg2);

// /////////////////////////////////////// FIND METHOD
// const firstWithdrawals = movements.find(mov => mov < 0);
// console.log(firstWithdrawals);
// console.log(movements);
// console.log(accounts);

// // find a owner account  in accounts array using find method

// const accounts2 = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accounts2);

///////////////////////////////////////SOME AND EVERY

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// FOR EQUALITY
console.log('includes method', movements.includes(-130));

// FOR CONDITION
console.log(
  'some method',
  movements.some(mov => mov < 0)
);

const anyDeposit = movements.some(mov => mov > 0);
console.log('some method in a variable', anyDeposit);

// every
// to check every movement > 0 en the accounts (output expected false)
console.log(movements.every(mov => mov > 0));
// to check every movement > 0 en the account 4 (output expected true)
console.log(account4.movements.every(mov => mov > 0));

// separate call back
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////FLAT AND FLAT  WITH CHAINING
// flat a nested  array
const flattedArr = [[1, 2, 3], 3, 4, [3, 4, 5]];

console.log(flattedArr.flat()); // output expected [1, 2, 3, 3, 4, 3, 4, 5]

// flat a second level of nested  array
const flattedArr2 = [[[1, 2, 3]], [3, 4, 5], [3, 4, 5]];
console.log(flattedArr2.flat(2)); //output expected [1, 2, 3, 3, 4, 3, 4, 5]

// // mapping all tha acont arrays movemenyts  // [Array(8), Array(8), Array(8), Array(5)]
// const accMovements = accounts.map(acc => acc.movements);
// console.log(accMovements);
// // flatting the array with all the account movements
// const allMovements = accMovements.flat();
// console.log(allMovements);

// // to sum all the movements to get one amount //17840
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// to sum all the movements to get one amount with chaining //17840
const overlBalalceChaining = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overlBalalceChaining);

///////////////////////////////////////FLATMAP
// to flat and map in just one method

const overlBalalceChaining2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overlBalalceChaining2);

///////////////////////////////////////SORTING STRINGS
// sorting alphabetically strings
const owners = ['Isela', 'Erwan', 'Beito', 'Doudou', 'Miawiricio'];
console.log(owners.sort());

// sorting movemenents array
// return < 0, A, B(keep order)
// return > 0, A, B(switch order)

//ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log('ascending', movements);

//decending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log('descending', movements);

///////////////////////////////////////MORE WAYS TO CREATING AND FILLING ARRAYS

// FILL
//empty arrays + fill method
const arr = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7);
// filling the empy spaces inside the array
x.fill(3);
console.log(x); //output expected [3,3,3,3,3,3,3]
x.fill(1, 3); // output expected [1,1,1,3,3,3,3]
console.log(x);

arr.fill(26, 2, 5, 6); //[1, 2, 26, 26, 26, 6, 7]
console.log(arr);

////////////////////////////////////// array.from
// output expected: [1, 1, 1, 1, 1, 1, 1]
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// copying the same array 1-7 using .from // output expected [1, 2, 3, 4, 5, 6, 7]

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

// example: an array of 100 random numbers

// const random = Array.from({ length: 100 }, () => Math.random());

// console.log(random);

// flatten an array and returning just positive values with filter and sum all the values with reduce

//1
const bankDeposit = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
// console.log('bank deposit', bankDeposit);

//2
// to get the num of deposits
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;
// console.log(numDeposits1000);

const numDeposits1000Reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// console.log(numDeposits1000Reduce);

// prefixed operator
let a = 10;
// console.log(++a);
// console.log(a);

//3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur >= 1000 ? (sums.deposits += cur) : (sums.withdrawals += cur), 0;
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;

      return sums;
    },
    {
      deposits: 0,
      withdrawals: 0,
    }
  );

// console.log(deposits, withdrawals);

// 4

// this is a nice title, This is a nice title

const tittleExample = function (title) {
  const exeptions = ['of', 'is', 'a', 'the'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exeptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(tittleExample('THIS IS a nice long title'));
console.log(tittleExample('this a nice long title'));
console.log(tittleExample('THIS IS a nice ANOTHER EXAMPLE OF long title'));
