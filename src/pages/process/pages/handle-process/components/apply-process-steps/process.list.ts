const getPosition = (step: number) => {
  const space = 180;
  if (step === 8) {
    return {
      x: 50 + (step - 1) * space,
      y: 400
    }
  }

  if (step === 9) {
    return {
      x: 50 + (step - 2) * space,
      y: 200
    }
  }
  if (step >= 9) {
    return {
      x: 50 + (step - 2) * space,
      y: 300
    }
  }
  return {
    x: 50 + (step - 1) * space,
    y: 300
  }
};

export const ProcessList = [
  {
    step: 1,
    title: "部署动员阶段",
    name: "deployment_mobilization_phase",
    responsible_department: ["学科办", "学工办"],
    desc: "学院研究生奖助学金评审组审议通过学业奖学金评选细则，下发评选文件，通知符合条件的研究生参加评选。",
    duration: 4,
    ...getPosition(1)
  },
  {
    step: 2,
    title: "个人申请阶段",
    name: "individual_application_stage",
    responsible_department: ["研究生"],
    desc: "由本人依照评选条件向学院提交书面申请。",
    duration: 3,
    ...getPosition(2)
  },
  {
    step: 3,
    title: "各年级政策宣讲",
    name: "policies_for_all_grades",
    responsible_department: ["学科办"],
    desc: "讲解学业奖学金评选细则，指导研究生计算本人总分。",
    duration: 1,
    ...getPosition(3)
  },
  {
    step: 4,
    title: "第一次个人自评",
    name: "first_self_assessment",
    responsible_department: ["研究生"],
    desc: "学生本人填写《计算机学院研究生学业奖学金量化得分表》，提交电子版及打印签字版。提交班长。",
    duration: 2,
    ...getPosition(4)
  },
  {
    step: 5,
    title: "第一次班级公示",
    name: "first_class_announcement",
    responsible_department: ["班长"],
    desc: "班级内公示每位同学的量化得分表。班长核对本班每位同学申报材料，核对分数；并根据其它同学的反映核实相关材料及互评分数。",
    duration: 2,
    ...getPosition(5)
  },
  {
    step: 6,
    title: "第二次个人自评",
    name: "second_personal_self_assessment",
    responsible_department: ["研究生"],
    desc: "第一次公示有错误的学生本人重新填写《计算机学院研究生学业奖学金量化得分表》， 提交电子版及打印签字版。提交班长。",
    duration: 1,
    ...getPosition(6)
  },
  {
    step: 7,
    title: "第二次班级公示",
    name: "second_class_announcement",
    responsible_department: ["班长"],
    desc: "班级内公示每位同学的量化得分表，班长核对本班每位同学分数，并请同学在汇总表签字确认。",
    duration: 2,
    ...getPosition(7)
  },
  {
    step: 8,
    title: "年级公示",
    name: "grade_announcement",
    responsible_department: ["辅导员"],
    desc: "在年级中公示学业奖学金排名及公示本年级每位同学的量化得分表，年级负责人根据同学的反映核实互评分数（修改分数需重新确认签字计分表）。汇总材料上报学科办。",
    duration: 2,
    ...getPosition(8),
  },
  {
    step: 9,
    title: "学科办审核、复查",
    name: "examination_and_review_of_the_discipline_office",
    responsible_department: ["学科办"],
    desc: "学科办复查申报相关材料、公布各年级计分结果。",
    duration: 2,
    ...getPosition(9)
  },
  {
    step: 10,
    title: "奖学金评定小组核查、审议",
    name: "verification_and_deliberation_by_the_scholarship_evaluation_group",
    responsible_department: ["各学院"],
    desc: "学院评审委员会按学科、专业比例等要求，提出评审意见和推荐名单，并将结果按要求在学院公告栏、网站等进行公示5日。公示结束后，按要求将相关材料于交到研究生工作办公室。",
    duration: 3,
    ...getPosition(10)
  },
  {
    step: 11,
    title: "学校评审阶段",
    name: "school_review_stage",
    responsible_department: ["研究生院"],
    desc: "由研究生院提请校研究生学业奖学金评审领导小组进行最后评审，并确定候选人名单。",
    duration: -1,
    ...getPosition(11)
  },
];

export const LinksProcessList =[
  {
    source: 'deployment_mobilization_phase',
    target: 'individual_application_stage'
  },
  {
    source: 'individual_application_stage',
    target: 'policies_for_all_grades'
  },
  {
    source: 'policies_for_all_grades',
    target: 'first_self_assessment'
  },
  {
    source: 'first_self_assessment',
    target: 'first_class_announcement'
  },
  {
    source: 'first_class_announcement',
    target: 'second_personal_self_assessment'
  },
  {
    source: 'second_personal_self_assessment',
    target: 'second_class_announcement'
  },
  {
    source: 'second_class_announcement',
    target: 'grade_announcement'
  },
  {
    source: 'second_class_announcement',
    target: 'examination_and_review_of_the_discipline_office',
  },
  {
    source: 'grade_announcement',
    target: 'verification_and_deliberation_by_the_scholarship_evaluation_group'
  },
  {
    source: 'examination_and_review_of_the_discipline_office',
    target: 'verification_and_deliberation_by_the_scholarship_evaluation_group'
  },
  {
    source: 'verification_and_deliberation_by_the_scholarship_evaluation_group',
    target: 'school_review_stage'
  }
];