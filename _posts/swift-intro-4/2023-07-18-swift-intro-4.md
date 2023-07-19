---
layout: post
title: Swift 입문 4일차
date: 2023-07-19 00:00:00 +07:00
categories: [Swift Essentials]
tags: [Swift]
description: Swift Introduction
modified: 2023-07-20 00:00:00 +07:00
---

# 개요

오늘도 `Swift` 문법을 공부해보자!

# Sorted & Sort

배열을 `sorted` 와 `sort` 로 정렬할 수 있다.
차이점이라면 `sorted` 는 정렬된 배열을 리턴하고, `sort` 는 정렬할 배열 자체를 변경한다.

```swift
import UIKit

// sort, sorted
var myArray = [3, 4, 55, 989, 10, 2, 1, 9]

// 정렬된 배열 반환 (오름차순)
var ascendingArray = myArray.sorted() // [1, 2, 3, 4, 9, 10, 55, 989]
// 정렬된 배열로 바뀜 (오름차순)
myArray.sort() // [1, 2, 3, 4, 9, 10, 55, 989]

var descendingArray = myArray.sorted(by: >) // [989, 55, 10, 9, 4, 3, 2, 1]
myArray.sort(by: >) // [989, 55, 10, 9, 4, 3, 2, 1]
```

기본값은 오름차순이다. 내림차순은 `>` 로 수행할 수 있다.

# Private(Set)

`Class` 나 `Struct` 에서 사용하는 변수는 외부에서 변경할 수 있다. `public` 이 기본값이기 때문이다. `private` 로 선언한다면 그 변수는 외부에서 변경할 수 없다.

만약 변경하려면 `Class` 또는 `Struct` 가 갖고있는 메소드를 활용하여 변경해야 한다.

```swift
import UIKit

// MyPet struct 내에서만 사용
struct MyPet {
    private (set) var name : String = "이름 없음"
    var title: String = "타이틀없음"
    // struct 내에서 name 변수를 변경하려면 mutating 키워드 필요
    mutating func setName(to newName: String) {
        self.name = newName
    }
}

var myPet = MyPet()
myPet.name // 이름없음
myPet.title // 타이틀없음

// private 키워드가 없으면 (public) 이면 외부에서 접근 가능
myPet.title = "타이틀 있음"
myPet.title // 타이틀 있음

//myPet.name = "윤수"
//myPet.name // 접근 불가능 에러

// private 이기 때문에 직접 변경은 불가능, 메소드를 통한 접근으로 struct 내부에서 변경하는 것으로 변경 가능
myPet.setName(to: "윤수")
myPet.name // 윤수
```

<br>

# Foreach 에서 인덱스 가져오기

`forEach` 반복문을 실행할 때 `index` 도 같이 가져오려면 배열을 `enumerated` 로 만들어 첫번째 인자로 `index` 를 가져올 수 있다.

```swift
import UIKit

let myFriendArray : [String] = ["윤수", "철수", "수진", "나나"]

var friendsWithIndex : [String] = []

for (index, aFriend) in myFriendArray.enumerated() {
    print("index : \(index), item : \(aFriend)")
    friendsWithIndex.append("\(index) 번 \(aFriend)")
}

//index : 0, item : 윤수
//index : 1, item : 철수
//index : 2, item : 수진
//index : 3, item : 나나
```

<br>

# Map

`Map` 은 콜렉션의 데이터의 형태를 변경하기 위한 고차함수 메소드이다.

```swift
import UIKit

// Map
// 콜렉션 - 데이터들의 모음
// 콜렉션 안에는 배열, 딕셔너리, Set 등이 있다.

// Map 이란 콜렉션 내 데이터들의 형태를 변경하는 것
let friendArray : [String] = ["윤수", "철수", "수진", "나나"]

let myFriends = friendArray.map { aFriend in
    return "내 친구 " + aFriend
}

myFriends // ["내 친구 윤수", "내 친구 철수", "내 친구 수진", "내 친구 나나"]

let myBestFriend = friendArray.map {
    return "베프 \($0)"
}

myBestFriend // ["베프 윤수", "베프 철수", "베프 수진", "베프 나나"]
```

