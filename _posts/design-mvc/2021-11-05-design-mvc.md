---
layout: post
title: 'MVC 패턴이란?'
date: 2021-11-05 09:29:20 +0700
modified: 2025-03-10 08:49:47 +07:00
categories: [Design Pattern]
tags: [Design Pattern]
description: MVC (모델-뷰-컨트롤러) 는 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 소프트웨어 디자인 패턴입니다. 소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있습니다. 이러한 "관심사 분리" 는 더나은 업무의 분리와 향상된 관리를 제공합니다. MVC 에 기반을 둔 몇 가지 다른 디자인 패턴으로 MVVM (모델-뷰-뷰모델), MVP (모델-뷰-프리젠터), MVW (모델-뷰-왓에버) 가 있습니다.
---

# MVC (Model-View-Controller)

**MVC**<sup id="user">[[1]](#user-ref)</sup>는 소프트웨어 설계와 관련하여 흔히 사용되는 설계 패턴이다.

리액트의 단방향 데이터 흐름, 리덕스의 Flux + Reducer 패턴 역시 설계 패턴의 일종이다.

<figure>
<img src="https://images.velog.io/images/shitaikoto/post/ffbe7968-bf95-40a9-8d75-a16503533cf5/img2.png">
<figcaption>Fig 1. MVC 패턴</figcaption>
</figure>

어떤 서비스를 제공하기 위해 여러 과정들과 처리들이 필요한데, 그런 처리들을 각 기능별로 나눈다는 특징이 있다.

**Model**은 Model의 역할로, **Controller**는 Controller의 역할로 나눔으로써, 프로그래밍을 할 때 하나의 코드 베이스에서 모든 것을 하는게 아니라 정돈된 코딩을 특정 역할에서 수행할 수 있다는 특징이 있다.

소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있고, 이를 **'관심사 분리'** 라고 부른다.

이 관심사 분리를 통해 코드 가독성, 관리성, 코드의 질 등이 개선된다.

MVC 패턴의 세 부분을 간략하게 말하자면 아래와 같다.

1. Model : 데이터와 비즈니스 로직을 관리
2. View : 레이아웃과 화면을 처리
3. Controller : 명령을 모델과 뷰 부분으로 라우팅

실제로 여러 유명한 웹 프레임워크는 MVC패턴을 사용하고 있다.

- React : MVC + Flux (Redux)
- AngularJS
- Django 등

<figure>
<img src="./../../images/design-mvc1.png" alt="design-mvc">
<figcaption>Fig 2. MVC 패턴</figcaption>
</figure>

## Model

Model은 Data의 정보를 갖고있다.

Model 자체가 Data를 갖고있을 수 있고, Database와 연결되어 Data를 가져올 수 있다. 이러한 Data의 흐름은 Controller의 요청으로부터 Controller에 Data를 응답할 때 Model은 Database로부터, 또는 Model 자체의 Data로 응답한다.

Database를 Model에 포함한다면, Model은 애플리케이션의 정보, 데이터를 나타내는 것이며, 애플리케이션의 초기값, 상수, 변수 등을 뜻한다. 또한 이러한 Data들의 가공을 책임지는 컴포넌트가 Model이다.

MVC 패턴에서 Model은 몇가지 규칙이 있다.

- 사용자가 수정하는 모든 데이터를 갖고 있어야 한다.

사용자에게 보여지는 화면(View)에 글자가 있다면 그 글자의 크기, 위치, 글자 내용 등을 알고있어야 한다는 것이다.

- View 또는 Controller에 대해 어떤 정보도 알아선 안된다.

어떤 이벤트로 인해 데이터 변경이 일어났을 때, Model에서 View를 조정해서 수정이 가능하도록 View를 참조하는 내부 속성값을 가지면 안된다는 것이다.

사용자가 입력한 정보는 `ABCD`인데 Model에서 이를 수정하여 `WXYZ`로 변경하면 안된다는 것이다.

## View

View는 사용자에게 화면을 보여주도록 하는 역할이다.
브라우저의 경우 HTML Element가 있다.

View는 Controller와 상호작용을 한다.

Controller에게 사용자의 행동에 따른 이벤트를 전달하면 View는 그 이후의 과정을 알지 못한다.

Controller는 Model과 상호작용으로부터 응답받은 Data를 View에게 응답한다.

View는 그 Data를 시각화할 뿐이다.

MVC 패턴에서 View의 규칙은 아래와 같다.

- Model이 가지고 있는 정보를 따로 저장해선 안된다.

View는 Model과 Controller의 상호작용으로부터 응답받은 Data를 사용자에게 **보여주기만** 해야 한다.
화면에 보여주기만 하고, 그 표시되는 정보들은 따로 저장되어선 안된다.

- Model이나 Controller와 같이 다른 구성요소의 정보를 알아선 안된다.

Model과 같이 자기 자신을 제외한 다른 요소는 참조하거나 어떻게 동작하는지 알아선 안된다. 오로지 사용자의 화면에 표시해줄 뿐이다.

## Controller

Controller는 View에서 일어나는 이벤트를 처리하고, 그 값들을 Model에게 전해주기 전에 가공한다.

데이터와 사용자 인터페이스 요소를 잇는 다리 역할이다.

가공된 데이터를 Model에 넘겨주게되면 Database에서 정보를 가져오거나, Model 스스로 데이터를 처리한 경우, Controller에게 그 데이터를 반환한다.

Controller는 Model로부터 응답받은 데이터를 View로 전해주기 전에, View가 인식할 수 있도록 데이터를 가공한다. 그 가공된 데이터를 View에게 응답한다.

View는 그 데이터를 시각화한다.

즉, 사용자가 클릭, 타이핑 등 이벤트를 처리하는 부분이며 Controller 역시 몇가지 규칙이 있다.

- Model과 View에 대해 알아야 한다.

Model과 View는 서로 상호작용이 없고,(서로의 존재를 모른다.) 변경을 외부로 알리거나 수신만 한다. 이 정보들을 Controller가 핸들링하기 위해 Model과 Model과 관련된 View를 알아야 한다.

- Model과 View의 변경을 모니터링해야 한다.

View에서 변경이 발생하면 이를 탐지하고 Model에게 알리거나, Model에서 변경이 발생하면 이를 View에게 알려야 한다. 즉, 애플리케이션의 메인 로직을 Controller가 담당한다.

<figure>
<img src="https://images.velog.io/images/shitaikoto/post/e7193ee0-f6e5-49d0-a5e5-6fd5aed03b7e/img3.png" alt="design-mvc">
<figcaption>Fig 3. MVC Flow</figcaption>
</figure>

사용자로부터 Browser에서 어떤 이벤트가 발생되면 Router로 분기를 한다. Router는 각 엔드포인트에 정해진 Controller를 호출한다.

Controller는 View로 바로 데이터를 응답할 수도 있고, Model을 거쳐 Data를 받아 View에게 데이터를 반환한다.

# 왜 MVC 패턴을 사용해야 할까?

사용자가 보는 페이지(**View**), 사용자에게 보여줄 Data 처리(**Model**), 그리고 이 두 가지를 중간에서 제어하는 **Controller** 로 구성되는 애플리케이션을 만들면, 각 구성 요소마다 맡은 태스크에만 집중할 수 있게 된다. 타이어를 만드는 공장에서는 타이어를, 엔진을 만드는 공장에서는 엔진만 담당하여 효율적인 작업을 할 수 있는 것처럼.

각자 분리되어 각자의 역할에 집중하는 환경을 만들어 개발을 하여 애플리케이션을 만들면 유지보수 및 확장성, 그리고 유연성이 증가한다. 이것이 보다 깔끔한 코딩으로 애플리케이션을 만들기 위한 소프트웨어 설계 방법론, **MVC 패턴**이다.

### Notes

<small id="user-ref"><sup>[[1]](#user)</sup><a href="https://developer.mozilla.org/ko/docs/Glossary/MVC" target="_blank" rel="noopener">MVC</a>MVC (모델-뷰-컨트롤러) 는 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 소프트웨어 디자인 패턴입니다. 소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있습니다. 이러한 "관심사 분리" 는 더나은 업무의 분리와 향상된 관리를 제공합니다. MVC 에 기반을 둔 몇 가지 다른 디자인 패턴으로 MVVM (모델-뷰-뷰모델), MVP (모델-뷰-프리젠터), MVW (모델-뷰-왓에버) 가 있습니다.</small>

### Reference

- <a href="https://developer.mozilla.org/ko/docs/Glossary/MVC" target="_blank" rel="noopener">MVC - MDN</a>
