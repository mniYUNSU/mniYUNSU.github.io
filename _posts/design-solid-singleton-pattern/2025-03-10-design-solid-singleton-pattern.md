---
layout: post
title: SOLID 원칙과 싱글턴 패턴
date: 2025-03-10 09:29:20 +0700
modified: 2025-03-10 08:49:47 +07:00
categories: [DESIGN PATTERN]
tags: [DESIGN PATTERN]
description: SOLID 원칙과 싱글턴 패턴을 공부했다.
---

# SOLID 원칙

### Single Responsibility Principle(SRP)

**단일 책임 원칙**

한 객체는 하나의 책임만 가져야 한다. 그러나, 하나의 책임 이라는 단어 자체가 조금 혼동의 여지가 있다.

```js
function a() {}
function b() {}
function c() {}

function main() {
  a();
  b();
  c();
}
```

여기서 `main` 함수는 단일 책임 원칙을 위반한 것일까? 세 함수를 실행하므로 세가지 책임을 동시에 하고 있다고 해석할 수도 있다.

그래서 **변경의 이유가 하나**여야 한다. 라고 생각하면 이해에 도움이 된다.

위의 예제에서 `main` 함수는 일련의 **프로세스를 관장하는 함수**인 것이다. `a` 다음에 `b` 다음에 `c` 가 호출이 되어야 한다는 것을 담당하는 것이다. 프로세스가 추가되거나 순서를 변경할 때 `main` 함수는 수정될 것이다. 즉, `main` 함수의 **변경의 이유**는 함수들의 호출 순서를 관장한다는 것이다.

`main` 함수는 실행할 함수들의 순서를 관장하고 이 순서가 바뀌었을 때 이를 수정하기 때문에, `main` 함수의 책임은 **실행할 함수들의 순서**인 것이다. 즉, **변경해야할 이유는 그 함수의 책임**인 것이다.

여기서 변경해야할 이유가 2가지 이상이 된다면 단일 책임 원칙에 위배된다.

그러나 실제로 개발을 하다보면 꽤 자주 많이 위반하게 된다. 객체가 복잡해질 수록 더 변경의 이유가 늘어나기 마련이고, 단일 책임 원칙으로부터 멀어지게 된다. 그래서 단일 책임 원칙이라는 것을 염두에 두고 코딩하는 것은 꽤 복잡하고 머리아픈 일이 된다. 개발의 속도도 늦춰지게 된다. 그래서 굳이 얽메일 필요는 없다고 생각한다.

### Open Closed Principle(OCP)

**개방 폐쇄 원칙**

확장에 대해서는 열려 있고 변경에 대해서는 닫혀 있어야 한다는 원칙이다.

```js
function main(type) {
  if (type === 'a') {
    doA();
  } else if (type === 'b') {
    doB();
  } else if (type === 'c') {
    doC();
  } else if (type === 'd') {
    doD();
  } else if (type === 'e') {
    doE();
  }
}
```

위 예시가 개방 폐쇄 원칙 위반의 예이다. 만약 `f` 타입 조건문을 추가해야한다면 `else if` 를 추가하자고 생각하게 된다. (내가 그렇다.)

확장에는 열려있되, 변경에는 닫혀있어야 한다. `f` 타입과 `g` 타입 조건문을 추가해야한다면, 변경이 두 번 발생한다. 개방 폐쇄 원칙을 위반한 것이다. 즉, 무언가를 추가하려고 기존 코드를 변경하면 개방 폐쇄 원칙 위반이다.

그렇다면 위 상황에선 어떻게 해야할까?

```ts
interface Doable {
  do(): void;
}

function main(type: Doable) {
  type.do();
}

const a = { do() {} };
const b = { do() {} };
const c = { do() {} };
const d = { do() {} };
const e = { do() {} };
const f = { do() {} };

main(a);
main(b);
```

위 처럼 하게 되면 기존 코드의 조건문을 추가하거나 할 필요 없이 즉 기존 코드의 변경 없이 동일하게 구현할 수 있다. `f` 타입을 추가한 것 처럼, 확장에는 열려있다. 그러나, 기존 코드의 변경에는 닫혀있다. 이것이 개방 폐쇄 원칙이다.

