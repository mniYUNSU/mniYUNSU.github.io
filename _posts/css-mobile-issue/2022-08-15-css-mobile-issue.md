---
layout: post
title: 모바일 웹에서 필요한 css 속성 설정
date: 2022-08-15 09:29:20 +07:00
categories: [CSS Essentials]
tags: [CSS]
description: 웹 페이지를 개발하다 보면 모바일 웹 화면을 생각하고 속성을 추가로 정해줘야 한다.
---

# 버튼 영역 터치 시 생성되는 파란 박스 없에기

모바일 웹에서 버튼 영역, 링크, 인풋 영역 등을 터치하면 파란 박스가 보여지는 경우가 있다. 의도된 스타일링이 아니라면 없어야 한다.

```css
body {
  -webkit-tap-highlight-color: transparent !important;
}
```

파란 상자를 없에기 위해 터치했을 때 나오는 상자의 색을 투명하게 변경한다. 색상 지정으로 커스터마이징할 수 있다.

# placeholder 포커스 시 없에기

`input` 또는 `textarea` 태그에 적용 가능한 placeholder는 브라우저에 따라 영역이 포커스될 때 사라지는 브라우저가 있지만 그렇지 않은 브라우저도 있다.

포커스 이전엔 placeholder가 보이고, 포커스될 땐 사라지도록 하는 옵션을 수동으로 설정할 수 있다.

```css
:focus::placeholder {
  color: transparent;
}
```

포커스될 때마다 placeholder 의 글꼴 색을 투명하도록 변경하는 것으로 구현할 수 있다.
