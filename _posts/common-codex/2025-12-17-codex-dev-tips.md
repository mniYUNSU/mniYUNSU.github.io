---
layout: post
title: Codex로 개발 효율 올리기
date: 2025-12-17 00:00:00 +0900
categories: [Common]
tags: [AI, Productivity, Prompt]
description: Codex를 활용해 개발 작업을 빠르고 안정적으로 수행하는 실전 팁과 프롬프트 모음
---

## 개요

Codex CLI를 오래 쓰다 보면 **잘 짜인 요청과 작업 루틴**이 곧 생산성이라는 사실을 실감하게 된다. 아래는 실제로 사용하며 정리한 체크리스트와 프롬프트 예시다. 목적은 단순하다. *컨텍스트를 정확하게 제공하고, 작업 결과를 확신 있게 검수*하는 흐름을 습관으로 만드는 것이다.

## Codex 준비 체크리스트

1. **컨텍스트 정리**: 프로젝트 구조와 열린 파일을 알려 주면 Codex가 불필요한 탐색 시간을 줄인다. (`ls`, `tree`, `rg --files`가 기본).
2. **제약 명시**: 네트워크 사용 가능 여부, 테스트 실행 가능 여부 등 환경 정보를 선제적으로 공유하면 재질문이 줄어든다.
3. **확인 플랜 공유**: “작성 후 lint, unit test 실행”처럼 검증 계획을 함께 알려주면 Codex가 자동으로 다음 명령을 제안한다.
4. **가설을 말로 풀기**: “이 버그는 useEffect 의존성 문제 같아요”처럼 추측을 적어두면 Codex가 그 가설을 중심으로 조사한다.

이 정도만 지켜도 단순 지시가 아닌 **협업 메이트**처럼 반응하는 답을 받게 된다.

## Codex CLI vs 코드 에디터 익스텐션

- **Codex CLI**: 터미널 안에서 AI 에이전트를 실행해 파일 시스템을 조회·편집하고, 테스트·빌드 같은 명령을 바로 돌릴 수 있는 환경이다. 쉘 명령과 AI 대화가 한 세션에 묶여 있어 자동화 스크립트나 다단계 작업(검색 → 수정 → 테스트)에 강하다.
- **Codex Extension**: VS Code 같은 IDE 안에서 작동하는 익스텐션으로, 현재 열려 있는 파일 문맥을 즉시 공유하고 인라인 수정 제안을 받아볼 수 있다. 코드 편집 흐름을 크게 벗어나지 않으면서도 Codex 도움말을 얻는 것이 장점이다.

| 구분      | 장점                                                                                                                                         | 단점                                                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| CLI       | - 전체 레포 접근 및 명령 실행이 쉬워 대규모 refactor, 빌드·테스트 자동화에 최적<br>- 스크립트형 프롬프트, 반복 작업을 히스토리로 재사용 가능 | - 텍스트 중심이라 UI가 없는 결과(디자인, 미리보기) 확인이 까다로움<br>- 에디터를 번갈아 봐야 하므로 작은 수정에는 번거로울 수 있음         |
| Extension | - 현재 파일/선택 영역을 즉시 공유해 세밀한 컨텍스트 제공<br>- 인라인 diff, 자동 completions 등 UI 친화적 피드백                              | - 에디터가 제공하는 API만 접근하므로 프로젝트 전역 작업이나 외부 명령 실행에 제약<br>- 긴 플랜이나 복잡한 명령 시 UI가 좁게 느껴질 수 있음 |

실무에서는 **CLI로 뼈대 작업과 자동화**를 처리하고, **에디터 익스텐션으로 미세 조정·리뷰 요청**을 하는 식으로 병행하면 양쪽의 장점을 모두 누릴 수 있다.

## Codex CLI 빠른 시작

