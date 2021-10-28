---
layout: post
title: Spread 문법과 구조 분해 할당
date: 2021-06-11 09:29:20 +07:00
categories: [Javascript Essentials]
tags: [Javascript]
description: Spread 연산자(Operator) - 배열 또는 객체를 풀어서 인자로 전달하거나, 각각의 요소로 넣을 때 사용한다.
---

# Spread

Spread 연산자는 배열 또는 객체를 풀어서 인자로 전달하거나, 각각의 요소로 넣을 때 사용된다. ES6에서 도입되었다.

```js
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
const concatenated = [...arr1, ...arr2]; // 여러 개의 배열을 이어 붙일 수 있습니다.
console.log(concatenated); // [0, 1, 2, 3, 4, 5]

const arr3 = [1, 2, 3];
const spread = [0, ...arr3, 4]; // 이어붙여 만들어진 배열은 원본에 영향을 주지 않습니다.
console.log(spread); // [0, 1, 2, 3, 4]
```

Spread 문법은 배열 또는 객체를 합치거나, 복사할 때 강력한 힘을 발휘한다.

또한, Spread 문법은 기존 배열을 변경하지 않는다.(immutable)<br>
참조 자료형인 배열, 객체의 기존 배열을 변경하려면 새로 할당해야 한다.

```js
const jPopPlayList = {
  sekaiNoOwari: 'RPG',
  aimyon: 'Harunohi',
  backNumber: 'Mabataki',
};
const kPopPlayList = {
  wonstein: 'Laser',
  gDragon: 'R.O.D',
  bigbang: ['Blue', 'Loser'],
  // bigbang key는 복사된 객체에서 수정이 발생하면, 원본 value도 수정이 발생하게 됩니다.
};
const mergedPlaylist = { ...jPopPlayList, ...kPopPlaylist };
```

객체를 복사할 때도 Spread 연산자를 활용할 수 있다.<br>
Spread 연산자를 활용하면 원본 데이터의 수정을 방지할 수 있다. 이를 **깊은 복사(Deep copy)**라 부른다.

**그러나**, 이는 깊이가 1일 때에만 유효하다.<br>
다차원 배열, 객체의 경우 깊이가 1보다 큰 데이터의 수정이 발생할 경우, 원본 데이터도 수정되는 이른바 **얕은 복사(Shallow copy)**가 발생한다.

# Rest

Rest 문법은 입력인자를 배열의 형태로 받아 사용할 수 있다. 입력인자의 갯수가 가변적일 때 유용하게 사용할 수 있다.

```js
function sum(...nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum = sum + nums[i];
  }
  return sum;
}
console.log(sum(1, 2, 3)); // return 6
console.log(sum(1, 2, 3, 4)); // return 10
```

입력인자를 배열의 형태로 다룰 수 있고, 입력인자의 수가 정해져 있지 않을 때도 위처럼 사용할 수 있다.

Spread 와 Rest의 **다른 점은** Spread 연산자는 배열을 개별적으로 전개한다.<br>Rest는 개별적인 입력을 배열로 묶어줄 수 있다.

# 구조 분해 할당 (Destructuring assignment)

구조 분해 할당은 Spread 문법을 이용해 값을 해체, 개별 값을 변수에 새로 할당하는 과정이다.

```js
const [a, b, ...rest] = ['m', 'n', 'i', 'Y', 'U', 'N', 'S', 'U'];
console.log(a); // 'm'
console.log(b); // 'n'
console.log(rest); // ['i','Y','U','N','S','U']
```

Rest 문법을 사용한 구조 분해 할당의 경우, Rest 문법 이후에 다른 입력인자를 추가할 수 없다.

```js
const kbo = [
  'samsung',
  'kia',
  'nc',
  'kiwoom',
  'lg',
  'ssg',
  'hanhwa',
  'lotte',
  'kt',
  'dusan',
];
const [myFavorite, ...rest] = kbo;
console.log(myFavorite); // 'samsung'
```

객체 분해에도 적용할 수 있다.

```js
const profile = {
  name: 'mniYUNSU',
  myFavorite: {
    band: 'back number',
    actor: 'suda masaki',
    job: 'developer',
  },
};
const changedJob = {
  ...profile,
  myFavorite: {
    ...profile.myFavorite,
    job: 'designer',
  },
};
const { name } = profile;
console.log(name); // "mniYUNSU"
console.log(changedJob); // profile.myFavorite.job 의 value 변경
```

함수를 이용해 객체를 분해할 수 있다.

```js
const profile = {
  name: 'mniYUNSU',
  myFavorite: {
    band: 'back number',
    actor: 'suda masaki',
    job: 'developer',
  },
};
function iwant({ name: name, myFavorite: { job: job } }) {
  console.log(name + ' want to be a ' + job);
}
iwant(profile); // 'mniYUNSU want to be a developer'
```
