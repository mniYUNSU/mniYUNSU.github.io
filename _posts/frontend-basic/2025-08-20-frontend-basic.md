---
layout: post
title: '프론트엔드 개발자로서 알아야 할 기본 지식'
date: 2025-08-20 00:00:00 +07:00
categories: [Front End Essentials]
tags: [Front End, Interview]
description: 평소에 갑자기 떠올랐지만 어떤 개념인지 명확히 설명할 수가 없었다. 생각나는 것들을 정리해보았다.
---

# 프론트엔드 개발자로서 알아야 할 기본 지식

3년 간 개발자라는 직무로 일을 해왔다. 평소에 갑자기 떠올랐지만 어떤 개념인지 명확히 설명할 수가 없던 용어, 개념들이 많았다. 생각나는 것들을 기록해두고 까먹을 때 마다 상기시키기 위해 정리해보았다.

## HTML, CSS, JavaScript

HTML은 문서의 구조를 정의하는 마크업 언어이며, 최신 HTML Living Standard는 의미론적 태그의 사용을 권장한다. `<header>`, `<main>`, `<article>` 같은 시맨틱 태그를 활용하면 검색 엔진과 보조 기술이 문서를 이해하기 쉬워진다.

CSS에서는 선택자와 박스 모델 외에도 Flexbox와 Grid 레이아웃, CSS 변수, `@layer`, Container Query 등 현대적 레이아웃 기법을 익혀야 한다. 디자인 시스템을 위해서는 BEM, OOCSS와 같은 CSS 아키텍처 개념도 중요하다.

JavaScript는 변수와 스코프, 프로토타입, 클로저를 비롯해 ES2020 이후 도입된 옵셔널 체이닝, null 병합 연산자, BigInt, 모듈 시스템(ESM vs CJS)을 이해해야 한다. 이벤트 버블링과 캡처, 이벤트 위임, 구조화된 데이터 처리도 기본기다.

## 브라우저 동작 원리

브라우저는 HTML과 CSS를 파싱해 DOM과 CSSOM을 구성하고 렌더 트리를 만들어 페인트와 컴포지팅 단계를 거쳐 화면을 그린다. 스크립트 실행과 스타일 변경이 빈번하면 리플로우와 리페인트가 발생해 성능에 영향을 줄 수 있다.

자바스크립트의 이벤트 루프는 `macrotask`와 `microtask` 큐로 나뉘어 비동기 코드의 실행 순서를 결정한다. `requestAnimationFrame`과 같은 렌더링 관련 API는 이벤트 루프의 특정 단계에서 실행된다. Web Worker나 Service Worker를 사용하면 메인 스레드와 분리된 작업을 수행할 수 있다.

## 네트워크와 HTTP

HTTP는 요청과 응답으로 동작하는 애플리케이션 계층 프로토콜이다. GET, POST 같은 메서드와 200, 404 같은 상태 코드를 정확히 이해해야 한다.
HTTP/2와 HTTP/3는 멀티플렉싱과 헤더 압축으로 지연 시간을 줄인다. HTTPS는 TLS 위에서 동작하며 인증서와 암호화 알고리즘에 대한 이해가 필요하다.

RESTful API는 자원을 URI로 표현하고 표준 메서드를 사용해 조작한다. JSON은 이러한 API에서 가장 널리 쓰이는 데이터 형식이다.
캐시 제어 헤더, ETag, CDN, 서비스 워커를 이용한 오프라인 전략을 이해하면 효율적인 네트워크 설계를 할 수 있다. WebSocket과 Server-Sent Events는 실시간 통신 시나리오에 활용된다.

## 비동기 프로그래밍

브라우저는 I/O 작업을 논블로킹으로 처리하기 때문에 콜백, 프로미스, async/await 같은 비동기 제어 구조가 중요하다. fetch API는 프로미스를 반환하며, 오류 처리는 try/catch나 `.catch()` 블록으로 수행한다.

이벤트 루프의 실행 우선순위를 이해하고, `Promise.allSettled`, `AbortController`로 요청을 관리할 수 있어야 한다. Web Worker를 이용하면 CPU 집약 작업을 백그라운드에서 처리할 수 있다.

## 버전 관리와 협업

Git은 분산 버전 관리 시스템으로, `commit`, `branch`, `merge`, `rebase`는 협업의 기본이다. Conventional Commits, GitHub Flow, GitLab Flow와 같은 브랜치 전략을 이해하면 팀워크에 도움이 된다.
Pull Request를 통해 코드 리뷰를 진행하면 품질을 유지하면서 변경 사항을 추적할 수 있으며, CI/CD 파이프라인과 연계해 자동 테스트와 배포를 수행한다.

## 빌드 도구와 모듈 시스템

