import { BaseScoreItem } from './index';

// 科研项目量化分
type InnovativeProjects = 'xupt_innovative_major_project' | 'xupt_innovation_key_project' | 'xupt_innovation_general_project'
/**
 * 科研项目
 */
export type ScientificScoreItem = BaseScoreItem<
  'national' | 'provincial' | 'bureau' | InnovativeProjects,
  40 | 30 | 20 | 15
>;

export const ScientificScoreList: ScientificScoreItem[] = [
  {
    title: "国家级项目",
    level: 'national',
    score: 30
  },
  {
    title: "省部级、副省级项目",
    level: 'provincial',
    score: 20
  },
  {
    title: "厅局级、横向项目",
    level: 'bureau',
    score: 15
  },
  {
    title: '西安邮电大学研究生创新基金重大项目',
    level: 'xupt_innovative_major_project',
    score: 40,
  },
  {
    title: '西安邮电大学研究生创新基金重点项目',
    level: 'xupt_innovation_key_project',
    score: 30
  },
  {
    title: '西安邮电大学研究生创新基金一般项目',
    level: 'xupt_innovation_general_project',
    score: 20
  }
];