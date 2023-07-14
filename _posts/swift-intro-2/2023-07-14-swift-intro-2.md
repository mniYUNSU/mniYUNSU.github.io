---
layout: post
title: Swift 입문 2일차
date: 2023-07-14 00:00:00 +07:00
categories: [Swift Essentials]
tags: [Swift]
description: Swift Introduction
modified: 2023-07-14 00:00:00 +07:00
---

# 개요

오늘도 `Swift` 문법을 공부해보자!

# Class & Struct

`Class` 와 `Struct`는 **데이터를 담는 변수들을 덩어리로 묶는** 방법이다.

```swift
// 유튜버 모델 - struct(구조체)
struct YoutuberStruct {
    var name : String
    var subscriberCount : Int
}

var yunsu = YoutuberStruct(name: "yunsu", subscriberCount: 1000)
var yunsuClone = yunsu

print("값 넣기 전 yunsuClone.name : \(yunsuClone.name)") // 값 넣기 전 yunsuClone.name : yunsu
print("값 넣기 전 yunsu.name : \(yunsu.name)") // 값 넣기 전 yunsu.name : yunsu

yunsuClone.name = "윤수"

// 복사한 구조체와 기존 구조체와 값이 다르다.
print("값 넣은 후 yunsuClone.name : \(yunsuClone.name)") // 값 넣은 후 yunsuClone.name : 윤수
print("값 넣은 후 yunsu.name : \(yunsu.name)") // 값 넣은 후 yunsu.name : yunsu

```

`Struct` 는 데이터 모델을 만들고 그 모델을 다른 변수에 할당하게 되면 새로운 복사본을 만들게 된다. 즉 복사본 데이터에 변화가 발생하더라도 기존 데이터에는 영향을 주지 않는다.

```swift
// 클래스는 변수들의 모음이다. but 생성자를 넣어야 함.
// 즉 생성자를 통해 메모리에 올려야 함
class YoutuberClass {
    var name : String
    var subscriberCount : Int
    // 생성자 - 메모리에 올린다.
    // 외부에서 넣은 데이터로 생성자를 통해 변수를 초기화해야 함.
    // init 으로 매개변수를 가진 생성자 메소드를 만들어야 함
    // 매개변수를 넣어서 그 값을 가진 객체를 만들 수 있다.
    init(name: String, subscriberCount: Int){
        self.name = name
        self.subscriberCount = subscriberCount
    }
}

var yunsuClass = YoutuberClass(name: "yunsuClass", subscriberCount: 10000)
var yunsuClassClone = yunsuClass

print("값 넣기 전 yunsuClassClone.name : \(yunsuClassClone.name)") // 값 넣기 전 yunsuClassClone.name : yunsuClass
print("값 넣기 전 yunsuClass.name : \(yunsuClass.name)") // 값 넣기 전 yunsuClass.name : yunsuClass

yunsuClassClone.name = "윤수클래스"

// 같은 값이 나온다.
// struct 는 새롭게 복사하는 것. 복사한 객체에 영향이 없다.
// class 는 복사하더라도 같은 메모리 공간 위치를 참조한다. 연결되어 있다.
print("값 넣은 후 yunsuClassClone.name : \(yunsuClassClone.name)") // 값 넣은 후 yunsuClassClone.name : 윤수클래스
print("값 넣은 후 yunsuClass.name : \(yunsuClass.name)") // 값 넣은 후 yunsuClass.name : 윤수클래스

```

`Class` 는 `Struct` 와 다르게 생성자를 포함해야 한다. 생성자를 통해 모델을 메모리에 올려야 한다.

외부에서 넣은 데이터로 생성자를 통해 변수를 초기화해야 하기 때문에, `init` 으로 매개변수를 가진 생성자 메소드를 만들어야 한다.

`Class` 로 만든 데이터 모델을 복사하고 값에 변화를 주게 되면 기존 `Class` 에도 영향을 주게 된다.

