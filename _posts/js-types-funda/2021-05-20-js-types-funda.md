---
layout: post
title: '여러가지 자료형'
date: 2021-05-20 09:29:20 +0700
categories: [Javascript Essentials]
tags: [Javascript]
description: Javascript는 여러가지 타입, 자료형이 있습니다.
---

<img src="/var-let-const/javascript-logo.jpg" alt="javascript logo">

# 타입

`Javascript`는 여러가지 타입, 자료형이 있다.

```js
let num = 1234; // num이라는 변수에 숫자 1234를 할당합니다.
let str = '1234'; // str이라는 변수에 문자열 1234를 할당합니다.
let undef; // undef이라는 변수를 선언합니다.
```

3개의 변수가 선언되어 있다.

`num`은 숫자가 할당되어 있으므로, 숫자 타입, `str`은 ' ' 로 묶은 1234가 할당되어, 문자열 타입이다.

`undef`는 선언만 되어있고, 값이 할당되지 않았다.

이 세가지 변수들의 타입을 `typeof`를 활용해 어떤 타입인지 알 수 있다.

```js
typeof num; // 숫자 타입이므로, number를 출력
typeof str; // 문자열 타입이므로, string을 출력
typeof undef; // 할당된 값이 없어, undefined가 출력
```

세가지 타입 이외에, 참과 거짓을 구분하는 `Boolean`타입이 있다.
`Boolean()`명령어로 변수의 참, 거짓을 구분할 수 있다.

```js
Boolean(2 === 3); // 2와 3이 같지 않으므로, false가 출력됩니다.
Boolean(num); // num이라는 변수에 숫자 1234가 할당되어 있으므로, true가 출력됩니다.
Boolean(str); // str변수 또한 문자열 1234가 할당되어 있어 true입니다.
Boolean(undef); // 할당된 값이 없는 undefined 타입은 거짓으로 분류되어 false가 출력됩니다.
```

어떤 변수에 값이 존재한다면, 기본적으로 `true`가 출력되지만, `false`가 출력되는 몇가지 경우가 있다.

| `false` | `undefined` | `null` | `0` | `NaN(Not a Number)` | 빈 문자열 `' '` |

다른 값들은 `true`로 출력된다.
