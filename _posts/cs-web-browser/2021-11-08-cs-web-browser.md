---
layout: post
title: '웹 브라우저의 작동 방식'
date: 2021-11-08 09:29:20 +0700
categories: [Computer Science]
tags: [CS, Web]
description: 자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다. 따라서 브라우저 환경을 고려할 때 더 효율적인 클라이언트 사이드 자바스크립트 프로그래밍이 가능하다.
---

# 웹 브라우저의 작동 방식

구글 V8 자바스크립트 엔진으로 만들어진 자바스크립트 런타임인 `Node.js`의 등장으로 자바스크립트는 웹 브라우저를 벗어나 서버 사이드 애플리케이션 개발에서도 사용할 수 있는 범용 개발 언어가 되었다. 그러나 자바스크립트가 가장 많이 사용되는 분야는 웹 브라우저 환경에서 동작하는 웹 페이지 또는 웹 애플리케이션의 클라이언트 사이드이다.

자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다. 브라우저가 어떻게 HTML, CSS, 자바스크립트로 작성된 텍스트 파일을 파싱<sup id="user">[[1]](#user-ref)</sup>(해석)하여 렌더링<sup id="user">[[4]](#user-ref)</sup>할까?

<figure>
<img src="./../../images/web-browser1.png">
<figcaption>Fig 1. 브라우저 동작 원리</figcaption>
</figure>

브라우저의 렌더링 과정은 아래와 같다.

1. 브라우저는 HTML, CSS, 자바스크립트, 이미지, 폰트 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.
2. 브라우저의 렌더링 엔진은 응답받은 HTML과 CSS를 파싱하여 DOM과 CSSOM<sup id="user">[[5]](#user-ref)</sup>을 생성한다.
3. DOM과 CSSOM을 결합하여 렌더 트리를 생성한다.
4. 브라우저의 자바스크립트 엔진은 응답받은 자바스크립트를 파싱하여 AST(Abstract Syntax Tree)를 생성하고 바이트코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합된다.
5. 렌더 트리를 기반으로 HTML 요소의 레이아웃을 계산하고 브라우저 화면에 HTML 요소를 출력한다.

알아둬야할 점은 HTML, CSS 파일은 **렌더링 엔진**의 HTML 파서, CSS 파서로 파싱되어 DOM과 CSSOM 트리로 변환되고 렌더 트리로 결합된다면, 자바스크립트는 렌더링 엔진이 아닌 **자바스크립트 엔진**이 처리한다.

즉, HTML 파일에 `<script>` 태그가 있는 경우, 자바스크립트 코드를 실행하기 위해 DOM 생성 프로세스를 중지하고, 자바스크립트 엔진으로 제어 권한을 넘긴다. 자바스크립트 엔진은 `<script>` 태그 내의 자바스크립트 코드를 실행한다. 자바스크립트의 실행이 완료되면 다시 렌더링 엔진의 HTML 파서로 제어 권한을 넘겨 DOM 생성이 중지된 시점부터 DOM 생성을 재개한다.

한 마디로, 브라우저는 **동기적**으로 HTML, CSS, 자바스크립트를 처리한다.

이 말은 HTML 문서의 `<script>` 태그의 위치에 따라 렌더링 블로킹이 발생하여 DOM 생성이 지연될 수 있다는 것으로, `<script>` 태그의 위치는 중요한 의미를 갖는다. 보통 `<script>` 태그의 위치는 `<body>` 요소가 종료되기 바로 전(가장 아래)에 위치시킨다. 그 이유는 두 가지이다.

1. HTML의 DOM 생성 지연으로 인한 렌더링 시간 지연을 막아 페이지 로딩 시간을 단축할 수 있다.
2. DOM이 완성되지 않은 상태에서 자바스크립트 코드가 DOM을 조작하는 경우, 에러가 발생한다.

브라우저의 렌더링 과정을 자세하게 서술하면 아래와 같다.

### 요청과 응답

브라우저를 시각적으로 렌더링하기 위해 필요한 리소스(HTML, CSS, 자바스크립트, 이미지 등 정적 파일 또는 서버가 동적으로 생성한 데이터)를 서버에 요청하고 서버로부터 응답을 받아야 한다. 렌더링에 필요한 위 리소스들은 모두 서버에 존재하므로 필요한 리소스들을 서버에 요청하고, 응답받은 리소스를 파싱하여 렌더링한다.

서버에 리소스를 요청한다는 것은 브라우저 주소창에 URL을 입력하는 것과 동일하다.

```
https://naver.com
```

네이버의 URL 주소를 입력하면 URL의 호스트 이름(`naver.com`)이 DNS<sup id="user">[[6]](#user-ref)</sup>를 통해 IP 주소로 변환된다. 이 IP 주소를 갖는 서버에게 요청을 전송하는 것이다.

요청받은 서버는 URI 주소에 따른 리소스를 응답한다. 스킴과 호스트만으로 구성된 URI 요청인 경우, 서버는 이를 루트 요청으로 인식하고 루트 요청인 경우 암묵적으로 `index.html`을 응답한다.

**HTML 문서만 응답하는데 CSS, 자바스크립트, 이미지 등이 어떻게 응답 리소스로 오게 되는 것일까?**

이는 브라우저의 렌더링 엔진이 `index.html`을 파싱하는 도중에 외부 리소스를 로드하는 태그, 즉 CSS 파일을 로드하는 `<link>` 태그, `<img>` 태그, `<script>`를 만나고 HTML의 파싱을 멈추고 해당 리소스 파일을 서버로 요청하기 때문이다.

### HTML 파싱과 DOM 생성

서버로부터 응답받은 HTML 문서는 순수한 텍스트다. 이 순수한 텍스트 문서를 브라우저에 시각적으로 렌더링하기 위해선 이 텍스트를 브라우저가 이해할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야 한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="styleshhed" href="style.css" />
  </head>
  <body>
    <ul>
      <li id="a">A</li>
      <li id="b">B</li>
      <li id="c">C</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

위와 같은 `index.html`이 서버로부터 응답을 받은 경우, 브라우저의 렌더링 엔진은 일련의 과정을 통해 HTML을 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.

1. 서버에 존재하던 HTML 파일이 브라우저의 요청에 의해 응답된다. 서버는 브라우저가 요청한 HTML 파일을 읽어 메모리에 저장한 다음 메모리에 저장된 바이트(2진수)를 인터넷을 경우하여 응답한다.
2. 브라우저는 서버가 응답한 HTML 문서를 0과 1로 이루어진 바이트(2진수) 형태로 응답받는다. 응답된 바이트 형태의 HTML은 `meta` 태그의 `charset` 속성에 의해 지정된 인코딩 방식(위 예시에서는 `UTF-8`)을 기준으로 문자열로 변환한다.
3. 문자열로 변환된 HTML 문서를 읽어 문법적 의미를 갖는 코드의 최소 단위인 **토큰**으로 분해한다.
4. 각 토큰들을 객체로 변환하여 **노드**를 생성한다. 토큰의 내용에 따라 문서, 엘리먼트, 속성, 텍스트 노드가 생성된다. 노드는 이후 DOM을 구성하는 기본 요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이뤄지며 HTML 요소는 중첩 관계를 가진다. 예를 들면, `div` 태그 안에 `ul` , `img` 태그 등 텍스트뿐만 아니라 다른 HTML 요소도 포함될 수 있다. HTML 요소는 중첩 관계에 의해 부모, 자식 관계가 형성되며, 이러한 요소간의 부자 관계를 반영하여 노드들을 **트리 구조**로 구성한다. 이렇게 **노드로 이뤄진 트리 자료구조를 DOM**이라 부른다.

### Notes

<small id="user-ref"><sup>[[1]](#user)</sup>파싱(Parsing)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 실행하기 위해 텍스트 문서의 문자열을 토큰<sup id="user">[[2]](#user-ref)</sup>으로 분해하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리를 생성하는 일련의 과정이다. 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 바이트코드(bytecode)<sup id="user">[[3]](#user-ref)</sup>를 생성하고 실행한다.</small>

<small id="user-ref"><sup>[[2]](#user)</sup>토큰이란 문법적 의미를 가지며 문법적으로 더는 나눌 수 없는 코드의 기본 요소를 의미한다.</small>

<small id="user-ref"><sup>[[3]](#user)</sup>바이트코드는 특정한 하드웨어가 아니라 가상 머신에서 실행하도록 만든 바이너리 코드이다.</small>

<small id="user-ref"><sup>[[4]](#user)</sup>HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것</small>

<small id="user-ref"><sup>[[5]](#user)</sup><a href="https://developer.mozilla.org/ko/docs/Web/API/CSS_Object_Model" target="_blank" rel="noopener">CSS 객체 모델</a>(CSS Object Model)은 자바스크립트에서 CSS를 조작할 수 있는 API 집합이다. HTML 대신 CSS가 대상인 DOM이며, 사용자가 CSS 스타일을 동적으로 읽고 수정할 수 있는 방법이다.</small>

<small id="user-ref"><sup>[[6]](#user)</sup><a href="hhttps://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C" target="_blank" rel="noopener">DNS(Domain Name System)</a>은 호스트의 도메인 이름을 호스트의 네트워크 주소로 바꾸거나 그 반대의 변환을 수행할 수 있도록 하기 위해 개발되었다. 특정 컴퓨터(서버)의 주소를 찾기 위해, 사람이 이해하기 쉬운 도메인 이름을 숫자로 된 IP 주소로 변환해준다.</small>

### Reference

- <a href="https://developer.mozilla.org/ko/docs/Web/API/CSS_Object_Model" target="_blank" rel="noopener">CSS 객체 모델 - MDN</a>
- <a href="https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%ED%8A%B8%EC%BD%94%EB%93%9C" target="_blank" rel="noopener">바이트코드 - Wiki</a>
- <a href="https://ko.wikipedia.org/wiki/%EC%B6%94%EC%83%81_%EA%B5%AC%EB%AC%B8_%ED%8A%B8%EB%A6%AC" target="_blank" rel="noopener">AST(Abstract Syntax Tree, 추상 구문 트리) - Wiki</a>
- <a href="https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C" target="_blank" rel="noopener">DNS(Domain Name System) - Wiki</a>
- <a href="https://poiemaweb.com/js-browser" target="_blank" rel="noopener">브라우저 동작 원리 - Poiemaweb</a>
- 모던 자바스크립트 Deep Dive 도서
