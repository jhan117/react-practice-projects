## 프로젝트 소개

클래스 컴포넌트로 변환 및 에러 경계 사용하기

클래스 컴포넌트를 만들고 State, Event, 생명주기 메서드, Context, Error Boundaries를 학습하기 위한 과정이다.

[블로그 정리글](https://jhan117.github.io/react/react-learn9/)

## 핵심 기능

함수형 컴포넌트에서 클래스 컴포넌트로 변환하는 코드만 작성하였음

## 사용한 개념

- 클래스 컴포넌트를 만들 수 있다.
- 클래스 컴포넌트로 State, Event, Context를 사용할 수 있다.
  Context 경우 정적 메서드로 소비하는 법에 대해서도 알고 있다.
- 생명주기 메서드에 대해서 이해하고 사용할 수 있다.
- Error Boundaries를 언제 사용하는지 이해하고 사용할 수 있다.

## 기억하고 싶은 부분

클래스 컴포넌트를 더 선호하거나 프로젝트에서 사용해야하거나 Error Boundaries를 빌드할 때는 클래스 컴포넌트를 사용하는 것을 추천한다.

### 클래스 컴포넌트, props, event, state

- props : `this.props`
- event : 프로토타입 메서드, .bind(this)로 바인딩
- state : 생성자(`constructor()`), `this.state`, `this.setState`, state는 무조건 객체, 업데이트시 오버라이딩되지 않으며 함수 형식으로 업데이트 사용 가능

```javascript
class Welcome extends Component {
  constructor() {
    super();
    // state 생성 및 초기화
    this.state = { showUsers: true }; // 무조건 객체
  }

  toggleUsersHandler() {
    // state 업데이트 방법
    this.setState((curState) => ({
      showUsers: !curState.showUsers,
    }));
  }

  render() {
    return (
      <div>
        {/* props 사용법 */}
        <h1>Hello, {this.props.name}</h1>
        {/* event 및 state 사용법 */}
        <button onClick={toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
      </div>
    );
  }
}
```

### 생명주기 메서드

`componentDidMount() == useEffect(..., [])`

`componentDidUpdate(prevProps, prevState, snapshot) == useEffect(..., [someValue])`

이 때, 의존성 항목이 업데이트 될 때이므로 if문을 생성해 이전값과 비교를 해줘야 한다. 그렇지 않으면 무한 루프에 빠진다.

`componentWillUnmount() == useEffect(() => {return () => {...}}, []) // cleanup 함수`

### Context

Context, 공급자, 소비자 문법이 함수 컴포넌트와 같다.

소비할 때 소비자 말고 Context가 1개일 때만 사용할 수 있는 방법이다.

```javascript
// 정적 메서드
static contextType = UsersContext;

// 사용
this.context.users
```

### Error Boundaries

함수형 컴포넌트에 없는 기능이다. 자식 컴포넌트의 에러를 처리하고 싶을 때 사용하며 앱을 중단시키지 않는다는 장점이 있다.

1. 에러 경계 컴포넌트를 만들고 `componentDidCatch(error, info)`를 이용하여 에러를 가져오고 하고 싶은 동작을 작성한다.

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

2. 발생시키고 싶은 자식 컴포넌트 주변에 에러 경계 컴포넌트로 감싼다.

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
