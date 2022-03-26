---
layout: post
title: React Native Facebook SDK 적용
date: 2022-03-26 00:00:00 +07:00
categories: [React Native Essentials]
tags: [React Native, Facebook SDK]
description: react-native-fbsdk를 이용한 React Native Facebook SDK 적용
---

# 개발 환경 및 설치

```jsx
"react-native": "^0.63.2"
```

```cli
npm install react-native-fbsdk
cd ios && pod install
```

Facebook SDK를 적용하기 전에 <a href="https://developers.facebook.com/" target="_blank" rel="noopener">미리 페이스북 개발자 계정을 만들고</a> 앱을 등록해야 한다.

# iOS

### Info.plist

Info.plist 파일의 `<dict></dict>` 내부에 아래 코드를 삽입한다.

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>fbAPP-ID</string>
  </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>APP-ID</string>
<key>FacebookClientToken</key>
<string>CLIENT-TOKEN</string>
<key>FacebookDisplayName</key>
<string>APP-NAME</string>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>fbapi</string>
  <string>fb-messenger-share-api</string>
</array>
```

`APP-ID` 는 페이스북 개발자 계정에 등록한 앱의 ID이며, `CLIENT-TOKEN`은 등록한 앱의 고급 설정에서 확인할 수 있다. `APP-NAME`은 등록한 앱의 이름이다.

### AppDelegate.m

AppDelegate.m 파일에 Facebook SDK를 적용하기 위한 코드를 삽입한다.

```m
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
.
.

#ifdef FB_SONARKIT_ENABLED

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
 {
   .
   .

  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
  .
  .
 }

.
.

- (BOOL)application:(UIApplication *)app

  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }
```

### SceneDelegate.m (iOS 13인 경우)

iOS 13에서는 URL 열기 기능을 `SceneDelegate`로 옮겼다. iOS 13을 사용하고 있다면 아래 내용을 SceneDelegate에 추가해야 로그인이나 공유 등의 기능이 의도한 대로 작동한다.

```m
// SceneDelegate.m
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@import FacebookCore;

@interface SceneDelegate ()

@end

@implementation SceneDelegate

- (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts
{
  UIOpenURLContext *context = URLContexts.allObjects.firstObject;
  [FBSDKApplicationDelegate.sharedInstance application:UIApplication.sharedApplication
                                               openURL:context.URL
                                     sourceApplication:context.options.sourceApplication
                                            annotation:context.options.annotation];
}

```

이상으로 iOS는 Facebook SDK 세팅이 끝나게 된다.

# Android

### android/build.gradle android/app/build.gradle

`build.gradle`의 repository 내부에 아래 내용을 추가한다.

```java
// android/build.gradle
buildscript {

    repositories {

        mavenCentral()
    }
}
```

### android/app/build.gradle

`build.gradle`의 dependencies 내부에 아래 내용을 추가한다.

```java
// android/app/build.gradle

dependencies {

  implementation 'com.facebook.android:facebook-android-sdk:[4,5)'
}
```

### strings.xml

strings.xml에 아래 내용을 추가한다.

```xml
<resources>
  <string name="facebook_app_id">1234</string>
  <string name="fb_login_protocol_scheme">fb1234</string>
  <string name="facebook_client_token">56789</string>
</resources>
```

등록한 앱의 ID를 `facebook_app_id` 필드에 넣고, `fb_login_protocol_scheme`에는 그 앱 ID 앞에 `fb`만 붙이고 삽입한다.
`facebook_client_token`엔 클라이언트 토큰을 삽입한다.

### AndroidManifest.xml

AndroidManifest.xml 파일의 `<application></application>` 내부에 아래 내용을 삽입한다.

```xml
<uses-permission android:name="android.permission.INTERNET"/>

...

<application android:label="@string/app_name" ...>
    ...

   	<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
   	<meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
    <activity android:name="com.facebook.FacebookActivity"
        android:configChanges=
                "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
        android:label="@string/app_name" />
    <activity
        android:name="com.facebook.CustomTabActivity"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="@string/fb_login_protocol_scheme" />
        </intent-filter>
    </activity>
</application>
```

이렇게 안드로이드도 Facebook SDK 세팅이 끝나게 되며, 간략한 예시는 아래와 같다.

# 사용 예시

```js
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import Facebook from 'icon/sns/facebook.svg'

export default function fbSDK() {
  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('test ==> Login cancelled')
        } else {
          console.log(
            'test ==> Login success with permissions: ' +
              result.grantedPermissions.toString()
          )
          // facebook 로그인 성공
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
  return (
    // 커스텀 로그인 버튼
    <View>
      <TouchableOpacity
        style={[styles.fbButton]}
        onPress={() => loginWithFacebook()}
      >
        <Facebook width={20} height={20} />
        <Text style={[styles.fbText, { width: 85 }]}>페이스북 연결</Text>
      </TouchableOpacity>
    </View>
  )
}
```

<br>

위처럼 Facebook이 제공하는 로그인 버튼 말고 커스텀하여 사용할 수 있는데, 다만 여기에도 페이스북이 제공하는 가이드가 있다. <a href="https://developers.facebook.com/docs/facebook-login/userexperience/#buttondesign" target="_blank" rel="noopener">Facebook이 제공하는 사용자 경험 디자인</a>을 무시하고 Facebook SDK를 도입하게 되면 앱 심사 과정에서 통과를 못할 수 있다.

### References

- <a href="https://developers.facebook.com/docs/facebook-login/userexperience/#buttondesign" target="_blank" rel="noopener">Facebook이 제공하는 사용자 경험 디자인</a>