1. **설치**: macOS는 Homebrew(`brew install codex-cli`), Windows는 winget, Linux는 패키지 매니저 또는 공식 설치 스크립트를 활용한다. 설치 후 `codex --version`으로 정상 설치를 확인한다.
2. **로그인 및 환경 변수**: `codex login`을 입력해 발급받은 토큰을 등록하거나 `CODEX_API_KEY` 환경 변수를 shell profile에 추가한다.
3. **워크스페이스 연결**: 프로젝트 루트에서 `codex init` 또는 `codex workspace use .` 명령을 실행해 CLI가 레포 권한을 갖도록 한다. 이후 `codex status`로 sandbox/네트워크 권한을 확인할 수 있다.
4. **세션 시작**: `codex session start` 후 자연어 명령을 입력하거나, `codex task run`으로 미리 정의한 작업 템플릿을 실행한다.

이 과정을 거치면 현재처럼 터미널 안에서 Codex와 대화하며 파일 수정·테스트 실행을 모두 처리할 수 있다.

### 자주 쓰는 CLI 명령

| 명령                                         | 설명                                                      |
| -------------------------------------------- | --------------------------------------------------------- |
| `codex init`                                 | 현재 디렉터리에 Codex 설정(권한, 기본 프롬프트 등)을 생성 |
| `codex session start` / `codex session stop` | 대화형 세션 열고 닫기                                     |
| `codex run "<shell>"`                        | Codex에게 쉘 명령을 실행하게 하고 결과만 확인             |
| `codex files changed`                        | 현재 세션에서 Codex가 수정한 파일 목록 표시               |
| `codex plan`                                 | 작업 계획을 생성하거나 업데이트 (Codex Plan Tool)         |
| `codex logs`                                 | 세션 로그를 확인해 어떤 명령이 실행됐는지 추적            |

명령 이름은 버전에 따라 조금씩 다르니 `codex --help`로 최신 옵션을 확인해 두면 좋다.

## 작업 루틴 예시

- **상태 동기화**: `git status` → 변경 파일 인지 → 필요한 경우 diff 붙여 주기.
- **단계형 작업**: “1) 훅 추출 2) 스토리북 케이스 추가 3) 테스트”처럼 순서를 제시하면 Codex가 플랜을 따라 진행한다.
- **검증 요청**: 결과를 받은 뒤 “작성된 테스트를 실제로 실행해줘” 또는 “문서화된 부분 요약”처럼 후속 명령을 붙여 품질을 체크한다.

## 베이스 프롬프트 초안

개발자라면 자주 반복하는 기본 정보를 베이스 프롬프트로 저장해 두면 매 대화마다 프로젝트 설명을 다시 쓰지 않아도 된다.

```text
환경: MacOS, Node 20, pnpm. 테스트는 Vitest, 스타일 가이드는 ESLint + Prettier.
역할: 당신은 내 페어 프로그래머로, 변경 이유와 검증 방법을 먼저 설명한 뒤 코드를 제안합니다.
요구:
1. 기존 파일의 콘벤션을 우선시합니다.
2. 변경 후 필요한 명령어(lint/test/build)를 알려줍니다.
3. Diff 형식으로 핵심 수정 지점을 보여줍니다.
```

여기에 레포 고유 규칙(예: “국문 주석만 사용”), 접근 불가 리소스, 배포 파이프라인 등을 추가해 개인화하면 된다.

## MCP와 외부 API 활용

**MCP(Model Context Protocol)**는 Codex가 외부 도구·API와 데이터를 안전하게 주고받을 수 있게 해주는 표준이다. 서버(Provider)가 파일, DB, SaaS API 등을 추상화해 노출하면 Codex는 필요할 때 해당 리소스를 불러오거나 실행할 수 있다.

### MCP 설정 흐름

1. **Provider 준비**: 예를 들어 “이슈 트래커” MCP 서버는 GitHub Issues REST API를 감싸서 `listIssues`, `createIssue` 같은 액션을 제공한다.
2. **Codex에 등록**: `.codex/mcp-servers.json` 같은 설정 파일에 서버 URL, 인증 토큰, 허용 리소스 범위를 기입한다.
3. **세션에서 호출**: Codex가 “이슈 목록 가져와” 같은 요청을 받으면 MCP 리소스를 조회해 결과를 대화에 포함하거나, 필요한 경우 POST 호출을 대신 수행한다.

