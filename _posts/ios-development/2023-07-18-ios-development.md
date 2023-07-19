---
layout: post
title: iOS 개발 알아보기
date: 2023-07-18 00:00:00 +07:00
categories: [Swift Essentials]
tags: [Swift]
description: Swift Introduction
modified: 2023-07-18 00:00:00 +07:00
---

### UIKit

`UIKit` 을 통해 iPhone 앱을 개발한다. 기본적으로 알아야 한다. 회사의 기본 프로젝트는 `UIKit` 으로 이루어져 있다.

언어는 `Swift` 와 `Objective-C` 로 이루어져 있다. `Objective-C` 가 근간이다. `Objective-C` 로도 개발할 줄 알아야 한다. 레가시 프로젝트라면 `Objective-C` 로 이루어져있을 가능성이 크기 때문이다.

UI 구현 방식으로는 **스토리보드**와 **코드 UI** 이다.

스토리보드는 GUI 를 통해 드래그앤 드랍 방식으로 만드는 방식이다.

코드 UI 는 코드로 구현하는 방식이다.

스토리보드만 하는 회사, 코드 UI 만 하는 회사, 둘 다 하는 회사가 있다.

**리액티브 구현 방식도** 있다.

리액티브 구현 방식은 `RxSwift` 와 `Combine` 이 있다.

`RxSwift` (ReactiveX Swift) 로 기본적으로(전통적으로) 구현해왔다. Apple 이 직접 지원하지 않지만, Apple 이 직접 지원하는 Combine 도 있다. 그러나 `Combine` 은 **iOS 13** 이상 부터 지원한다.

패턴이란 코드를 짜는 구조, 방식을 의미한다.

#### MVC (Model-ViewController)

`UIKit` 은 기본적으로 MVC 패턴을 따른다. 대부분의 로직을 `ViewController` 에서 처리한다. 화면에 리스트가 있다고 예시를 들 수 있다.

리스트를 보여주고, 리스트에 어떤 것을 추가하거나 삭제하는 로직은 `ViewController` 가 담당한다.

#### MVVM (Model-View-ViewModel)

리액티브 구현 방식에서 주로 사용한다.

MVC 에서는 `ViewController` 에서 대부분의 로직을 갖고 있었기 때문에 `ViewController` 의 책임이 막중했다. 이를 덜기 위해 ViewModel 과 분리하게 된 것이다.

`ViewModel` 에서 리스트 추가, 삭제 등 로직을 처리하고 `ViewController` 에서 이 데이터를 가져와 보여주는 방식으로 예를 들 수 있다.

즉 View 와 관련된 데이터 상태를 갖고 있다. `ViewModel` 이 업데이트 되면 `ViewController` 에서 이를 렌더링한다.

#### Coordinator - 화면 이동

#### MVVM-C

MVVM 과 Coordinator 를 섞은 개념이다. 화면 이동 처리, 화면 스택 관리를 수행한다.

### SwiftUi

iOS 13 버전 이상부터 지원하는 프레임워크다. 신규 프로젝트 또는 기존 프로젝트에서 부분적으로 도입하는 추세이다.