<br>

### compactMap

`nil` 이 존재하는 옵셔널 변수의 경우 `Map` 을 수행하면 원하는 결과를 얻어낼 수 없다.

옵셔널 변수를 언래핑하거나, `nil` 인 요소를 제거한 후 다시 `Map` 해야 한다. 이를 `compactMap` 으로 수행할 수 있다.

```swift
// nil 이 있는 optional 변수는 언래핑이 필요하다.
let bestFriendArray : [String?] = ["윤수", nil,"철수", "수진", "나나", nil]
let myBFs = bestFriendArray.map { aBF in
    return "내 BF \(aBF ?? "")"
} // ["내 BF 윤수", "내 BF ", "내 BF 철수", "내 BF 수진", "내 BF 나나", "내 BF "]

// optional 변수를 compactMap 으로 편하게 제외할 수 있다.
let myBFss = bestFriendArray.compactMap { aBF in
    return aBF
} // ["윤수", "철수", "수진", "나나"]
```

`compactMap` 메소드는 콜렉션 내 데이터 값이 `nil` 이라면 그 요소를 제외한다.

### flatMap

flatMap 은 콜렉션 안에 콜렉션이 들어있는 2차원 형태의 구조를 1차원으로, 즉 하나의 콜렉션으로 묶는다.

```swift
import UIKit

let myFriends = [["철수"], ["윤수"], ["짱구", "짱아"], ["맹구", "유리"]]

let flatMapped = myFriends.flatMap{
    (item: [String]) in
    return item
}

flatMapped // ["철수", "윤수", "짱구", "짱아", "맹구", "유리"]
```

<br>

# class func & static func

지금까지 `Class` 에서 함수를 만들고 사용할 땐 `Class` 내부에 함수를 만들고 변수에 그 인스턴스를 담아 선언한 후(메모리에 올린 후) 호출하면 되었다.

`class func` 는 메모리에 올리지 않고도 바로 호출할 수 있는 메소드를 의미한다.

```swift
import UIKit

class Friend {
    func sayHi() {
        print("HELLO")
    }
    class func sayBye() {
        print("BYE BYE")
    }
    static func saySiu() {
        print("SIUUUUUUUUU")
    }
}

let myFriend = Friend()
myFriend.sayHi() // HELLO
Friend.sayBye() // BYE BYE
```

`static func` 는 `class func` 와 동일해보인다. 그러나 `static func` 와 `class func` 의 결정적인 차이는 상속 가능 여부이다.

`static func` 는 `final class func` 와 동일한 개념이다. 즉 **상속이 불가능하다.**

```swift
class BestFriend : Friend {
    class override func sayBye() {
        print("OVERRIDE BYE BYE")
    }
    func saySiu() {
        print("OVERRIDE SIUUUUUUUU")
    }
}

BestFriend.sayBye() // OVERRIDE BYE BYE
BestFriend.saySiu() // SIUUUUUUUUU
```

정리하자면 `static func` 와 `class func` 를 사용하는 이유는 메모리에 올리지 않고도 메소드를 사용할 수 있다는 점이 있다. 차이점이라면 `static func` 는 상속이 불가능하다는 것이다.

부모가 갖고있는 메소드를 호출하고자 한다면 `super` 키워드를 사용하면 된다.

```swift
class override func sayBye() {
        super.sayBye()
        print("OVERRIDE BYE BYE")
    }
```

메모리에 올리지 않고 메소드를 사용 가능하다는 것은 어떤 위치에서도 메소드를 사용할 수 있다는 뜻이다.

예를 들면 헬퍼 메소드 (`Int` -> `String` 변환 등) 같은 것들을 모아두는 유틸리티 클래스를 만들고 `static func` 나 `class func` 를 사용하여 메소드를 만들 수 있다.

그렇게 만들어진 메소드를 다른 파일에서 간편하게 사용할 수 있다.

# Dictionary Grouping

딕셔너리를 이용하여 원하는 항목 별로 그룹핑을 할 수 있다.