현대 프론트엔드 프로젝트는 NPM, Yarn, pnpm 같은 패키지 관리 도구를 사용한다. 모듈 시스템은 ESM이 표준이 되었으며, `import`/`export` 문법이 기본이다.
Webpack, Rollup, esbuild, Vite, SWC 같은 빌드 도구는 트리 셰이킹, 코드 스플리팅, 핫 모듈 리플레이스먼트를 제공한다. Babel은 최신 문법을 구형 브라우저에서도 실행 가능한 코드로 트랜스파일한다.

TypeScript는 정적 타입을 제공해 런타임 오류를 줄이며, Turborepo나 Nx 같은 도구는 모노레포 환경에서 빌드 시간을 최적화한다.

## 프레임워크와 라이브러리

React, Vue, Angular는 상태 기반 UI를 구축하는 대표적인 프레임워크다. React 18은 concurrent rendering과 자동 배치를 지원하고, Next.js 13은 App Router와 React Server Component를 도입했다.

Vue 3의 Composition API, SvelteKit의 번들 최적화, Solid.js의 fine-grained reactivity는 프레임워크 진화를 보여준다. Tailwind CSS, CSS-in-JS(Emotion, Styled Components), MUI 같은 UI 라이브러리를 활용해 디자인 시스템을 구축할 수 있다.

## 상태 관리와 데이터 페칭

Redux Toolkit은 공식 상태 관리 도구로 보일러플레이트를 줄여준다. Zustand, Recoil 같은 경량 상태 관리 라이브러리도 각광받고 있다.
데이터 페칭에는 React Query, SWR, Apollo Client(GraphQL) 등이 사용되어 캐싱, 에러 처리, 동기화를 단순화한다. BFF(Backend for Frontend)나 tRPC 같은 타입 안전 API 설계도 점차 확산되고 있다.

## 테스트와 품질

Jest와 Testing Library는 단위 및 컴포넌트 테스트를 수행하는 데 널리 쓰인다. Vitest는 Vite 기반 프로젝트에서 빠른 테스트 환경을 제공한다.
Playwright와 Cypress는 브라우저 자동화를 통해 E2E 테스트를 지원하며, CI 환경에서 멀티 브라우저 테스트를 수행할 수 있다. ESLint와 Prettier, TypeScript를 이용해 정적 분석과 코드 스타일을 통일하면 유지 보수가 쉬워진다.

## 보안 기본

입력값을 검증하지 않으면 XSS, SQL Injection과 같은 취약점이 발생한다. CSRF는 사용자의 의도와 상관없이 요청을 보내도록 하는 공격으로, 토큰 기반 검증이나 SameSite 쿠키 설정으로 예방한다.

Content Security Policy(CSP)와 Subresource Integrity(SRI)를 통해 외부 리소스 로딩 시 안전성을 확보한다. CORS 정책을 이해하면 다른 출처에서 리소스를 안전하게 요청할 수 있고, 의존성 취약점은 `npm audit`이나 Dependabot으로 관리한다.

## 성능 최적화

Core Web Vitals(LCP, FID, CLS) 지표를 통해 사용자 체감 성능을 측정한다. 코드 스플리팅과 지연 로딩으로 초기 번들 크기를 줄이고 필요한 시점에 리소스를 로드한다.
이미지는 AVIF나 WebP 같은 최신 포맷을 사용하고, 폰트는 서브셋으로 전송량을 줄인다. `prefetch`, `preconnect` 같은 리소스 힌트를 활용하고, Lighthouse와 Performance 패널을 통해 병목 구간을 찾아 개선한다.
Server-Side Rendering과 Incremental Static Regeneration은 초기 렌더 속도를 개선하는 전략으로 널리 사용된다.

## 접근성

WCAG 가이드라인을 준수하고 시맨틱 마크업과 적절한 ARIA 속성을 사용하면 보조 기술이 인터페이스를 올바르게 해석할 수 있다. 키보드 탐색을 지원하고 색 대비를 확보하면 다양한 사용자가 서비스를 이용할 수 있다.
폼 요소에는 `label`과 `aria-describedby`를 제공해 접근성을 강화하고, 스크린 리더(VoiceOver, NVDA)로 테스트해 실제 사용자 경험을 확인한다.

## 알고리즘과 자료구조

배열, 객체, 스택, 큐, 해시 테이블 같은 기본 자료구조와 Big-O 표기법은 문제 해결 능력을 평가할 때 자주 등장한다. 깊이/너비 우선 탐색, 정렬, 재귀, 동적 프로그래밍 등 알고리즘을 구현할 수 있어야 한다.

## 최신 트렌드

Edge Runtime(Cloudflare Workers, Vercel Edge Functions)로 서버리스 환경에서 코드를 실행할 수 있으며, WebAssembly는 브라우저에서 고성능 연산을 가능하게 한다.

Progressive Web App(PWA)은 오프라인 사용성과 설치형 경험을 제공하고, 마이크로프론트엔드 아키텍처는 대규모 조직에서 독립적인 팀 개발을 지원한다. AI 기반 코드 자동 완성 도구와 디자인 시스템 자동 생성 도구가 개발 워크플로에 점차 도입되고 있다.
