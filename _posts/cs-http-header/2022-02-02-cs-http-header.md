---
layout: post
title: 'HTTP 헤더'
date: 2022-02-02 09:29:20 +0700
categories: [Computer Science]
tags: [CS, Web]
description: HTTP 헤더는 HTTP 전송에 필요한 부가정보를 담기 위해 사용한다.
---

# HTTP 헤더

HTTP 헤더는 HTTP 전송에 필요한 부가정보를 담기 위해 사용한다.

예를 들어 메세지 바디(페이로드)의 내용, 메세지 바디의 크기, 압축, 인증, 서버 정보, 캐시 정보 등이 된다.

지정된 <a href="https://en.wikipedia.org/wiki/List_of_HTTP_header_fields" target="_blank" rel="noopener">HTTP 표준 헤더</a>는 굉장히 많다.

<figure>
<img src="./../../images/http-header.png">
<figcaption>Fig 1. HTTP 헤더</figcaption>
</figure>

**`Content-Type` : 표현 데이터의 형식**

- `text/html`, `application/json`,`image/png` 등 <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types" target="_blank" rel="noopener">MIME 타입</a>

---

**`Content-Encoding` : 표현 데이터의 압축 방식**

- 데이터를 전달하는 곳(서버 or DB)에서 압축 후 인코딩 헤더 추가
- 데이터를 읽는 쪽(클라이언트)에서 인코딩 헤더의 정보로 압축 헤제
- `gzip`, `deflate`, `identity` , `compress`(특허권 이슈로 현재 사용하지 않음)

---

**`Content-Language` : 표현 데이터의 자연 언어**

- `ko`, `en` , `en-US` 등 사용자가 선호하는 언어에 따라 사용자를 구분

---

**`Content-Length` : 표현 데이터의 크기(길이)**

- `Content-Encoding`이 아닌 `Transfer-Encoding` 헤더를 사용한다면 `chunked` 방식으로 인코딩을 수행한다. 이 방식은 데이터를 분할하여 응답하기 때문에 전체 데이터 크기를 알 수 없다. 따라서 표현 데이터의 길이를 명시해야하는 경우 `Transfer-Encoding`을 사용해선 안된다.

---

**`From` : 사용자 에이전트의 이메일 정보**

- 검색 엔진에서 주로 사용
- `Requests` 에서 사용한다.

---

**`Referer` : 이전 웹 페이지 주소**

- 현재 요청된 페이지의 이전 웹 페이지 주소
- 현재 `youtube.com` 페이지에서 `google.com`로 이동하는 경우, `Referer : youtube.com`을 포함하여 요청한다.
- `Requests`에서 사용한다.
- `Referer`는 단어 `Referrer`의 **오탈자**이지만 스펙으로 굳어졌다.

---

**`User-Agent` : 사용자 에이전트 애플리케이션 정보**

- 클라이언트의 애플리케이션 정보(웹 브라우저 등)
- 이 헤더로 어떤 종류의 브라우저에서 장애가 발생하는지 파악이 가능하다.
- `Requests`에서 사용한다.

---

**`Host` : 요청한 호스트 정보(도메인)**

- `Requests`에서 사용한다.
- **필수 헤더** 이다.
- 하나의 서버가 여러 도메인을 처리해야할 때 호스트 정보를 명시하기 위해 사용한다.
- 하나의 IP 주소에 여러 도메인이 적용되어 있을 때 호스트 정보를 명시하기 위해 사용한다.

---

**`Origin` : 서버로 `POST` 요청을 보낼 때, 요청을 시작한 주소**

- `Requests`에서 사용한다.
- 요청을 보낸 주소와 받는 주소가 다르면 **CORS 에러**가 발생한다.

---

**`Authorization` : 인증 토큰(JWT 등)을 서버로 보낼 때 사용하는 헤더**

- 토큰의 종류 + 실제 토큰 문자를 전송한다.
- ex. `Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l`
- `Requests`에서 사용한다.

---

**`Server` : 요청을 처리하는 Origin 서버의 소프트웨어 정보**

- `Responses`에서 사용한다.
- ex. `Server: Apache/2.2.22 (Debian)`

---

**`Date` : 메세지가 발생한 날짜와 시간**

- `Responses`에서 사용한다.
- ex. `Date: Tue, 2 Feb 1994 08:12:31 GMT`

---

**`Location` : 페이지 리디렉션**

- 웹 브라우저는 상태 코드 3XX 응답 결과에 `Location` 헤더가 있으면 `Location`의 위치로 리다이렉트(자동 이동)한다.
- 상태 코드 **201(Created)**의 경우 `Location` 값은 요청에 의해 생성된 리소스 URI이다.
- `Responses`에서 사용한다.

---

**`Allow` : 허용 가능한 HTTP 메소드**

- `Responses`에서 사용한다.
- ex. `Allow: GET, HEAD, PUT`

---

**`Retry-After`: 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간**

- **503(Service Unavailable)**: 서비스가 언제까지 불능인지 알려줄 수 있다.
- ex.
  - `Retry-After: Fri, 31 Dec 2020 23:59:59 GMT(날짜 표기)`
  - `Retry-After: 120(초 단위 표기)`

---

<br>

# 컨텐츠 협상 헤더(Content Negotiation)

컨텐츠 협상 헤더는 클라이언트가 선호하는 표현 요청이다. `Requests`에서만 사용 가능하다.

한 마디로, **클라이언트(나)가 요청을 보낼 때 서버(상대)가 응답을 이렇게 주면 좋겠다**라는 의미이다.

**내가 지금 너희 서버에 요청을 보낼건데, 이런 표현 방식으로 보내줬으면 좋겠어** 라는 의미이다. 하지만, 서버는 이 컨텐츠 협상 헤더를 무시하고 정해진 표현 방식으로 응답할 수 있다.

<br>

**`Accept` : 클라이언트가 선호하는 미디어 타입 전달**

- ex. `Accept : "application/json"`
- 위 컨텐츠 협상 헤더는 클라이언트가 요청에 대한 응답을 `json`양식으로 받고싶다는 의미이다.

---

**`Accept-Charset` : 클라이언트가 선호하는 문자 인코딩**

---

**`Accept-Encoding` : 클라이언트가 선호하는 압축 인코딩**

---

**`Accept-Language` : 클라이언트가 선호하는 자연 언어**

- 한국어 브라우저에서 특정 웹사이트에 접속했을 때 위 헤더가 적용되지 않았다면 서버는 요청으로 받은 우선순위가 없으므로 디폴트로 설정된 영어로 응답한다.
- `Accept-Language: ko` 로 요청했을 때, 서버가 한국어를 지원하는 서버라면 우선순위에 따라 한국어로 된 응답을 돌려준다.
- 만약 디폴트 언어가 **일본어**이고 **한국어**를 지원하지 않는 경우, 우선순위를 지정하여 한국어가 안된다면 차라리 **영어**로 응답을 받을 수 있다.
  - `Accept-Language: ko-KR;en-US;q=0.9`
  - 우선순위는 0에서 1로 설정할 수 있고, 높은 우선순위일수록 1에 가깝다.
  - 1인 경우 `q=1`을 생략할 수 있다.

### Reference

- <a href="https://en.wikipedia.org/wiki/List_of_HTTP_header_fields" target="_blank" rel="noopener">HTTP 표준 헤더 - Wiki</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types" target="_blank" rel="noopener">MIME 타입 - MDN</a>