날짜 별, 카테고리 별 거대한 양의 데이터를 그룹핑하여 생산성을 높일 수 있다.

```swift
import UIKit

enum FriendType {
    case normal, best
}

struct Friend {
    var name : String
    var type : FriendType
}

var friendList = [
    Friend(name: "철수", type: .normal),
    Friend(name: "영희", type: .best),
    Friend(name: "짱구", type: .best),
    Friend(name: "윤수", type: .normal)
]

//let groupedFriends = Dictionary(grouping: friendList, by: {$0.type})

let groupedFriends = Dictionary(grouping: friendList, by: {(friend) -> FriendType in
    return friend.type
})

print(groupedFriends)

groupedFriends[.normal] // [{name "철수", normal}, {name "윤수", normal}]
groupedFriends[.best] // [{name "영희", best}, {name "짱구", best}]
```

<br>

# 의존성 주입 (Dependency Injection, DI)

의존성 주입은 protocol 을 사용해 지켜야 할 약속을 변수에 할당하는 것이다.

```swift
import UIKit

// protocol : 약속, 무언가를 강제하는 것.
protocol Talking {
    var saying: String { get set }
    func sayHi()
}

class TalkingImplementation: Talking {
    var saying: String = "토크 "
    func sayHi() {
        print("안녕~")
    }
}

// Talking 이라는 약속은 지킨다. Talking implementation
// 하는 행동에 따라 값이 다르게 나오도록 만든다.
class BestTalk : Talking {
    var saying: String = "베스트 토크 "
    func sayHi() {
        print("찐친 안녕~")
    }
}

class OldTalk : Talking {
    var saying: String = "올드 토크 "
    func sayHi() {
        print("오랜만이야")
    }
}


class Friend {
    // BestTalk, OldTalk 모두 가능하다.
    var talkProvider: Talking
    var saying: String {
        get {
            talkProvider.saying
        }
    }

    init(_ talkProvider: Talking){
        self.talkProvider = talkProvider
    }

    func setTalkProvider(_ newProvider : Talking) {
        self.talkProvider = newProvider
    }

    func sayHi() {
        talkProvider.sayHi()
    }
}

// BestTalk 의존성
let myBestFriend = Friend(BestTalk())
myBestFriend.sayHi() // 찐친 안녕~
myBestFriend.saying // 베스트 토크

// OldTalk 의존성
let myOldFriend = Friend(OldTalk())
myOldFriend.sayHi() // 오랜만이야

// OldTalk 를 새로운 프로바이더로 변경
myOldFriend.setTalkProvider(TalkingImplementation())
myOldFriend.saying // 토크
myOldFriend.sayHi() // 안녕~
```

<br>

# Getter & Setter

`Getter` 와 `Setter` 는 말 그대로 어떤 것을 가져오는 것, 그리고 어떤 것을 설정하는 것이다.

```swift
// getter : 가져오는 것
// setter : 설정하는 것
class Friend {
    var name: String = ""
    var age: Int

    var detailInfo : String = ""

    var info: String {
        // info를 가져온다.
        get {
            return "내 친구 \(name) 나이는 \(age)"
        }
        set {
            detailInfo = "info에서 설정됨 : " + newValue
        }
    }

    init(_ name: String, _ age: Int){
        self.name = name
        self.age = age
    }
}

let myFriend = Friend("윤수", 20)
myFriend.info // "내 친구 윤수 나이는 20"
myFriend.info = "새로운 친구"
myFriend.detailInfo // "info에서 설정됨 : 새로운 친구"
```

`myFriend.info` 값을 가져올 수도 있고, 새로운 값을 할당하여 설정할 수 있다.

# Codable

`Codable` 이란 `Decodable` 과 `Incodable` 이 합쳐진 typealias 이다.

`Encodable` 은 데이터를 `json` 화 할 수 있다는 것이며, `Decodable` 은 `json` 을 `class` 또는 `struct` 로 변환할 수 있다는 의미이다.

