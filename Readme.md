
# 프로젝트 설명

이 프로젝트는 영화 및 TV 쇼를 탐색하고 관리할 수 있는 웹 애플리케이션입니다. 사용자는 다양한 영화와 TV 프로그램을 검색하고, 즐겨찾기 추가 및 세부 정보를 확인할 수 있습니다. 이 애플리케이션은 React와 TypeScript를 사용하여 개발되었으며, Material-UI를 통해 사용자 인터페이스를 구성합니다.

## 주요 기능

- **영화 및 TV 쇼 탐색**: 사용자는 현재 상영 중인 영화, 인기 있는 영화 및 TV 쇼를 탐색할 수 있습니다.
- **상세 정보 보기**: 각 영화 및 TV 쇼에 대한 상세 정보를 확인할 수 있습니다. 여기에는 개요, 장르, 평점, 제작사 등의 정보가 포함됩니다.
- **즐겨찾기 기능**: 사용자는 관심 있는 영화나 TV 쇼를 즐겨찾기에 추가하여 쉽게 접근할 수 있습니다.
- **반응형 디자인**: 다양한 화면 크기에서 최적의 사용자 경험을 제공하기 위해 반응형 디자인을 적용했습니다.
- **검색 기능**: 사용자는 영화 및 TV 쇼를 제목, 장르, 평점 등으로 검색할 수 있습니다.
- **정렬 및 필터링**: 사용자는 검색 결과를 인기, 평점, 제목 등으로 정렬하고, 장르를 필터링할 수 있습니다.

## 기술 스택

- **프론트엔드**: React, TypeScript, Material-UI
- **상태 관리**: Jotai, Tanstack Query
- **API 통신**: Axios를 사용하여 외부 API와 통신
- **스타일링**: Material-UI과 Styled-Components를 사용하여 스타일 관리
- **애니메이션**: Framer Motion을 사용하여 부드러운 애니메이션 효과 제공
- **라우팅**: Tanstack Router를 사용하여 라우팅 관리

## 설치 및 실행

1. **레포지토리 클론**:

    ```bash
    git clone https://github.com/DeokJong/wsd-movie-clone
    ```

2. **의존성 설치**:

    ```bash
    npm install
    ```

3. **개발 서버 실행**:

    ```bash
    npm run dev
    ```

4. **브라우저에서 열기**: [http://localhost:5173](http://localhost:5173)

## API 사용

이 애플리케이션은 외부 영화 데이터 API를 사용하여 영화 및 TV 쇼 정보를 가져옵니다. API 호출은 `src/client/services` 디렉토리 내의 서비스 클래스를 통해 관리됩니다.

## 기여

기여를 원하시는 분은 다음 단계를 따라주세요:

1. **포크(fork)한 후 브랜치를 생성합니다**:

    ```bash
    git checkout -b <branch-name>
    ```

2. **변경 사항을 커밋합니다**:

    ```bash
    git commit -m "Add your message"
    ```

3. **브랜치에 푸시합니다**:

    ```bash
    git push origin <branch-name>
    ```

4. **Pull Request를 생성합니다**.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE 파일](./LICENSE)을 참조하세요.

## 추가 정보

- **사용자 인증**: 사용자는 로그인 후 애플리케이션에 접근할 수 있으며, 로그인하지 않은 경우에는 로그인 페이지로 리디렉션됩니다.
- **UI 구성 요소**: 애플리케이션은 다양한 UI 구성 요소를 사용하여 사용자 경험을 향상시키고 있습니다. 예를 들어, `Header`, `Banner`, `Poster`, `HorizontalScrollContainer` 등의 컴포넌트가 있습니다.
- **상태 관리**: Jotai와 React Query를 사용하여 애플리케이션의 상태를 관리하고, API 호출을 최적화합니다.
