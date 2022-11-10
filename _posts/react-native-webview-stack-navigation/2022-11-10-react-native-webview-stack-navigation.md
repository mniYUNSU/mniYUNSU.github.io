---
layout: post
title: React Native Webview에 페이지 이동 트랜지션 적용하기
date: 2022-11-10 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native, Typescript]
description: How to Create a Stack Navigation for React Native Webview
modified: 2022-11-10 00:00:00 +07:00
---

# 개요

**React Native** 와 **Webview** 를 사용하여 앱을 개발하고 있다.

웹 뷰를 기반으로 한 하이브리드 앱은 크다면 크고 사소하다면 사소한 문제가 하나 있다. 단순한 **웹 뷰만 제공하는 앱이라면 웹 뷰의 페이지 라우팅이 변경될 때 페이지 전환 효과 없이 화면이 깜빡이면서 이동한다는 것**이다.

<figure>
<img src="./../../images/webview-stack-navitation1.gif" alt="webview-stack-navigation">
<figcaption>Fig 1. 일반적인 웹뷰의 페이지 이동</figcaption>
</figure>

일반적인 React Native 앱으로 개발한다면 React Navigation 을 통해 간단하게 화면 전환 효과를 줄 수 있다. 그러나 웹 뷰 형태에선 페이지 전환할 때 웹에 페이지 전환 애니메이션을 주는 것이 맞는건지, 앱 자체에서 처리를 해야하는지 많은 고민을 해야 했다.

예를 들면, 웹의 라우팅이 변경될 때 앱에서 그 이벤트를 받아 그 라우팅에 해당하는 URL 을 가진 새로운 웹뷰로 이동해야할까? 라던지, 웹의 라우팅이 변경될 때 웹의 전체 페이지에 트랜지션을 넣어야 할 지 등등...

고민 끝에 결정한 방법으로는 `React Native Navigation` 과 웹에서 라우팅 이벤트 발생 시 `postMessage` 로 이벤트를 송신하고, 이를 앱에서 WebView 의 `onMessage` 로 읽어 페이지 전환을 React Native 의 **Stack Navigation** 형식으로 구현했다.

앱 환경은 `React Native` + `Typescript` 이며, 웹 환경은 `Next.js` + `Typescript` 이다.

# React Native App

현재 개발하는 앱에는 웹 뷰와 React Native 화면 모두 사용한다. 메인 홈 화면, 상품 상세 화면 등은 웹 뷰로 구성되어 있으며 마이 페이지 화면은 React Native 로 구성되어 있다. 이 화면들이 `Bottom Tab Navigator` 로 구분되어 있다.

### navigation.tsx

<br>

```tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import WebViewContainer from '@/screen/common/webView/webViewContainer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WebViewTabs = () => {
  return (
    <Stack.Navigator
      initialRouteName='WebViewRoot'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false
      }}
    >
      <Stack.Screen
        name='WebViewRoot'
        component={WebViewContainer}
        options={{
          title: '홈',
          transitionSpec: {
            open: {
              animation: 'spring',
              config: {
                stiffness: 2000,
                damping: 1000
              }
            },
            close: {
              animation: 'spring',
              config: {
                stiffness: 1000,
                damping: 500
              }
            }
          }
        }}
      />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIcon: {},
        tabBarStyle: {},
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen
        name='Home'
        component={WebViewTabs}
        options={{
          title: '홈',
          headerShown: false
        }}
      />
      <Tab.Screen
        name='MyPage'
        component={MyPage}
        options={{ title: '마이 페이지' }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='IntroSplash'>
        <Stack.Group
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          <Stack.Screen name='IntroSplash' component={Splash} />
          <Stack.Screen name='IntroLogin' component={Login} />
          <Stack.Screen name='HomeTabs' component={HomeTabs} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
```

앱의 작동 구조는 다음과 같다.

앱을 오픈하면 스플래쉬 화면이 보이고, 로그인 화면으로 진입한다. 로그인에 성공하면 메인 홈 화면을 띄우게 된다.

기본 홈 화면은 웹 뷰의 홈 화면이며, React Native 로 구성된 마이페이지로 진입하기 위해 Bottom Tab 이 존재한다.

`스플래쉬 - 로그인 - 메인 홈 화면`이 Stack Group 으로 묶여있다.

**메인 홈 화면**이 보여주는 컴포넌트는 `HomeTabs` 이다. `HomeTabs` 는 하단 탭을 갖고 있으며 **웹 뷰 화면인 홈 화면**과 React Native 화면인 마이 페이지로 구분되어 있다.

웹 뷰 화면으로 구성된 홈 화면에 전달한 `component` 는 `WebViewTabs` 이다.

`WebViewTabs` 에 본격적으로 구현할 웹 뷰 페이지 라우팅 전환 애니메이션을 적용할 것이다.
`WebViewTabs` 은 하나의 `Stack Screen` 을 갖고 있는 `Stack Navigation` 이다.

네비게이션 옵션으로는 헤더를 가리기 위한 옵션과 `TransitionPresets.SlideFromRightIOS` 을 설정했다. 이는 iOS 의 페이지 트랜지션 프리셋을 Android 에도 동일하게 적용하기 위함이다.

`Stack Screen` 의 `component` 로 `WebViewContainer` 를 설정했다. 옵션으로 설정한 `transitionSpec` 은 페이지 전환 애니메이션 속도를 조정한 것이다.

### webViewContainer.tsx

이제 사용자는 로그인을 거치면 가장 먼저 `WebViewContainer` 화면을 마주하게 된다.

