---
layout: post
title: React 19 업데이트 정리
date: 2025-10-16 00:00:00 +0900
categories: [React Essentials]
tags: [React, Release Notes, Frontend]
description: React 19 주요 기능 정리
modified: 2025-10-28 00:00:00 +07:00
---

## 개요

React 19는 2024년 말 공개된 RC를 바탕으로 정식 릴리스를 준비하며 폼 제출, 서버 렌더링, 비동기 데이터 처리, 문서 메타데이터, Web Components 호환성, 오류 진단 등 실무에서 자주 사용하는 기능을 다듬었다. 핵심 업데이트 사항을 정리해보았다.

## 업데이트된 기능 요약

- **Actions와 form 훅**: `form` 태그에 비동기 액션을 연결하고 제출 상태를 추적한다.
- **React Server Components 안정화**: 서버 전용 컴포넌트를 공식 패키지로 묶어 스트리밍 렌더링을 지원한다.
- **`use` 훅**: Promise나 Context를 동기적으로 읽어 Suspense와 연계한다.
- **Document Metadata API**: 컴포넌트에서 `<title>`, `<meta>`, `<link>`를 선언적으로 관리한다.
- **Web Components 호환성 개선**: 커스텀 엘리먼트와 props·이벤트를 자연스럽게 연결한다.
- **`<Activity>` 컴포넌트**: 숨겨진 UI의 상태를 보존한 채로 표시 여부를 전환하거나 사전 렌더링한다.
- **`useEffectEvent` 훅**: Effect 내부 로직을 이벤트처럼 분리해 최신 props·state를 부작용 없이 읽는다.
- **Hydration 오류 리포팅 강화**: 서버와 클라이언트 간 마크업 불일치를 명확하게 보여 준다.

## 업데이트된 기능들

### Actions와 form 훅

#### 업데이트 내용

React 18까지는 `onSubmit` 핸들러와 `useState` 조합으로 로딩·에러·성공 상태를 직접 관리해야 했다. React 19에서는 `form`의 `action` 속성에 비동기 함수를 연결하면 `useActionState`, `useFormStatus`, `useOptimistic`가 제출 상태와 UI를 자동으로 업데이트한다.

#### 예제

```jsx
'use client';
import { useActionState, useFormStatus } from 'react';

async function submitFeedback(prevState, formData) {
  const message = formData.get('message');

  if (!message) {
    return { success: false, error: '피드백 입력' };
  }

  await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  return { success: true };
}

export function FeedbackForm() {
  const [state, submitAction] = useActionState(submitFeedback, {
    success: false,
    error: null
  });

  return (
    <form action={submitAction} className='feedback-form'>
      <textarea name='message' placeholder='피드백 입력' />
      <SubmitButton />
      {state.error && <p className='error'>{state.error}</p>}
      {state.success && <p className='success'>제출 성공</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      {pending ? '전송 중…' : '제출'}
    </button>
  );
}
```

#### 기대 효과

- 폼 제출 로직과 상태 변화를 한 액션 함수에 모아 코드가 단순해진다.
- UI와 에러 표시를 기본 훅으로 처리해 사용자 경험이 안정적이다.
- 서버 액션과 클라이언트 액션을 동일한 문법으로 선언해 재사용성이 높다.

### React Server Components 안정화

#### 업데이트 내용

이전에는 **Next.js** 같은 프레임워크를 이용해야 서버 전용 컴포넌트와 스트리밍 렌더링을 활용할 수 있었다. React 19는 React Core 자체에서 서버 컴포넌트를 정식 지원해 민감한 로직을 서버에 두면서도 클라이언트 인터랙션을 최소 번들로 구성할 수 있다.

#### 예제

```jsx
import LiveFeed from './LiveFeed.client.jsx';
import { getTeamStats } from './data.js';

export default async function DashboardPage() {
  const stats = await getTeamStats();

  return (
    <section>
      <h1>팀 현황</h1>
      <dl>
        <dt>완료된 작업</dt>
        <dd>{stats.completed}</dd>
        <dt>대기 중 작업</dt>
        <dd>{stats.pending}</dd>
      </dl>
      <LiveFeed />
    </section>
  );
}
```

```jsx
// app/dashboard/LiveFeed.client.jsx
'use client';
import { useEffect, useState } from 'react';

export default function LiveFeed() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/live-feed');
    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };
    return () => eventSource.close();
  }, []);

  return (
    <aside>
      <h2>실시간 피드</h2>
      <ul>
        {messages.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </aside>
  );
}
```

