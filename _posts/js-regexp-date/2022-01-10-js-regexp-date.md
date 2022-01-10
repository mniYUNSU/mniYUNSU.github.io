---
layout: post
title: '신년맞이 날짜 유효성 검사 정규 표현식'
date: 2022-01-10 00:00:00 +0700
categories: [Javascript Essentials]
tags: [Javascript, RegExp]
description: 검은 호랑이의 해!
---

# Hello Black Tiger! 🐯

2022년을 맞아 새로운 날짜 유효성 검사 정규 표현식을 만들었다.

개발 중인 백오피스 웹에서 쓰기 위해 새로 만들었다.

조건은 2021년 01월 01일 부터 유효하며, 2022년 현재 날짜 까지 유효한 정규 표현식이다.

### **새해 복 많이 받으세요!**

```js
let date = '2022-01-10'
const HappyNewYear = (str) => {
  // 2021년 01월 01일부터 현재 날짜안에 포함되는지 검증
  let nowDate = new Date()
  nowDate = nowDate.toISOString().substring(0, 10)
  let IsCorrectDateFormat =
    /^(202)[1-9]-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(str)
  if (IsCorrectDateFormat && str <= nowDate) return true
  else return false
}

HappyNewYear(date) // true
```

새해 복 많이 받으세요 !
