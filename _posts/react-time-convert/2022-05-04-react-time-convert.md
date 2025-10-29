---
layout: post
title: 몇 분 전 / 몇 시간 전 / 몇 일 전 등 시간 계산 함수
date: 2022-05-04 00:00:00 +07:00
categories: [React Essentials]
tags: [React, Javascript]
description: 몇 분 전 / 몇 시간 전 / 몇 일 전 등 시간 계산 함수로 시간을 변환하는 방법
---

# 코드

```js
function getTimeString(targetDate) {
  if (!targetDate) {
    return;
  }

  let now = new Date();

  // const target = new Date(`${targetDate.replace(/ /, 'T')}`)

  const milliSeconds = now - targetDate;

  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;

  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;

  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}
```

<br>

시간을 표시할 컴포넌트에 해당 함수를 실행시킨다. 매개변수로 `createdAt`, `updatedAt` 등 시간으로 표현된 `string` 을 전달한다.
