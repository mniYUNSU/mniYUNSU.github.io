---
layout: post
title: Android에서 fontFamily가 적용되지 않는 이슈
date: 2022-03-11 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native]
description: Custom fonts not working in android
---

# 문제점

기본 폰트가 아닌 커스텀 폰트를 사용하고 있었고, iOS에선 글꼴 및 글꼴의 굵기 등 무리없이 적용이 되었다. 당연히 안드로이드에서도 잘 작동할 것으로 생각했는데, 안드로이드에선 커스텀 폰트에 추가적인 스타일을 적용할 경우 적용이 안되는 이슈가 있었다.

```jsx
...
return (
  <Text style={styles.textStyle}>
    {`custom font에 fontWeight, fontStyle를 적용하면 font 적용이 안된다.`}
  </Text>
)
```

<br>

```jsx
return StyleSheet.create({
  textStyle: {
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'my Custom Font',
  },
})
```

당연할 줄 알았던 위 코드들에서 이슈가 발생하니 처음엔 이럴리가 없는데.. 하며 현실을 부정했다. 하지만 컴퓨터는 거짓말을 하지 않는다...

구글링 결과, 커스텀 폰트에 `fontWeight`, `fontStyle` 등 추가적인 스타일을 적용하면 커스텀 폰트가 적용이 안된다는 것을 알게 됐다.

# 해결 방안

즉, 커스텀 폰트에 추가적인 스타일을 적용하기 위해선 그 **스타일이 적용된 커스텀 폰트 파일**을 적용해야 한다.

예를 들면, `fontWeight : '700'` 처럼 폰트에 굵기를 주려면 볼드 스타일이 적용된 폰트를 `fontFamily` 로 적용해야 한다는 것이다.

```jsx
return StyleSheet.create({
  textStyle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : null,
    // fontWeight: '700',
    fontSize: 18,
    fontFamily: 'my Custom Font - BOLD',
  },
})
```

위 처럼, 디바이스의 플랫폼이 안드로이드일 경우, `fontWeight` 스타일은 적용하지 않고, `fontFamily` 자체를 볼드 처리된 커스텀 폰트를 지정하면 원하는 커스텀 폰트를 적용할 수 있다.

iOS의 경우 `fontWeight` 를 적용하더라도 커스텀 폰트를 잃어버리는 일은 없으니 그대로 사용하면 된다.

리액트 네이티브를 공부하면서 처음엔 OS 차이를 고려한 코딩을 해야한다는 것이 굉장히 피곤했다. 그래서 iOS만을 목표로 하자하고 `Swift`를 익힐 생각이었다.

그러나 현업에서 다양한 경험을 해보면서, 리액트 네이티브가 정말 매력적이고 재미있고 무엇보다 이 기술을 잘 단련한다면 굉장한 무기가 될 것 같다는 생각을 요즘들어 많이 하게 됐다. iOS와 안드로이드 간의 코드 차이들을 포스팅하면서 리액트 네이티브 기술을 잘 다듬어야겠다.

### References

- <a href="https://stackoverflow.com/questions/53158380/custom-fonts-not-working-in-android-react-native-0-57-4" target="_blank" rel="noopener">DO NOT apply any style like `fontWeight` or `fontStyle` on ur Custom Font- stackoverflow</a>
