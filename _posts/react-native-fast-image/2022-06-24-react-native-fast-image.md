---
layout: post
title: React Native 안드로이드에서 이미지가 깨질 때 해결 방법
date: 2022-06-24 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: React Native에서 사용하고 있는 fresco에서 android 상 해상도 보다 큰 이미지를 자동으로 줄이는 기능이 있어 이미지가 깨져 보인다. Low image quality using <Image/> component on RN
modified: 2022-06-24 00:00:00 +07:00
---

React Native 로 개발하다가 특정 AOS 기기에서 이미지가 깨져 흐릿하게 보이는 경우가 있었다.

React Native 의 `<Image />` 컴포넌트는 내부에 `com.facebook.fresco` 라이브러리 의존성을 갖고 있다. **Fresco** 라이브러리는 Facebook에서 만든 안드로이드 용 이미지 라이브러리다.

이 라이브러리는 **너비와 높이가 안드로이드 기기 해상도 보다 현저히 클 경우** 이미지에 대해 자동으로 이미지 크기를 조절(다운샘플링) 한다.

<a href="https://github.com/facebook/fresco/issues/2397" target="_blank" rel="noopener">참고한 글</a>에 따르면 Fresco 는 2048px 이상일 때 이미지를 다운샘플링을 하도록 하드코딩 되어 있다고 한다.

# 해결 방법

**첫 번째 해결책**으론 이미지에 비례한 축소된 너비와 높이를 지정해주거나, JPG 이미지를 사용하는 것으로 해결할 수 있다.

복수의 이미지를 다룬다면 각각의 이미지 사이즈를 알아야 하고, 그에 비례한 너비와 높이를 지정해줘야 하므로 추가적인 함수를 만들어야 한다.

**두 번째 해결책**은 `<Image />` 컴포넌트의 `resizeMethod` 라는 prop을 이용하는 것이다. 사용 가능한 속성은 세 가지 이며, 아래와 같다.

`auto` : 디폴트 값이며, 휴리스틱 이란 방법론을 통해 `resize` 와 `scale` 둘 중 하나를 선택한다.

`resize` : 디코딩되기 전에 메모리에서 인코딩된 이미지를 변경한다. 이미지가 큰 경우 사용한다.

`scale` : 이미지가 작은 경우 또는 조금 클 때 빠르게 렌더링할 수 있다.

이 방법 또한 근본적으로 Fresco를 이용하기 때문에 이미지가 2048px를 넘어서는 경우 다운샘플링을 피할 수 없다.

그래서 **최종적으로 선택한 해결책**은 `react-native-fast-image` 라이브러리를 사용했다.

# FastImage

<a href="https://github.com/DylanVann/react-native-fast-image" target="_blank" rel="noopener">`react-native-fast-image`</a>는 Fresco를 써서 이미지를 렌더링하는게 아닌 이미지에 데이터 캐싱으로 보여주는 방식이다.

이 라이브러리를 통해 기존 `<Image />` 컴포넌트에서 발생하던 **여러 문제점들(깜빡이는 이미지, 흐릿한 이미지 등)**을 개선할 수 있다.

**React Native 0.60.0 이상**의 버전이라면 사용할 수 있다.

```cli
yarn add react-native-fast-image
cd ios && pod install
```

<br>

```jsx
import FastImage from 'react-native-fast-image'

const YourImage = () => (
  <FastImage
    style={your_style}
    source={`${your_image_uri}`}
    resizeMode={FastImage.resizeMode.contain}
  />
)
```

<br>

위 예제처럼 `react-native-fast-image` 는 컴포넌트에 **권한 부여 헤더**를 추가할 수 있고, **우선 순위**를 지정할 수 있다. 또한 GIF 포맷도 지원하며 `<Image />` 에 적용 가능한 스타일도 적용할 수 있다.

위 라이브러리로 안드로이드 환경에서 이미지가 깨지는 이슈를 수정할 수 있었다.

### References

- <a href="https://github.com/facebook/fresco/issues/2397" target="_blank" rel="noopener">Low image quality using `<Image/>` component on RN - facebook/Fresco</a>
- <a href="https://reactnative.dev/docs/0.67/image#resizemethod-android" target="_blank" rel="noopener">React Native - `<Image/>`</a>
- <a href="https://github.com/DylanVann/react-native-fast-image" target="_blank" rel="noopener">react-native-fast-image</a>