```swift
import UIKit

// Codable 이란 Decodable 과 Incodable 이 합쳐진 typealias 이다.
// Encodable : json화 한다.
// Decodable : json을 class or struct화 한다.
let jsonFromServer = """
{
    "nick_name": "개발자 배윤수",
    "job": "개발자",
    "user_name": "mniyunsu",
}
"""

struct User : Decodable {
    var nickname: String
    var job: String
    var myUserName: String

    enum CodingKeys: String, CodingKey {
        case nickname = "nick_name"
        case job
        case myUserName = "user_name"
    }

    static func getUserFromJson(_ json: String) -> Self? {
        guard let jsonData : Data = json.data(using: .utf8) else {
            return nil
        }
        do {
            let user = try JSONDecoder().decode(User.self, from: jsonData)
            print("user : \(user)")
            return user
        } catch {
            print("ERROR!! \(error.localizedDescription)")
            return nil
        }
    }
}


let user = User.getUserFromJson(jsonFromServer) // User(nickname: "개발자 배윤수", job: "개발자", myUserName: "mniyunsu")
```

`Codable` 은 주로 `REST API` 핸들링에서 사용된다.

# 멀티 트레일링 클로저

멀티 트레일링 클로저란 매개변수 클로저를 여러개 가지는 메소드이다.

```swift
func someFunctionWithClosures(first: () -> Void, second: (String) -> Void, third: (Int) -> Void) {
    first()
    second("하이")
    third(3)
}

someFunctionWithClosures(first: {print("첫번째")}, second: {print("두번째 \($0)")}, third: {print("세번째 \($0)")})

someFunctionWithClosures {
    print("first")
} second: { string in
    print("second \(string)")
} third: { number in
    print("third \(number)")
}
```

<br>

# Convenience Init

`Convenience Init` 은 추가 생성자로서, 클래스가 갖고 있는 생성자에 추가로 로직을 실행할 수 있다.

```swift
// 추가 생성자
class Friend {
    var name: String
    var age: Int
    init(name: String){
        self.name = name
        self.age = 10
    }
    // 기존에 내가 갖고 있는 생성자에 추가해 무언가를 더 할 수 있다.
    convenience init(name: String, age: Int) {
        self.init(name: name)
        self.age = age
    }
}

let myFriend = Friend(name: "윤수", age: 20)
myFriend.age // 20
```

<br>

# 디자인 패턴 - 빌더

객체 생성 관련 디자인 패턴 중 하나인 `Builder` 패턴이다.

```swift
// 만들어 주는 것을 만든다.
// 핵심은 자기 자신을 뱉는다.

struct Pet {
    var name: String? = nil
    var age: Int? = nil
}

class PetBuilder {
    private var pet : Pet = Pet()
    func withName(_ name: String) -> Self {
        pet.name = name
        return self
    }
    func withAge(_ age: Int) -> Self {
        pet.age = age
        return self
    }
    func build() -> Pet {
        return self.pet
    }
}

let myPet = PetBuilder().withName("헬로우").withAge(10).build()
myPet
```

핵심은 만드려는 객체에 원하는 값들을 넣어서 객체를 구현하고, 마지막에 빌드라는 것을 통해 객체 스스로를 리턴하여 변수에 할당하는 것이다.

# 콜렉션 합치기

콜렉션을 합칠 때 변수에 `append` 를 통해 합칠 수 있지만, 단순히 `+` 로 사용할 수 있다.

```swift
// 콜렉션 - list [], set<>, dictionary[:}
let myFriends = ["철수", "영희", "윤수"]
let otherFriends: Set<String> = ["영수", "짱구", "강인"]

let totalFriends = myFriends + otherFriends
totalFriends // ["철수", "영희", "윤수", "영수", "짱구", "강인"]
```

<br>

# Reduce

`Reduce` 는 콜렉션에 사용할 수 있는 고차함수 중 하나로, 값들을 축적해가며 합치는 것이다.

