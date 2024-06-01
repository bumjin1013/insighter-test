# 실행 방법
```bash
1. npm i
2. npm run dev
```

# 폴더 구조

```bash
src
│
├── apis
│   └── event.ts (axios로 목업데이터 호출)
│
├── app
│   ├── page.tsx (메인 페이지)
│   └── ... (기본 파일들)
│
├── components
│   ├── common (공통으로 사용 가능한 컴포넌트)
│   │     ├── AlertModal.tsx (알림 모달)
│   │     └── Pagenation.tsx (페이지네이션)
│   ├── event
│   │     ├── EditModal.tsx (이벤트 수정 모달)
│   │     ├── EventCard.tsx (이벤트 카드 컴포넌트)
│   │     └── Sort.tsx (정렬 / 필터 컴포넌트)
│   └── styles (Styled-Component)
│        ├── EventCardStyles.tsx (이벤트 카드 스타일)
│        └── ModalStyles.tsx (모달 스타일)
│   
│
└── types
    └── event.ts (이벤트에 관련된 타입 정의)
    
```
