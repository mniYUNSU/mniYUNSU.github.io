---
layout: post
title: 고차 함수
date: 2021-06-11 09:29:20 +07:00
categories: [Javascript Essentials]
tags: [Javascript]
description: Javascript에서 함수는 일급 객체(First-class citizen)이다.
---

# 고차 함수 (Higher-order function)

자바스크립트에서 함수는 **일급 객체(First-class citizen)**<sup id="user">[[1]](#user-ref)</sup>이다.

일급 객체는 몇가지 특징이 있다.

1. 변수에 할당할 수 있다.
2. 다른 함수의 인자로 전달될 수 있다.
3. 다른 함수의 결과로서 리턴될 수 있다.

일급 객체는 위와 같은 특징이 있으며, 이러한 특권을 누릴 수 있는 대표적인 일급 객체는 **함수**이다.

함수에 일급 객체의 세가지 특징을 적용해보면 아래와 같다.

### 함수는 변수에 할당할 수 있다.

일급 객체인 함수는 변수에 할당할 수 있고, 또한 배열의 요소, 객체의 값으로 저장할 수 있다.

```js
let nowYear = new Date().getFullYear(); // return 현재 년도(2021)
const getKoreanAge = function (birthYear) {
  return nowYear - birthYear + 1;
}; // 현재 년도를 기준으로 한국식 나이가 몇살인지?
console.log(getKoreanAge(2000)); // return 22
```

위는 변수 `getKoreanAge`에 한국식 나이를 구하는 함수를 할당한 함수 표현식이다.
변수엔 함수가 저장돼있기 때문에, 호출 연산자를 활용할 수 있다.

### 함수는 다른 함수의 인자로 전달될 수 있다.

### 함수는 다른 함수의 결과로서 리턴될 수 있다.

위의 예시로 든 함수를 다른 함수의 인자로 전달할 수 있다.
또한, 인자로 전달된 함수의 결과를 리턴할 수 있다.

```js
function getAge(func, num) {
  return func(num);
}
let result = getAge(getKoreanAge, 2000);
console.log(result); // 22
```

여기서 `getKoreanAge`를 입력인자로 받는 함수 `getAge는` **고차함수(Higher order Function)**가 되며, <br>`getKoreanAge`는 **콜백(callback)함수**<sup id="user">[[2]](#user-ref)</sup>가 된다.

고차함수(Higher order Function)의 모양새는 특이하다. 함수를 리턴하기 때문이다. **함수를 리턴하는 함수** 또는, **함수를 인자로 받는 함수**는 고차함수가 될 수 있다.

자바스크립트엔 기본적으로 내장된 고차함수가 여러가지 있다. 배열과 관련된 메소드 중 일부가 대표적인 고차함수에 해당되며, `filter`, `map`, `reduce` 등이 있다.

### Notes

<small id="user-ref"><sup>[[1]](#user)</sup>일급 객체(First-class citizen, object)란, 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다.</small>

<small id="user-ref"><sup>[[2]](#user)</sup>콜백 함수(callback function)란, 다른 함수의 입력인자로 전달되는 함수를 의미한다.</small>
