import { Model } from '../types/model'

export const MODELS: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    icon: 'flash-outline',
    color: '#10A37F',
    estimatedTime: '약 15초',
    cost: '무료',
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: 'sparkles-outline',
    color: '#D97706',
    estimatedTime: '약 20초',
    cost: '무료',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    icon: 'color-palette-outline',
    color: '#7C3AED',
    estimatedTime: '약 30초',
    cost: '무료',
  },
  {
    id: 'dall-e',
    name: 'DALL-E 3',
    icon: 'image-outline',
    color: '#0EA5E9',
    estimatedTime: '약 20초',
    cost: '100 크레딧',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    icon: 'diamond-outline',
    color: '#E11D48',
    estimatedTime: '약 40초',
    cost: '200 크레딧',
  },
]
