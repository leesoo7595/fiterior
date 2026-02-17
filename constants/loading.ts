export type LoadingStep = {
  key: string
  label: string
}

export const LOADING_STEPS: LoadingStep[] = [
  { key: 'upload', label: '사진을 불러오는 중' },
  { key: 'prepare', label: '변환 준비 중' },
  { key: 'generate', label: 'AI가 인테리어를 변환하고 있어요' },
  { key: 'polish', label: '색감과 디테일을 다듬는 중' },
]

export const STATUS_INTERVAL_MS = 1400
