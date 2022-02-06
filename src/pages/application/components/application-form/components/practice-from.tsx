/**
 * 实践活动表
 */
import * as React from 'react';
import { FormValue } from '../types/form';
import FormHeader from './form-header';
import * as C from '../config/practice.config';
import SocialForm from './practice-social-form';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { disabledFormCurrentDate } from '@/config/form';

interface PracticeFormItemValue {
  category: 'social' | 'competition' | 'result';
  list: {
    info: string;
    name: string;
    type: C.CompetitionScoreItem['type'] | C.ResultScoreItem['level'] | C.SocialScoreItem['type'];
    list: {
      info: string;
      name: string;
      level: C.SocialLevelScoreItem['level'] | C.CompetitionLevelScoreItem['level']
    }[];
  }[];
}

type PracticeFormValue = FormValue<PracticeFormItemValue>;

interface IProps {
  practiceValue?: PracticeFormValue;
}

const defaultFormValue: PracticeFormValue = {
  list: [
    {
      category: 'result',
      list: [
        {
          type: 'international',
          info: '',
          name: '',
          list: []
        }
      ],
    }
  ]
}

const PracticeForm: React.FC<IProps> = (props) => {
  const { practiceValue } = props;
  return (
    <React.Fragment>
      <FormHeader
        title="实践活动成绩"
        score={0}
      />
      <Form
        name="practice"
        initialValues={practiceValue}
      >
        <SocialForm />
      </Form>
    </React.Fragment>
  )
};

PracticeForm.defaultProps = {
  practiceValue: defaultFormValue
}

export default PracticeForm;