---
layout: post
title: Props
date: 2021-07-08 09:29:20 +07:00
categories: [React Essentials]
tags: [React]
description: 리액트의 Props 개념을 공부했다.
---

# Props

`Props`는 사람의 성별이나 이름처럼 쉽게 변하지 않는 외부로부터 전달받은 값으로, 현재 컴포넌트가 가진 속성을 의미한다.

`Props`는 **상위 컴포넌트로부터 전달받은 값**으로, 현재 컴포넌트의 `Props`는 Javascript의 함수의 전달인자처럼 전달받는다.

리턴하는 값은 전달받은 `Props`를 기반으로 화면에 어떻게 표시될 지를 기술하는 `React Element`가 된다.

즉, 컴포넌트가 처음 렌더링될 때, 화면에 출력하고자 하는 데이터를 담은 초기값으로 사용할 수 있다.

`Props`는 **객체 형태**로 전달한다. 또한, 쉽게 변하지 않아야하는 값이므로 **읽기 전용(Read-only) 객체**이다.

만약 읽기 전용 객체가 아니라면 `Props`를 전달받은 현재 컴포넌트에서 `Props`가 수정될 수 있다.

수정된다면, `Props`를 전달한 상위 컴포넌트에 영향을 끼치게 된다.
이는 리액트를 대표하는 원칙인 **단방향 데이터 흐름(One Way Data Flow)**에 위배된다.

리액트는 데이터를 전달하는 주체는 항상 **상위 컴포넌트로부터 하위 컴포넌트**로, 즉 하향식(Top Down)으로 흐른다. 그렇기 때문에, `Props`는 하위 컴포넌트에서 수정을 방지하기 위해 읽기 전용 객체가 된다.

**Props를 사용하는 방법**은 3단계 순서가 있다.

1. 하위 컴포넌트에 전달하고자 하는 값과 속성을 정의한다.
2. `Props`를 이용하여 정의된 값과 속성을 전달한다.
3. 전달받은 `Props`를 렌더링한다.

<iframe src="https://codesandbox.io/embed/rough-grass-pohcw?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="rough-grass-pohcw"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
