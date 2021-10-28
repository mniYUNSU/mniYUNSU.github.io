---
layout: post
title: Node.js 설치와 npm
date: 2021-05-26 09:29:20 +07:00
categories: [Common]
tags: [Common, Ubuntu, Node.js, npm]
description: Node.js 설치와 npm.
---

# Node.js

우리가 자주 사용하는 웹 브라우저(크롬, 사파리 등)는 `Javascript` 런타임이다.

**런타임(Runtime)**은 프로그래밍 언어가 구동되는 환경이다. `Node.js`는 웹 브라우저 이외에 `Javascript`를 구동할 새로운 런타임이다.

즉, `Node.js`를 활용해 웹 브라우저가 아닌 곳에서 `Javascript`를 실행할 수 있다.

```cli
node <파일명>.js
```

위처럼 CLI에 `node` 명령어를 사용하면, `Node.js` 런타임에서 `Javascript`를 실행할 수 있다.

# nvm

`Node.js`를 설치하기 위해선 <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener">nvm(Node Version Manager)</a>를 설치해야한다.

```cli
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

위와 같이 터미널에 입력 후, `nvm install --lts`를 입력해 <a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js를 설치</a>할 수 있다.

`lts`는 **Long Term Support**의 약자로, 해당 버전을 장기간 지원한다는 의미이다.
설치한 `Node.js`의 버전 확인 명령어는 `node -v`로 할 수 있다.

`Node.js`의 이전 버전에서 작성한 코드가 최신 버전에서 에러가 생길 수 있다.

그런 경우 `Node.js`를 지우고 다시 설치할 수 있지만, `nvm`을 이용해 쾌적한 작업을 수행할 수 있다.

`nvm ls` 명령어를 통해 `NVM`으로 설치한 `Node.js`의 버전을 확인할 수 있다.
원하는 버전으로 `Node.js`의 버전을 변경할 수 있다.

# npm

하나의 프로그램은 세부적인 기능들이 모여 만들어진다. 우리가 어떤 프로그램을 개발할 때, 모든 세세한 기능을 만들지 않는다. 시간이 오래 걸리고, 그 기능들을 100% 신뢰할 수 없기 때문이다.

우리는 앞서 먼저 개발됐던 우수한 기능(모듈)을 가져다가 사용하게 된다.

이 모듈을 `Node.js`에서는 **npm(Node Package Manager)**으로 부르고, 이에 대한 정보를 `package.json`으로 담아두게 된다.

`Node.js` 생태계의 앱 스토어가 될 수 있겠으며, 개발에 필요한 모듈은 `npm`에서 다운로드해 사용할 수 있다.

### Reference

- <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener">Node Version Manager</a>
- <a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js 설치 공식 문서</a>
