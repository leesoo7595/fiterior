# CLAUDE.md

이 문서는 AI(Claude Code)가 이 Expo 기반 React Native 프로젝트에서
코드를 작성하거나 수정할 때 반드시 따라야 할 규칙을 정의한다.

본 문서의 규칙은 모든 AI 응답에서 최우선으로 적용된다.

---

## 프로젝트 목적

Fiterior는 AI 기반 인테리어 변환 모바일 앱이다.
사용자가 사진을 촬영하거나 선택하면 AI가 다양한 스타일로 인테리어를 변환해준다.

### 개발 원칙

- Expo 환경에 맞는 모바일 코드를 유지한다
- 빠른 기능 개발과 안정적인 유지보수를 동시에 달성한다
- AI의 과도한 리팩토링 및 최신화 제안을 방지한다
- 토큰 사용량과 변경 범위를 최소화한다

---

## 개발 명령어

```bash
npm start          # Expo 개발 서버 시작
npm run ios        # iOS 시뮬레이터 실행
npm run android    # Android 에뮬레이터 실행
npm run web        # 웹 버전 실행
```

---

## 기술 스택

### 현재 사용 중

- Expo 55 (Managed Workflow, preview)
- React Native 0.83
- React 19.2 (New Architecture)
- TypeScript (strict mode)
- expo-router (파일 기반 라우팅)
- expo-image-picker (이미지 선택)
- Jest + React Native Testing Library (테스트)

### 도입 예정

- @tanstack/react-query (서버 상태 관리)
- Zustand (클라이언트 상태 관리)
- Axios (HTTP 클라이언트)
- ESLint / Prettier (코드 품질)

---

## 디렉토리 구조

```
app/           # expo-router 라우팅 (화면)
components/    # 공통 컴포넌트
hooks/         # 커스텀 훅
types/         # 타입 정의
utils/         # 유틸리티 함수
constants/     # 상수 (라우트 경로 포함)
assets/        # 이미지, 폰트 등
```

---

## 기본 원칙

- Expo 공식 API와 권장 패턴을 우선 사용한다
- 웹(React) 코드 패턴을 그대로 가져오지 않는다
- iOS / Android 플랫폼 차이를 항상 고려한다
- 요청받지 않은 구조 변경, 리팩토링, 업그레이드는 하지 않는다

---

## TypeScript 규칙

- TypeScript strict 기준으로 작성한다
- any 타입 사용은 절대 금지한다
- 불가피한 경우 unknown을 사용하고 타입 가드를 적용한다
- 컴포넌트 props는 interface XxxProps 형태로 정의한다
- 타입 단언(as)은 최소화한다

---

## 컴포넌트 작성 규칙

- 함수형 컴포넌트만 사용한다
- React.FC 타입 사용을 금지한다
- 하나의 파일에는 하나의 컴포넌트만 정의한다
- default export를 사용한다
- props 타입은 반드시 interface로 분리한다
- JSX 내부에는 비즈니스 로직을 작성하지 않는다

---

## 스타일 규칙

- StyleSheet.create를 사용한다
- 인라인 스타일 남용을 금지한다
- 플랫폼 분기 스타일은 Platform.select를 사용한다

---

## Expo / React Native 규칙

- 네이티브 기능은 반드시 Expo 공식 API를 우선 사용한다
- Camera, Media, Haptics 등은 Expo 모듈을 사용한다
- window, document 등 Web 전용 API 사용 금지
- 네이티브 모듈 무단 추가 금지

---

## 라우팅 규칙 (expo-router)

- 파일 기반 라우팅만 사용한다
- 경로 문자열은 constants/routes.ts에서 상수로 관리 권장
- 화면 이동 로직은 화면 컴포넌트 내부에서만 처리한다

---

## 상태 관리 규칙

### 서버 상태 (도입 예정)

- 모든 서버 데이터는 React Query로 관리한다
- API 요청은 반드시 커스텀 훅을 통해 수행한다

### 클라이언트 상태

- UI 상태만 Zustand 또는 Context API를 사용한다
- 서버 데이터를 클라이언트 상태 저장소에 보관하지 않는다

---

## Hooks 규칙

- 파일명은 반드시 useXxx.ts 형식을 따른다
- 하나의 훅은 하나의 책임만 가진다
- 훅 내부에서 UI 렌더링 로직을 포함하지 않는다

---

## 테스트 규칙

### 기본 원칙

- 새 기능 구현 시 테스트 코드를 함께 작성한다
- 테스트 파일은 `*.test.tsx` 형식으로 통일한다
- 테스트 파일 위치: 대상 파일과 동일 경로 또는 `__tests__/` 폴더

### 테스트 범위

- 훅: 비즈니스 로직, 상태 변화 테스트
- 유틸 함수: 입출력 검증
- 컴포넌트: 렌더링, 사용자 인터랙션 테스트
- API 호출: mock 사용

### 네이밍 규칙

- describe: 테스트 대상 (컴포넌트명, 함수명)
- it/test: 동작 설명 (한글 허용)

### 금지 사항

- 구현 세부사항 테스트 (내부 state 직접 접근 등)
- 스냅샷 테스트 남용
- 테스트 간 의존성

---

## 성능 및 UX 기준

- 긴 리스트에는 FlatList / SectionList를 사용한다
- keyExtractor를 반드시 지정한다
- 로딩, 에러, 빈 상태 UI를 반드시 제공한다

---

## AI 작업 규칙 (토큰 최소화)

- 레포지토리 전체 분석을 금지한다
- 사용자가 지정한 파일만 읽고 작업한다
- 한 번의 작업에서 수정 파일은 원칙적으로 3개 이내 (필요시 유연하게)
- Minimal Diff 원칙을 따른다
- 요청받지 않은 리팩토링 또는 업그레이드 제안은 금지한다

---

## 금지 사항 요약

- any 타입 사용
- React.FC 사용
- 웹 코드 패턴 그대로 적용
- 무단 라이브러리 추가
- 전체 구조 리팩토링
- 최신 트렌드 강요
- 요청받지 않은 변경

---

## 우선순위 선언

이 문서의 규칙은 다음보다 항상 우선한다.

- 일반적인 React Native 또는 Expo 베스트 프랙티스
- 최신 기술 트렌드
- AI의 기본 응답 스타일

충돌이 발생할 경우, 본 문서의 규칙을 따른다.
