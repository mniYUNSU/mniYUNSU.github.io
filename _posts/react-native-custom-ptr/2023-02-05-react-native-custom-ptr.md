---
layout: post
title: 모바일 웹 커스텀 Pull to Refresh 만들기
date: 2023-02-05 00:00:00 +07:00
categories: [React Essentials]
tags: [React, Next.js]
description: How to Enable Custom Pull To Refresh for Mobile Web
modified: 2023-02-05 00:00:00 +07:00
---

# 개요

Pull To Refresh(PTR) 는 페이지 상단에서 아래로 끌어내리는 제스처를 통해 현재 페이지를 새로고침한다.

대부분 모바일 환경에서 많이 사용되는 기능이며, 모바일 디바이스의 브라우저는 기본적으로 PTR 을 제공한다.

그러나, 기본 제공되는 PTR 과 별개로 직접 구현해야 했다. 그 이유는 요구사항에 맞는 UI/UX 를 제공해야 했기 때문이다.

현재 개발 중인 앱은 React Native 와 WebView 가 합쳐진 PWA이다. 그래서 기본적으로 PTR 을 추가적인 개발없이 사용할 수 있는데, 디폴트 PTR 은 모바일 화면 상에서 좋지 않은 UI/UX 를 만들어내는 것을 확인했다. 또한, 안드로이드와 iOS가 제공하는 기본 PTR의 이펙트가 달라 일관성이 좋지 않았다. 그리하여 PTR을 커스터마이즈 해야만 했다.

# PTR 발동 조건

기본적으로 PTR 이 작동하는 방식은 다음과 같다.

화면에 스크롤이 존재할 만큼 페이지의 높이가 디바이스를 초과한다면 아래로 스크롤이 이동된 상태여선 안된다. 스크롤이 이동된 상태에서 화면을 아래로 내리는 제스처는 스크롤을 위로 올리기만 해야하기 때문이다.

그래서 기본적인 PTR 의 발동 조건은 화면의 스크롤 위치가 최상단 (`scrollTop = 0`) 에 위치해야 한다.

또한 이 과정에서 염두해야할 로직이 있다.

페이지 내 스크롤링 영역이 2개 이상으로 중첩되는 경우이다.

예시를 보면 아래와 같다.

