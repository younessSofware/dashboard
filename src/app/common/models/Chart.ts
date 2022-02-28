export interface Chart{
  name: string,
  type: 'line' |'radial',
  categories: string[],
  values: number[],
  title: string,
  colors?: string[],
  max?: number,
}
