import { BaseTagOption } from './index';

export interface MoralScoreItem extends BaseTagOption {
  level: 'national' | 'provincial' | 'municipal' | 'bureau' | 'school';
  title: string;
  score: 100 | 60 | 50 | 40 | 10;
}

export const moralScoreList: MoralScoreItem[] = [
  {
    level: 'national',
    title: '国家级表彰者',
    score: 100,
    color: 'cyan'
  },
  {
    level: 'provincial',
    title: '省级表彰者',
    score: 60,
    color: 'blue'
  },
  {
    level: 'municipal',
    title: '市级表彰者',
    score: 50,
    color: 'geekblue',
  },
  {
    level: 'bureau',
    title: '厅局级以上表彰者',
    score: 40,
    color: 'purple',
  },
  {
    level: 'school',
    title: '校级表彰者',
    score: 10,
    color: 'orange'
  }
]