이 컴포넌트에서 웹 뷰의 페이지 라우팅 전환이 발생하면 `Stack Navigation` 을 통한 페이지 전환이 일어날 수 있도록 `onMessage` 를 처리해야 한다.

```tsx
import React from 'react';
import { StackActions } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

const WebViewContainer = ({ navigation, route }) => {
  const target = 'http://localhost:3000';
  const url = route.params.url ? target + route.params.url : target;

  const handleMessage = (e: WebViewMessageEvent) => {
    const data = JSON.parse(e.nativeEvent.data);

    switch (data?.type) {
      // 웹뷰의 페이지 라우팅이 변경될 때 작동
      case 'ROUTER_CHANGE':
        const path: string = data.data?.value;
        if (path === 'back') {
          const popAction = StackActions.pop(1);
          navigation.dispatch(popAction);
        } else {
          const pushAction = StackActions.push('WebViewRoot', {
            url: `${path}`,
            isStack: true
          });
          navigation.dispatch(pushAction);
        }
        break;
      case 'DEFAULT':
        break;
    }
  };

  return (
    <WebView
      source={{ uri: url }}
      onMessage={handleMessage}
      originWhitelist={['*']}
    />
  );
};

export default WebViewContainer;
```

웹에서 페이지 전환 이벤트가 발생하면 `handleMessage` 가 작동하며, `ROUTER_CHANGE` 라는 이벤트 이름으로 보냈기 때문에 이 이벤트에 해당하는 로직을 실행하게 된다.

뒤로 가기 액션인 경우, 현재 최근의 스택을 하나 빼는 것으로 내비게이션 스택이 변경된다. 이외의 경우 내비게이션 푸시 액션으로 페이지 전환을 실행한다.

# Web - Next.js

웹에서는 이제 페이지 라우팅 전환이 일어날 때, 전환이 발생한 환경을 파악해야 한다.

일반적인 웹 브라우저라면 기존과 동일하게 라우팅을 수행하면 된다. 그러나 앱 환경일 경우 라우팅 전환이 발생한다는 이벤트를 앱으로 보내야 한다.

### WebViewMessage.ts

<br>

```ts
export const RN_API = {
  ROUTER_CHANGE: 'ROUTER_CHANGE'
};

export const WebViewMessage = async (type: string, data: any) =>
  new Promise((resolve, reject) => {
    if (!window.ReactNativeWebView) {
      return;
    }
    const reqId = Date.now();
    const TIMEOUT = 3000; // 3s
    const timer = setTimeout(() => {
      /** android */
      document.removeEventListener('message', listener);
      /** ios */
      window.removeEventListener('message', listener);

      reject('TIMEOUT');
    }, TIMEOUT);

    const listener = (event: any) => {
      const { data: listenerData, reqId: listenerReqId } = JSON.parse(
        event.data
      );
      if (listenerReqId === reqId) {
        clearTimeout(timer);

        /** android */
        document.removeEventListener('message', listener);
        /** ios */
        window.removeEventListener('message', listener);
        resolve(listenerData);
      }
    };

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type,
        data,
        reqId
      })
    );

    /** android */
    document.addEventListener('message', listener);
    /** ios */
    window.addEventListener('message', listener);
  });
```

하이브리드 앱의 경우 웹 환경에서 앱으로 이벤트를 보내기 위한 `postMessage` 를 굉장히 자주 사용하기 때문에 이를 따로 만들어 두었다.

### WebViewRouter.ts

<br>

```ts
import { NextRouter } from 'next/router';
import { RN_API, WebViewMessage } from './webViewMessage';

// react native app 환경인지 판단
const IsApp = () => {
  let isApp = false;

  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    isApp = true;
  }

  return isApp;
};

// 뒤로가기 하는 경우
export const stackRouterBack = (router: NextRouter) => {
  if (IsApp()) {
    WebViewMessage(RN_API.ROUTER_CHANGE, {
      value: 'back'
    });
  } else {
    router.back();
  }
};

// push 하는 경우
export const stackRouterPush = (router: NextRouter, url: string) => {
  if (IsApp()) {
    WebViewMessage(RN_API.ROUTER_CHANGE, {
      value: url
    });
  } else {
    router.push(url).then();
  }
};
```

재사용을 위해 만든 `WebViewMessage` 를 활용해 웹에서 페이지 전환이 뒤로 가기인 경우와 푸시인 경우를 분기하여 앱으로 `ROUTER_CHANGE` 이벤트를 보낸다.

앱이 아니라면 기존 Next.js router 를 통해 그대로 라우팅하게 된다.

이를 이제 웹에서 페이지 전환을 적용하려는 페이지 또는 컴포넌트에 아래와 같이 사용해주면 된다.

```tsx
import { useRouter } from 'next/router';
import { stackRouterPush, stackRouterBack } from '@/utils/index';

export default function TestPage() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => stackRouterPush(router, `/blahblah`)}>
        PUSH 이동
      </button>
      <button onClick={() => stackRouterBack(router)}>뒤로 가기</button>
    </>
  );
}
```

모든 과정을 마치면 앱에서 `Stack Navigation` 이 잘 적용된 것을 확인할 수 있다.

<figure>
<img src="./../../images/webview-stack-navitation2.gif" alt="webview-stack-navigation2">
<figcaption>Fig 2. 앱에서 웹 뷰의 페이지 전환</figcaption>
</figure>

### References

- <a href="https://velog.io/@rkd028/React-Native-Webview%EC%97%90-Stack-Navigation-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0" target="_blank" rel="noopener">참고한 블로그</a>
