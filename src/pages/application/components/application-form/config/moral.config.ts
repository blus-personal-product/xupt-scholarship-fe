import { BaseScoreItem } from './index';

export type MoralScoreItem = BaseScoreItem<
  'national' | 'provincial' | 'municipal' | 'bureau' | 'school',
  100 | 60 | 50 | 40 | 10
>
export const moralScoreList: MoralScoreItem[] = [
  {
    level: 'national',
    title: '国家级表彰者',
    score: 100,
  },
  {
    level: 'provincial',
    title: '省级表彰者',
    score: 60,
  },
  {
    level: 'municipal',
    title: '市级表彰者',
    score: 50,
  },
  {
    level: 'bureau',
    title: '厅局级以上表彰者',
    score: 40,
  },
  {
    level: 'school',
    title: '校级表彰者',
    score: 10,
  }
]