#### 예제: GitHub Issues Provider

```json
{
  "servers": {
    "githubIssues": {
      "url": "https://mcp.example.com/github",
      "resources": ["repos/mniYUNSU/blog/issues"],
      "actions": ["listIssues", "createIssue"],
      "metadata": {
        "auth": {
          "type": "token",
          "env": "GITHUB_TOKEN"
        }
      }
    }
  }
}
```

위 설정을 `.codex/mcp-servers.json`에 저장한 뒤 `codex session start`를 실행하면 다음과 같이 사용할 수 있다.

```text
나: 이번 주 Critical 티켓 목록 보여줘.
Codex: MCP githubIssues.listIssues 호출 → 상태가 "critical"인 항목을 정리 → 요약 텍스트로 응답
```

CLI 세션에서 호출하면 Codex가 즉시 `listIssues` 응답을 받아 후속 명령(예: 자동 브랜치 생성)까지 이어가기 좋다. 반면 에디터 익스텐션에서는 현재 편집 중인 파일과 이슈 내용을 나란히 보며 커밋 메시지나 PR 설명을 작성하기 쉬워 생산성을 높여 준다.

### 외부 API 연동 아이디어

- **이슈/프로젝트 관리**: Jira, Linear 등과 연결해, Codex에게 “현재 스프린트 티켓 정리해줘”라고 요청하면 자동으로 상태 보고서를 생성하게 할 수 있다.
- **디자인 핸드오프**: Figma REST API를 MCP로 노출하면 지정된 프레임의 색상, 폰트 토큰을 읽어와 CSS 변환을 돕는다.
- **문서/데이터 레이크**: Notion, Google Sheets, Supabase 같은 데이터 소스를 Codex 맥락으로 불러와 “테이블 구조 요약”이나 “최근 KPI 그래프 설명”을 생성한다.

핵심은 **Codex가 접근할 수 있는 데이터 레이어를 명시적으로 등록**해 주는 것이다. 권한 분리와 감사 로그가 자동으로 쌓이므로 팀 차원에서 승인된 API만 연결하면 보안 위험도 줄일 수 있다.

> **언제 CLI를 쓰고, 언제 익스텐션을 쓸까?** 외부 API를 엮어 대량 데이터 가공이나 스크립트 실행까지 해야 한다면 CLI가 낫고, 문서 작성이나 코드 코멘트처럼 “API 데이터를 바로 에디터에 붙여 넣고 싶을 때”는 익스텐션이 더 편하다. 두 방식을 번갈아 쓰되, 동일한 MCP 서버를 공유하면 어느 쪽에서도 같은 데이터를 재사용할 수 있다.

## 실전 프롬프트 템플릿

### 1. 버그 진단

```text
증상: 로그인 시 토큰이 즉시 만료됩니다.
환경: Next.js 14, Auth0 SDK 4.0.
추정: useEffect 의존성 문제로 refreshToken 요청이 중복됩니다.
요청: auth/hooks/useAuth.ts에서 토큰 갱신 로직을 살펴보고, race condition 방지 패턴을 제안해 주세요.
```

포인트는 **증상 + 환경 + 추정 + 파일 힌트** 네 가지 조합이다. 이렇게 주면 불필요한 파일 뒤지기가 사라진다.

### 2. 새 기능 설계

```text
목표: contact.html에 Codex 도움말 섹션을 추가하고 싶습니다.
제약: 기존 CSS 유지를 위해 새로운 클래스는 `.codex-*` prefix만 사용합니다.
요청: 필요한 HTML 골격과 SCSS 조각을 제안하고, 접근성 체크리스트도 포함해 주세요.
```

명확한 제약(클래스 prefix, 접근성, 기존 파일)만 추가해도 초안 품질이 확 좋아진다.

### 3. 리팩터링 & 코드 리뷰

