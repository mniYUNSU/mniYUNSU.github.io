---
layout: post
title: '클로저'
date: 2021-10-22 09:29:20 +0700
categories: [Javascript Essentials]
tags: [Javascript, Closure]
description: 클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에 사용되는 특성이다.
---

<img src="./../../images/javascript-logo.jpg" alt="javascript logo">

# 클로저(Closure)

클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에 사용되는 특성이다.

> 클로저는 함수와 그 함수가 선언됐을 때의 어휘적 환경과의 조합이다.

위 문장에서 두 단어의 의미가 모호하다. **함수**와 **어휘적 환경**이다.

**어휘적 환경**이란 이 함수가 선언됐을 때의 스코프이다.

**함수**란, 이 스코프에서 반환된 내부함수를 의미한다.

즉, 위 문장을 다시 풀어서 쓰면

클로저는 **반환된 내부함수**와 그 **내부함수가 선언됐을 때의 스코프**와의 조합이다.

```js
function outerFunc() {
  var x = 10;
  var innerFunc = function () {
    console.log(x);
  };
  innerFunc();
}

outerFunc(); // 10
```

`outerFunc` 에서 내부함수 `innerFunc`가 선언되었고, 호출됐다. `innerFunc`는 자신을 감싸고있는 외부함수 `outerFunc`의 변수인 `x`에 접근할 수 있는데, 이는 `innerFunc`가 `outerFunc`의 내부에서 선언됐기 때문이다.

이 때, 내부함수 `innerFunc`의 상위 스코프는 `outerFunc`이다. `outerFunc`의 상위 스코프는 전역 스코프이다.

즉, 스코프는 함수가 호출되는 위치가 아니라, 어디에 선언했는지에 따라 결정되는데, 이를 **렉시컬 스코핑(Lexical Scoping)** 이라 한다.

`innerFunc`는 `outerFunc`의 내부함수이므로, 자신이 속한 렉시컬 스코프를 참조할 수 있다.

`innerFunc`의 렉시컬 스코프는 자신인 `innerFunc`, 자신의 외부함수인 `outerFunc` 그리고 전역이 된다.

`innerFunc`는 자신의 렉시컬 스코프를 참조할 수 있다.

그 이유는 렉시컬 스코프를 참조하기 위해 **실행 컨텍스트에 저장된 스코프 체인**을 자바스크립트 엔진이 검색했기 때문이다.

`innerFunc`가 호출되면 자신의 실행 컨텍스트가 실행 컨텍스트 스택에 쌓인다. 그리고 변수 객체, 스코프 체인과 `this`에 바인딩할 객체가 결정된다.

이 때의 스코프 체인은 전역 스코프를 가리키는 전역 객체, `outerFunc`의 스코프를 가리키는 `outerFunc` 함수의 활성 객체(Activation object), 그리고 `innerFunc` 자신의 스코프를 가리키는 활성 객체를 순서대로 바인딩한다.

스코프 체인이 바인딩한 객체가 렉시컬 스코프의 실체가 된다.

그렇기 때문에, `innerFunc`의 스코프(함수 자신의 활성 객체) 내에서 변수 `x`를 탐색했을 때 탐색에 실패하고, `innerFunc`의 외부함수 `outerFunc`의 스코프(`outerFunc` 자신의 활성 객체)에서 변수 `x`를 탐색한다. 변수 `x`를 찾을 수 있게 된다.

즉, `innerFunc`가 자신을 감싸고있는 외부함수 `outerFunc`의 변수 `x`에 접근할 수 있는 것이다.

만약, 외부함수가 내부함수를 반환하고 이후 더이상 호출되지 않고, 내부함수만 호출한다면 `innerFunc`의 외부에 선언된 변수 `x`를 참조할 수 있을까?

가능하다.

내부함수가 호출될 때, 내부함수 자신의 스코프를 가리키는 활성 객체 내부에서 변수 `x` 를 찾고, 없다면 외부함수 스코프에서 변수 `x` 를 탐색하기 때문이다.

이처럼 **자신을 포함하는 외부함수의 밖에서 자신(내부함수)가 호출이 되더라도 외부함수의 지역 변수에 접근할 수 있는 함수를 클로저(Closure)** 라고 부른다.

내부함수가 선언됐을 때의 환경(Lexical Environment) 스코프를 기억하고, 이후 그 환경의 밖에서 호출되어도 그 환경에 접근할 수 있는 함수인 것이다.

한 문장으로 요약하면,

> **클로저는 자신이 생성될 때의 환경을 기억하는 함수**이다.

### Reference

- <a href="https://poiemaweb.com/js-closure" target="_blank" rel="noopener">참고한 글</a>
