---
layout: post
title: css로 디바이스 판별하는 방법
date: 2022-08-16 09:29:20 +07:00
categories: [CSS Essentials]
tags: [CSS]
description: 반응형 웹 페이지 구성을 위해 css 엘리먼트를 디바이스에 따라 분기해야할 필요가 있다.
---

# 반응형 웹

웹 페이지를 만들 때 데스크톱 웹 뿐 아니라 모바일, 태블릿 등 다양한 디바이스에 맞는 화면을 보여주도록 개발하는 것은 이제 당연해졌다.

지금까지 혼자 개발을 할 땐 화면의 픽셀 크기에 따라 모바일인지, 데스크탑인지 두 가지만 나누어 생각하고 개발을 했다.

```css
@media (max-width: 720px) {
  margin-bottom: 80px;
}

@media (min-width: 720px) {
  margin-bottom: 80px;
}
```

그러나 화면 크기에만 맞추는 것으론 이 화면이 모바일인지, 데스크톱인지 구분하지 못하는 경우가 종종 있다.

예를 들면 엘리먼트에 커서를 올리면 텍스트를 출력하는 효과를 위해 `:hover` 를 활용해 디자인 하는데, 터치스크린에서 `:hover` 는 꾹 누르는 동작에서도 인식되어 의도하지 않은 사용자 경험을 선사한다.

윈도우 내장 함수인 `onTouchStart` 나 `navigator.maxTouchPoints > 0` 같은 방식으로 자바스크립트를 사용하여 디바이스가 터치 디바이스인지 판단하는 방법도 있으나, css 만으로 이를 수행할 수 있다.

# Interaction Media Features

<a href="https://www.w3.org/TR/mediaqueries-4/#mf-interaction" target="\_blank" rel="noopener">Interaction Media Features</a>를 사용하여 사용자가 웹 페이지와 어떻게 인터랙션하는지 css로 판단할 수 있다.

<div class="overflow-table" markdown="block">

|               | `pointer:none` |    `pointer:coarse`     |                      `pointer:fine`                       |
| :-----------: | :------------: | :---------------------: | :-------------------------------------------------------: |
| `hover:none`  |     키보드     |  스마트폰, 터치 스크린  |                   스타일러스 기기(와콤)                   |
| `hover:hover` |                | 닌텐도 컨트롤러, 키넥트 | 마우스, 터치 패드, 고급 스타일러스 기기(삼성 노트 시리즈) |

</div>

테이블이 크게 `pointer` 와 `hover` 로 나뉘어져 있다. 이는 사용자가 사용하는 디바이스의 **기본 포인팅 장치**가 어떤 특성이 있는지 확인한다.

## pointer

마우스와 같은 포인팅 장치의 존재를 판단한다.

#### none

포인팅 장치가 없다.

#### coarse

기본 장치가 터치 스크린이다. 그러나 스타일러스 기기 만큼 정확도가 높지 않다.

> 서비스에 따라 사용자가 확대/축소를 할 수 있거나, 정확도를 위한 보조장치가 있을 수 있기 때문에 `pointer:coarse` 일지라도 반드시 `pointer:fine` 보다 정확도가 낮은 것은 아니다.

#### fine

기본 장치가 마우스나 터치 패드 처럼 정확안 포인팅이 가능하다.

## hover

사용자가 엘리먼트 위로 포인팅 디바이스를 **위치**할 수 있는지 판단한다.

#### none

기본적으로 `hover` 가 불가능한 장치이며 포인팅 장치가 없다. 또는 가능한 장치가 있으나, 꾹 누르는 동작을 `hover`로 인식하는 터치 스크린처럼 불편하거나 일반적인 방식으로는 불가능한 장치이다.

#### hover

기본 장치로 엘리먼트 위에 포인팅 디바이스를 위치시킬 수 있다.

# 보조 장치 고려하기

## any-hover / any-pointer

위에 말한 속성들은 기본 장치만으로 디바이스를 판단한다. `any-hover` 와 `any-pointer` 는 모든 입력 메커니즘을 확인한다. 가능한 모든 장치를 고려하기 위해 가능하면 위 속성을 사용하는 것이 좋다.

`any-hover` 와 `any-pointer` 모두 위와 방식은 동일하다. 다만 여러 포인팅 장치 중 **적어도 하나**가 해당 특성을 만족하면 해당 기능을 지원한다고 판단한다.

# 구현

사용하는 장치의 입력 메커니즘에 따라 바뀌는 페이지이다. 앞서 말한 디바이스 별 특성에 만족하는 경우 연두색으로, 만족하지 않으면 회색으로 표시된다.

<iframe height="500" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/shitaikoto/embed/QWmJKWe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shitaikoto/pen/QWmJKWe">
  Untitled</a> by yunsu bae (<a href="https://codepen.io/shitaikoto">@shitaikoto</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<br>

이 속성들로 디바이스에 따라 변하는 화면 크기를 구현할 수도 있고, 그 외에도 다양한 기능을 디바이스에 따라 분기할 수 있다.

최근에 작은 프로젝트를 진행하면서 모바일에서만 사용자가 화면을 꾹 눌렀을 때 나타나는 복사/붙여넣기, 이미지 저장 등을 원천적으로 예방할 수 있도록 아래와 같이 css를 추가하여 구현했다.

```jsx
const StyledSection = styled.section`
  @media screen and (hover: none) and (pointer: coarse) {
    -webkit-user-select: none !important;
    -moz-user-select: -moz-none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }
`;
```

### Reference

- <a href="https://www.w3.org/TR/mediaqueries-4/#mf-interaction" target="\_blank" rel="noopener">Interaction Media Features</a>
- <a href="https://marshallku.com/web/tips/css%EB%A1%9C-%EA%B8%B0%EA%B8%B0-%ED%8C%8C%EC%95%85%ED%95%98%EA%B8%B0" target="\_blank" rel="noopener">참고한 블로그</a>
