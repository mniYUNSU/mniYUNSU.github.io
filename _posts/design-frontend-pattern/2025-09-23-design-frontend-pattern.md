---
layout: post
title: 프론트엔드 개발에서 바로 쓰는 디자인 패턴 3가지
date: 2025-09-23 10:00:00 +0900
modified: 2025-09-23 10:00:00 +0900
categories: [Design Pattern]
tags: [Design Pattern, Frontend, React]
description: 조건문을 줄이고 컴포넌트를 정리하는 프론트엔드 친화 디자인 패턴을 정리했다.
---

프론트엔드는 끊임없이 변하는 요구사항 덕분에 잠깐만 눈을 떼도 조건문이 폭발하고 컴포넌트가 지저분해지기 쉽다. 복잡한 UML을 그리지 않아도, 몇 가지 디자인 패턴만 챙기면 유지보수성이 눈에 띄게 좋아진다. 현업에서 자주 겪는 불편함을 기준으로, 실제로 꺼내 쓰기 쉬운 패턴과 TypeScript + React 예제를 정리했다.

## 1. 전략 패턴(Strategy)으로 조건문 다이어트하기

**언제 쓰나?** 하나의 기능을 여러 변형으로 제공해야 할 때. 보통 `if/else` 나 `switch` 문이 길게 늘어져 있을 때다.

**핵심 아이디어**는 "행동"을 객체로 분리하고, 상황에 따라 적절한 전략(객체)을 주입해서 실행하는 것이다. React에서는 맵 객체를 두고 props에 따라 전략을 선택하는 식으로 구현하면 아주 자연스럽다.

```tsx
import { useMemo } from 'react';

type PaymentType = 'card' | 'bank' | 'voucher';

type PaymentStrategy = {
  label: string;
  render: () => JSX.Element;
  submit: () => Promise<void>;
};

const paymentStrategies: Record<PaymentType | 'default', PaymentStrategy> = {
  card: {
    label: '신용카드 결제',
    render: () => <CardFields />, // 필요한 UI만 책임진다
    submit: async () => {
      await requestCardPayment();
    }
  },
  bank: {
    label: '계좌 이체',
    render: () => <BankFields />,
    submit: async () => {
      await requestBankTransfer();
    }
  },
  voucher: {
    label: '상품권 등록',
    render: () => <VoucherFields />,
    submit: async () => {
      await registerVoucher();
    }
  },
  default: {
    label: '결제 수단 선택',
    render: () => <EmptyState message='결제 수단을 골라주세요' />,
    submit: async () => Promise.resolve()
  }
};

export const PaymentForm: React.FC<{ type: PaymentType | null }> = ({
  type
}) => {
  const strategy = useMemo(() => paymentStrategies[type ?? 'default'], [type]);

  const handleSubmit = async () => {
    await strategy.submit(); // 새로운 결제 수단이 생겨도 조건문이 늘어나지 않는다
  };

  return (
    <section>
      <h2>{strategy.label}</h2>
      <strategy.render />
      <button onClick={handleSubmit}>결제하기</button>
    </section>
  );
};
```

- 전략을 추가할 때는 새 객체만 추가하면 된다. 기존 코드를 건드리지 않으므로 개방 폐쇄 원칙(OCP)을 자연스럽게 지킨다.
- 테스트도 전략 단위를 기준으로 작성하면 된다. 예를 들어 `paymentStrategies.card.submit` 함수를 독립적으로 검증할 수 있다.

## 2. 상태 패턴(State) + `useReducer` 로 상태 전이 관리하기

**언제 쓰나?** 모달, 폼, 결제 흐름처럼 상태가 여러 단계로 바뀌고 각 상태에서의 UI/동작이 달라질 때. "이 단계일 땐 이 버튼을 보여주고..." 같은 조건문이 퍼져 있을 때 특히 효과적이다.

**핵심 아이디어**는 상태를 객체로 정의하고, 상태 전이를 책임지는 함수를 해당 객체에 붙여서 무분별한 조건문을 없애는 것.

