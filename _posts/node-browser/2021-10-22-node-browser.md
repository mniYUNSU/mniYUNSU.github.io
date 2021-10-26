---
layout: post
title: 'Node.JS와 브라우저의 차이점'
date: 2021-10-22 09:29:20 +0700
categories: [Node.JS Essentials]
tags: [Javascript, Node.JS]
description: node.js와 브라우저의 차이점
---

# Node.JS와 브라우저의 차이점

`Node.JS`와 브라우저 둘 다 자바스크립트 언어를 기반으로 실행되며, 자바스크립트 엔진을 내장하고 있다.

자바스크립트 엔진이라 함은, 크롬의 경우 V8 엔진, 파이어폭스는 스파이더몽키 등이 있다.

`Node.JS`는 V8 엔진을 내장하고 있다.

차이점은 `Node.JS`와 브라우저의 존재 목적이다.

브라우저는 HTML, CSS, JS를 실행하여 웹 페이지를 화면에 띄우는 것이 목적이다.

`Node.JS`는 서버 개발 환경을 제공하는 것이 목적이다.

즉, JS는 브라우저와 서버( `Node.JS` )를 위한 언어이며, 브라우저와 서버는 JS 런타임이라는 점은 동일하다. 그러나, 사용되는 환경이 다르다.

비유하자면, 같은 한국어를 사용하지만, 팀장님 앞에서의 어휘, 친구들 앞에서의 어휘가 다른 것이다.

브라우저의 경우, 유저에게 웹 페이지를 보여줘야하기 때문에, `Web API`를 제공한다.

예를 들면, `history` , `Fetch` , `window` , `setTimeout` 등이 있다.

`Node.JS`는 서버 개발을 위해 사용되는 JS 런타임이므로, 브라우저에서 제공하는 내장함수인 `alert` 등을 사용할 수 없다. `Node.JS`는 파일 시스템을 제어하거나, 데이터를 핸들링하는 등의 보다 보안요소가 더해진 API가 제공된다.

`crypto` , `filesystem(fs)` 등이 있다.

모듈 시스템의 경우 어떤 모듈을 불러올 때, 브라우저는 에크마스크립트 표준 모듈을 사용한다. 즉, `import` 를 사용하고, `Node.JS`는 `CommonJS` 모듈 시스템을 사용하여 `require()`를 사용해야한다.

### Reference

- <a href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noopener">Node API</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/API" target="_blank" rel="noopener">Web API</a>
