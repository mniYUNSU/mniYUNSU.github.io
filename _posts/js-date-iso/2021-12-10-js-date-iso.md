---
layout: post
title: Date 객체와 ISO 8601
date: 2021-12-10 09:29:20 +07:00
categories: [Javascript Essentials]
tags: [Javascript, ISO]
description: Date 객체와 여러가지 날짜 변환 방법
---

# 날짜 객체 생성

```js
let todayIs = new Date()
console.log(todayIs) // Sat Dec 11 2021 23:02:09 GMT+0900 (한국 표준시)
```

`new Date()` 를 통해 새로운 날짜 객체를 생성할 수 있다. 매개변수없이 호출하면 현재 날짜와 시간이 지정된 날짜 객체가 반환된다.

여러가지 매개변수의 유형을 전달하는 것으로 다양한 형태의 날짜 객체를 확인할 수 있다.

### 타임스탬프(Timestamp)

```js
let January_01_1970 = new Date(0)
console.log(January_01_1970)
// Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
```

매개변수로 `number` 타입을 전달하는 경우, 이 숫자는 **1970년 01월 01일 0시 0분 0초**에서 입력인자로 전달한 숫자의 밀리초(milliseconds, 1/1000초) 이후의 시점의 날짜 객체를 반환한다.

그래서 `new Date(0)` 은 **1970년 01월 01일 0시 0분 0초의 0 밀리초 이후의 시간**이므로 위와 같은 결과가 나온 것이다.

1970년의 첫날을 기준으로 흘러간 밀리초를 나타내는 정수를 **타임스탬프(Timestamp)**라 하며, 타임스탬프를 통해 특정 날짜가 저장된 날짜 객체를 쉽게 만들 수 있고, 이미 존재하는 날짜 객체에서 타임스탬프를 추출하는 것이 가능하다.

1970년 01월 01일 이전에 해당하는 날짜의 타임스탬프는 음수이다.

```js
let billionBefore = new Date(-500000000000)
console.log(billionBefore)
// Sat Feb 27 1954 08:06:40 GMT+0900 (한국 표준시)
```

### 문자열 매개변수(Date String)

매개변수로 문자열을 주는 경우, 이 문자열은 자동으로 파싱된다.

```js
let date = new Date('2020-02-02')
console.log(date)
// Sun Feb 02 2020 09:00:00 GMT+0900 (한국 표준시)
```

이 외에도, 매개변수를 여러개를 주어 원하는 날짜 객체를 얻을 수 있다. 자세한 메소드 활용 방법은 참조한 링크에 더 많이 나와있다.

# 날짜 객체를 ISO 8601 형식으로 바꾸기

날짜 객체는 위 결과처럼 꽤 복잡한 문자열이 변수에 저장된다. 이를 화면에 표시할 땐 적절하게 변환을 거쳐야 한다.

이를 위해 **날짜와 시간과 관련된 데이터 교환을 다루는 국제 표준**이 있다.

그것이 ISO 8601 이며, 정식 명칭은 **Date elements and interchange formats - Information interchange - Representation of dates and times** 이다.

시간과 관련된 데이터 교환을 다루는 국제 표준 ISO 8601의 목적은 아래와 같다.

날짜와 시간의 숫자 표현에 대한 오해를 줄이고자 함이며, 숫자로 된 날짜와 시간 작성에 있어 각기 다양한 관례를 가진 나라들 간 데이터가 오갈 때 이 표준을 통해 오해를 줄이기 위함이다.

### 형태

기본적 형식은 아래와 같다.

`2021-12-10T00:00:00+09:00`

- 날짜 : `yyyy-mm-dd`
- `T` : 날짜 뒤에 시간이 온다는 것을 표시하는 문자
- 시간 : `hh:mm:ss`의 형태이며, 프로그래밍 언어에 따라 초 뒤에 소수점으로 밀리초가 표시되기도 한다.
- Timezone Offset : 시간 뒤에 `+` 또는 `-` 형태로 나와있으며 `UTC` 기준 시부터 얼만큼 차이가 있는지를 나타낸다. 한국 시간은 UTC 기준 9시간 더해진 시간이다.
- `Z` or `+00:00` : UTC 기준시를 나타낸다.

### 변환하는 방법

날짜 객체를 위와 같은 ISO 8601로 변환하기 위한 다양한 방법이 있다.
여기에선 위 기본적 형식에서 날짜만을 ISO 8601 형식으로 가져왔다.

#### toISOString

```js
let rightNow = new Date()
let res = rightNow.toISOString().slice(0, 10).replace(/-/g, '-')
console.log(res) // '2021-12-10'
```

`toISOString` 메소드를 활용한 경우이다. 여기서 다른 형식으로 커스텀하고 싶다면, `.replace()` 메소드의 두번째 인자의 `""` 를 변경하면 된다.

```js
let today = new Date()
today.toISOString().substring(0, 10)
console.log(today) // '2021-12-10'
```

ISO 8601 표준을 지킨다면 위처럼만 작성해도 된다.

#### toLocaleString

```js
new Date()
  .toLocaleString('en-us', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')

// '2021-12-10'
```

`toLocaleString` 메소드를 사용해서도 변환할 수 있다.

#### JS Function

```js
function yyyymmdd(dateIn) {
  var yyyy = dateIn.getFullYear()
  var mm = dateIn.getMonth() + 1 // getMonth() is zero-based
  var dd = dateIn.getDate()
  return String(yyyy + '-' + mm + '-' + dd)
}

yyyymmdd(new Date())
// '2021-12-10'
```

순수한 자바스크립트 함수를 사용하여 날짜 객체를 변환할 수 있다.

날짜 객체의 년도에 해당하는 수를 추출하는 메소드인 `getFullYear()`

월에 해당하는 수를 추출하는 메소드인 `getMonth()` (`getMonth()` 는 0부터 세어 1월은 0으로 반환하기 때문에, 1을 더한다.)

일에 해당하는 수를 추출하는 `getDate()` 를 각각 추출하여 문자열로 만드는 함수이다.

### Reference

- <a href="https://ko.javascript.info/date" target="_blank" rel="noopener">모던 자바스크립트 튜토리얼 - 날짜 객체</a>
