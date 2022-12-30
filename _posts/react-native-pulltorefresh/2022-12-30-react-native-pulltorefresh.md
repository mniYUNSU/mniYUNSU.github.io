---
layout: post
title: React Native 웹뷰 안드로이드 Pull to Refresh 활성화
date: 2022-12-30 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: How to Enable Pull To Refresh for Android React Native App
modified: 2022-12-30 00:00:00 +07:00
---

# 개요

React Native 로 개발한 앱에 WebView 를 넣었다. iOS 는 별 다른 로직 없이 웹뷰에서 **Pull To Refresh(PTR)**이 일반적인 웹 브라우저에서의 동작과 동일하게 작동한다.

그러나 안드로이드에서는 이 기능이 정상적으로 작동하지 않았고, 해결을 위해 웹뷰를 로드할 때 PTR 이벤트를 등록해야 한다는 것을 알게 되었다.

# React Native

### /src/WebviewContainer.tsx

<br>

```tsx
const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const WebViewContainer = () => {
  const webViewRef = useRef<WebView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [enablePTR, setEnablePTR] = useState(true);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      webViewRef.current?.reload();
    }, 2000);
  }, []);

  /** 웹뷰에서 데이터를 받을 때 필요한 함수 */
  const handleMessage = (e: WebViewMessageEvent) => {
    const data = JSON.parse(e.nativeEvent.data);
    switch (data?.type) {
      // 안드로이드 웹뷰에서 스크롤링할 때 마다 refreshControl 동작을 제어하는 핸들러
      case 'ENABLE_PTR':
        if (isIos) {
          break;
        } else if (data.value?.scrollTop === 0 && !enablePTR) {
          setEnablePTR(true);
        } else if (data.value?.scrollTop > 10 && enablePTR) {
          setEnablePTR(false);
        }
        break;
    }
  };

  // 스크롤링 할 때 마다 새로고침을 막고 원활한 Pull to Refresh 기능을 위해 웹뷰가 로딩되기 전에 이 함수를 가장 먼저 실행
  // 스크롤링이 발생할 때마다 웹에서 앱으로 ENABLE_PTR data 를 보낸다.
  const runFirst = `window.onscroll = function() {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'ENABLE_PTR',
        data: {
          value:
            {
              scrollTop: 
                document.documentElement.scrollTop || document.body.scrollTop,
              reqId: Date.now(),
          }
        }
      }),     
    )
  }
  `;

  const runBeforeFirst = `
      window.isNativeApp = true;
      true;
  `;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={refreshing ? 40 : 0}
          enabled={isIos ? true : enablePTR}
        />
      }
      scrollEventThrottle={16}
      scrollEnabled={isIos ? true : enablePTR}
    >
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onMessage={handleMessage}
        originWhitelist={['*']}
        injectedJavaScript={runFirst}
        injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
      />
    </ScrollView>
  );
};
```

모바일 앱에서 웹뷰를 로드될 때 `runFirst` 를 실행하여 웹뷰의 스크롤링 이벤트를 감지한다. 스크롤링 할 때마다 `ENABLE_PTR` 이라는 이벤트를 웹뷰에서 앱으로 보내고, 앱에서는 `handleMessage` 에 존재하는 `ENABLE_PTR` 로직을 실행한다.

웹뷰에서 `ENABLE_PTR` 이벤트를 앱으로 보낼 때 현재 페이지의 스크롤 데이터를 보낸다. 이를 실행하는 로직은 스크롤 값에 따라 `enablePTR` 이라는 상태를 변경한다.

이후 앱의 웹뷰를 감싸고 있는 `ScrollView` 가 이 상태 값에 따라 페이지 새로고침을 실행하게 된다. `ScrollView` 의 `refreshControl` 값에 새로고침 활성화 여부를 `enablePTR` 에 따라 활성화 하고, PTR 조건에 합당하면 `onRefresh` 함수를 실행한다.

위와 같은 로직으로 모바일 디바이스 환경에 구애받지 않고 동일한 Pull To Refresh 를 구현할 수 있다.
