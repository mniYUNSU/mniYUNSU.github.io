---
layout: post
title: 배열과 객체
date: 2021-05-28 09:29:20 +07:00
categories: [Javascript Essentials]
tags: [Javascript]
description: 한 번에 다량의 데이터를 사용해야 할 때, 배열 또는 객체를 사용한다면, 단 한번의 선언으로 대량의 데이터를 다룰  수 있다.
---

# 배열(Array)

한 번에 다량의 데이터를 사용해야 할 때, **배열** 또는 **객체를** 사용한다면, 단 한번의 선언으로 대량의 데이터를 다룰 수 있다.

대량의 데이터를 다루기 적합한 배열과 객체는 **참조 타입(reference type)**의 데이터이다.

**배열**<sup id="user">[[1]](#user-ref)</sup>은 대량의 데이터들을 **순서를** 정해 처리해야할 때, 사용하는 데이터 타입이다.

자바스크립트에서 배열은 `[a, b, c]` **대괄호**로 선언하며, 그 안의 요소(element)를 콤마(`,`)로 구분한다.
또한, 이 배열의 순서를 매기는 방식은 0부터 매긴다. 이 순서를 **인덱스(index)**라 한다.

`index[0]`은 배열의 0번째 인덱스를 조회한다. 즉, 배열의 첫번째 값을 리턴한다.
우리에게 무언가 시작한다는 의미의 숫자는 1인데, 자바스크립트에선 0이 된다.

<figure>
<img src="./../../images/object-array1.png" alt="object-array1">
<figcaption>Fig 1. 헷갈렸던 인덱스 개념...</figcaption>
<figcaption>다른 나라들은 태어날 때부터 0살이지만, 우리나라는 태어날 때부터 1살인걸로 보아, 인덱싱이 0부터 시작한다는 게 더 어색하게 느껴지는 것 같다...</figcaption>
</figure>

배열은 내부 요소들을 다룰 수 있는 다양한 메소드가 있다.

```jsx
index[]; // 해당 인덱스의 요소 조회
Array.length; // 배열의 길이(배열 요소의 갯수)
Array.push(); // 특정 값을 배열의 마지막 인덱스에 추가
Array.pop(); // 배열의 마지막 요소 삭제
Array.isArray(); // 변수가 배열인지 아닌지 판별
Array.shift(); // 배열의 맨 앞의 요소 삭제
Array.unshift(); // 배열의 맨 앞에 특정 값 추가
Array.slice(start, end); // 배열의 시작부터 끝까지 잘라내어 복사본 생성
Array.splice();
...
```

이 외에도, 배열을 다룰 수 있는 다양한 메소드를 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener">MDN</a>에서 확인할 수 있다.

# 객체(Object)

**객체**<sup id="user">[[2]](#user-ref)</sup>는 하나의 변수에 여러 정보를 담아 처리해야할 때 사용하기 적합하다.

어떤 게임 캐릭터에 비유해보자면...

<figure>
<img src="./../../images/object-array2.jpg" alt="object-array2">
<figcaption>Fig 2. 리그 오브 레전드의 89번째 챔피언 아리</figcaption>
</figure>

리그 오브 레전드의 89번째 챔피언인 아리.
챔피언들을 출시 순으로 조회하고 싶다면, 배열을 사용해 쉽게 조회할 수 있을 것 같다.

```js
leagueOfLegendsChampions.index[88]; // 'Ahri'
```

그러나, `아리` 라는 챔피언의 정보를 알고 싶다면?

아리의 별칭은 `구미호`, 주 역할군은 `마법사`, 소속은 `아이오니아`, 가격은 `790RP`, 성우는 `이용신`, 캐릭터 스펙은 blah blah...

이 `아리`라는 챔피언에 담긴 수많은 관련 데이터들을 처리하고, 조회하기 위해선 **객체를** 사용해야 한다.

또한, 100가지가 넘는 챔피언이 존재하는 리그오브레전드에서, 챔피언의 이름, 별칭, 가격, 캐릭터 스펙 등 다른 값을 가지지만 **입력해야하는 데이터의 종류가 동일**한 경우, 이를 객체를 사용해 쉽게 처리할 수 있다.

```js
let Ahri = {
  Name: 'Ahri',
  aka: 'the Nine-Tailed Fox',
  Role: 'Mage',
  affiliation: 'Ionia',
  Price: '790RP',
};
```

객체는 **중괄호(Curly bracket)**으로 구성되며, 좌측을 **키(key)**, 우측을 **값(value)**로 구분한다.

어떤 객체에 담긴 다양한 데이터들 중, 원하는 키의 밸류를 알고 싶을 때 그 값만 호출할 수 있다.

또한, 해당 키의 밸류를 변경하고 싶을 때, 객체 전체를 수정하는 것이 아닌 키 값만 변경할 수 있다.

```js
Ahri.Price; // 아리의 가격은 790RP 입니다.
```

객체를 호출할 땐, 위처럼 객체의 이름에 `.` 을 찍는 `dot notation`이 있고, `Ahri['Price']` 처럼 대괄호로 구분하는 `bracket notation`이 있다.

흔히 하는 실수가 `bracket notation`을 사용할 때 키의 이름에 꼭 따옴표를 붙여야 한다는 것이다. 따옴표를 붙이지 않을 경우, 변수로 취급되기 때문에 따로 변수를 지정하지 않았다면 꼭 따옴표를 붙여 사용해야 한다.

키 값이 변수일 땐 **반드시** `bracket notaion`을 사용해야 한다.

`dot notation`과 `bracket notation`으로 객체에 값을 추가, 수정, 삭제를 할 수 있다.

```js
Ahri.voiceActor = '이용신';
// voiceActor 라는 key 추가, 그 key에 '이용신'이라는 value가 할당
Ahri['releaseDate'] = '2010-12-13';
Ahri.releaseDate = '2011-12-13';
// 값을 수정할 수 있다.

delete Ahri.releaseDate; // key, value 삭제
```

### 배열과 객체의 차이점

배열과 객체의 차이점은 '순서'의 유무이다.

**배열**은 대괄호 안에 존재하는 엘리먼트들의 _**순서**_ 를 갖고 있으며,
**객체**는 중괄호 안에 존재하는 엘리먼트들의 _**의미**_ 를 갖고 있다.

### Notes

<small id="user-ref"><sup>[[1]](#user)</sup>컴퓨터 과학에서 <a href="https://ko.wikipedia.org/wiki/%EB%B0%B0%EC%97%B4" target="_blank" rel="noopener">배열</a>은 번호와 번호에 대응하는 데이터들로 이루어진 자료 구조를 나타낸다. 일반적으로 배열에는 같은 종류의 데이터들이 순차적으로 저장되어, 값의 번호가 곧 배열의 시작점으로부터 값이 저장되어 있는 상대적인 위치가 된다.</small>

<small id="user-ref"><sup>[[2]](#user)</sup>컴퓨터 과학에서 <a href="https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)" target="_blank" rel="noopener">객체</a>
또는 오브젝트(object)는 클래스에서 정의한 것을 토대로 메모리(실제 저장공간)에 할당된 것으로 프로그램에서 사용되는 데이터 또는 식별자에 의해 **참조되는 공간**을 의미하며, 변수, 자료 구조, 함수 또는 메소드가 될 수 있다. 프로그래밍 언어는 변수를 이용해 객체에 접근하므로 객체와 변수라는 용어는 종종 함께 사용된다. 그러나 메모리가 할당되기 전까지 객체는 존재하지 않는다. </small>

### Reference

- <a href="https://ko.wikipedia.org/wiki/%EB%B0%B0%EC%97%B4" target="_blank" rel="noopener">배열의 정의</a>
- <a href="https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)" target="_blank" rel="noopener">객체의 정의</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener">배열의 다양한 메소드</a>