#### 기대 효과

- 서버에서 데이터를 조합해 초기 렌더링 속도를 높일 수 있다.
- 클라이언트 번들을 줄여 로딩과 상호작용 성능이 개선된다.
- 서버·클라이언트 경계가 명확해져 보안과 유지보수가 쉬워진다.

### `<Activity>` 컴포넌트

#### 업데이트 내용

원래는 조건부 렌더링으로 UI를 숨기면 컴포넌트가 **언마운트**되어 내부 상태와 Effect가 사라졌다. React 19의 `<Activity>`는 `mode` 값만 전환해도 DOM을 `display: "none"`으로 숨기면서 Effects를 정리하고, 다시 보일 때는 직전에 저장한 state를 복원한다. 게다가 처음부터 `hidden`으로 렌더링하면 화면에는 보이지 않지만 코드는 저우선순위로 실행돼 사전 로딩이 가능하다.

#### 예제

```jsx
// app/SidebarLayout.jsx
import { useState, Activity } from 'react';

export default function SidebarLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='layout'>
      <button onClick={() => setSidebarOpen((open) => !open)}>
        {isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
      </button>

      <Activity mode={isSidebarOpen ? 'visible' : 'hidden'}>
        <SidebarPanel />
      </Activity>
    </div>
  );
}

function SidebarPanel() {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <aside className='sidebar'>
      <button onClick={() => setExpanded((value) => !value)}>
        개요 {isExpanded ? '▲' : '▼'}
      </button>
      {isExpanded && (
        <ul>
          <li>섹션 1</li>
          <li>섹션 2</li>
          <li>섹션 3</li>
        </ul>
      )}
    </aside>
  );
}
```

#### 기대 효과

- 숨겨진 컴포넌트의 **state**를 유지하므로 다시 표시할 때 초기화 과정을 생략한다.
- `Activity` 경계 안에서 사전 렌더링을 수행해 탭 전환·패널 열기 UX를 빠르게 만든다.
- 숨긴 동안 Effect가 자동으로 정리돼 불필요한 구독이나 타이머가 실행되지 않는다.

### `useEffectEvent` 훅

#### 업데이트 내용

Effect 안에서 최신 props나 state를 읽으면 의존성 배열에 추가해야 해서 불필요한 재연결이 발생했다. `useEffectEvent`는 Effect 내부에서만 호출 가능한 이벤트 함수를 선언해 최신 값을 읽되 의존성에는 포함하지 않아도 된다. 덕분에 의존성 배열을 최소화하면서도 정합성을 유지하고, `useRef`로 수동 동기화하던 패턴을 대체한다.

#### 예제

```jsx
// app/ChatRoom.jsx
import { useEffect, useEffectEvent } from 'react';
import { createConnection, showToast } from './chat-api';

export default function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showToast(`Connected to room ${roomId}`, { theme });
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
}
```

#### 기대 효과

- Effect가 필요한 의존성만 감시하므로 재연결·재구독 횟수가 줄어든다.
- 최신 props·state를 안전하게 참조해 stale closure 문제를 예방한다.
- `useRef`로 임시 저장하던 비반응 로직을 깔끔한 함수로 추출해 재사용성이 높아진다.

### `use` 훅

#### 업데이트 내용

React 18 이하에서는 `useEffect`로 비동기 데이터를 가져온 뒤 `setState`를 호출해 렌더링을 다시 요청해야 했다. React 19의 `use` 훅은 Promise를 동기처럼 읽을 수 있어 Suspense fallback과 자연스럽게 연결된다.

#### 예제

```jsx
import { Suspense } from 'react';
import { use } from 'react';

function fetchWeather() {
  return fetch('https://api.example.com/weather/seoul').then((res) =>
    res.json()
  );
}

function WeatherPanel() {
  const weather = use(fetchWeather());
  return (
    <section>
      <h2>오늘의 날씨</h2>
      <p>{weather.summary}</p>
      <p>현재 기온: {weather.temperature}°C</p>
    </section>
  );
}

export default function WeatherPage() {
  return (
    <Suspense fallback={<p>날씨 정보 불러오는 중...</p>}>
      <WeatherPanel />
    </Suspense>
  );
}
```

#### 기대 효과

- 비동기 데이터 요청과 렌더링 타이밍을 자동으로 조율해 로딩 UI가 일관된다.
- `useEffect`와 `setState` 보일러 플레이트가 사라져 코드가 간결하다.
- Suspense fallback을 활용해 사용자에게 깜빡임 없는 경험을 제공한다.

