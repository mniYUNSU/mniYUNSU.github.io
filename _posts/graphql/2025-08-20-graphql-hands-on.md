---
layout: post
title: 'GraphQL 공부: 개념과 예제'
date: 2025-08-20 09:00:00 +07:00
categories: [GraphQL]
modified: 2025-08-20 09:00:00 +07:00
tags: [GraphQL, API]
description: GraphQL이 무엇인지 이해하고 두 가지 예제로 직접 사용해 보는 방법.
---

## GraphQL이란?

GraphQL은 Facebook이 2012년에 개발하고 2015년에 오픈소스로 공개한 **API를 위한 쿼리 언어이자 런타임**이다.

REST API가 여러 엔드포인트에서 정해진 데이터만 반환하는 것과 달리,
GraphQL은 **단 하나의 엔드포인트**로 클라이언트가 원하는 데이터만 선택해 요청할 수 있다.

필요 없는 데이터까지 받아오는 **_Over-fetching_**, 필요한 정보를 얻기 위해 여러 번 호출해야 하는 **_Under-fetching_** 문제를 해결해 준다.

또한 강력한 타입 시스템을 제공해 자동 문서화가 가능하고, 어떤 필드를 요청할 수 있는지 쉽게 확인할 수 있다.

## 기본 개념

- **Schema**: 서버가 제공하는 타입과 관계를 선언적으로 정의한다. 즉, **_서버가 어떤 데이터를 제공하는지_** 약속한다.
- **Query / Mutation**: 데이터를 조회(Query)하거나 변경(Mutation)하는 요청의 형태.
- **Resolver**: Query나 Mutation이 호출됐을 때 실제 데이터를 반환하는 함수.
- **Playground**: 브라우저에서 바로 GraphQL 쿼리를 작성하고 실행해 볼 수 있는 UI로, 빠른 실험이 가능하다.

## Hands-on 1: Hello GraphQL 서버

가장 기본적인 서버를 만들어 *GET 요청*으로 데이터를 받아보는 예제는 아래와 같다.

### 1. 프로젝트 초기화 및 패키지 설치

```bash
npm init -y
npm install -D typescript ts-node @types/express @types/node
npm install graphql express express-graphql
npx tsc --init
```

### 2. `index.ts` 작성

```typescript
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: (): string => 'Hello GraphQL!'
};

const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(4000, () => {
  console.log('Running on http://localhost:4000/graphql');
});
```

### 3. 서버 실행

```bash
npx ts-node index.ts
```

브라우저에서 `http://localhost:4000/graphql` 에 접속하면 GraphiQL Playground가 열린다. 왼쪽 편집기에 아래 쿼리를 입력한 뒤 실행 버튼(▶)을 누르거나 `Ctrl + Enter`로 실행한다.

```graphql
{
  hello
}
```

결과로 `"Hello GraphQL!"` 이 반환되는 것을 확인할 수 있다.

동일한 내용을 **POST와 GET 요청**으로도 확인할 수 있다.

GraphQL GET 요청은 쿼리 문자열을 URL 인코딩하지 않으므로 쿼리 파라미터를 URL 인코딩해야 한다.

인코딩 신경 안 쓰고 싶으면 POST + JSON 바디로 호출하면 된다.

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  --data '{"query":"{ hello }"}'
```

또는

```bash
curl "http://localhost:4000/graphql?query=%7Bhello%7D"
```

JSON 형태로 `{"data":{"hello":"Hello GraphQL!"}}` 가 출력된다.

## Hands-on 2: Todo 리스트 서버 (POST 예제)

이번에는 실제 서비스에서 자주 보는 _Todo 리스트_ API를 만들어 보자. 앞의 예제에서 사용한 의존성만으로도 충분하며, 대신 `todo.ts` 파일을 새로 작성한다.

### 1. `todo.ts` 작성

```typescript
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    done: Boolean!
  }
  type Query {
    todos: [Todo]
  }
  type Mutation {
    addTodo(title: String!): Todo
  }
`);

const todos: Todo[] = [
  { id: 1, title: '문서 작성', done: false },
  { id: 2, title: '프로덕션 배포', done: false }
];

const root = {
  todos: (): Todo[] => todos,
  addTodo: ({ title }: { title: string }): Todo => {
    const newTodo: Todo = { id: todos.length + 1, title, done: false };
    todos.push(newTodo);
    return newTodo;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(4000, () => {
  console.log('Todo server running on http://localhost:4000/graphql');
});
```

### 2. 서버 실행

```bash
npx ts-node todo.ts
```

### 3. **POST 요청**으로 할 일 목록 조회

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ todos { id title done } }"}' \
  http://localhost:4000/graphql
```

### 4. 새 할 일을 추가하는 **Mutation**

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"mutation { addTodo(title:\"테스트 작성\") { id title done } }"}' \
  http://localhost:4000/graphql
```

실행 후 다시 조회하면 추가된 항목을 확인할 수 있다.

## 마치며

GraphQL은 필요한 데이터만 가져올 수 있어 네트워크 사용량을 줄이고,
타입 시스템을 통해 API 문서를 대체할 수 있다.

<!-- 다음 단계로는 실제 데이터베이스 연동, 인증, 캐싱 등 심화 주제를 탐구해 보자. -->

## Reference

- <a href="https://graphql.org/" target="_blank" rel="noopener">GraphQL 공식 문서</a>
