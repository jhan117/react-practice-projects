## 프로젝트 소개

Redux를 사용하여 상태 관리 해보기

Redux를 React에서 사용해보고 Toolkit도 사용해보는 과정이다.

## 핵심 기능

- 로그인 상태별 컴포넌트 조건부 렌더링
- 숫자 카운트 및 카운트 컴포넌트 보이기 버튼

## 사용한 개념

- 함수형 컴포넌트에서 `useSelector`, `useDispatch` 훅을 이용해 Redux를 사용할 수 있다.
- 클래스 컴포넌트에서 `connect` 함수를 이용해 Redux를 사용할 수 있다.
- Redux Toolkit을 이용해 기존의 reducer 함수의 action.type 오타 문제를 해결할 수 있다.
  `createSlice` 함수를 이용해 조각을 만들고 `configureStore` 함수를 이용해 다수의 reducer 함수를 알아서 합치게 사용할 수 있다.
- 만약 payload를 전달하고 싶은 경우 action 객체에 추가하여 해결할 수 있다

[블로그에 중요한 개념을 정리해놨습니다](https://jhan117.github.io/react/react-learn13/)
