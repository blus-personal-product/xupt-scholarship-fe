import * as React from 'react';
import * as C from '../../../config/practice.config';
import { disabledFormCurrentDate, requiredRule } from '@/config/form';
import { Form, Card, Cascader, Input, DatePicker, Radio, FormItemProps } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import moment from 'moment';
import FormListSkeleton from '../../form-list-skeleton';
import UploadDragger from '@/components/upload-dragger';
import { UploadFile } from 'antd/lib/upload/interface';
import { FORMAT_DATE } from '@/config/time';
import FmtDatePicker from '@/components/fmt-date-picker';

export interface CadreFormItemValue {
  level: [C.SocialCadreLevel, string] | [];
  department: string;
}

export interface ActivityFormItemValue {
  level: C.SocialActivityLevel;
  name: string;
  time: RangePickerProps<moment.MomentInput>['value'];
  files: UploadFile[];
}

export interface PracticeSocialFormValue {
  cadre: CadreFormItemValue[];
  activity: ActivityFormItemValue[];
}

export const practiceSocialFormDefaultValue: PracticeSocialFormValue = {
  cadre: [{
    level: [],
    department: '',
  }],
  activity: [{
    level: 'college_activities',
    name: '',
    time: [FORMAT_DATE, FORMAT_DATE],
    files: [],
  }]
}


interface IProps extends FormItemProps {

}

const PracticeSocialForm: React.FC<IProps> = (props) => {
  const cadreOption = React.useMemo(
    () => {
      const scoreList = C.SocialScoreList
        .find(item => item.type === 'cadre');
      return scoreList?.children.map(item => {
        return {
          label: `${C.SocialCadreMap[item.level as C.SocialCadreLevel]} 『分数：${item.score}分』`,
          value: item.level,
          score: 30,
          children: (item.title as string[]).map(t => ({
            label: t,
            value: t,
          }))
        }
      });
    }, []);

  const activityOption = React.useMemo(() =>
    C.SocialScoreList
      .find(item => item.type === 'activity')
      ?.children.map(item => ({
        label: `${item.title}『${item.score}分』`,
        value: item.level,
        score: 30,
      }))
    , []);

  return (
    <Card
      title="社会活动表"
      id="practice-form-social"
    >
      <FormListSkeleton
        title="职位信息表"
        listId="practice-form-social-cadre"
        name={["social", "cadre"]}
        itemTitle="职位"
        alertMessage={
          [
            '社会工作计分按照学生干部的实际工作情况给分，兼任多项学生工作职务者计最高分，不累加',
            '因解职、辞职、免职使任职时间不足一届的 2/3 的学生干部不予加分',
            '增补、升任的干部按任职时间在 2/3 以上的职务计分'
          ]
        }
      >
        {
          field => (
            <React.Fragment>
              <Form.Item
                label="职位级别"
                name={[field.name, "level"]}
                rules={requiredRule}
              >
                <Cascader
                  placeholder="职位级别"
                  options={cadreOption}
                />
              </Form.Item>
              <Form.Item
                label="所属部门"
                name={[field.name, "department"]}
                rules={requiredRule}
              >
                <Input
                  placeholder="所属组织/部门/学院"
                />
              </Form.Item>
            </React.Fragment>
          )
        }
      </FormListSkeleton>

      <FormListSkeleton
        title="活动信息表"
        listId="practice-form-social-activity"
        name={["social", "activity"]}
        itemTitle="活动"
        alertMessage="参加社会活动量化分由学生工作办公室认定"
      >
        {
          field => (
            <React.Fragment>
              <Form.Item
                label="活动类型"
                name={[field.name, "level"]}
                rules={requiredRule}
              >
                <Radio.Group
                  buttonStyle="solid"
                  options={activityOption}
                  optionType="button"
                />
              </Form.Item>
              <Form.Item
                label="活动名称"
                name={[field.name, "name"]}
                rules={requiredRule}
              >
                <Input
                  placeholder="活动名称"
                />
              </Form.Item>
              <Form.Item
                label="活动时间"
                name={[field.name, "time"]}
                rules={requiredRule}
              >
                <FmtDatePicker
                  type="range"
                  disabledDate={disabledFormCurrentDate}
                  placeholder={["活动开始时间", "活动终止时间"]}
                />
              </Form.Item>
              <UploadDragger
                formProps={{
                  label: "文件",
                  name: [field.name, "files"]
                }}
              />
            </React.Fragment>
          )
        }
      </FormListSkeleton>
    </Card>
  )
};

export default PracticeSocialForm;