그 이유는 `Class` 로 만들어진 객체는 새로운 변수에 할당하더라도 같은 메모리 공간 위치를 바라보고 있기 때문이다. 즉 연결되어 있기 때문에 값의 변경이 일어나면 다른 변수에도 영향을 미치게 된다.

# Property Observer

변수를 생성하고 할당할 때 할당되기 전, 할당된 후 등 변수 상태를 지켜보다가 발동시킬 수 있다. 이를 `Property Observer` 라 한다.

```swift
var myAge = 0 {
    willSet{
        print("값이 설정될 예정임. / myAge : \(myAge)")
        // 값이 설정될 예정임. / myAge : 0
    }
    didSet{
        print("값이 설정됨. / myAge : \(myAge)")
        // 값이 설정됨. / myAge : 28
    }
}

myAge = 28
```

`myAge` 라는 변수를 최초로 `0`으로 초기화 하고 변수의 값이 할당되기 전과 할당된 후 원하는 로직을 실행할 수 있다.

`myAge` 를 `20`으로 재할당하게 되면 `didSet` 로직을 실행하게 된다.

# 함수 정의 시 매개변수의 이름

함수를 정의할 때 매개변수의 이름을 지정해야 한다. 이 이름을 함수를 호출할 땐 다르게 변경할 수 있고, 또 매개변수의 이름을 아예 넣지 않도록 함수를 만들 수 있다.

```swift
// 함수(메소드) 정의
func myFunction(name: String) -> String {
    return "안녕!! \(name) 입니다!"
}

// 함수(메소드) 호출
myFunction(name: "YUNSU") // 안녕!! YUNSU 입니다!


// name 을 받는건 동일. with 로 변경된 매개변수 이름으로 받는다.
// 같은 메소드지만 이름을 바꿀 수 있다.
func myFunctionSecond(with name: String) -> String {
    return "안녕!! \(name) 입니다!"
}

myFunctionSecond(with: "윤수윤수") // 안녕!! 윤수윤수 입니다!

// 언더바 활용 - 매개변수 이름 없이 값만 넣으면 된다.
func myFunctionThird(_ name: String) -> String {
    return "안녕!! \(name) 입니다!"
}

myFunctionThird("배윤수~") // 안녕!! 배윤수~ 입니다!
```

<br>

# Generic

`Typescript` 를 공부할 때 꽤 애를 먹었던 제네릭이다.

제네릭이란 어떤 자료형이든 내가 원하는 대로 설정하여 자료형을 만들 수 있다는 것이다.

`Typescript` 와 동일하게 꺽쇠를 사용하며, 자주 사용되는 이름은 `T` 이다.

```swift
struct MyArray<T>{
    // 제네릭을 담은 빈 배열 생성
    var elements : [T] = [T]()
    // 안만들어 줘도 됨. struct이므로
    init(_ elements: [T]){
        self.elements = elements
    }
}

struct Friend {
    var name: String
}

struct Coder {
    var name: String
}

var mySomeArray = MyArray([1,2,3]) // MyArray<Int>
print("mySomeArray : \(mySomeArray)") // mySomeArray : MyArray<Int>(elements: [1, 2, 3])
var myStringArray = MyArray(["가", "나", "다"]) // MyArray<String>
print("myStringArray : \(myStringArray)") // myStringArray : MyArray<String>(elements: ["가", "나", "다"])

let friend_01 = Friend(name: "민수")
let friend_02 = Friend(name: "철수")
let friend_03 = Friend(name: "짱구")

var myFriendsArray = MyArray([friend_01,friend_02,friend_03]) // MyArray<Friend>
print("myFriendsArray : \(myFriendsArray)") // myFriendsArray : MyArray<Friend>(elements: [__lldb_expr_79.Friend(name: "민수"), __lldb_expr_79.Friend(name: "철수"), __lldb_expr_79.Friend(name: "짱구")])

```

<br>

# Closure

`Swift` 의 클로저는 하나의 메소드로서 동작할 수 있다.

