---
layout: post
title: '함수'
date: 2021-05-20 09:29:20 +0700
categories: [Javascript Essentials]
tags: [Javascript]
description: 함수는 프로그래밍에 있어서, 특정 데이터 처리 방식을 하나의 기능으로 지정하여 그 기능을 수행하는 하나의 단위이다.
---

<img src="/var-let-const/javascript-logo.jpg" alt="javascript logo">

# 함수

함수는 프로그래밍에 있어서, 특정 데이터 처리 방식을 하나의 기능으로 지정하여 그 기능을 수행하는 하나의 단위이다.

어떤 목적을 수행할 기능을 정의하기 위해 함수를 선언하고, 정의된 기능을 수행하기 위해 함수를 호출한다.

함수는 `keyword` , `name` , `parameter` , `body` 로 구분된다.

예를 들어, 사각형의 넓이를 구해야 하는데, 일일이 밑변과 높이를 구하는 연산을 수행한다면 생산성이 떨어지게 된다.

```js
let base, height;
base = 3;
height = 3;
console.log(3 * 3);
```

위처럼, 값이 바뀔 때마다 변수를 재할당하는 번거로움이 있다.

이를 함수라는 기능을 선언한다면 생산성을 향상할 수 있다.

```js
function getRectangleArea(base, height) {
  let rectangleArea = base * height;
  return rectangleArea;
}
console.log(getRectangleArea(3, 3));
```

여기서, `keyword`는 `function`이고, `name`은 `getRectangleArea`이다.

`parameter`는 `base`와 `height`이고, `body`는 `{ }` 내부의 코드이다.

이 함수를 선언한다면, 사각형의 넓이를 구할 때, `console.log(getRectangleArea(밑변,높이))`만 입력한다면 결괏값을 알 수 있다.

`parameter`는 `매개변수`라 하여, 함수를 선언할 때 지정한 변수를 의미한다.

반대로, 함수를 호출할 때, 즉 `console.log(getRectangleArea(밑변,높이))` 에서의 `밑변`과 `높이`는 `argument` 또는 `전달인자` 이다.

매개변수와 전달인자의 차이점은, 매개변수는 함수를 선언할 때 지정한 변수로, 호출할 때 입력한 값에 따라 바뀔 수 있는 변수이다.

위 함수에서의 매개변수는 `base`와 `height`가 된다.

전달인자는, 함수를 호출해 기능을 구현하도록 값을 전달해주는 인자이므로, 함수를 호출할 때 매개변수에 할당되는 값이 된다.

`Javascript`에서 함수를 선언하는 방법은 위와 같은 방법인 함수 선언식이 있다. 그리고, 함수 표현식과 화살표 함수로도 선언할 수 있다.
