## 프로젝트 소개

음식 주문 앱

지금까지 배운 것을 사용해보기 위한 과정이다.

[블로그 정리글](https://github.com/jhan117/react-practice-projects/blob/main/study-notes/2022-12-27-react-learn7.md)

## 핵심 기능

- 음식 목록이 있으며 장바구니에 음식을 여러번 추가할 수 있고 수량도 정할 수 있다.
- 장바구니를 누르면 창이 뜨고 음식 수량을 변경할 수 있다.
- 장바구니 창에서 취소 버튼을 누르거나 backdrop을 누르면 창이 사라진다.

## 사용한 개념

- State를 이용하여 조건부 렌더링을 구현하였다.
- Reducer를 이용하여 장바구니의 Context 데이터를 관리하였다.
  - Reducer를 이용한 이유는 추가하고 삭제할 때 업데이트할 로직이 복잡하기 때문이다. 아이템이 존재하는지 확인해야 하고 확인한 결과를 토대로 업데이트 방법이 다르기에 로직이 복잡하다고 판단했다.
  - state 객체로는 items 라는 배열과 totalAmount이라는 숫자 변수를 사용하였다.
- Context API를 이용하여 장바구니 관련 데이터를 관리하였다.
  - Context를 사용한 이유는 장바구니 창이 Modal 창이었기 때문에 최상단에 위치해 있었다. 그래서 데이터를 받아오고 넘겨주기엔 긴 props 체인이 생길 것이라고 생각했다.
  - 장바구니 버튼(HeaderCartButton.js)에서는 Context의 items 데이터를 가져와서 reduce함수로 amount 값만 더해준 뒤 사용하였다.
  - 음식 목록에서 보여질 음식(MealItem.js)에서 Context의 addItem 함수를 이용해 데이터를 추가했다.
  - 장바구니 데이터가 보여질 장바구니(Cart.js)에서 Context를 이용하여 데이터를 가져오고 또한, 버튼의 기능에 맞게 데이터를 처리하는 함수를 이용했다.
- Portal를 이용하여 Modal과 Backdrop 컴포넌트를 구현하였다.
  - Portal을 사용한 이유는 스크린리더가 이놈들이 overlay구나를 알게 하기 위해서였다. 즉, 접근성을 위해서이다.
- ForwardRef를 이용하여 사용자 정의 컴포넌트인 Input 컴포넌트의 내부 속성을 받아오게 하였다.
  - ForwardRef를 사용한 이유는 props로 ref를 전달해줄 수 없기 때문이다.
- useEffect를 이용하여 아이템이 추가될 때마다 모션 기능이 나타나는 것을 구현했다.
  - Side Effect였기에 useEffect를 사용했고 디바운싱으로 재호출이 너무 빠르면 타이머를 취소하는 cleanup 함수로 구현했다.

## 기억하고 싶은 부분

메서드를 사용하는 부분이 인상깊었기에 JS 개념이지만 쓰려고한다.

### bind 메서드 이용하여 사전에 인수 바인딩하기

bind가 명시적으로 함수를 호출 해야 하는 특성(불러야 호출된다는 뜻)이 있는데 이를 이용해서 미리 인수를 바인딩해준 것이다. 이렇게 사용하면 아래 Item 컴포넌트에 인수로 전달해줄 item을 props로 따로 전달해 호출하지 않아도 된다는 장점이 있다.

```js
<Item onRemove={removeHandler.bind(null, item)} />

// Item.js
<button onClick={props.onAdd}>+</button>
```

바인딩이란 식별자와 값을 연결하는 과정을 말한다.

### findIndex 메서드 이용하여 index 가져오기

`findIndex()`는 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이 true인 첫 번째 요소의 인덱스를 반환한다. 존재하지 않는다면 -1을 반환한다.

```js
const users = [
  { id: 1, name: "Lee" },
  { id: 2, name: "Kim" },
];

// id가 2인 요소의 인덱스를 구한다.
users.findIndex((user) => user.id === 2); // → 1
```

업데이트 할 배열 목록에서 특정 요소를 "업데이트" 하고 싶다면 유용한 방법이다.

### filter 메서드 이용하여 요소 필터하기

filter 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다. 이때 원본 배열은 변경되지 않는다.

```js
const numbers = [1, 2, 3, 4, 5];

const odds = numbers.filter((item) => item % 2); // → [1, 3, 5]
```

업데이트 할 배열 목록에서 특성 요소를 "제거" 하고 싶다면 유용한 방법이다.