### Liskov Substitution Principle(LSP)

**리스코프 치환 원칙**

다소 용어가 어렵지만, 간단하다.

프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다는 것이다.

정확성이란 쉽게말해 `type` 이다.

```js
class Animal {
  isAnimal() {
    return true;
  }
}

class Bird extends Animal {
  fly() {
    return 'BIRDDD'
  }
  isBird() {
    return true;
  }
}

class Penguin extends Bird {
  override fly() {
    throw new Error("Penguin doesn't fly")
  }
}

console.log(new Animal().isAnimal()) // true
console.log(new Bird().fly()) // BIRDDD
console.log(new Penguin().isAnimal()) // true
console.log(new Penguin().fly()) // throw error
console.log(new Penguin().fly().at(1)) // type error
```

펭귄은 날지 못한다는 에러를 띄우기 위해 `Bird` 를 상속받고 `fly` 를 `override` 하여 에러를 리턴하면 타입에러가 발생한다.

`Bird` 클래스의 `fly` 는 `string` 을 리턴한다. 그러나 `override` 한 `fly` 는 에러를 리턴한다. 타입스크립트에서 `throw` 는 `never` 타입을 의미한다. 즉, 리턴하는 타입이 다른 것이다.

부모의 타입을 자식이 다르게 정의해버리는 경우 리스코프 치환 원칙에 위배되는 것이다.

부모 객체를 자식 객체로 치환을 했을 때, 타입 에러가 발생해선 안된다.

### Interface Segregation Principle(ISP)

**인터페이스 분리 원칙**

특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다는 원칙이다.

```ts
interface IBird {
  fly(): string;
  quack(): string;
}

class Bird extends Animal implements IBird {
  fly() {
    return 'BIRDDD';
  }
  quack() {
    return 'QUACKKK';
  }
  isBird() {
    return true;
  }
}
```

`interface` 활용의 예시이다. 무언가를 만들 땐 `interface` 를 먼저 만들고 나서 `implements` 하는 식으로 가야 한다. 자바스크립트를 하던 나는 `interface` 를 먼저 만드는 것이 습관이 되어있지 않았다. `interface` 나 `abstract class` 를 먼저 만들어야 하는데, 구현부터 먼저 해버리는 것이다.

`Bird` 클래스에는 `fly` 메소드는 있어선 안된다. 왜냐하면 모든 새가 날지 않기 때문이다. 그렇기 때문에 리스코프 치환 원칙에 위배된 것이다. 그리고 위 예시의 `IBird` 에는 `fly` 와 `quack` 이 `interface` 로 묶여있을 이유가 없다. 실제로 필요한 것 보다 더 많은 속성들이 `interface` 안에 들어가버린 것이다.

즉, 필요한 만큼만 넣자는 것이 인터페이스 분리 원칙이다.

```ts
interface Quackable {
  quack(): string;
}
interface Flyable {
  fly(): string;
}

class Bird extends Animal implements Quackable {
  quack() {
    return 'QUACKKK';
  }
  isBird() {
    return true;
  }
}
```

타입스크립트의 경우, `interface` 를 사용하는 것으로 여러개를 동시에 `implements` 할 수 있다. **자바스크립트는 본래 단일 상속 언어**라서 하나만 상속할 수 있다. `class` 두 개를 동시에 상속할 수 없다. **단일 상속 언어**이기 때문이다. 그러한 단점을 타입스크립트의 `interface` 로 극복할 수 있다.

```ts
class Eagle extends Animal implements Flyable, Quackable {
  fly() {
    return 'BIRDDD';
  }
  quack() {
    return 'QUACKKK';
  }
  isBird() {
    return true;
  }
}
```

이 장점을 최대한 활용하기 위해서는 `interface` 를 최대한 잘게 쪼개놓는 것이 중요하다. 그래야 쓸모없는 메소드를 구현하는 케이스를 줄일 수 있다.

