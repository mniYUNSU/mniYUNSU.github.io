---
layout: post
title: 'GraphQL 공부: 개념과 예제 2'
date: 2025-08-21 09:00:00 +07:00
categories: [GraphQL]
modified: 2025-08-21 09:00:00 +07:00
tags: [GraphQL, API]
description: GraphQL의 타입 시스템, 변수, 프래그먼트, 디렉티브 등 심화 개념을 다루고 실전 예제로 활용 방법을 익힌다.
---

## 1. 스키마 설계 심화

GraphQL 스키마(Schema)는 서버가 제공하는 **타입과 관계**를 선언적으로 정의한다. 스키마가 탄탄해야 클라이언트가 안정적으로 데이터를 요청할 수 있다.

### 1.1 스칼라와 객체 타입

- **스칼라(Scalar)**: `Int`, `Float`, `String`, `Boolean`, `ID`와 같이 더 이상 분해되지 않는 기본 타입.
- **객체(Object)**: 여러 필드로 이루어진 타입. 예: `type User { id: ID!, name: String! }`

### 1.2 리스트와 널

- `[User]`는 유저 목록을 의미한다.
- `User!`는 값이 반드시 존재해야 함을 나타낸다.
- `[User!]!`처럼 중첩하면 "목록도 널이 아니고, 각 항목도 널이 아님"을 표현한다.

### 1.3 입력 타입과 열거형

```graphql
enum Role {
  USER
  ADMIN
}

input UserInput {
  name: String!
  role: Role = USER
}

type User {
  id: ID!
  name: String!
  role: Role!
}
```

입력 타입(Input Type)은 **Mutation**에서 주로 사용되며, 서버로 전달되는 데이터를 검증하는 데 도움을 준다.

## 2. Arguments와 Variables

필드는 인자(arguments)를 받을 수 있고, 클라이언트는 변수를 이용해 동적으로 값을 전달할 수 있다.

### 2.1 인자 정의

```graphql
type Query {
  user(id: ID!): User
}
```

### 2.2 쿼리에서 직접 전달

```graphql
{
  user(id: 1) {
    id
    name
  }
}
```

### 2.3 변수 사용법

```graphql
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
  }
}
```

변수는 JSON 형태로 별도 전달한다.

```json
{ "userId": 1 }
```

GraphiQL이나 Apollo Client에서는 **Query**와 **Variables** 탭을 나눠 입력하면 된다.

## 3. Alias, Fragment, Directive

### 3.1 Alias로 결과 이름 변경

```graphql
{
  admin: user(id: 1) {
    name
  }
  guest: user(id: 2) {
    name
  }
}
```

`admin`과 `guest`는 서버 타입과 무관하게 클라이언트가 원하는 이름을 지정할 수 있다.

### 3.2 Fragment로 필드 재사용

```graphql
fragment UserFields on User {
  id
  name
  role
}

{
  me: user(id: 1) {
    ...UserFields
  }
  you: user(id: 2) {
    ...UserFields
  }
}
```

### 3.3 Directive로 조건부 요청

```graphql
query ($withRole: Boolean!) {
  user(id: 1) {
    name
    role @include(if: $withRole)
  }
}
```

변수로 `{ "withRole": true }`를 주면 `role` 필드가 포함되고, `false`면 제외된다. 반대로 `@skip`을 사용하면 특정 조건에서만 생략할 수도 있다.

## 4. Resolver와 Context

Resolver는 실제 데이터를 반환하는 **함수**다. 각 필드마다 Resolver를 정의하며, 필요 시 비동기 처리도 가능하다.

```typescript
const root = {
  users: async (): Promise<User[]> => {
    return await db.selectAllUsers();
  },
  addUser: ({ input }: { input: UserInput }, context) => {
    if (!context.isAdmin) throw new Error('권한 없음');
    return db.insertUser(input);
  }
};
```

`context`는 인증 정보나 데이터베이스 커넥션 등 **요청 전반에서 공유할 값**을 담는다.

```typescript
app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    rootValue: root,
    context: { isAdmin: req.headers['x-admin'] === '1' }
  }))
);
```

## 5. 예제: 사용자 관리 서버

아래는 앞서 설명한 내용을 조합한 간단한 서버 예제다.

```typescript
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

interface User {
  id: number;
  name: string;
  role: 'USER' | 'ADMIN';
}

const schema = buildSchema(`
  enum Role { USER ADMIN }
  input UserInput { name: String!, role: Role }
  type User { id: ID!, name: String!, role: Role! }
  type Query { users: [User!]!, user(id: ID!): User }
  type Mutation { addUser(input: UserInput!): User! }
`);

const users: User[] = [
  { id: 1, name: 'Alice', role: 'ADMIN' },
  { id: 2, name: 'Bob', role: 'USER' }
];

const root = {
  users: (): User[] => users,
  user: ({ id }: { id: number }): User | undefined =>
    users.find((u) => u.id == id),
  addUser: ({
    input
  }: {
    input: { name: string; role?: 'USER' | 'ADMIN' };
  }): User => {
    const newUser: User = {
      id: users.length + 1,
      name: input.name,
      role: input.role ?? 'USER'
    };
    users.push(newUser);
    return newUser;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.listen(4000, () => console.log('Server at http://localhost:4000/graphql'));
```

### 5.1 Mutation 실행 예시

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"mutation($name:String!){ addUser(input:{name:$name}) { id name role }}","variables":{"name":"Carol"}}' \
  http://localhost:4000/graphql
```

### 5.2 Alias와 Fragment 활용

```graphql
{
  first: user(id: 1) {
    ...UserFields
  }
  second: user(id: 2) {
    ...UserFields
  }
}

fragment UserFields on User {
  id
  name
  role
}
```

## 6. 프런트엔드에서 GraphQL 요청하기

GraphQL은 프런트엔드에서도 간단하게 호출할 수 있다. 브라우저의 `fetch` API나 Apollo Client 같은 라이브러리를 활용하면 된다.

### 6.1 fetch API 사용 예시

```javascript
const query = `
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      role
    }
  }
`;

async function fetchUser(id) {
  const res = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { id }
    })
  });
  const { data } = await res.json();
  return data.user;
}

fetchUser(1).then(console.log);
```

### 6.2 Apollo Client로 관리형 상태 구성

```bash
npm install @apollo/client graphql
```

<br>

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query ($id: ID!) {
        user(id: $id) {
          id
          name
          role
        }
      }
    `,
    variables: { id: 1 }
  })
  .then(({ data }) => console.log(data.user));
```

<!-- ## 마무리

이번 글에서는 GraphQL 스키마의 고급 기능과 쿼리 작성 기법, Resolver의 동작 방식까지 살펴보았다. 실제 서비스에서는 인증, 캐싱, 페이징 등 추가 기능을 함께 고려하여 더욱 견고한 API를 구성하면 된다. -->

## Reference

- <a href="https://graphql.org/" target="_blank" rel="noopener">GraphQL 공식 문서</a>
