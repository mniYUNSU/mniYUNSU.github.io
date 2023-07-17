---
layout: post
title: Swift 입문 3일차
date: 2023-07-17 00:00:00 +07:00
categories: [Swift Essentials]
tags: [Swift]
description: Swift Introduction
modified: 2023-07-17 00:00:00 +07:00
---

# 개요

오늘도 `Swift` 문법을 공부해보자!

# 객체 생성자, 해제자

객체를 생성한다는 것은 쉽게 말해 객체를 생성하여 메모리에 올린다는 것이다.

`Class` 를 만들고 변수 또는 상수에 이를 적용하는 것이 곧 이 변수 또는 상수를 메모리에 올리는 것이다.

```swift
class MyFriend {
    var name : String
    init(_ name: String = "이름 없음"){
        self.name = name
        print("MyFriend 가 메모리에 올라갔다. - \(self.name)")
    }
    deinit {
        print("객체가 사라졌다. - \(self.name)") // 객체가 사라졌다. - 배윤수
    }

    // deinit 검증 로직
    var calledTimes = 0
    let MAT_TIMES = 5
    static var instancesOfSelf = [MyFriend]()
    class func destroySelf(object: MyFriend)
    {
        instancesOfSelf = instancesOfSelf.filter {
            $0 !== object
        }
    }
    func call() {
        calledTimes += 1
        print("called \(calledTimes)")
        if calledTimes > MAT_TIMES {
            MyFriend.destroySelf(object: self)
        }
    }
}

let myFriend = MyFriend("윤수") // MyFriend 가 메모리에 올라갔다.
let aFriend = MyFriend() // MyFriend 가 메모리에 올라갔다.
```

메모리에 정상적으로 올라갔는지 확인하기 위해 아래와 같이 메모리 주소를 출력할 수 있다.

```swift
let anObjectMemoryAddress = Unmanaged.passUnretained(aFriend).toOpaque()
let secondMemoryAddress = Unmanaged.passUnretained(myFriend).toOpaque()

print(anObjectMemoryAddress) // 0x00006000037be880
print(secondMemoryAddress) // 0x00006000037c4160
```

`Class` 자체만으로 무언가를 할 수는 없다. `Class` 라는 틀을 이용해 객체를 만들고 이를 메모리에 올려 사용해야 한다. 이 객체가 각각의 메모리 주소를 갖고 있다.

객체를 생성했으면 해제도 할 수 있어야 한다. 객체 해제자는 `deinit` 으로 사용할 수 있다.

객체가 메모리에서 할당 해제될 때 작동하는 로직이다.

```swift
weak var selfDestructingObject = MyFriend("배윤수") // MyFriend 가 메모리에 올라갔다. - 배윤수
if selfDestructingObject != nil {
    selfDestructingObject!.call()
} else {
    print("객체가 없습니다.") // deinit 이후 객체가 없습니다.
}
```

<br>

# 상속

상속이란 부모 요소로부터 무언가를 위에서 아래로 받는 것이다.

상속을 받은 `Class` 는 `override` 를 통해 부모로 받은 것을 덮어 씌워 사용한다. 부모로부터 받은 메소드를 사용할 땐 `super` 를 사용해야 한다.

```swift
import UIKit

class Friend {
    var name : String
    init(_ name: String){
        self.name = name
    }

    func sayHi(){
        print("안녕하세요 \(self.name) 입니다.")
    }
}

class BestFriend : Friend {
    // override 로 부모의 메소드를 가져온다.
    override init(_ name: String) {
        // super 로 부모의 메소드 사용
        super.init("베스트 프렌드 " + name)
    }

    override func sayHi() {
        super.sayHi()
    }
}

let myFriend = Friend("윤수")
myFriend.sayHi() // 안녕하세요 윤수 입니다.

let myBestFriend = BestFriend("동동")
myBestFriend.sayHi() // 안녕하세요 베스트 프렌드 동동 입니다.
```

상속받은 `Class` 는 부모 `Class` 에서 선언한 변수를 그대로 가져와 사용할 수 있다.

# 딕셔너리

딕셔너리는 사물함에 무언가를 넣고 이를 키로 여는 것과 유사하다.

키와 밸류(값)로 이루어져 있어 키로 자물쇠를 열어 밸류에 접근하는 것이다.

배열과 다른 점은 키와 값이 쌍으로 이루어진 요소들이 나열되어 있고, 키를 통해 원하는 값에 접근할 수 있다는 것이다.

