---
layout: post
title: "DRY : Don't Repeat Yourself"
date: 2021-12-23 00:00:00 +0700
categories: [Common]
tags: [Common, IT]
modified: 2022-01-06 00:00:00 +07:00
description: Don't Repeat Yourself
---

# DRY 원칙 (중복 배제)

**중복 배제 (Don't repeat yourself, DRY)**<sup id="user">[[1]](#user-ref)</sup>는 소프트웨어 개발 원리의 하나로, 모든 형태의 정보 중복을 지양하는 원리이다.

직역하면 **스스로 반복하지 말라**는 의미인데, 친숙하게 풀어보면 아래와 같다.

> **복붙하지 마라!!**

소프트웨어를 신뢰성있게 개발하며, 유지보수를 편하게 만드는 방법은 이 DRY 원칙을 따르는 것에서 시작한다. 시스템 내에서 모든 로직은 **믿을만한 표현 방식**을 가져야 한다.

DRY 원칙에서 **중복의 유형**은 다음과 같다.

1. 동일한 코드가 여러 번 나오는 중복. 무분별하게 복붙을 하다보면 흔하게 발생하는 중복이다. 이 경우 중복되는 코드를 컴포넌트로 구성하여 중복을 줄일 수 있다.
2. `if` / `else if` 문으로 불필요한 조건문이 반복되는 경우이다. `switch` / `case` 로 중복을 줄일 수 있다.
3. 과도한 주석을 붙이는 경우. 일반적으로 주석은 본인의 코드를 보기 편하게 하기 위함도 있지만, 함께 일하는 사람들에게 이 코드가 어떤 코드인지 간단히 설명하기 위함이다. 주석은 이 주석이 어떤 기능을하는 코드인지, **코드의 목적**을 명시해야 한다. 그렇기 때문에, 과도한 주석을 붙이거나 너무 상세하게 주석을 붙이는 경우 DRY 원칙에 위배된다.

위 세 가지가 중복의 유형 중 가장 흔히 볼 수 있는 중복 유형이다. 주석의 경우 최대한 목적만을 간결하게 명시하는 것으로 중복을 피할 수 있다.

1, 2번 유형의 경우, 중복된 코드를 하위 루틴이나 다른 클래스 및 함수로 분리하는 것으로 중복을 정리할 수 있다. 이를 **추상화**라고 한다.

### Notes

<small id="user-ref"><sup>[[1]](#user)</sup>중복 배제 (Don't repeat yourself; DRY)는 소프트웨어 개발 원리의 하나로, 모든 형태의 정보 중복을 지양하는 원리이다. 특히 다층 구조 시스템에서 유용하다. 중복배제 원리는 한마디로 “모든 지식은 시스템 내에서 유일하고 중복이 없으며 권위있는 표상만을 가진다”는 말로 기술할 수 있다.</small>

### Reference

- <a href="https://ko.wikipedia.org/wiki/%EC%A4%91%EB%B3%B5%EB%B0%B0%EC%A0%9C" target="_blank" rel="noopener">중복 배제(DRY)</a>
