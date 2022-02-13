import { BaseLevelScoreItem, BaseScoreItem, BaseTypeScoreItem } from './index';

// 科研项目量化分
type InnovativeProjects = 'xupt_innovative_major_project' | 'xupt_innovation_key_project' | 'xupt_innovation_general_project'
/**
 * 科研项目
 */
export type ScientificScoreItem = BaseScoreItem<
  'national' | 'provincial' | 'bureau' | InnovativeProjects,
  40 | 30 | 20 | 15
>;

export const scientificScoreList: ScientificScoreItem[] = [
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

// 获奖量化分

export type AwardLevelScoreItem = BaseLevelScoreItem<
  'first' | 'second' | 'third',
  1500 | 750 | 300 | 200 | 150 | 100 | 60
>

export type AwardScoreItem = BaseTypeScoreItem<
  'provincial' | 'vice_province' | 'society_strength' | 'bureau',
  AwardLevelScoreItem
>

/**
 * 获奖量化分
 */
export const awardScoreList: AwardScoreItem[] = [
  {
    type: 'provincial',
    title: '省部级',
    children: [
      {
        level: 'first',
        title: '一等奖',
        score: 1500
      },
      {
        level: 'second',
        title: '二等奖',
        score: 750
      },
      {
        level: 'third',
        title: '三等奖',
        score: 300
      }
    ]
  },
  {
    type: 'vice_province',
    title: '副省级',
    children: [
      {
        level: 'first',
        title: '一等奖',
        score: 750
      },
      {
        level: 'second',
        title: '二等奖',
        score: 300
      },
      {
        level: 'third',
        title: '三等奖',
        score: 200
      }
    ]
  },
  {
    type: 'society_strength',
    title: '社会力量',
    children: [
      {
        level: 'first',
        title: '一等奖',
        score: 300
      },
      {
        level: 'second',
        title: '二等奖',
        score: 150
      },
      {
        level: 'third',
        title: '三等奖',
        score: 100
      }
    ]
  },
  {
    type: 'bureau',
    title: '厅局级',
    children: [
      {
        level: 'first',
        title: '一等奖',
        score: 150
      },
      {
        level: 'second',
        title: '二等奖',
        score: 100
      },
      {
        level: 'third',
        title: '三等奖',
        score: 60
      }
    ]
  }
];


// 论文

// 收录(期刊)
type DissertationPeriodicals = 'SCI_1' | 'SCI_2' | 'SCI_3' | 'SCI_4' | 'CCF_A' | 'CCF_B' | 'CCF_C' | 'EI' | 'XUPT_NATURE' | 'XUPT_A_2021' | 'XUPT_B_2021';
/**
 * 论文
 */
export type DissertationScoreItem = BaseScoreItem<
  DissertationPeriodicals,
  500 | 300 | 160 | 120 | 75 | 40 | 20
>;


export const dissertationScoreList: DissertationScoreItem[] = [
  {
    level: 'SCI_1',
    title: 'SCI_1 区收录(期刊)',
    score: 500
  },
  {
    level: 'SCI_2',
    title: 'SCI_2 区收录(期刊)',
    score: 300
  },
  {
    level: 'SCI_3',
    title: 'SCI_3 区收录(期刊)',
    score: 160
  },
  {
    level: 'SCI_4',
    title: 'SCI_4 区收录(期刊)',
    score: 120
  },
  {
    level: 'CCF_A',
    title: 'CCF A 类国际会议',
    score: 160
  },
  {
    level: 'CCF_B',
    title: 'CCF B 类国际会议',
    score: 120
  },
  {
    level: 'CCF_C',
    title: 'CCF C 类国际会议',
    score: 75
  },
  {
    level: 'XUPT_NATURE',
    title: '《西安邮电大学自然科学权威中文学术期刊认定目录》论文',
    score: 160
  },
  {
    level: 'XUPT_A_2021',
    title: '《西安邮电大学硕士研究生高水平期刊目录（2021）》理工类高水平期刊目录中其他 A 类期刊/会议',
    score: 40
  },
  {
    level: 'XUPT_A_2021',
    title: '《西安邮电大学硕士研究生高水平期刊目录（2021）》理工类高水平期刊目录中其他 B 类期刊/会议',
    score: 20
  },
  {
    level: 'EI',
    title: 'EI 收录(期刊)',
    score: 75
  }
];

// 出版专著

// 出版社
type PublishHouse = 'authoritative_press' | 'other_publishers' | 'a_publishing_house'
/**
 * 出版
 */
export type PublishScoreItem = BaseScoreItem<
  PublishHouse,
  20 | 10
>;

export const publishScoreList: PublishScoreItem[] = [
  {
    level: 'authoritative_press',
    title: '权威出版社',
    score: 20
  },
  {
    level: 'a_publishing_house',
    title: 'A 类出版社',
    score: 20
  },
  {
    level: 'other_publishers',
    title: '其它出版社',
    score: 10
  }
]