```tsx
import { useReducer } from 'react';

type Step = 'idle' | 'loading' | 'success' | 'error';

type StateShape = {
  view: JSX.Element;
  next: () => Action;
};

type Action = { type: 'SUBMIT' } | { type: 'RETRY' } | { type: 'RESET' };

type Context = {
  retry: () => Promise<void>;
  submit: () => Promise<void>;
};

const createStateMachine = (ctx: Context): Record<Step, StateShape> => ({
  idle: {
    view: <SubmitButton label='결제하기' />,
    next: () => ({ type: 'SUBMIT' })
  },
  loading: {
    view: <Spinner message='결제 진행 중' />,
    next: () => ({ type: 'RESET' })
  },
  success: {
    view: <ResultBanner tone='success' message='결제가 완료되었습니다' />,
    next: () => ({ type: 'RESET' })
  },
  error: {
    view: <ResultBanner tone='error' message='다시 시도해주세요' />,
    next: () => ({ type: 'RETRY' })
  }
});

const reducer =
  (ctx: Context) =>
  (state: Step, action: Action): Step => {
    switch (state) {
      case 'idle':
        if (action.type === 'SUBMIT') {
          void ctx.submit();
          return 'loading';
        }
        return state;
      case 'loading':
        return action.type === 'RESET' ? 'idle' : state;
      case 'success':
        return action.type === 'RESET' ? 'idle' : state;
      case 'error':
        if (action.type === 'RETRY') {
          void ctx.retry();
          return 'loading';
        }
        return state;
    }
  };

export const CheckoutStepper: React.FC<Context> = (context) => {
  const machine = createStateMachine(context);
  const [step, dispatch] = useReducer(reducer(context), 'idle');
  const shape = machine[step];

  return (
    <section>
      {shape.view}
      <button onClick={() => dispatch(shape.next())}>다음</button>
    </section>
  );
};
```

- 상태 전이에 관한 로직을 reducer 쪽으로 몰아넣고, 상태별 UI는 `StateShape` 객체로 분리했다.
- `CheckoutStepper` 는 현재 상태가 무엇인지에 관심 없고, 단순히 `machine[step]` 을 읽어 렌더링한다.
- 새 단계가 필요하면 `createStateMachine` 에 해당 상태를 추가하고 reducer가 전이만 책임지도록 리팩터링하면 된다. 상태가 늘어나도 컴포넌트 본문이 복잡해지지 않는다.

## 3. 컴파운드 컴포넌트(Compound Component)로 props 폭발 막기

**언제 쓰나?** 모달, 탭, 스텝퍼처럼 여러 하위 요소가 상호작용해야 하는 UI. 한 컴포넌트에 props를 끝없이 추가하고 `if` 로 분기하는 상황을 종종 본다.

**핵심 아이디어**는 Context로 공유 상태를 묶고, 자식 컴포넌트들에게 자연스럽게 나눠 갖도록 하는 것이다. 부모 컴포넌트는 API(컴파운드 컴포넌트 세트)를 정의하고, 내부 구현은 숨긴다.

```tsx
import { createContext, useContext, useState } from 'react';

type TabsContextValue = {
  activeValue: string;
  setActiveValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound component 밖에서 사용했습니다.');
  return ctx;
};

interface TabsRootProps {
  defaultValue: string;
  children: React.ReactNode;
}

const TabsRoot: React.FC<TabsRootProps> = ({ defaultValue, children }) => {
  const [activeValue, setActiveValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div role='tablist'>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children
}) => {
  const { activeValue, setActiveValue } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      role='tab'
      aria-selected={isActive}
      onClick={() => setActiveValue(value)}
      className={isActive ? 'tab tab--active' : 'tab'}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children
}) => {
  const { activeValue } = useTabsContext();
  if (activeValue !== value) return null;
  return <div role='tabpanel'>{children}</div>;
};

export const Tabs = Object.assign(TabsRoot, {
  Trigger: TabsTrigger,
  Content: TabsContent
});
```

사용법은 다음과 같이 매우 직관적이다.

```tsx
<Tabs defaultValue='overview'>
  <Tabs.Trigger value='overview'>개요</Tabs.Trigger>
  <Tabs.Trigger value='spec'>스펙</Tabs.Trigger>

  <Tabs.Content value='overview'>
    <OverviewPanel />
  </Tabs.Content>
  <Tabs.Content value='spec'>
    <SpecPanel />
  </Tabs.Content>
</Tabs>
```

- 부모 컴포넌트의 props는 `defaultValue` 정도로 최소화된다. 새로운 옵션이 필요하면 컴파운드 요소를 추가하면 된다.
- Context가 내부에서만 노출되기 때문에 외부에서는 구현 디테일을 신경 쓸 필요가 없다.
- 실제 UI 라이브러리(예: Radix UI, Chakra UI)의 핵심 패턴이기도 하다.

## 마무리

조건문이 줄어든다고 해서 패턴이 모든 것을 해결해 주지는 않는다. 핵심은 **행동을 역할별로 분리하고**, **확장 시 기존 코드를 건드리지 않게 만드는 구조**를 갖추는 것이다. 위 세 가지 패턴은 팀 내 코드 스타일과 잘 어울리면서도 러닝커브가 낮은 편이라, 점진적으로 도입하기 좋다.

패턴을 적용한 뒤에는 테스트 관점을 함께 정리해 두면 더 안전하다. 전략 패턴은 전략별 단위 테스트, 상태 패턴은 전이 테이블 검증, 컴파운드 컴포넌트는 접근성 속성 테스트가 좋은 출발점이 된다.