```swift
// 키 : 값
var myFriends = ["bestFriend" : "윤수", "highSchool" : "동동"]

let myBestFriend = myFriends["bestFriend"] // 윤수

let oldFriend = myFriends["old"] // nil
let oldFriend2 = myFriends["old", default: "친구없음"] // 친구없음

myFriends["bestFriend"] = "배윤수"
let myBF = myFriends["bestFriend"] // 배윤수

myFriends["newFriend"] = "철수"
let newFriend = myFriends["newFriend"] // 철수

myFriends.updateValue("없음..", forKey: "girlFriend")
let girlFriend = myFriends["girlFriend"] // 없음..

myFriends.updateValue("조지", forKey: "bestFriend")
let myBF2 = myFriends["bestFriend"] // 조지

// empty dictionary 선언 방식 키: String / 값: Int
let emptyDictionary : [String : Int] = [:]
let emptyDictionary2 : [String : Int] = [String : Int]()
let emptyDictionary3 = [String : Int]()
let emptyDictionary4 : [String : Int] = Dictionary<String, Int>()

myFriends.count // 4
for item in myFriends {
    print("item : \(item)")
}
// item : (key: "highSchool", value: "동동")
// item : (key: "girlFriend", value: "없음..")
// item : (key: "bestFriend", value: "조지")
// item : (key: "newFriend", value: "철수")
```

<br>

# 파이널 클래스

파이널 클래스란 간단하게 **상속이 불가능**한 클래스이다.

```swift
final class Friend {
    var name : String
    init(name : String) {
        self.name = name
    }
}

// 파이널은 상속이 불가능하다.
// error 발생
class BestFriend : Friend {
    override init(name : String) {
        super.init(name: "베스트 프렌드 " + name)
    }
}

let myFriend = Friend(name: "윤수")
let myBestFriend = BestFriend(name: "영희")
```

<br>

# 메소드 매개변수 inout

`inout` 이란 메소드에 매개변수로 넣는 값을 바꾸는 것을 의미한다.

```swift
func sayHi(_ name: String) {
    name = "스위프트하는 " + name
    print("안녕 \(name) !")
}
```

이처럼 메소드에 전달한 매개변수를 직접 변경하려 하면 에러가 발생한다.

상수이기 때문이다.

변경하는 방법이 `inout` 이다.

```swift
func sayName(_ name: String) {
    print("안녕 \(name) !")
}

func sayHi(_ name: inout String) {
    name = "스위프트하는 " + name
    print("안녕 \(name) !")
}

sayName("윤수") // 안녕 윤수 !

var name = "배윤수"
sayHi(&name) // 안녕 스위프트하는 배윤수 !
```

매개변수 타입을 지정할 때 `inout` 을 넣고, 메소드를 호출할 때 매개변수 앞에 `&` 를 붙이면 메소드의 매개변수를 변경할 수 있다.

# 에러

에러는 `enum` 으로 만들 수 있는 또 하나의 자료형이다.

```swift
// 자료형 : Error
enum MismatchError : Error {
    case nameMismatch
    case numberMismatch
}

// throw 로 에러를 밖으로 던진다.
func guessMyName(name input: String) throws {
    print("guessMyName() called")

    if input != "배윤수" {
        print("틀렸다")
        throw MismatchError.nameMismatch
    }

    print("맞다")
}

// 에러처리를 해야한다면 메소드 앞에 try 를 붙여야 한다.
// 에러처리 추가 로직을 수행하지 않겠다면 try 뒤에 ? 를 붙이면 된다.
// try 뒤에 !를 붙이면 에러가 없을 것이라 확신한다. 에러가 있다면 코드 상에 에러가 발생하게 된다.
// try? guessMyName(name: "윤수")
// try! guessMyName(name: "윤수")

do {
    try guessMyName(name: "윤수")
} catch {
    print("ERROR : \(error)") // ERROR : nameMismatch
}
```

함수를 만들 때 `throws` 와 함께 만드는 것으로 에러를 던질 수 있다. 던져진 에러를 잡아내는 에러 처리를 위해 `do catch` 를 사용하여 에러 처리 로직을 구현해야 한다.

에러 발생에도 추가 로직을 수행하지 않겠다면 `try` 뒤에 물음표 만 붙이는 것으로 메소드를 실행할 수 있다.

```swift
// alt cmd / -> 주석 만들기

/// 번호를 맞추는 메소드
/// - Parameter input: 사용자 숫자 입력
/// - Returns: bool 맞췄는지 여부
func guessMyNumber(number input: Int) throws -> Bool {
    print("guessMyNumber() called")

    if input != 10 {
        print("틀렸다")
        throw MismatchError.numberMismatch
    }

    print("맞다")
    return true
}

do {
    let receivedValue = try guessMyNumber(number: 1)
} catch {
    print("ERROR : \(error)") // ERROR : numberMismatch
}
```

메소드가 어떤 값을 리턴하는 함수라면 위와 같이 리턴 문을 사용해 정해진 타입에 맞는 값을 리턴해야 한다. 에러가 발생한다면 `do` 를 타지 않고 `catch` 로 넘어가게 된다.

