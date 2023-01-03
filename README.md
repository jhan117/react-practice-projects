## 프로젝트 소개

react router 사용하여 다중 페이지 구현하기

react router의 v5, v6을 사용해보며 경로를 학습하는 과정이다.

## 사용한 개념

- react router 라이브러리를 이용해 다중 페이지를 HTML 요청 없이 구현할 수 있다.
- react-router v5
  - BrowserRouter, Switch, Route, Link, NavLink 컴포넌트를 이용해 클라이언트 사이드 Routing을 할 수 있다.
  - Route의 동적 세그먼트를 `useParams` 훅을 이용해 접근할 수 있다.
  - Nested, Redirect, Not Found Route를 만들 수 있다.
  - `useHistory` 훅을 이용해 페이지를 이동할 수 있다.
  - Prompt 컴포넌트를 이용해 상황에 맞게 경고창을 띄울 수 있다.
  - 쿼리 매개변수를 `useLocation` 훅을 이용하고 URLSearchParams 객체로 변환해 사용할 수 있다.
  - `path` 하드 코딩을 줄이기 위해 `useLocation`이나 `useRouteMatch`를 이용할 수 있다.

react-router v6는 프로젝트를 구축하지 않고 블로그에 정리해놨다.

[블로그에 중요한 개념을 정리해놨습니다](https://jhan117.github.io/react/react-learn/)
