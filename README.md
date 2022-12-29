## 프로젝트 소개

HTTP 요청 보내기

데이터베이스에 접근하기 위해서 API에 HTTP 요청을 보내는 법을 학습하기 위한 과정이다.

[블로그 정리글](https://jhan117.github.io/react/react-learn10/)

## 핵심 기능

HTTP 요청 코드만 작성하였음

## 사용한 개념

- `fetch()`를 사용하여 GET, POST 요청을 Firebase의 실시간 데이터베이스에 보낼 수 있다.
- 프로미스의 후속 처리 메서드 또는 async/await로 데이터를 받아올 수 있다.
- 로딩, 에러, 데이터 개수 상태를 관리하여 각각 상황에 맞게 사용자에게 알림으로써 UX를 개선할 수 있다.
- fetch 메서드를 사용할 때 프로미스에서는 `.catch`, async/await에서는 `try...catch`를 사용하여 에러를 처리할 수 있다.
- useEffect로 처음 렌더링시 HTTP 요청하는 코드를 작성할 수 있다.

## 기억하고 싶은 부분

데이터베이스와 백엔드 앱(또는 API:Application Programming Interface)은 다른 의미이다. 브라우저에서는 보안상 문제로 데이터베이스에 직접 접근할 수 없고 API를 통해 데이터베이스에 접근할 수 있다.

구글 Firebase는 실시간 데이터베이스 기능을 제공한다.

프로미스의 후속 처리 메서드, async/await로 데이터를 받을 수 있는데 간결한건 async/await이다.

### 프로미스의 후속 처리 메서드로 HTTP 요청

```js
// GET
fetch("url")
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// POST
fetch("url", {
  method: "POST",
  headers: { "content-Type": "application/json" },
  body: JSON.stringify(payload),
})
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

### async/await로 HTTP 요청

```js
// GET
async function fetchData() {
  try {
    const response = await fetch("url");
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// POST
async function fetchData() {
  try {
    const response = await fetch("url", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
```

### State에 맞게 조건부 렌더링하기

```js
// 기본값
let content = <p>Found no data.</p>;

if (data.length > 0) {
  content = <DataList />;
}

if (error) {
  content = <p>{error}</p>;
}

if (isLoading) {
  content = <p>Loading...</p>;
}
```
