## 프로젝트 소개

section8보다 깔끔하게 작성하기

Fragments, Portals, Refs를 학습하기 위한 과정이었다.

[블로그 정리글](https://github.com/jhan117/react-practice-projects/blob/main/study-notes/2022-12-26-react-learn5.md)

## 핵심 기능

- 유저 정보 입력하고 보여주기 프로젝트와 같음.
- 기능은 같으나 코드가 다름.

## 기억하고 싶은 부분

- Fragment
  JSX 제한사항인 루트 하나만 반환해야 한다는 점에 대해서 알아보고 이를 해결하기 위한 여러가지 방법 중 기존의 div 중첩보다 더 나은 Fragment 태그를 사용함.
- Portal
  기존의 오버레이, 모달은 html 코드 안쪽에 있기에 스크린 리더가 오버레이인지 판단하기 어려운 문제점을 파악하고 의미적인 관점에서 코드를 개선하기 위해 reactDOM의 `createPortal()`을 이용해 웹 접근성을 높였음.
- Ref
  DOM 요소에 접근할 수 있는 방법이고 특정 상황에서 state의 대안으로 쓰일 수 있음을 알았고 input 태그에 ref를 적용해 ref와 state 방식의 차이점을 파악했음. Ref는 DOM을 직접 수정해야 하는 문제점이 있지만 코드가 줄어들기에 그리고 쉽게 접근할 수 있으므로 input 태그에서는 자주 쓰인다는 점을 알았고 ref를 사용함. ref를 사용한 input 태그는 DOM 내부에서 작동하므로 제어되지 않는 컴포넌트라고 불리는 것을 알았음.
