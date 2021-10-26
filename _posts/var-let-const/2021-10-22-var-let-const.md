---
layout: post
title: 자바스크립트의 변수 선언 방식
date: 2021-10-22 09:29:20 +07:00
categories: [Javascript Essentials]
tags: [Javascript]
description: var, let, const는 Javascript의 변수 선언 방식이다.
image: '/var-let-const/javascript-logo.jpg'
---

<img src="/var-let-const/javascript-logo.jpg" alt="javascript logo">

<figure>
<img src="./javascript-logo.jpg" alg="yunsu bae" style="border-radius: 30px ;box-shadow:0px 0px 10px #000">
<figcaption>test</figcaption>
</figure>

# let, var , const

`Javascript` 의 변수 선언 방식이다.

`var` , `let` , `const`의 차이점은 `var` 는 `function-scoped` 이고, `let` , `const` 는 `block-scoped` 이다.

### var

`var` 로 변수를 선언하고 다시 선언할 수 있다.
변수 선언이 유연하여 간단한 테스트에는 편리하다.

그러나 코드가 많아진다면 어디에서 어떻게 사용되는지 파악이 어렵다. 또한 변수에 할당한 값이 바뀔 수 있다.

`var` 는 함수 레벨 스코프이기 때문에, 함수 외부에서 var로 선언하면 전역 변수가 된다.

이를 보완하기 위해, `ES6` 이후 `let` 과 `const` 가 추가되었다.

### let 과 const

`let` 과 `const` 모두 변수를 선언하고 다시 선언할 수 없다.

`let` 과 `const` 의 차이점은 **재할당 유무**이다.

`let` 은 이미 선언한 변수에 재할당이 가능하다.

`const` 는 이미 선언한 변수에 재할당이 불가능하다. 즉, `const` 는 고유한 값이 될 변수를 선언할 때 사용해야 한다.

`let` 과 `const` 는 블록 레벨 스코프이다. 함수, 조건문, 반복문 등 블록 레벨 내부에서 선언한 경우, 외부에선 사용할 수 없다.

### Reference

- <a href="https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d" target="_blank" rel="noopener">참고한 글</a>
