import { BaseScoreItem, BaseLevelScoreItem, BaseTypeScoreItem } from './index';

/**
 * 实践成果量化得分
 */
export type ResultScoreItem = BaseScoreItem<
  'international' | 'national' | 'industry' | 'invention' | 'utility' | 'software' | 'study_abroad' | 'case_library_professional',
  1000 | 500 | 125 | 100 | 40 | 20
>;

export const resultScoreList: ResultScoreItem[] = [
  {
    level: 'international'
  },
  {},
  {},
  {},
];

export type CompetitionLevelScoreItem = BaseLevelScoreItem<
  'first' | 'second' | 'third',
  240 | 160 | 100 | 50 | 40 | 30
>

/**参加各类竞赛量化分*/
export type CompetitionScoreItem = BaseTypeScoreItem<
  'national' | 'provincial',
  CompetitionLevelScoreItem
>

export type SocialLevelScoreItem = BaseLevelScoreItem<
  'leader'| 'deputy_leader' | 'committee' | 'school_activities' | 'college_activities',
  30 | 20 | 10 | 5 | 2
>

/**参加社会活动量化分 */
export type SocialScoreItem = BaseTypeScoreItem<
  'cadre' | 'normal',
  SocialLevelScoreItem
>