```swift
struct Friend: Hashable {
    var name: String
    var age: Int
}

let myFriends = [
    Friend(name: "철수", age: 10),
    Friend(name: "민수", age: 10),
    Friend(name: "짱구", age: 20),
    Friend(name: "맹구", age: 20),
    Friend(name: "윤수", age: 30),
]

// reduce - 축적하여 합친다. 초기값 0으로
// partialResult - 축적된 값
let totalAge = myFriends.reduce(0) { partialResult, aFriend in
    partialResult + aFriend.age
}
totalAge // 90

// dictionary 로 같은 나이별로 그룹핑하겠다.
let groupedFriends = myFriends.reduce(into: [:]) { partialResult, aFriend in
    partialResult[aFriend.age] = myFriends.filter{
        $0.age == aFriend.age
    }
}
groupedFriends
```

<br>

# 콜렉션 간 변형

콜렉션 간 변형을 통해 중복요소 제거, 정렬 등을 수행할 수 있다.

```swift
let numbers = [1,1,1,5,5,9,7]

// list -> set
let uniqueNumbers = Set(numbers)
uniqueNumbers // {7, 5, 1, 9}

// set 을 리스트로 정렬
var uniqueNumbersArranged = Array(uniqueNumbers) // [5, 7, 9, 1]
uniqueNumbersArranged.sort() // [1, 5, 7, 9]
```

<br>

# Optional chaining

Optional Chaining 은 `?` 연산자를 통해 처리할 수 있다.

```swift
struct Friend {
    let nickname: String
    let person: Person?
}

struct Person {
    let name: String
    let pet: Pet?
}

struct Pet {
    let name: String?
    let kind: String
}

let pet = Pet(name: "냥냥", kind: "고양이")
let person = Person(name: "윤수", pet: pet)
let friend = Friend(nickname: "mni", person: nil)

// 데이터가 있을 수 있고 없을 수 있다.

// 옵셔널 체이닝
if let petName = friend.person?.pet?.name{
    print("petname \(petName)")
} else {
    print("petname 없음") // petname 없음
}

func getPetName() {
    guard let petName = friend.person?.pet?.name else {
        print("petname 없음")
        return
    }
    print("petname \(petName)")
}

getPetName() // petname 없음

// 옵셔널 바인딩
//if let person = friend.person, let pet = person.pet, let petName = pet.name {
//    // 모든 데이터가 존재함
//    print("petName \(petName)")
//} else {
//    print("데이터 없음")
//}

//if let person: Person = friend.person {
//    if let pet = person.pet {
//        if let petName = pet.name {
//            print("petname : \(petName)") // petname : 냥냥
//        } else {
//            print("no petname")
//        }
//    }
//}
```

`if let` 은 먼저 모든 데이터를 언래핑 했을 때 존재할 때의 로직을 먼저 적고, `guard let` 은 `else` 문 즉 `nil` 데이터가 있을 때의 로직을 처리 후 리턴한다.

# Equatable

`Equatable` 은 `struct` 간 비교가 가능하도록 편리하게 만들어주는 프로토콜이다.

```swift
// equatable protocol
// struct 간 비교 가능하도록 만들어준다.
struct Pet : Equatable {
    let id: String
    let name: String
    // 같은지 체크
    static func == (lhs: Pet, rhs: Pet) -> Bool {
        return lhs.id == rhs.id
    }
    static func != (lhs: Pet, rhs: Pet) -> Bool {
        return lhs.id != rhs.id
    }
}

let myPet1 = Pet(id: "01", name: "고양이")
let myPet2 = Pet(id: "02", name: "강아지")
let myPet3 = Pet(id: "01", name: "냥이")

if myPet1.id == myPet3.id {
    print("같은 Pet")
}

if myPet1 == myPet3 {
    print("같은 Pet임")
}

if myPet1 != myPet2 {
    print("다른 Pet임")
}
```

<br>

# Zip

zip 은 두 콜렉션을 묶을 때 사용한다.

```swift
let friends = ["철수", "영희", "짱구"]
let pets = ["고양이", "강아지"]

// 두 콜렉션을 묶고 싶을때 사용 - 크기가 같아질 때 까지
let friendAndPetPairs = zip(friends, pets)

for aPair in friendAndPetPairs {
    print("\(aPair.0), \(aPair.1)")
//    철수, 고양이
//    영희, 강아지
}
```

