---
layout: post
title: React Native에서 디바운싱 구현하기
date: 2022-04-02 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: 모바일 환경에서 디바운싱을 적용해 검색어 입력 시 버벅거림을 개선했다.
---

# 문제점

개발하는 프로덕트의 유지 보수 과정에서 검색어 입력이 버벅거리는 문제가 있었다. 입력하는 검색어 하나하나 전부 서버로 요청을 보내어 발생한 문제였으며, 디바운싱을 적용하면 해결되는 문제였다.

## 디바운싱(Debouncing)

> 연이어 오풀되는 함수들 중 **마지막 함수(또는 제일 처음)만** 호출하도록 하는 것

<figure>
<img src="./../../images/react-native-debounce1.png" alt="react-native-debounce1">
<figcaption>Fig 1. 디바운싱</figcaption>
</figure>

<br>

```jsx
let timer;
document.querySelector('#input').addEventListener('input', () =>
  if (timer) {
    // 이전 입력에 따른 요청은 지운다.
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    // 초기설정 혹은 덮어쓰기
    // API 요청
  }, 400);
);
```

<br>

## 쓰로틀링(Throttling)

> 마지막 함수가 호출된 후 일정 시간이 지난 후 호출이 되도록 하는 것(일정 시간이 지나기 전에 다시 호출되지 않음), 정해둔 시간에 한 번씩 만 실행되게 제한을 두는 것

<figure>
<img src="./../../images/react-native-debounce1.png" alt="react-native-debounce1">
<figcaption>Fig 1. 디바운싱</figcaption>
</figure>

<br>

```jsx
let timer;
document.querySelector('#input').addEventListener('input', () =>
  if (!timer) {
    // timer 없으면 실행
    timer = setTimeout(() => {
      timer = null;
      // 시간 지난 후 timer 해제
      // timer 해제 후 API 요청
    }, 400);
  });
```

<br>

# React Native 디바운싱 구현

<br>

```jsx
const ModalSelectBookView = ({}) => {
  const [word, setWord] = useState('')
  const [timer, setTimer] = useState(0)

  const getSearchResultDelay = (e) => {
    if (timer) {
      console.log('clear timer')
      clearTimeout(timer)
    }
    const newTimer = setTimeout(async () => {
      try {
        setKeyword(e)
      } catch (error) {
        console.error('error', error)
      }
    }, 500)
    setTimer(newTimer)
  }

  const handleInputChange = (e) => {
    setWord(e)
    getSearchResultDelay(e)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder={'책을 선택해 주세요.'}
          value={word}
          onChangeText={(value) => {
            handleInputChange(value)
          }}
        />
      </View>
    </View>
  )
}
```

<br>

이렇게 하면 유저가 검색어 입력을 할 때마다 서버로 요청을 보내지 않고, 유저가 0.5초 안에 입력한 검색어 요청은 전부 지워지고 0.5초 이후에 입력한 검색어로만 서버로 요청을 보내게 된다.
