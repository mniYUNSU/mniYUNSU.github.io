---
layout: post
title: 개선된 피보나치 수열
date: 2021-06-21 09:29:20 +07:00
categories: [Algorithm]
tags: [Algorithm, Javascript]
description: 동적 계획법 또는 Dynamic with memoization 기법으로 구현할 수 있다.
---

# 시간 복잡도를 고려하지 않은 피보나치 수열

**`O(2ⁿ)` (Exponential)** :
데이터량이 많아질수록 처리시간이 기하급수적으로 늘어나는 알고리즘이다. 대표적으로 **피보나치 수열**이 있으며, 재귀가 역기능을 할 경우도 해당된다.

```js
// 재귀를 이용한 피보나치 수열
let fibonacci = function (n) {
  let base = [0, 1];
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
};
```

```js
// 반복문을 이용한 피보나치 수열
function fibonacci(num) {
  let result = [0, 1];
  if (num === 0) {
    return [0];
  }
  if (num === 1) {
    return [0, 1];
  }
  let getFiboNum;
  for (let i = 3; i <= num; i++) {
    getFiboNum = result[i - 2] + result[i - 1];
    result.push(getFiboNum);
  }
  return result;
}
```

위와 같이 재귀와 반복문을 이용해 원하는 피보나치 수열의 자릿수를 알 수 있다.

그러나, 처리해야할 데이터가 많아진다면?

예를 들어 피보나치 수열의 50번째 값을 알기 위해 우리는 이미 그 이전의 수를 알고있어도 같은 작업 `getFiboNum = result[i-2] + result[i-1];` 를 반복해야한다.

<figure>
<img src="https://images.velog.io/images/shitaikoto/post/d6e603aa-9cbf-4e3f-a42a-98c12e172b28/AmusedSleepyAztecant-size_restricted.gif" alt="fibonacci">
<figcaption>수열의 50번째 값을 알기 위해, 49, 48번째 값을 알아야하고, 49, 48번째 값을 모르기 때문에 계산을 또 반복하고... 컴퓨터는 무한 츠쿠요미에 걸려버린다...</figcaption>
</figure>

---

# 시간 복잡도를 개선한 피보나치 수열

**했던 계산은 메모해두고, 또 안하면 될 것 같다.**

이를 동적 계획법 또는 <a href="https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98">Dynamic with memoization</a> 기법으로 구현할 수 있다.
이미 해결한 문제의 정답을 따로 기록해두고, 다시 해결하지 않는 기법이다.

```js
let fibonacci = function (n) {
  let memo = [0, 1];
  let aux = function (n) {
    if (memo[n] !== undefined) {
      return memo[n]; // 피보나치 배열 memo에 입력한 숫자의 값이 존재한다면 반환합니다.
    } else {
      // 존재하지 않다면, 피보나치 계산을 수행하여 그 값을 memo에 추가합니다.
      memo[n] = aux(n - 2) + aux(n - 1);
      return memo[n];
    }
  };
  return aux(n);
};
```

위와 같이 이미 수행했던 연산을 피보나치 배열에 메모해두고, 해당 값을 배열에서 호출하는 것으로 수행했던 연산을 재수행하지 않는다. 이 때 시간복잡도는 한 번 연산했던 값은 연산으로 구하지 않으므로 `O(N)`이 된다.

### Reference

- <a href="https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98" target="_blank" rel="noopener">Dynamic with memoization</a>
