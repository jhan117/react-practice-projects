## 프로젝트 소개

최적화에 대해서 배우기

`memo()`, `useCallback()`, `useMemo()`를 학습하기 위한 과정이다.

[블로그 정리글](https://jhan117.github.io/react/react-learn8/)

## 핵심 기능

최적화에 대해서 학습하기 위해 버튼 기능만 추가하고 리팩토링을 하였음

## 사용한 개념

- memo를 이용하여 자식 컴포넌트가 부모에 따라 같이 재평가되는 것을 방지하였다.
- useCallback를 이용하여 함수의 경우 재생성되어 memo가 인식하지 못하는 문제를 해결하였다.
- useMemo를 이용하여 배열의 경우 함수와 마찬가지로 memo가 인식하지 못하는 문제를 해결하였다. 또한, sort된 배열 등 오래 걸리는 부분을 의존성 배열과 함께 필요할 때만 재생성되게 해 로딩 속도를 개선하였다.

## 기억하고 싶은 부분

최적화하는 데에는 비용이 든다. 그렇기 때문에 남발하기보다는 재평가 비용과 비교해서 더 나은 방안을 선택하는 것을 추천한다.

### React.memo

```js
import { memo } from "react";

export default memo(DemoOutput);
```

컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용한다.

React.memo는 props 변화에만 영향을 준다. props가 갖는 복잡한 객체에 대하여 "얕은" 비교만을 수행하는 것이 기본 동작이다.

React.memo가 얕은 비교만을 수행하기 때문에 함수나 배열, 객체의 경우 동작하지 않는 문제가 있다. 이를 위해 아래의 두 가지를 사용할 수 있다.

### useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

메모이제이션된 콜백을 반환한다.

### useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

메모이제이션된 값을 반환한다.
