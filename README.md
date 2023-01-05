## 프로젝트 소개

NextJs와 Vercel, MongoDB 이용해 보기

## 사용한 개념

- NextJS 프로젝트를 시작할 수 있고 React 컴포넌트와 혼용할 수 있다.
- `useRouter()`를 이용하여 query 값을 가져오고 경로를 변경할 수 있다.
- `Link`를 이용하여 연결할 수 있다.
- 데이터를 사전 렌더링 두 가지 형태를 이용해 Fetch 할 수 있다.
  - SSG는 요청 객체에 접근할 필요가 없고 자주 변경되는 데이터가 아니라면 사용하는 것을 추천한다.
  - SSG : `getStaticProps()`를 사용할 수 있다. params를 사용하는 경우에는 `getStaticPaths()`를 사용하여 해결할 수 있다.
  - SSR은 데이터가 자주 변경된다면 사용하는 것을 추천한다.
  - SSR : `getServerSideProps()`를 사용할 수 있다.
- MongoDB와 연결해서 불러오고 추가하고 일치하는 것만 불러올 수 있다.
  - `find()`: 전체 가져오기
    - `find({}, {_id : 1})` : 전체의 \_id만 가져오기
  - `insertOne()` : 하나의 새로운 데이터 넣기
  - `findOne()` : 일치하는 것 하나 찾기
- NextJS에서 .env 파일을 사용하는 법에 대해서 찾아봤고 사용할 수 있다.
- Head 컴포넌트를 이용해 meta를 설정할 수 있다.
- NextJS 프로젝트를 Vercel을 이용하여 배포할 수 있다.
  - Vercel을 선택한 이유는 NextJS를 개발한 팀과 같은 팀이 만들었고 NextJS에 최적화가 잘 되어 있기 때문이다.
  - 다른 브랜치, 다른 하위 폴더인 경우임에도 설정을 변경해 배포 완료했다.

[bigger-project 배포 사이트](https://react-practice-projects-o2cc9xuur-jhan117.vercel.app/)

[블로그에 중요한 개념을 정리해놨습니다](https://jhan117.github.io/react/react-learn18/)
