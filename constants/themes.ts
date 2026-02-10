import { Theme } from '../types/theme'

export const THEMES: Theme[] = [
  {
    id: 'modern',
    name: '모던',
    icon: 'cube-outline',
    color: '#2C2C2C',
    description: '깔끔한 라인과 세련된 색감의 현대적인 인테리어',
  },
  {
    id: 'minimal',
    name: '미니멀',
    icon: 'remove-outline',
    color: '#E8E8E8',
    description: '불필요한 요소를 줄인 심플하고 깨끗한 공간',
  },
  {
    id: 'nordic',
    name: '북유럽',
    icon: 'snow-outline',
    color: '#A8C5DA',
    description: '밝고 따뜻한 느낌의 스칸디나비아 스타일',
  },
  {
    id: 'industrial',
    name: '인더스트리얼',
    icon: 'construct-outline',
    color: '#8B7355',
    description: '노출 콘크리트와 메탈 소재의 거친 매력',
  },
  {
    id: 'natural',
    name: '내추럴',
    icon: 'leaf-outline',
    color: '#7CB342',
    description: '자연 소재와 식물로 채운 편안한 공간',
  },
  {
    id: 'classic',
    name: '클래식',
    icon: 'library-outline',
    color: '#C9A96E',
    description: '고급스러운 디테일과 우아한 분위기의 전통 스타일',
  },
]
