## 프로젝트 소개

로그인, 로그아웃 할 수 있는 페이지

Effects, Reducers, Context를 학습하기 위한 과정이다.

[블로그 정리글](https://github.com/jhan117/react-practice-projects/blob/main/study-notes/2022-12-26-react-learn6.md)

## 핵심 기능

기본 코드가 존재한 상황에서 몇 가지 기능을 추가하고 리팩토링을 하였음

- localStorage에 로그인 여부 저장
- 디바운싱(Debouncing)을 이용한 이메일 및 패스워드 유효성 검사
- Reducers 사용하여 state 관리
- 객체 디스트럭처링을 이용하여 의존성 변수 범위를 좁혀 useEffect 호출 횟수 감소
- 홈에서 로그인 후 로그아웃 기능 추가
- props대신 Context를 이용하여 props 체인 끊어주며 리팩토링
- 재사용하기 위해 Input 컴포넌트 생성
- 입력하지 않은 채 제출하려고 하면 input 태그 포커스 기능을 forwardRef를 이용하여 구현

## 기억하고 싶은 부분

### 리액트 훅의 규칙

1. React 컴포넌트 함수 및 커스텀 훅에서만 호출해야 한다.
2. 최상위 수준에서만 호출해야 한다. (중첩 함수, block statement 내부에서 불가능)

추가적으로 `useEffect()`의 경우 지키지 않을 이유가 없다면 항상 참조하는 모든 항목을 의존성으로 추가해야 한다.

그러나 의존성 배열에 추가하는 경우 예외적으로 생략해도 되는 경우가 있다.

- 상태 업데이트 기능 (setState)
- 내장 API 또는 함수 (예를 들어 `fetch()`)
- 외부에서 정의한 변수 또는 함수 (넣어도 어차피 영향이 없다.)

### `useEffect()` & Debouncing과 Cleanup & Destructuring

`useEffect(() => { ... }, [ dependencies ]);`

첫번째 인자는 Side Effect 코드가 포함된 함수, 두번째 인자는 의존성 배열이다.

Side Effect(무언가에 대한 "응답"으로 실행되는 모든 코드를 말한다. 예를 들어 HTTP 요청, 사용자 입력을 듣고 저장하는 것 등) 코드가 생성하는 무한루프 및 버그 등의 문제점을 해결해주는 리액트 훅이다. 의존성 배열에 의존성 항목이 없다면 호출할 때 한 번만 실행이 되고 의존성 항목이 있다면 의존성 항목이 업데이트 될 때마다 실행된다. 그렇기 때문에 의존성 항목에 객체 state를 다 넣는 것보다 속성을 추출하는 Destructuring을 통해 호출 횟수를 줄일 수 있다.

```js
// Destructuring
const { isValid: emailIsValid } = emailState;
const { isValid: passwordIsValid } = passwordState;
```

이전 타이머를 초기화해서 마지막으로 발생한 이벤트를 기준으로 특정 시간이 지난 후 하나의 이벤트만 실행하게 하는 것을 Debouncing이라고 한다. useEffect 함수는 함수 반환을 할 수 있는데 이 반환한 함수를 Cleanup 함수라고 한다. useEffect 함수가 실행되기 전(처음 제외)에 Cleanup 함수가 실행되는 것을 이용해 이전 타이머를 초기화할 수 있다.

```js
// Debouncing
useEffect(() => {
  const identifier = setTimeout(() => {
    setFormIsValid(emailIsValid && passwordIsValid);
  }, 500);

  // Cleanup
  return () => {
    clearTimeout(identifier);
  };
}, [emailIsValid, passwordIsValid]);
```

### `useReducer()`

|                   `useState()`                    |               `useReducer()`                |
| :-----------------------------------------------: | :-----------------------------------------: |
|               주요 state 관리 도구                |         더 강력함이 필요할 때 좋음          |
|            개별적인 state/data에 좋음             |          연관된 state/data에 좋음           |
| state 업데이트가 쉽고 종류가 적은 업데이트에 좋음 | 더 복잡한 state 업데이트가 있는 경우에 좋음 |

`const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);`

```js
// reducer function: 리액트 함수 외부에서 선언
// state는 기존의 값, action은 업데이트 할 때 가져온 새로운 값
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }

  return { value: "", isValid: false };
};
```

```js
// useReducer: 리액트 함수 내부에서 선언
const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: "",
  isValid: null,
});

const emailChangeHandler = (event) => {
  // state 업데이트: action 값이 됨
  dispatchEmail({ type: "USER_INPUT", value: event.target.value });
};
```

### `createContext()` & `useContext()`

폴더명은 보통 store, 파일명은 보통 kebab-case 사용한다.

Context는 매초마다 state가 변경되는 경우 최적화가 되어있지 않기 때문에 대체하는 것은 추천하지 않는다. 만약 긴 props 체인이 있고 매초마다 state가 변경된다면 Redux를 사용하는 것을 권장한다.

`const Component = createContext(initialState);`

createContext 함수가 반환한 것은 컴포넌트거나 컴포넌트를 감싸는 것이기에 PascalCase로 작성한다.

#### 공급

createContext 함수로 넣은 기본값은 공급자 없이 소비하는 경우에만 사용되므로 소비하려면 공급자에 value 속성으로 값을 넘겨줘야 한다.

```js
<AuthContext.Provider
  value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
>
  {/* ... */}
</AuthContext.Provider>
```

#### 소비

두가지 방법이 있으나 일반적으로 리액트 훅을 사용하는 방식을 사용한다.

1. 소비자 이용

```js
<AuthContext.Consumer>
  {(ctx) => {
    return <div>{ctx.isLoggedIn && <p>Login</p>}</div>;
  }}
</AuthContext.Consumer>
```

2. `useContext()` 이용

```js
const ctx = useContext(AuthContext);
```

#### Context 관리 컴포넌트 생성

만약 Context와 관련된 로직을 따로 구분하고 싶다면 사용할 수 있는 방법이다. 필수는 아니고 선택이다.

`index.js`에 공급자 컴포넌트로 감싸준다.

```js
// index.js
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
```

context 파일에서 컴포넌트 생성 후 export해준다.

```js
// auth-context.js
export const AuthContextProvider = (props) => {
  // 관련 로직 (리액트 훅 사용 가능 컴포넌트이기 때문에)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
```

### `forwardRef()` & `useImperativeHandle()`

리액트 컴포넌트와 명령형으로 상호작용할 수 있는 역할을 한다. 일반적인 리액트 패턴이 아니기 때문에 자주 사용해서는 안된다. 그러나 유용할 때가 있으니 참고하자. 예를 들어 인풋의 포커스이나 스크롤링 같은 경우에는 사용하면 우아한 방법으로 쓸 수 있다고 한다.

```js
// Input.js
import { useRef, useImperativeHandle, forwardRef } from "react";

// forwardRef로 감쌌지만 컴포넌트이다.
const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    // 외부에서 접근 가능한 이름을 객체로 키에 이름, 값에 함수를 넘겨준다.
    return {
      focus: activate,
    };
  });
});
```

```js
// Login.js
const emailInputRef = useRef();
const passwordInputRef = useRef();

const submitHandler = () => {
  if (!emailIsValid) {
    emailInputRef.current.focus(); // Input.js에서 설정한 외부에서 접근 가능한 이름
  } else {
    passwordInputRef.current.focus();
  }
};

return (
  <form>
    <Input ref={emailInputRef} />
    <Input ref={passwordInputRef} />
  </form>
);
```
