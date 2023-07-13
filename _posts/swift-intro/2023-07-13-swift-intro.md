---
layout: post
title: Swift 입문
date: 2023-07-13 00:00:00 +07:00
categories: [Swift Essentials]
tags: [Swift]
description: Swift Introduction
modified: 2023-07-14 00:00:00 +07:00
---

# 개요

`Javascript` 또는 `Typescript` 로만 2년 정도 개발을 해왔다. 회사에서 이번 분기에 담당하게 된 프로젝트가 `Swift` 로 구성된 프로젝트임을 알게되었다. `Swift`를 반드시 배워야 할 이유가 생겼다!

처음엔 갑자기 `Swift`를 배워야 하는 데에 당황스럽기도 하고 잘 해낼 수 있을까 하는 걱정이 앞섰다. 그러나 새로운 언어와 프레임워크를 공부해볼 수 있다는 호기심도 들었고 무엇보다 성공적으로 마무리했을 때 성취감이 더 클 것 같다는 생각을 했다. 의미있는 3분기가 될 것 같다!

`Swift`를 기초부터 하나씩 배우면서 기록해야겠다.

# 조건문

조건문은 `Typescript`와 유사한 점이 많아 어렵지 않았다.

```swift
import UIKit

// 다크모드 여부
var isDarkMode : Bool = true

if isDarkMode == true {
    print("다크모드 입니다.")
} else {
    print("다크모드가 아닙니다.")
}

// 삼항연산자
var title : String = !isDarkMode ? "다크모드가 아닙니다." : "다크모드 입니다."
print(title) // 다크모드 입니다.
```

차이점이라면 `if` 뒤의 소괄호가 없어도 된다는 점과 같은지 다른지 여부를 따질 때 `=` 를 2개만 사용한다는 것이다.

# 반복문

`for` 반복문을 사용할 때 아래와 같이 사용할 수 있다.

```swift
import UIKit

// collection : 데이터를 모아둔 것
// 배열, Set, Dictionary
var array : [Int] = [0,1,2,3,4,5,6,7,8,9,10]

// forEach
for item in array {
    print("item : \(item)")
}

// 조건 설정
for item in array where item > 5 {
    print("5보다 큰 수 : \(item)")
}

for item in array where item % 2 == 0 {
    print("짝수 : \(item)")
}
```

재밌는 부분은 반복문을 시작할 때 조건을 함께 할당할 수 있다.

`Javascript` 보다 조금 더 직관적으로 보인다.

`Swift` 반복문의 또 다른 문법은 아래와 같다. 특정한 배열 변수 없이 사용 가능하다.

```swift
// range 0...5
// 0,1,2,3,4,5 까지
for i in 0...5 {
    print(i) // 0,1,2,3,4,5
}

// range 0..<5
// 0,1,2,3,4
for i in 0..<5 {
    print(i) // 0,1,2,3,4
}

// range 0..<5 with condition
for i in 0..<5 where i % 2 == 0 {
    print(i) // 0,2,4
}

// 빈 배열을 만드는 방법 두가지
//var randomInts : [Int] = []
var randomInts : [Int] = [Int]()

// i 변수를 사용하지 않을 땐 언더바 사용
for _ in 0..<25 {
    // 랜덤한 숫자 생성
    let randomNumber = Int.random(in: 0...100)
    // randomInts 에 랜덤한 숫자 넣기
    randomInts.append(randomNumber)
}

print("randomInts: \(randomInts)") // 랜덤한 숫자 25개인 배열
```

`Javascript` 와 다른 점은 배열에 엘리먼트를 넣을 땐 `append` 를 사용한다는 것이다.

# enum

`enum` 이란 타입을 나누는 것이다.

```swift
import UIKit

// 학교 - 초, 중, 고
enum School {
    case elementary
    case middle
    case high
    // or case elementary, middle, high 로 한 줄로 쓸 수 있음.
}

// 상수를 선언할 땐 let을 사용한다.
// 변수는 var로 선언한다.
let yourSchool = School.elementary
print("yourSchool : \(yourSchool)") // yourSchool :  elementary
print("yourSchool : ", yourSchool) // yourSchool :  elementary
```