<br>

# Range

Range 를 통해 변수를 범위로 만들 수 있고, 원하는 범위만큼 반복을 수행할 수 있다.

```swift
import UIKit

let myRange = 0...2 // 0, 1, 2
let mySecondRange = 0..<2 // 0, 1
let myThirdRange = 0...Int.max

let myFriends = ["철수", "짱구", "맹구", "윤수"]

myFriends[mySecondRange] // ["철수", "짱구"]

if mySecondRange.contains(2) {
    print("conatin")
} else {
    print("not contain")
}
```

<br>

# Open

`open class` 는 외부 모듈에 있는 것을 상속 받기 위해 사용한다.

```swift
// 외부 모듈에 있는 것을 상속 받기 위해 사용하는 것 - open
open class Utils {
    open class func sayHello() {
        print("안녕하세요~~")
    }
}
```

# struct 기본 생성자

`struct` 는 생성자 메소드가 자동 탑재되어 있다. `struct` 안에서 생성자를 따로 지정 가능하지만 `extension` 으로 빼서 기본 생성자 지정이 가능하다

```swift
struct Pet {
    var name: String
}

// struct 는 생성자 메소드가 자동 탑재되어 있음
// struct 안에서 생성자를 따로 지정 가능하지만
// extension 으로 빼서 기본 생성자 지정이 가능함

extension Pet {
    init(){
        name = "고양이"
    }
}

let myPet = Pet() // 고양이
let myCat = Pet(name: "강아지") // 강아지
```

<br>

# Singleton 패턴

싱글톤 패턴은 디자인 패턴 중 하나로, 객체 생성 디자인 패턴 중 하나이며, 가장 유명하다.

메모리를 하나만 사용하여 객체를 생성한다는 의미이다.

```swift
import UIKit

// 한 메모리 공간에 값을 올릴 수 있다.
 final class Pet {
    static let shared = Pet()
    private init() {}

    var name: String = "고양이"
}


Pet.shared.name = "강아지"
// myCat과 myDog 는 메모리 주소가 같아진다.
let myCat = Pet.shared
myCat.name
let myDog = Pet.shared
```

<br>

# Toggle

toggle 이란 Bool 값을 간단하게 스위칭할 수 있도록 하는 메소드이다.

```swift
import UIKit

var isDarkMode : Bool = false

isDarkMode.toggle() // true
```

<br>

# 프로토콜 조건 적용

protocol 에 조건을 적용하여 지정한 클래스의 메소드만 사용 가능하도록 만들 수 있다.

```swift
import UIKit

protocol Naming{
    var name: String {get set}
}

class Cat : Naming {
    var name: String
    init(name: String) {
        self.name = name
    }
}

class Dog : Naming {
    var name: String
    init(name: String) {
        self.name = name
    }
}

extension Naming  {
    func sayName() where Self : Cat {
        print("\(self.name) 냥냥")
    }
    func sayName() where Self : Dog {
        print("\(self.name) 멍멍")
    }
}

let myDog = Dog(name: "멍멍이")
let myCat = Cat(name: "야옹이")
myCat.sayName()
myDog.sayName()
```

<br>

# 자료형 체크

자료형 체크는 `is` 로 할 수 있다.

`if` , `guard`, `if case`, `switch` 등으로 자료형을 체크할 수 있다.

```swift
import UIKit

class Cat {}
class Dog {}

let myCat = Cat()
let myDog = Dog()

if myCat is Cat {
    print("고양이다")
}

func checkIfSheIsCat () {
    guard myCat is Cat else {
        print("고양이가 아니다")
        return
    }
    print("고양이다")
}

checkIfSheIsCat()

switch myCat {
case is Cat:
    print("고양이다")
default :
    print("고양이 아니다")
}

if case is Cat = myCat {
    print("고양이다")
}

func checkIfSheIsDog(){
    guard case is Dog = myDog else {
        print("강아지가 아니다")
        return
    }
    print("강아지다")
}

checkIfSheIsDog()
```

<br>
