---
layout: post
title: React Native Android Back 버튼 제어
date: 2023-01-23 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: How to handle Back handler for React native android app
---

# 개요

React Native 로 iOS 와 Android 앱을 병행하여 개발하는 경우 두 운영체제간 차이점 때문에 마주치게 되는 문제가 있다.

바로 Android 에선 디바이스에 백 버튼이 있다는 것이다.

<figure>
<img src="./../../images/backhandler1.png" alt="backhandler1">
<figcaption>Fig 1. 안드로이드 하단 기본 버튼</figcaption>
</figure>

나는 안드로이드 디바이스를 써본 적이 없었고, 앱 개발을 하기 시작하면서 앱 개발을 위해 안드로이드 기기를 처음 만져보았다.

팀 내 안드로이드 기기를 사용하는 선배로부터 안드로이드 유저에게 하단 백 버튼은 휴대폰 사용 중 가장 많이 누르는 버튼이라는 것을 알게 되었다.

iOS 유저에게는 좌우 스와이프나 좌상단에 위치한 백 버튼이 익숙한데, 안드로이드 유저에게는 백 버튼이 더 편하다는 것이다.

그래서 원활한 사용자 경험을 위해 이를 고려하여 앱을 개발해야 한다.

이를 고려하지 않고 iOS 환경만 고려하여 개발한다면 다음과 같은 문제가 발생한다.

앱의 네비게이션 스택이 없을 때 백 버튼을 누르게 된다면 앱이 종료되거나 개발한 네비게이션 로직과 충돌하여 에러가 발생해 엡이 강제 종료 될 수 있다.

이를 <a href="https://reactnative.dev/docs/backhandler" target="_blank" rel="noopener">React Native BackHandler</a> 를 통해 수정할 수 있다.

### References

- <a href="https://reactnative.dev/docs/backhandler" target="_blank" rel="noopener">React Native BackHandler</a>