```text
파일: components/PromptHelper.tsx
의도: 프롬프트 힌트 배열을 memoization 해 불필요한 재렌더를 막고 싶습니다.
요청: 성능 측정 포인트와 함께 `useMemo` 또는 커스텀 훅으로 정리해 주세요. 변경된 부분만 diff 형식으로 보여주세요.
```

리팩터링 시에는 **중간 목적**(성능, 가독성, 테스트 등)을 먼저 적고 결과 표현 형식(diff, 표, 목록)을 지정하면 후속 작업에 쓰기 좋다.

### 4. UI/UX 개선

```text
목표: settings 모달에서 다크 모드 토글 UX를 개선하고 싶습니다.
디자인 토큰: 컬러는 tokens/colors.json, 타이포는 tokens/typography.json만 사용합니다.
요청:
1. 토글 전환 애니메이션 제안 (CSS 또는 Framer Motion)
2. 포커스/스크린리더 접근성 체크리스트
3. QA에서 검증할 시나리오 3가지
```

프론트엔드 관점에서는 **디자인 토큰, 접근성 요구사항, 상호작용 제약**을 명시해 Codex가 스타일 시스템을 어지럽히지 않도록 해야 한다. 또 “와이어프레임 설명 → 컴포넌트 코드 → QA 체크리스트”처럼 단계형 대화를 유도하면 UI 흐름을 빠르게 다듬을 수 있다.

## 디자인 시스템 토큰 한눈에 보기

디자인 시스템 토큰은 **색상, 타이포, 간격, 그림자 등 UI 스타일의 최소 단위 값을 키-값 형태로 저장**한 JSON 또는 YAML 데이터다. 코드와 디자인 툴(Figma, Sketch 등)에서 동일한 토큰을 참조하면, 한 곳에서 값을 바꿔도 전체 UI가 일관되게 업데이트된다.

```json
{
  "colors": {
    "surface": { "value": "#FFFFFF" },
    "surfaceMuted": { "value": "#F5F6F8" },
    "accentPrimary": { "value": "#316FEA" },
    "accentPrimaryHover": { "value": "#2553B5" }
  },
  "typography": {
    "body": { "fontSize": "16px", "lineHeight": "24px", "fontWeight": 400 },
    "headingMd": { "fontSize": "20px", "lineHeight": "28px", "fontWeight": 600 }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  }
}
```

Codex 프롬프트에서 “colors.accentPrimary, spacing.md만 사용”처럼 명시하면, 컴포넌트 코드가 독자적인 색상 값 대신 토큰을 참조하게 되어 유지보수 비용을 줄일 수 있다.

### 토큰을 코드에 적용하는 방법

1. **코드 변수화**: 빌드 단계에서 JSON을 JS/TS 모듈로 변환하거나 `@tokens/colors.css` 같은 CSS 변수로 노출한다. 예를 들어 Style Dictionary나 Theo를 사용해 `:root { --color-accent-primary: #316FEA; }` 형태를 생성한다.
2. **프롬프트에 명시**: Codex에게 “`colors.accentPrimary`는 `var(--color-accent-primary)`로 매핑되어 있으니 이 변수를 사용해 주세요”라고 알려 준다.
3. **샘플 코드**

```tsx
// components/Button.tsx
import styled from 'styled-components';
import { tokens } from '@/tokens'; // JSON -> TS 변환된 객체

export const Button = styled.button`
  background: ${tokens.colors.accentPrimary.value};
  color: ${tokens.colors.surface.value};
  padding: ${tokens.spacing.md};

  &:hover {
    background: ${tokens.colors.accentPrimaryHover.value};
  }
`;
```

이렇게 토큰을 직접 참조하면, 나중에 `accentPrimary` 값을 한 번만 바꿔도 전체 컴포넌트가 자동으로 업데이트된다. CLI에서는 코드 생성 후 `tokens` 모듈을 import 했는지 즉시 확인하고, 에디터 익스텐션에서는 인라인 completion으로 토큰 이름을 쉽게 선택할 수 있다.

## 프론트엔드 시나리오: 반응형 카드 그리드