### Document Metadata API

#### 업데이트 내용

기존에는 `react-helmet` 같은 라이브러리를 사용하거나 `<head>` 조작을 직접 해야 했다. React 19는 컴포넌트 안에서 `<title>`, `<meta>`, `<link>`를 선언하면 React DOM이 중복 없이 병합한다.

#### 예제

```jsx
// app/articles/[slug]/page.server.jsx
import { getArticle } from './data.js';

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  return (
    <>
      <title>{article.title} | 매거진</title>
      <meta name='description' content={article.summary} />
      <link
        rel='canonical'
        href={`https://example.com/articles/${params.slug}`}
      />

      <article>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </article>
    </>
  );
}
```

#### 기대 효과

- 페이지마다 필요한 메타 정보를 컴포넌트 수준에서 선언할 수 있다.
- 중복 태그나 잘못된 순서를 React가 자동으로 조정해 SEO 품질이 유지된다.
- 외부 라이브러리 의존도를 줄여 번들 크기와 유지보수 부담이 감소한다.

### Web Components 호환성 개선

#### 업데이트 내용

React 18 이전에는 커스텀 엘리먼트에 함수형 props를 전달하거나 이벤트를 연결할 때 제약이 있었다. React 19는 커스텀 엘리먼트와 props·이벤트·`ref`를 자연스럽게 연결한다.

#### 예제

```jsx
// components/RatingSection.jsx
import 'design-system/rating-widget';

export default function RatingSection() {
  const handleRate = (event) => {
    const { score } = event.detail;
    console.log('선택한 점수:', score);
  };

  return (
    <section>
      <h2>서비스 만족도를 평가</h2>
      <rating-widget
        value={4}
        onrate={handleRate}
        ref={(node) => node?.focus()}
      />
    </section>
  );
}
```

#### 기대 효과

- 디자인 시스템이나 써드파티 UI 라이브러리를 React 프로젝트에 쉽게 통합한다.
- 커스텀 이벤트와 함수형 props가 그대로 전달되어 상호운용성이 높다.
- `ref`와 폼 연동이 자연스럽게 작동해 접근성이 개선된다.

### Hydration 오류 리포팅 강화

#### 업데이트 내용

기존에는 서버와 클라이언트 마크업 불일치가 발생하면 비슷한 경고가 여러 번 출력되었다. React 19는 단일 메세지로 diff를 보여 주어 원인을 즉시 파악할 수 있다.

#### 예제

```text
Warning: Text content does not match between server and client.
Server: "서버 렌더링 값"
Client: "클라이언트 렌더링 값"
    at span
    at HighlightedStat
```

#### 기대 효과

- 배포 후 발생하는 Hydration 문제를 빠르게 진단한다.
- 로그 노이즈가 줄어들어 디버깅 시간이 단축된다.
- 팀 단위로 서버·클라이언트 마크업 일관성을 쉽게 유지한다.

## 결론

React 19는 폼 제출, 서버 렌더링, 비동기 데이터 흐름, 메타데이터, Web Components, 오류 진단 같은 요소를 핵심 업데이트로 정리했다. Actions로 폼 제출 경험을 정돈하고, 서버 컴포넌트와 `use` 훅으로 데이터 경계를 명확히 나누며, 메타데이터와 Web Components 개선으로 기존 리소스까지 유연하게 활용할 수 있다.

## Reference

- <a href="https://react.dev/blog/2024/12/05/react-19" target="_blank" rel="noopener">React Blog – React 19</a>
- <a href="https://react.dev/reference/react-dom/hooks/useFormStatus" target="_blank" rel="noopener">React Docs – Actions & Forms</a>
- <a href="https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components" target="_blank" rel="noopener">React Docs – React Server Components</a>
- <a href="https://react.dev/reference/react/use" target="_blank" rel="noopener">React Docs – `use` 훅</a>
- <a href="https://react.dev/reference/react/Activity" target="_blank" rel="noopener">React Docs – `<Activity>`</a>
- <a href="https://react.dev/reference/react/useEffectEvent" target="_blank" rel="noopener">React Docs – `useEffectEvent`</a>
- <a href="https://react.dev/reference/react-dom/components/common#web-components" target="_blank" rel="noopener">React Docs – Web Components</a>
- <a href="https://react.dev/reference/react-dom/components#document-metadata" target="_blank" rel="noopener">React Docs – Document Metadata</a>
