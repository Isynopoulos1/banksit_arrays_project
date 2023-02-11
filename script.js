'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

// Elements
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

const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
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
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`the value ${value} the key ${key}`);
});
// output expected: USD: United States dollar, EUR, Euro, GBP, Pound sterling

// /////////////////////////////////////////////// SETS

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EURO', 'EURO']);

// we use a throwaway parametere because the parameter key here, is useless, we changed the (value, key, map) for (value, _ , map)
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value} :${value}`);
});
// output expected: USD:USD, GBP:GBP, EURO:EURO