프론트엔드 현장에서 잦은 업무 중 하나가 “디자인 시스템 토큰을 이용해 반응형 카드 레이아웃을 만드는 일”이다. Codex와의 대화를 아래처럼 구성하면 반복 작업을 빠르게 자동화할 수 있다.

### 1. 베이스 프롬프트

```text
환경: Next.js + TypeScript, CSS-in-JS는 styled-components.
디자인: tokens/layout.json, tokens/colors.json만 사용합니다.
요구:
- 접근성 역할/ARIA 속성을 누락하지 않습니다.
- breakpoint는 sm(640px), md(1024px), lg(1280px) 고정입니다.
- 작성한 코드에 대한 Storybook 스토리 초안을 함께 제안합니다.
```

### 2. Codex와 단계별 대화

1. **와이어 정리**: “3열 카드, 모바일에서는 1열로 떨어지고, 카드 안에는 썸네일/타이틀/메타를 배치한다”처럼 구성요소를 자연어로 설명한다.
2. **코드 요청**: `components/dashboard/CardGrid.tsx` 생성을 지시하고, 필요한 prop 타입과 styled-components 레이어를 구분해 달라고 명시한다.
3. **검증**: “생성된 코드 기반으로 jest/stories/CardGrid.stories.tsx를 작성해줘”라고 이어서 테스트/스토리 생성을 맡긴다.
4. **리뷰 루프**: CLI에서는 `codex run "pnpm test CardGrid"`로 결과를 바로 확인하고, VS Code 익스텐션에서는 인라인 diff를 수용해 스타일을 미세한 수준에서 다듬는다.

### 3. JSON & MCP 활용

디자인 토큰을 JSON으로 관리한다면 MCP 서버에 등록해 Codex가 직접 참조하게 할 수 있다.

```json
{
  "servers": {
    "designTokens": {
      "url": "https://mcp.example.com/tokens",
      "resources": ["tokens/layout.json", "tokens/colors.json"]
    }
  }
}
```

이후 대화에서 “`designTokens` 리소스에서 spacing.small, colors.surface 값을 사용해줘”라고 요청하면 Codex가 실제 값을 불러와 코드에 반영한다. CLI는 토큰 값을 곧바로 확인하며 여러 파일을 수정하는 데 유리하고, 에디터 익스텐션은 동일 토큰을 인라인 제안으로 보여주기 때문에 즉석 미세 조정이 편하다.

### 4. 마무리

1. CLI에서 `codex plan`으로 “컴포넌트 작성 → Storybook 추가 → 테스트 실행” 순서를 명시하면 Codex가 단계별로 보고한다.
2. `codex files changed`로 생성된 파일을 목록화한 뒤, 에디터 익스텐션에서 최종 UI 미리보기와 코드 스타일을 정리한다.

이런 시나리오를 템플릿화해두면 새 페이지나 섹션을 만들 때마다 “베이스 프롬프트 붙여넣기 → 단계별 명령”만으로 일관된 결과를 얻을 수 있다.

## Codex 활용 팁

1. **자동화 가능한 건 Codex에 떠넘기기**: 반복되는 rename, find & replace, boilerplate 생성은 스스로 하지 말고 맡긴다.
2. **결과 검증은 직접 수행**: lint/test 명령은 Codex가 대신 실행해도, 실패 원인을 읽고 판단하는 건 결국 사람 역할이라 로그를 꼭 확인한다.
3. **실패도 기록**: 명령이 막혔을 때 에러 로그를 그대로 전달하면 Codex가 우회 전략을 제안한다. “안 돼요”라고만 말하면 대화가 끊긴다.

마지막으로, **프롬프트는 단발성이 아니라 축적 자산**이다. 자주 쓰는 템플릿을 README나 개인 노트에 모아두고 Codex 대화에서 그대로 붙여 넣으면 작업 속도가 기하급수적으로 빨라진다.

---

Codex는 멀티모달 도구라기보다 “명령어 해석기 + 작업 동료”에 가깝다. 맥락을 세심하게 제공하고 검증 루프를 함께 설계하면, 번거로운 반복 업무를 자동화하면서도 결과의 품질을 유지할 수 있다.
