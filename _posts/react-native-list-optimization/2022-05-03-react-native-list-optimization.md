---
layout: post
title: FlatList Optimization - You have a large list that is slow to update
date: 2022-05-03 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: VirtualizedList - You have a large list that is slow to update 이슈 해결
---

# 문제점

> VirtualizedList: **You have a large list that is slow to update** - make sure your **renderItem function renders components that follow React performance best practices** like PureComponent, shouldComponentUpdate, etc.

앱의 중요한 컴포넌트가 `FlatList` 로 구성되어 있었다. 디버깅하는 과정에서 위와 같은 이슈를 확인했다. 처음엔 이런 이슈가 있었나 싶었는데, 에러가 아닌 이슈로만 확인되어 대수롭지 않게 넘겼던 것 같다.

`FlatList` 는 화면에 나타낼 데이터를 손쉽게 나열해주는 리액트 네이티브의 좋은 컴포넌트이지만, 리스트라는 속성을 갖고 있기 때문에 성능 이슈를 항상 신경써야 한다.

단순 가로나 세로로 긴 화면에 item을 나열하는 경우라면 `ScrollView`를 쓰면 되지만, item이 반복되거나 서버로부터 지속적으로 응답받아야 하는 경우 `FlatList`가 가장 효율적이다.

리액트 네이티브가 제공하는 편리한 컴포넌트인 `FlatList`를 위 이슈 없이 효율적으로 사용하기 위해선 아래와 같은 성능 최적화 개념을 알고있어야 한다.

# Optimizing FlatList Configuration

#### Array.prototype.map 함수는 자제한다.

리액트 웹 환경에선 JS의 map 함수는 꽤 자주 사용했던 함수이다. 그러나 리액트 네이티브에선 이보다 더 편리한 컴포넌트가 있으며, 이 컴포넌트는 다양한 성능 최적화 Props를 제공한다.

#### removeClippedSubviews

`FlatList` 의 Props 이며, 기본값은 false 이다. true 로 할당하게 되면 사용자의 화면에서 벗어난 item을 `FlatList` 의 hierarchy에서 분리시킬 수 있다.

장점은 메인 스레드의 시간 소모를 줄일 수 있고, 스크롤링 등 앱의 상호작용이 발생할 때 프레임 드랍을 감소시킨다. 사용자가 보는 화면 바깥의 `FlatList` item들은 렌더링에서 제외되기 때문이다.

주의해야할 부분도 있다. 이 Props를 참으로 두게 되는 것으로 여러 버그가 생길 수 있다. 예를 들면 보여져야할 item이 보여지지 않는 것이다. 이는 컴포넌트가 복잡하게 구성되어 있거나, 정해진 위치에 반드시 렌더링되어야 하는 컴포넌트의 경우 발생할 수 있다.

#### initialNumToRender

Props 이며, 기본값은 10 (숫자)이다. 이는 `FlatList`가 최초에 렌더링할 item의 갯수를 **미리** 정하는 것이다.

렌더링되는 item의 **정확한 숫자**를 정하는 것으로 초기 렌더링 시에 **빠른** 속도로 렌더링될 수 있다.

그러나, 너무 적은 숫자를 해당 Props에 할당하게 되면 최초 렌더링 시 사용자의 화면 공간이 좁을 경우 **빈 공간**을 만들어질 수 있다.

여기서 **빈 공간**이란, `FlatList` 의 배경이 되는(감싸는?) 컴포넌트인 `VirtualizedList` 로 인해 보여질 수 있다. item들이 충분히 렌더링되지 않아 빈 공간으로 보여지는 것이며, 이 빈 공간에 사용자가 액세스할 수 있다.

#### keyExtractor

`FlatList` 에 `keyExtractor` Props를 할당하면 이 `FlatList`를 캐싱하게되고, 리액트 키로서 item을 재배치하는 것을 트래킹할 수 있다.

#### 익명 renderItem 사용 금지

`renderItem` 함수를 `FlatList` 내부의 renderItem에 그대로 익명 함수(화살표 함수) 를 사용하는 것이 아니라, 리스트 외부로 꺼내 고유한 변수에 `renderItem` 함수를 할당한다. 즉, `FlatList`를 렌더링 할 때마다 renderItem 을 재생성하여 실행하는 것이 아닌, 고유한 변수에 담긴 함수를 호출하는 것이다.

#### 그 외

렌더링할 item들의 크기는 최소화한다. 원본 그대로의 이미지를 사용하는 것을 피하고, 상호작용은 최소화한다.

### References

- <a href="https://reactnative.dev/docs/optimizing-flatlist-configuration" target="_blank" rel="noopener">React Native Documents - Optimizing Flatlist Configuration</a>
