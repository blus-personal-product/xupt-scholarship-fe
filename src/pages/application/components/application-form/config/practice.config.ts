/**
 * 实践活动计分=取得实践成果量化分+参加各类竞赛量化分+社会活动量化分
 */

import { BaseScoreItem, BaseLevelScoreItem, BaseTypeScoreItem } from './index';

/**
 * 实践成果量化得分
 * 
 * 实践成果中专利需授权，标准需获批立项。申报时必须提供授权（获批）证明。
 */
export type ResultScoreItem = BaseScoreItem<
  'international' | 'national' | 'industry' | 'invention' | 'utility' | 'software' | 'study_abroad' | 'case_library_professional',
  1000 | 500 | 125 | 100 | 40 | 20
>;

export const resultScoreList: ResultScoreItem[] = [
  {
    level: 'international',
    title: '国际标准',
    score: 1000,
  },
  {
    level: 'national',
    title: '国家标准',
    score: 500,
  },
  {
    level: 'industry',
    title: '行业标准',
    score: 125
  },
  {
    level: 'invention',
    title: '发明专利',
    score: 100
  },
  {
    level: 'utility',
    title: '实用新型专利',
    score: 40
  },
  {
    level: 'software',
    title: '软件著作权',
    score: 20
  },
  {
    level: 'study_abroad',
    title: '国（境）外学习（含在线）',
    score: 20
  },
  {
    level: 'case_library_professional',
    title: '入选专业学位教学指导委员会案例库',
    score: 20
  }
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

/**
 * 参加各类竞赛量化分
 * 
 * 仅认可互联网+、挑战杯、中国研究生创新实践系列大赛、陕西省研究生创新成果展。研究生创新成果展与省赛同级。
 */
export const competitionScoreList: CompetitionScoreItem[] = [
  {
    type: 'national',
    title: '国家级',
    children: [
      {
        level: 'first',
        title: '第一层次',
        score: 240
      },
      {
        level: 'second',
        title: '第二层次',
        score: 160
      },
      {
        level: 'third',
        title: '第三层次',
        score: 100
      }
    ]
  },
  {
    type: 'provincial',
    title: '省级',
    children: [
      {
        level: 'first',
        title: '第一层次',
        score: 50
      },
      {
        level: 'second',
        title: '第二层次',
        score: 40
      },
      {
        level: 'third',
        title: '第三层次',
        score: 30
      }
    ]
  }
];

export type SocialCadreLevel = 'leader' | 'deputy_leader' | 'committee';

export type SocialLevelScoreItem = BaseLevelScoreItem<
  SocialCadreLevel | 'school_activities' | 'college_activities',
  30 | 20 | 10 | 5 | 2
>

type SocialType = 'cadre' | 'activity';

/**参加社会活动量化分 */
export type SocialScoreItem = BaseTypeScoreItem<
  SocialType,
  SocialLevelScoreItem
>

export const SocialCadreMap: Record<SocialCadreLevel, string> = {
  leader: '主要负责人',
  deputy_leader: '副级负责人',
  committee: '管理人员',
}

/**
 * 社会活动量化考核
 * 
 * 1、社会工作计分按照学生干部的实际工作情况给分，兼任多项学生工作职务者计最高分，不累加；
 * 
 * 2、因解职、辞职、免职使任职时间不足一届的 2/3 的学生干部不予加分，增补、升任的干部按任职时间在 2/3 以上的职务计分；
 * 
 * 3、参加社会活动量化分由学生工作办公室认定
 */
export const SocialScoreList: SocialScoreItem[] = [
  {
    type: 'cadre',
    title: '学生干部',
    children: [
      {
        level: 'leader',
        title: [
          "研究生会主席",
          "年级负责人",
          "党员工作站站长"
        ],
        score: 30
      },
      {
        level: 'deputy_leader',
        title: [
          "研究生会副主席",
          "部长",
          "协会负责人",
          "学生党支部书记",
          "班长",
          "学生公寓党员工作站副站长"
        ],
        score: 20
      },
      {
        level: 'committee',
        title: [
          "副部长",
          "协会副职",
          "学生党支部委员",
          "学生公寓党员工作站站务委员"
        ],
        score: 10
      }
    ]
  },
  {
    // 校园活动可多次累计
    type: 'activity',
    title: '校园活动或其他',
    children: [
      {
        level: "school_activities",
        title: '学校活动',
        score: 5
      },
      {
        level: 'college_activities',
        title: '学院活动',
        score: 2
      }
    ]
  }
];