변수와 상수를 선언할 땐 각각 `var` 와 `let` 으로 선언한다.

`enum` 에 값도 할당할 수 있으며, 값에 접근할 땐 `rawValue` 로 접근할 수 있다.

```swift
enum Grade : Int {
    case first = 1
    case second = 2
}

let yourGrade = Grade.second
print("yourGrade : \(yourGrade)") // yourGrade : second
print("yourGrade : \(yourGrade.rawValue)") // yourGrade : 2
```

`rawValue` 로 접근하는 방식 이외에 데이터를 동적으로 정해줄 수 있다.

또한 `Javascript` 의 `Class` 처럼 `enum` 안에 메소드를 선언하여 사용할 수도 있다.

```swift
enum SchoolDetail {
    case elementary(name: String)
    case middle(name: String)
    case high(name: String)

    func getName() -> String {
        switch self {
        case .elementary(let name):
            return name
        case let .middle(name):
            return name
        case let .high(name):
            return name
        }
    }
}

let yourMiddleSchoolName = SchoolDetail.middle(name: "YUNSU")
print(yourMiddleSchoolName.getName()) // YUNSU
print(yourMiddleSchoolName) // middle(name: "YUNSU")
```

# Optional Variables Unwrapping

`Swift` 에는 중요한 개념 중 하나인 옵셔널 변수 언래핑이 있다.

옵셔널이란 값이 있을 수 있고 없을 수 있다는 상태이다. 즉 변수에 값이 있는지 없는지 모르는 상태이다.

```swift
import UIKit

var someVariable : Int? = nil

// 값이 비어있다면 변수에 값을 넣는다.
if someVariable == nil {
    someVariable = 90
}

print("someVariable: ", someVariable) // someVariable:  Optional(90)
```

변수의 타입을 선언할 때 `?` 와 같이 선언하면 값이 있을 수 있고 없을 수도 있는 옵셔널 변수임을 의미한다.

언래핑이란 옵셔널 변수의 옵셔널한 것을 벗기는 것을 의미한다. 이 때 사용할 여러 방법이 있다.

### if let

값이 있다면 새로운 상수에 그 값을 할당한다. `if let` 을 사용할 수 있다.

```swift
if let otherVariable = someVariable {
    print("언래핑 되었다. 즉 값이 있다. otherVariable : \(otherVariable)")
} else {
    print("값이 없다.")
}
// 언래핑 되었다. 즉 값이 있다. otherVariable : 90
```

### 기본값 할당

빈 값이라면 기본값을 할당한다.

```swift
someVariable = nil

// someVariable이 비어있으면 기본값을 할당할 수 있다.
let myValue = someVariable ?? 10
print("myValue : \(myValue)") // myValue : 10
```

### guard let

함수를 사용하여 옵셔널 변수를 언래핑할 수 있다.

```swift
var firstValue : Int? = 30
var secondValue : Int? = 50

print("firstValue : \(firstValue)") // firstValue : Optional(30)
print("secondValue : \(secondValue)") // secondValue : Optional(50)

unwrap(firstValue) // unwrap() called unWrappedParam : 30
unwrap(secondValue) // unwrap() called unWrappedParam : 50

// 가드렛
func unwrap(_ parameter: Int?){
    print("unwrap() called")
    // 값이 없으면 리턴
    guard let unWrappedParam = parameter
    else {
        return
    }
    print("unWrappedParam : \(unWrappedParam)")
}
```

`unwrap` 이라는 함수를 사용한다. 전달인자인 `parameter` 앞에 언더바 `_` 를 넣으면 `Javascript` 함수를 호출할 때 처럼 변수만 넣는 것으로 호출할 수 있다.

`unwrap` 함수는 옵셔널 변수인 파라미터의 값이 있을 때 언래핑하는 함수이다.