<iframe src="https://codesandbox.io/embed/overscroll-behavior-forked-y62st7?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="overscroll-behavior (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

하나의 스크롤이 최상단에 위치하면 그 상태에서 스크롤링 시 다른 스크롤링 영역이 위로 올라가는 **스크롤 체이닝**을 막아야 한다.

이는 css의 `overscroll-behavior-y` 속성을 통해 제어할 수 있다.

### overscroll-behavior

이 속성은 페이지 내 중첩되는 스크롤이 존재하는 경우 스크롤 이벤트가 전파되어 상위 컨테이너에서 동작하게 되는 로직을 제어한다. 기본적으로 브라우저는 상위 컴포넌트로 스크롤 이벤트를 전파한다.

이 스크롤 체이닝을 막기 위해 다음과 같이 속성 값을 변경해야 한다.

- `auto` - 기본값, 스크롤 이벤트를 상위로 전파한다.
- `contain` - 스크롤 체이닝을 막는다.

<br>

마지막으로 스크롤 위치 조건에 부합하고, PTR 이 수행되기 위한 화면을 아래로 내리는 Swipe down 제스쳐를 취하면 PTR 로직을 실행한다.

해당 커스텀 PTR 로직을 `useCallback` 으로 만들어 페이지 렌더링 시 `useEffect` 로 실행했다.

### customRefreshHandler.ts

<br>

```ts
const customRefreshHandler = useCallback(async () => {
  if (!CSS.supports('overscroll-behavior-y', 'contain')) {
    alert("Your browser doesn't support overscroll-behavior :(");
  }

  // 브라우저 기본 제공 PTR 막기
  window.pulltorefresh = false;
  let initialX: number | null = null,
    initialY: number | null = null;

  // 사용자의 최초 터치 위치 저장
  function initTouch(e: any) {
    initialX = e.touches ? e.touches[0].clientX : e.clientX;
    initialY = e.touches ? e.touches[0].clientY : e.clientY;
  }
  let dir = '';

  const swipeDirection = (e: any) => {
    let result = '';
    if (initialX !== null && initialY !== null) {
      const currentX = e.touches ? e.touches[0].clientX : e.clientX,
        currentY = e.touches ? e.touches[0].clientY : e.clientY;

      // 사용자의 최초 터치 위치와 현재 위치의 차이 값
      let diffX = initialX - currentX,
        diffY = initialY - currentY;

      // x 축 차이 값이 y 축 차이 값 보다 크고, x 축 차이 값이 0 보다 큰 경우
      // --> 왼쪽으로 스와이프
      // x 축 차이 값이 y 축 차이 값 보다 크고, x 축 차이 값이 0 보다 작은 경우
      // --> 오른쪽으로 스와이프
      // y 축 차이 값이 x 축 차이 값 보다 크고, y 축 차이 값이 0 보다 큰 경우
      // --> 위쪽으로 스와이프
      // y 축 차이 값이 x 축 차이 값 보다 크고, y 축 차이 값이 0 보다 작은 경우
      // --> 아래쪽으로 스와이프

      Math.abs(diffX) > Math.abs(diffY)
        ? 0 < diffX
          ? (dir = 'to left')
          : (dir = 'to right')
        : 0 < diffY
        ? (dir = 'to top')
        : (dir = 'to bottom');

      initialX = null;
      initialY = null;
    }
    return dir;
  };

  // 모바일 환경에서 터치 액션에 이벤트를 추가한다.
  // 드래그 움직임의 스와이프 방향을 읽기 위한 이벤트도 추가한다.
  window.addEventListener('touchstart', initTouch);
  window.addEventListener('touchmove', swipeDirection);

  // 커스텀 PTR 애니메이션을 위한 핸들러
  // PTR 작동 시 커스텀 애니메이션을 위해 필요한 클래스를 body 에 추가한다.
  // 페이지 새로고침 후 추가한 클래스를 삭제한다.
  async function simulateRefreshAction() {
    const sleep = (timeout: number) =>
      new Promise((resolve) => setTimeout(resolve, timeout));

    const transitionEnd = function (propertyName: string, node: any) {
      return new Promise((resolve) => {
        function callback(e: any) {
          e.stopPropagation();
          if (e.propertyName === propertyName) {
            node.removeEventListener('transitionend', callback);
            resolve(e);
          }
        }
        node.addEventListener('transitionend', callback);
      });
    };

    const refresher: Element = document.querySelector('.refresher')!;

    document.body.classList.add('refreshing');
    await sleep(2000);

    refresher.classList.add('shrink');
    await transitionEnd('transform', refresher);
    refresher.classList.add('done');
    window.pulltorefresh = false;
    location.reload();

    refresher.classList.remove('shrink');
    document.body.classList.remove('refreshing');
    await sleep(0); // let new styles settle.
    refresher.classList.remove('done');
  }

  let _startY = 0;

  const inbox: Element = document.querySelector('#inbox')!;

  inbox.addEventListener(
    'touchstart',
    (e: any) => {
      _startY = e.touches[0].pageY;
      initTouch(e);
    },
    { passive: true }
  );

  inbox.addEventListener(
    'touchmove',
    (e: any) => {
      const y = e.touches[0].pageY;
      // 현재 스크롤 위치가 최상단이며, 스와이프 방향이 아래쪽 스와이프일 때 PTR을 실행한다.
      if (
        document.scrollingElement?.scrollTop === 0 &&
        y > _startY &&
        !document.body.classList.contains('refreshing') &&
        dir === 'to bottom'
      ) {
        dir = '';
        window.pulltorefresh = true;
        simulateRefreshAction();
      } else {
        dir = '';
      }
    },
    { passive: true }
  );
}, []);
```

<br>

### \_app.tsx

이제 해당 로직을 루트 프로젝트에서 실행한다.

```tsx
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    customRefreshHandler();
  }, [customRefreshHandler]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
```

<br>

### layout.tsx

PTR 애니메이션을 위해 필요한 클래스들을 추가한다.

<br>

```tsx
import React from 'react';
import { LayoutProps } from 'shared/const';
import { Oval } from 'react-loader-spinner';

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className='refresher'>
        <Oval
          ariaLabel='loading-indicator'
          height={40}
          width={40}
          strokeWidth={3}
          strokeWidthSecondary={3}
          color='#AF8051'
          secondaryColor='rgba(152, 152, 152, 0.3)'
        />
      </div>
      <div id='inbox'>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
```

추가한 클래스에 대응되는 스타일도 커스터마이즈 해야 원하는 커스텀 PTR을 구현할 수 있다.

<br>

<figure>
<img src="./../../images/custom-ptr1.gif" alt="custom-ptr1">
<figcaption>Fig 1. 결과 화면</figcaption>
</figure>