# Struct Mutating

Struct 는 값 자체이고, Class 는 참조이다. Struct 의 멤버 변수를 변경하려면 mutating 키워드가 필요하다.

```swift
// 멤버 변수 name 을 갖는 struct
// struct 구조의 변수 값을 변경하려면 mutating 키워드 필요
struct Friend {
    var name : String
    // mutating 키워드로 멤버 변수의 값을 변경하는 메소드
    mutating func changeName() {
        self.name = "안녕! " + self.name
    }
}

var myFriend = Friend(name: "윤수")
print(myFriend.name) // 윤수

myFriend.changeName()
print(myFriend.name) // 안녕! 윤수
```

<br>

# Set

`Set` 자료구조는 한 공간에 데이터들을 모아두는 것이다. 다만, 고유한 데이터들만 모아둔다. 중복된 요소가 들어오게 되면 추가될 수 없다.

```swift
var myNumberSet : Set<Int> = Set<Int>()

myNumberSet.insert(1)
myNumberSet.insert(2)
myNumberSet.insert(3)
myNumberSet.insert(1)

myNumberSet.count // 3
myNumberSet // {2, 3, 1}

for aNumber in myNumberSet {
    print("aNumber : \(aNumber)")
}

// aNumber : 2
// aNumber : 3
// aNumber : 1
```

위와 같이 1을 중복해서 넣으면 이미 고유한 1이 있기 때문에 들어가지지 않는다.

`Set` 은 또한 배열과 같이 순서가 고정되어있지 않다. 매번 변수를 만들 때마다 순서가 바뀐다. 같은 공간 안에 모여있기만 한 느낌이다.

```swift
var myFriends : Set<String> = ["철수", "윤수", "지수"]
myFriends.contains("철수") // true
myFriends.contains("짱구") // false

var myBestFriends : [String] = ["철수", "윤수", "지수"]
myBestFriends.contains("짱구") // false

if let indexToRemove = myFriends.firstIndex(of: "윤수") {
    print("indexToRemove :  \(indexToRemove)")
    myFriends.remove(at: indexToRemove)
}

myFriends // {철수, 지수}
```

`Set` 을 만들 때 배열처럼 할당할 수 있다.

`contain`, `firstIndex` 등 배열에 사용하는 메소드들도 사용 가능하다.

# Struct 메소드

`Struct` 또한 `Class` 와 마찬가지로 메소드를 넣을 수 있다.

```swift
struct Friend {
    var age : Int
    var name : String

    func sayHello() -> String {
        print("sayHello()")
        return "저는 \(age)살, \(name) 입니다."
    }
}


var myFriend = Friend(age: 20, name: "윤수")

myFriend.sayHello() // "저는 20살, 윤수 입니다."
```

<br>

# Protocol

`Protocol` 은 일종의 약속이다. 정해진 약속을 만들고 `Class` 또는 `Struct` 에 적용하면 그 객체는 반드시 약속에 맞는 변수, 메소드를 갖고 있어야 한다.

```swift
// 약속 : ~ing , ~able, ~delegate
protocol Naming {
    // 값을 가져올 수도, 세팅할 수도 있다.
    // name 이라는 변수를 갖고 있을 것이다 라고 약속하는 것
    var name : String { get set }
    // 메소드 또한 동일
    func getName() -> String
}

// protocol implement
struct Friend : Naming {
    var name: String

    func getName() -> String {
        return "친구 : " + self.name
    }
}

var myFriend = Friend(name: "윤수")
myFriend.getName() // "친구 : 윤수"
```

`Protocol` 또한 상속이 가능하다.

```swift
protocol Naming {
    var name : String {get set}
    func getName() -> String
}

protocol Aging {
    var age : Int {get set}
}

protocol UserNotifiable : Naming, Aging {
    /// something...
}
```

`Protocol` 은 메소드를 선언만 할 수 있으며, 직접적인 로직을 넣을 수 없다. `Protocol` 의 메소드에 로직을 추가하기 위해선 **확장**이 필요하다.

```swift
// 프로토콜에는 메소드에 직접 로직을 넣을 수 없다. 선언만 가능.
protocol Naming {
    var lastname : String {get set}
    var firstname : String {get set}
    func getName() -> String
}

// extension 을 활용하면 메소드에 로직을 추가할 수 있다.
extension Naming {
    func getFullname() -> String {
        return self.lastname + " " + self.firstname
    }
}

struct Friend : Naming {
    var lastname: String
    var firstname: String

    func getName() -> String {
        return self.lastname
    }
}

let myFriend = Friend(lastname: "배", firstname: "윤수")
myFriend.getName() // "배"
myFriend.getFullname() // "배 윤수"
```

