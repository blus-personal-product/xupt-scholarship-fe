/**
 * 学术成果表单
 */
import * as React from 'react';
import { Form, FormProps } from 'antd';
import FormHeader from '../form-header';
import ScientificForm, { ScientificFormValue, scientificDefaultFormValue } from './components/scientific-form';
import AwardForm, { AwardFormValue, awardDefaultFormValue } from './components/award-form';
import DissertationForm, { DissertationFormValue, dissertationDefaultFormValue } from './components/dissertation-form';
import PublishForm, { publishDefaultFormValue, PublishFormValue } from './components/publish-form';
import useScoreMap from '../../hooks/use-score-map';
import { awardScoreList, dissertationScoreList, publishScoreList, scientificScoreList } from '../../config/academic.config';
import { getCooperationScore } from '../../utils';
import { baseFormConf, validateMessages } from '@/config/form';
import { useApplicationContext } from '../../context/application.context';

export interface AcademicFormValue {
  award: AwardFormValue[];
  scientific: ScientificFormValue[];
  dissertation: DissertationFormValue[];
  publish: PublishFormValue[];
}

const academicFormDefaultValue: AcademicFormValue = {
  award: [awardDefaultFormValue],
  scientific: [scientificDefaultFormValue],
  dissertation: [dissertationDefaultFormValue],
  publish: [publishDefaultFormValue]
}

interface IProps {
  academicValue?: AcademicFormValue;
}


const AcademicForm: React.FC<IProps> = (props) => {
  const { academicValue } = props;
  const [score, setScore] = React.useState(0);
  const { academicForm } = useApplicationContext();
  const awardScoreMap = useScoreMap(awardScoreList, []);
  const dissertationScoreMap = useScoreMap(dissertationScoreList, []);
  const publishScoreMap = useScoreMap(publishScoreList, []);
  const scientificScoreMap = useScoreMap(scientificScoreList, []);

  const getScore = (values?: AcademicFormValue) => {
    if (!values) return 0;
    let tempScore = 0;
    // 论文
    if (values) {
      (values.dissertation || []).forEach(item => {
        // 可能存在空值
        if (item) {
          tempScore += (dissertationScoreMap.get(item.level) || 0);
        }
      });
    }
    // 获奖
    if (values.award) {
      (values.award || []).forEach(item => {
        // 可能存在空值
        if (item) {
          tempScore += (awardScoreMap.get(`${item.level[0]}-${item.level[1]}`) || 0);
        }
      });
    }
    // 出版专著
    if (values.publish) {
      (values.publish || []).forEach(item => {
        // 可能存在空值
        if (item) {
          tempScore += (publishScoreMap.get(item.level) || 0);
        }
      });
    }
    // 
    if (values.scientific) {
      (values.scientific || []).forEach(item => {
        if (item) {
          const proportion = getCooperationScore(item.order, item.partners);
          tempScore += (proportion * (scientificScoreMap.get(item.level) || 0));
        }
      });
    }
    return tempScore;
  }

  const onValuesChange: FormProps<AcademicFormValue>['onValuesChange'] = (_, values) => {
    const currScore = getScore(values);
    if (currScore !== score) {
      setScore(currScore);
    }
  }

  const currScore = React.useMemo(() => getScore(academicValue), [academicValue]);

  React.useEffect(() => {
    if (currScore !== score) {
      setScore(currScore);
    }
  }, [academicValue]);

  return (
    <section id="academic-form">
      <FormHeader
        title="学术成果"
        score={score}
      />
      <Form
        {...baseFormConf}
        name="academic"
        initialValues={academicValue}
        onValuesChange={onValuesChange}
        form={academicForm}
      >
        <ScientificForm />
        <AwardForm />
        <DissertationForm />
        <PublishForm />
      </Form>
    </section>
  )
};

AcademicForm.defaultProps = {
  academicValue: academicFormDefaultValue
}

export default AcademicForm;