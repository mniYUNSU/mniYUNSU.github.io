---
layout: post
title: React Native 앱 가로/세로 모드 제어
date: 2022-12-05 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: How to Handle Screen Orientation for React Native App
modified: 2022-12-05 00:00:00 +07:00
---

# 개요

앱의 목적에 따라 가로 및 세로 모드의 가능 여부를 설정해야 한다.

기본값은 세로 모드이며, 디바이스를 기울였을 때 가로 모드로 전환된다.

현재 개발하는 앱은 가로 모드가 불필요하기 때문에 세로 모드만 적용될 필요가 있었다.

이를 안드로이드 / iOS 별로 설정할 수 있다.

**가로 모드의 설정 값은 `landscape` 이며, 세로 모드의 설정 값은 `portrait` 이다.**

# Android

### /android/app/src/main/AndroidManifest.xml

<br>

```xml
<activity
  android:name=".MainActivity"
  android:label="@string/app_name"
  // 가로 모드
  android:screenOrientation="landscape"
  // 세로 모드
  android:screenOrientation="portrait"
>
```

# iOS

### /ios/{projectName}/Info.plist

<br>

```plist
<dict>
// ...
<key>UISupportedInterfaceOrientations</key>
	<array>
   // 세로모드
		<string>UIInterfaceOrientationPortrait</string>
    // 디바이스를 오른쪽으로 회전하면 가로모드
    <string>UIInterfaceOrientationLandscapeRight</string>
    // 디바이스를 왼쪽으로 회전하면 가로모드
    <string>UIInterfaceOrientationLandscapeLeft</string>
	</array>
  // ...
</dict>
```

`Info.plist` 에서 원하는 값만 할당하면 된다.
