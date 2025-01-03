
# 과제 TODO 리스트

## 1. 개발 환경 설정

- [ ] Node.js 개발 환경 구축
- [ ] Vue.js 또는 React.js 프로젝트 초기화
- [ ] `package.json` 파일 포함 확인
- [ ] `.gitignore` 설정하여 `node_modules` 폴더 제외
- [ ] 프로젝트가 정상적으로 실행 및 빌드되는지 확인

## 2. 버전 관리 및 GitHub 설정

- [ ] GitHub에 프로젝트 저장소 생성
- [ ] Gitflow 브랜치 전략 적용
  - [ ] `main` 브랜치 생성 (제품 출시용)
  - [ ] `develop` 브랜치 생성 (개발용)
  - [ ] `feature` 브랜치 생성 및 기능 개발
- [ ] 의미 있는 태그(tag) 전략 수립
- [ ] 효율적인 커밋 관리
  - [ ] 명확한 커밋 메시지 작성
  - [ ] 논리적인 단위로 커밋 분할
- [ ] 효과적인 `README.md` 파일 작성
  - [ ] 프로젝트 기본 정보
  - [ ] 사용 기술 스택 명시
  - [ ] 설치 및 실행 가이드
  - [ ] 프로젝트 폴더 구조 설명
- [ ] (Optional) 개발 가이드 작성
  - [ ] 코딩 컨벤션
  - [ ] 커밋 메시지 규칙
  - [ ] 브랜치 전략 설명
  - [ ] PR 템플릿 및 이슈 등록 방법 안내
- [ ] (Optional) Pull Request 기반 워크플로우 적용
  - [ ] PR 템플릿 작성 및 활용
  - [ ] 코드 리뷰 프로세스 수립
- [ ] (Optional) GitHub 프로젝트 관리
  - [ ] 이슈 트래킹 및 마일스톤 관리
  - [ ] 칸반 보드 활용
  - [ ] 위키(Wiki)를 통한 문서화
- [ ] (Optional) GitHub Actions를 통한 CI/CD 구축
- [ ] (Optional) 브랜치 보호 규칙 설정

## 3. 프론트엔드 개발

- [ ] Vue.js 또는 React.js를 활용한 SPA 개발
- [ ] 컴포넌트 기반 설계 및 개발
- [ ] 동적 바인딩을 통한 데이터 전달 (Top-Down)
- [ ] 자식 컴포넌트에서 부모 컴포넌트로의 데이터/이벤트 전달 (Bottom-Up)
- [ ] 반복 렌더링과 조건부 렌더링 구현
- [ ] JavaScript 또는 TypeScript의 함수/클래스 활용
- [ ] Ref를 활용한 변수 선언 및 DOM 접근
- [ ] View/Component에 따른 폴더 구조 정형화
- [ ] Router를 활용한 SPA 라우팅 처리
- [ ] 페이지 이동 시 트랜지션 효과 구현
- [ ] Custom Hook 또는 Composition API를 통한 로직 재사용성 향상
- [ ] HTTP 클라이언트(Axios 등)를 통한 TMDB API 연동
- [ ] (Optional) 상태 관리 라이브러리(Vuex/Redux) 사용하여 전역 상태 관리 구현

## 4. TMDB API 연동

- [ ] TMDB에서 API 키 발급 및 환경 변수로 설정
- [ ] API 인증 및 설정 구현
- [ ] 영화 데이터 요청 및 처리
  - [ ] 인기 영화 목록 조회
  - [ ] 영화 상세 정보 조회
  - [ ] 영화 검색 기능 구현
  - [ ] 장르별 영화 필터링
- [ ] API 요청 시 에러 핸들링 로직 구현
- [ ] (Optional) 이미지 리소스 관리 최적화
- [ ] (Optional) 데이터 캐싱 및 최적화

## 5. 로컬 스토리지 활용

- [ ] 로컬 스토리지에 최소 3개 이상의 키-값 쌍 저장
  - [ ] 회원가입 후 사용자 아이디 및 비밀번호 저장
  - [ ] 로그인 상태 유지 (자동 로그인)
  - [ ] 사용자의 선호 영화 목록 저장
- [ ] JSON 형식으로 데이터 저장 및 관리
- [ ] 로컬 스토리지 데이터 구조화 및 관리
- [ ] 데이터 버전 관리 및 정리 로직 구현
- [ ] 스토리지 용량 초과 등 에러 핸들링
- [ ] (Optional) 추가 데이터 저장
  - [ ] 최근 검색어 기록
  - [ ] 사용자 설정 (테마, 언어 등)
  - [ ] 시청 기록
  - [ ] API 데이터 캐싱

## 6. CSS 트랜지션 및 애니메이션

- [ ] CSS를 활용한 다양한 트랜지션 및 애니메이션 효과 구현
- [ ] 필수 구현 항목
  - [ ] 로그인-회원가입 페이지 전환 효과 구현 (제공된 예시 참고)
- [ ] 기본 트랜지션 효과 적용
  - [ ] 영화 카드 호버 시 확대 효과
  - [ ] 메뉴 아이템 상호작용 효과
  - [ ] 버튼 상태 변화 애니메이션
- [ ] (Optional) 성능 최적화
  - [ ] `transform` 속성 활용
  - [ ] `will-change` 적용
  - [ ] 하드웨어 가속 활용
- [ ] (Optional) JavaScript와 연동하여 애니메이션 제어