범용 `interface` 를 사용하게 되면 인터페이스 분리 원칙에 위배될 뿐 아니라, 리스코프 치환 원칙에도 위배될 수 있다. 즉, `interface` 는 최소한으로 잘게 만들고 다중 `interface implements` 가 가능하므로 염두에 두고 구현을 해야할 필요가 있다.

### Dependency Inversion Principle(DIP)

**의존성 역전 원칙**

프로그래머는 **추상화에 의존해야 하며, 구체화에 의존하면 안된다**는 원칙이다.

쉽게 말해, `interface` 와 `abstract class` 에 의존하라는 뜻이다. 강결합을 피해야 한다.

```ts
import MyPaint from './mypaint.js';

function main(paint: MyPaint) {
  paint.initialize();
}

main(MyPaint.getInstance());
main(ChromePaint.getInstance());
main(IEPaint.getInstance());
```

위 예시에 구현부와 호출부 간의 관계가 있다. 강결합을 피하고 조금 더 유연성을 준 것이다. 호출부에서 필요하는 것을 자유롭게 바꿔서 쓸 수 있게 하는 것이 의존성 역전 원칙이다.

위처럼 매개변수나 생성자를 통해 주입받는 것은 의존성 역전 원칙의 구현 방법 중 하나이다. 그 방법의 이름은 **의존성 주입(Dependency Injection)**이다.

의존성 역전 원칙과 의존성 주입의 관계가 조금 혼동되곤 하는데 명확히 말하면 둘은 같은 것이 아니라, 종속관계이다. **의존성 역전 원칙**을 구현하기 위한 방법 중 하나가 **의존성 주입**인 것이다.

`interface` 와 `abstract class` 를 매개변수로 받아 사용한다면 어느정도는 **의존성 역전 원칙(DIP)** 가 지켜진다고 볼 수 있다.

함수나 클래스 안에서 외부의 함수나 클래스를 가져올 때에는 매개변수나 생성자로 받으면 된다.

# 싱글턴 패턴(Singleton Pattern)

앱에서 **단 하나만 존재**해야할 때 사용한다.

반드시 하나만 생성되어야 하는 **고유한** 객체를 만들어 외부(클라이언트<sup id="client">[[1]](#client-ref)</sup>)에서 접근할 수 있어야 한다.

접근을 하면 항상 동일한 객체, 고유한 단 하나의 객체에 접근을 할 수 있어야 한다.

싱글턴 패턴의 장점은 고유한 객체가 하나만 생성되는 것을 **보장**할 수 있다는 것이다.

싱글턴 패턴의 단점은 `private instance` 이기 때문에 유닛 테스트에 어려움이 있다. 싱글턴 패턴에는 `private instance로` 인해 테스트에 한계가 존재하여 간접적으로 테스트할 수 밖에 없다.

또 하나의 단점은 **SOLID 원칙**의 **SRP(단일 책임 원칙)**을 위배된다는 것이다. 변경하는 이유가 한 가지 여야만 한다는 것이다.

```ts
 static getInstance() {
    if (!this.instance) {
      this.instance = new MyPaint(document.querySelector('#canvas'));
    }
    return this.instance;
  }
```

위 싱글턴 패턴의 일부에서 보면, `getInstance` 의 역할은 새로운 객체를 생성하거나, 기존 객체를 리턴하는 것이다.

만약 `instance` 의 생성 방식을 다르게 만들고 싶다는 변경의 이유가 있다고 해보자. 그러나 `getInstance` 는 `instance` 가 유일하다는 것을 보장하는 기능도 하고 있다. 그래서 변경을 한다면 기존의 로직도 손을 대야하는 상황이 생겨버린다.

그렇지만 **단일 책임 원칙**을 위반하지 않도록 객체를 역할 별로 분리시킨다면 코드가 더 복잡해져버린다. 그래서 꼭 지켜야만 하는 원칙은 아니라고 생각한다.

마지막으로는 **싱글턴 패턴은 강결합된다** 라는 것이다. 강결합된다는 것의 의미는 테스트하기가 어렵다는 뜻이다.

### Notes

<small id="client-ref"><sup>[[1]](#client)</sup>클라이언트는 객체를 외부에서 가져다가 쓰는 사람을 의미한다.</small>