`Protocol` 에 제네릭을 활용하려면 a 을 사용하면 된다.

```swift
protocol PetHaving {
    associatedtype T
    var pets : [T] {get set}
    mutating func gotNewPet(_ newPet: T)
}

extension PetHaving {
    mutating func gotNewPet(_ newPet: T) {
        self.pets.append(newPet)
    }
}

enum Animal {
    case cat,dog,bird
}

struct Friend : PetHaving {
    var pets: [Animal] = []
}

struct Family : PetHaving {
    var pets: [String] = []
}

var myFriend = Friend()
myFriend.gotNewPet(Animal.bird)
myFriend.gotNewPet(Animal.cat)
myFriend.gotNewPet(Animal.dog)

myFriend.pets // (3 elements) [bird, cat, dog]

var myFamily = Family()
myFamily.gotNewPet("거북이")
myFamily.gotNewPet("강아지")
myFamily.gotNewPet("고양이")

myFamily.pets // (3 elements) ["거북이", "강아지", "고양이"]
```

<br>

# Type Alias

`Type alias` 는 타입의 별명이다.

`Protocol` 을 두개 이상 사용하거나, 코드가 길어질 때 타입의 별칭을 정해두고 사용하기 위함이다.

```swift
protocol Naming {
    func getName() -> String
}

protocol Aging {
    func getAge() -> Int
}

// 이 프로토콜들을 이 이름으로 같이 쓰겠다!
typealias Friendable = Naming & Aging
typealias FullNaming = Naming

struct Friend : Friendable {
    var name : String
    var age : Int

    func getName() -> String {
        return self.name
    }
    func getAge() -> Int {
        return self.age
    }
}

typealias FriendName = String
var friendName : FriendName = "윤수"

typealias Friends = [Friend]
var myFriendsArray : Friends = []

typealias StringBlock = (String) -> Void
func sayHi(completion : StringBlock) {
    print("안녕?")
    completion("오늘도 열심히!")
}

sayHi(completion: {
    saying in
    print("받음 : \(saying)") // 받음 : 오늘도 열심히!
})

typealias MyType = MyClass.MY_TYPE
class MyClass {
    enum MY_TYPE {
        case DOG,CAT,BIRD
    }
    var myType = MY_TYPE.DOG
}

var myClass = MyClass()
myClass.myType = MyType.DOG
print("myClass.myType : \(myClass.myType)") // myClass.myType : DOG
```

<br>

# Lazy

`Lazy` 는 바로 변수를 메모리에 올리지 않고 사용하게 될 때 메모리에 올리는 것을 의미한다.

```swift
// lazy : 스트럭트를 사용할 때 나중에 메모리에 올린다.
struct Pet {
    init(){
        print("Pet 이 생성되었다.")
    }
}

struct Friend {
    var name: String
    lazy var pet : Pet = Pet()
    init(_ name: String) {
        self.name = name
        print("Friend 가 생성됨")
    }
}

var myFriend = Friend("윤수") // Friend 가 생성됨
myFriend.pet // Pet 이 생성되었다.
```

<br>

# 고차함수

고차함수란 매개변수로 클로저와 같은 함수를 받아 그 함수를 리턴하는 함수이다.

```swift
// 매개변수로 함수 또는 클로저를 받고 받았던 매개변수를 반환한다.
func getName(_ name: String) -> String {
    return "내 이름은 \(name)"
}

var getNameClosure : (String) -> String

// 매개변수 getName 클로저를 받고 getName 을 리턴한다.
func sayHello( getName : (String) -> String, name : String) -> String {
    return getName(name)
}

let result1 = sayHello(getName: getName(_:), name: "윤수") // "내 이름은 윤수"
```

`배열`, `Set`, `딕셔너리` 등 콜렉션에 내장된 고차함수(`map`, `reduce`, `filter` 등) 가 있다.

```swift
// 매개변수로 함수 또는 클로저를 받고 받았던 매개변수를 반환한다.
func getName(_ name: String) -> String {
    return "내 이름은 \(name)"
}

var getNameClosure : (String) -> String

// 매개변수 getName 클로저를 받고 getName 을 리턴한다.
func sayHello( getName : (String) -> String, name : String) -> String {
    return getName(name)
}

let result1 = sayHello(getName: getName(_:), name: "윤수") // "내 이름은 윤수"

let numbers = [3, 1, 10, -1, 4]
let stringNumbers : [String] = numbers.map { (aNumber: Int) -> String in
    return "\(aNumber)"
} // (5 elements) ["3", "1", "10", "-1", "4"]

let evenNumbers : [Int] = numbers.filter { (aNumber: Int) in
    return aNumber % 2 == 0
} // (2 elements) [10, 4]
```

<br>
