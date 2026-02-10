export type ThemeId = 'modern' | 'minimal' | 'nordic' | 'industrial' | 'natural' | 'classic'

export interface Theme {
  id: ThemeId
  name: string
  icon: string
  color: string
  description: string
}
