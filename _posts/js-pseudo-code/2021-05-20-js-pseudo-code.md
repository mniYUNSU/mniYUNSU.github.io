---
layout: post
title: '수도 코드'
date: 2021-05-20 09:29:20 +0700
categories: [Common]
tags: [Common]
description: 수도 코드(의사 코드, pseudo code)는 프로그램을 작성할 때 각 모듈이 작동하는 논리를 표현하기 위한 언어이다.
---

# Pseudo code(수도 코드)

수도 코드라는 개념을 처음 들었을 때, '나라들의 수도가 다 코드로 지정이 되어있는 건가?' 라며 수도 코드가 뭔가 검색을 했다.

> 수도 코드 : 의사코드(수도코드, pseudocode)는 프로그램을 작성할 때 각 모듈이 작동하는 논리를 표현하기 위한 언어이다. - 위키백과

코드를 작성하기 전에, 문제 해결을 위한 알고리즘을 우리들의 언어로 표현하는 것이라고 알게 되었고, 서울, 도쿄, 베를린의 코드라고 생각했던 나에게 잠깐의 부끄러움이 찾아왔다.
생각해보니까, 수도 코드라는 단어만 몰랐지, 일상 생활에서 자주 쓰는 개념이었다...

<figure>
<img src="./../../images/petit.jpg" alt="le petit prince">
<figcaption>Fig 1. 어린 왕자</figcaption>
</figure>

```js
// 네가 오후 4시에 온다면,
// 나는 3시부터
// 행복해지기 시작할거야.  - ( feat. 어린 왕자 )
```

... 적절한 예시가 잘 안떠오른다...

**_시대와 국가를 아우르는 고전 생텍쥐페리의 어린왕자_**의 명언을 프로그래밍 한다면, 위처럼 유명한 명언이 수도 코드가 될 수도 있을 것 같다.
이를 프로그래밍 언어로 작성한다면

```js
let lePetitPrince = `어린왕자 : ${time}시에 갈게`;
// 어린왕자님의 대사입니다.
let fox = `사막여우 : 난 ${time - 1}시부터 행복해지기 시작할거야.`;
// 사막여우님의 대사입니다.

for (let time = 0; time <= 24; time++) {
  // 하루 24시간 중에서
  if (time === 4) {
    // 만약 4시에 온다면..?
    console.log(lePetitPrince); // 어린왕자님 대사 큐!
    console.log(fox); // 사막여우님 대사 큐!
  }
}
```

... 아직 너무 부족하지만 위처럼 만들어 볼 수 있을 것 같다.

저 코드를 실행하면
`어린왕자 : 4시에 갈게`
`사막여우 : 난 3시부터 행복해지기 시작할거야.`
이런 결과가 나오게 된다. 😂

뭔가 딴 길로 많이 샌 것 같은데, 아무튼!

수도 코드를 프로그래밍에 적극적으로 사용(머리로만 생각하는 것이 아닌, 직접 작성) 한다면, 코드를 짜는 데 있어서 오류를 덜 범할 수 있다는 것을 알게 됐다.

문제의 작은 부분부터 계획과 순서를 작성하는 연습! 습관을 들여야 큰 규모의 코드를 작성할 때 수월하게 수행할 수 있다는 것을 배웠다.