```swift
// String을 반환하는 클로저
let myName : String = {
    return "윤수"
}()

print(myName) // 윤수

// string 을 name 매개변수로 받아 string을 리턴하는 클로저
let myRealName : (String) -> String = { (name:String) -> String in
    return "개발하는 \(name)"
}

myRealName("배윤수") // 개발하는 배윤수

// 매개변수를 받아 리턴값이 없는 클로저
let myRealNameLogic : (String) -> Void = { (name: String) in
    print("개발자 \(name)")
}

myRealNameLogic("윤수!") // 개발자 윤수!
```

단순히 자료형을 리턴하는 클로저, 특정한 매개변수를 받아 값을 리턴하는 클로저, 매개변수를 받아 리턴값이 없는 `Void` 클로저 등이 있다.

### 매개변수로서의 Closure

클로저를 통해 연산자 활용, 이벤트 처리 등 다양한 용도로 사용할 수 있다.

```swift
// () -> Void 형태
// func completion(){}

// 클로저(completion)를 매개변수로 가지는 메소드의 정의
func sayHi(completion: () -> Void){
    print("sayHi called")
    sleep(2) // 2초 멈추기
    // 클로저(completion) 실행
    completion()
}

// 메소드 호출 부분 에서 이벤트 종료를 알 수 있다.
sayHi(completion: {
    print("2초가 지났다! 1")
})

sayHi(){
    print("2초가 지났다! 2")
}

sayHi{
    print("2초가 지났다! 3")
}
```

클로저의 실행은 위와 같이 3가지로 표현할 수 있다.

```swift
// (String) -> Void 형태
// func completion(name: String){}

// 매개변수로서 데이터를 반환하는 클로저
func sayHiWithFullName(completion: (String, String) -> Void){
    print("sayHiWithFullName called")
    sleep(2)
    // 클로저 실행과 동시에 데이터를 리턴한다.
    completion("오늘도 열심히 하고 있나요?", "으하하항")
}

sayHiWithFullName(completion: {
    (comment: String, say: String) in
    print("2초 뒤에 말했다. comment : \(comment) second \(say)")
})

sayHiWithFullName(completion: {
    comment, second in
    print("2초 뒤에 말했다. comment : \(comment) second \(second)")
})

sayHiWithFullName{ comment, second in
    print("2초 뒤에 말했다. comment : \(comment) second \(second)")
}

// 매개변수 언더바는 생략이라는 의미임
sayHiWithFullName{ _, second in
    print("2초 뒤에 말했다. second \(second)")
}

sayHiWithFullName{
    print("2초 뒤에 말했다. comment : \($0) second \($1)")
}
```

클로저의 매개변수가 있을 경우엔 위와 같이 표현할 수 있다. 매개변수의 갯수에 따라 `$ + 위치` 로 축약하여 표현할 수 있다.

```swift
// (String, String) -> Void 형태
// func completion(first: String, second: String){}

// 옵셔널 클로저 할당 가능
func sayHiOptional(completion: (() -> Void)? = nil){
    print("sayHiOptional called")
    sleep(2)
    // 클로저 실행과 동시에 데이터를 리턴한다.
    completion?()
}

sayHiOptional()
sayHiOptional(completion: {
    print("옵셔널 큭큭큭 2초 지났다")
})
```

클로저 자체가 옵셔널 한 경우에도 옵셔널 클로저로서 구현할 수 있다.

```swift
// (Int) -> String 형태
// func transform(number: Int) -> String {
//    return "숫자 : \(number)"
// }

var myNumbers : [Int] = [0,1,2,3,4,5]

var transformedNumbers = myNumbers.map { aNumber in
    return "숫자 : \(aNumber)"
}

var transformedNumbers2 = myNumbers.map {
    return "숫자 : \($0)"
}

print(transformedNumbers)
```

`Javascript` 의 `map` 메소드 처럼 배열의 각각 엘리먼트를 리턴하는 경우에도 위와 같이 표현할 수 있다.
