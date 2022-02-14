/**
 * 实践活动表
 */
import * as React from 'react';
import { Form, FormProps } from 'antd';
import FormHeader from '../form-header';
import PracticeSocialForm, { PracticeSocialFormValue, practiceSocialFormDefaultValue } from './components/social-form';
import PracticeCompetitionForm, { PracticeCompetitionFormValue, practiceCompetitionDefaultFormValue } from './components/competition-form';

import PracticeResultForm,
{
  PracticeResultFormValue,
  practiceResultDefaultFormValue,
  isCooperationLevel
} from './components/result-form';
import PracticeFormProvider from '../../context/practice.context';
import { getCooperationScore } from '../../utils/index';
import { competitionScoreList, resultScoreList, SocialScoreList } from '../../config/practice.config';
import useScoreMap from '../../hooks/use-score-map';
import { baseFormLayout, validateMessages } from '@/config/form';
import { useApplicationContext } from '../../context/application.context';

type PracticeFormValue = {
  result: PracticeResultFormValue[];
  social: PracticeSocialFormValue;
  competition: PracticeCompetitionFormValue[];
};

interface IProps {
  practiceValue?: PracticeFormValue;
}

const defaultFormValue: PracticeFormValue = {
  result: [practiceResultDefaultFormValue],
  social: practiceSocialFormDefaultValue,
  competition: [practiceCompetitionDefaultFormValue]
}

const PracticeForm: React.FC<IProps> = (props) => {
  const { practiceValue } = props;
  const [score, setScore] = React.useState(0);
  const { practiceForm } = useApplicationContext();
  const resultScoreMap = useScoreMap(resultScoreList, []);
  const competitionScoreMap = useScoreMap(competitionScoreList, []);
  const socialActivityScoreMap = useScoreMap(SocialScoreList[1].children, []);
  const socialCadreScoreMap = useScoreMap(SocialScoreList[0].children, []);

  const getScore = (values?: PracticeFormValue) => {
    if (!values) return 0;
    let tempScore = 0;
    // 实践成果
    if (values.result) {
      (values.result || []).forEach(item => {
        // 可能存在空值
        if (item) {
          if (isCooperationLevel(item.level)) {
            const proportion = getCooperationScore(item.order, item.partners);
            tempScore += (proportion * (resultScoreMap.get(item.level) || 0));
          } else {
            tempScore += (resultScoreMap.get(item.level) || 0);
          }
        }
      });
    }
    // 竞赛得分
    if (values.competition) {
      (values.competition || []).forEach(item => {
        // 可能存在空值
        if (item) {
          const proportion = getCooperationScore(item.order, item.partners);
          tempScore += (proportion * (competitionScoreMap.get(`${item.level[0]}-${item.level[1]}`) || 0));
        }
      });
    }
    // 社会活动
    if (values.social) {
      if (values.social.activity) {
        (values.social.activity || []).forEach(item => {
          // 可能存在空值
          if (item) {
            tempScore += (socialActivityScoreMap.get(item.level) || 0);
          }
        });
      }
      if (values.social.cadre) {
        (values.social.cadre || []).forEach(item => {
          // 可能存在空值
          if (item) {
            tempScore += (socialCadreScoreMap.get(item.level[0] as string) || 0);
          }
        });
      }
    }
    return tempScore;
  }

  const onValuesChange: FormProps<PracticeFormValue>['onValuesChange'] = (_, values) => {
    const currScore = getScore(values);
    if (currScore !== score) {
      setScore(currScore);
    }
  }

  const currScore = React.useMemo(() => getScore(practiceValue), [practiceValue]);

  React.useEffect(() => {
    if (currScore !== score) {
      setScore(currScore);
    }
  }, [practiceValue]);

  return (
    <section id="practice-form">
      <PracticeFormProvider
      >
        <FormHeader
          title="实践活动成绩"
          score={score}
        />
        <Form
          {...baseFormLayout}
          name="practice"
          form={practiceForm}
          initialValues={practiceValue}
          onValuesChange={onValuesChange}
          validateMessages={validateMessages}
        >
          <PracticeResultForm />
          <PracticeSocialForm />
          <PracticeCompetitionForm />
        </Form>
      </PracticeFormProvider>
    </section>
  )
};

PracticeForm.defaultProps = {
  practiceValue: defaultFormValue
}

export default PracticeForm;