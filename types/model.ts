export type ModelId = 'gpt-4o' | 'claude' | 'stable-diffusion' | 'dall-e' | 'midjourney'

export interface Model {
  id: ModelId
  name: string
  icon: string
  color: string
  estimatedTime: string
  cost: string
}
