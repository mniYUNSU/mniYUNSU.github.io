---
layout: post
title: React Native TextInput 반응형 글자 크기 적용 방법
date: 2022-04-17 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: React Native TextInput Responsive Font Size
---

# 작성 중

# 구현

<br>

```jsx
import React, { useEffect, useState } from 'react'
import { View, TextInput, Platform, Dimensions } from 'react-native'
const FugProfileView = ({}) => {
  const maxSize = 48
  const minSize = 25

  const [customWidth, setCustomWidth] = useState(Dimensions.get('window').width)
  const [letterToWidthRatio, setWidthRatio] = useState(
    profileNickName.length / customWidth
  )
  const [fontSize, setFontSize] = useState(maxSize)

  useEffect(() => {
    setWidthRatio(customWidth / Math.max(profileNickName.length, 1))
  }, [profileNickName, customWidth])

  useEffect(() => {
    const size = Math.max(Math.min(letterToWidthRatio, maxSize), minSize)
    setFontSize(size)
  }, [customWidth, profileNickName, letterToWidthRatio])

  return (
    <View style={'your style'}>
      <TextInput
        style={[
          'your style',
          { width: constant.WIDTH - 40 },
          { fontSize: fontSize },
        ]}
        underlineColorAndroid='transparent'
        textAlign={'center'}
        autoFocus={true}
        value={'your value'}
        placeholder={'여기에 입력'}
        placeholderTextColor={'your style'}
        maxLength={14}
        selectionColor={'your style'}
        onLayout={({ nativeEvent: { layout } }) => {
          setCustomWidth(layout.width)
        }}
        onChangeText={(value) => {
          setProfileNickName(value)
        }}
      />
    </View>
  )
}
```

<br>
