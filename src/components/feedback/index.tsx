import { requiredRule, validateMessages } from '@/config/form';
import { BugOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, Modal, Select, SelectProps, Typography } from 'antd';
import * as React from 'react';
import StatusBadge from '../status-badge';
import style from './style.module.less';

const { Paragraph } = Typography;

const QuestionTypeOptions: SelectProps['options'] = [
  {
    label: '页面显示',
    value: 'page_display'
  },
  {
    label: '表单交互',
    value: 'form_interaction'
  },
  {
    label: '信息提交',
    value: 'information_submission'
  },
  {
    label: '数据错误',
    value: 'data_error'
  },
  {
    label: '结果无响应/响应异常',
    value: 'result_response'
  }
];

const FeedBack: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const submitForm = async () => {
    await form.validateFields();
    try {
      setLoading(true);
      const value = form.getFieldsValue(true);
    } catch (error) {
      message.error("反馈提交失败")
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        className={style['feedback-button']}
        shape="circle"
        disabled={visible}
        icon={<BugOutlined />}
        onClick={() => setVisible(!visible)}
      >
        <div className={style['feedback-button-text']} >问题反馈</div>
      </Button>

      <Modal
        forceRender
        visible={visible}
        title="问题反馈"
        onCancel={() => loading ? setVisible(true) : setVisible(false)}
        cancelButtonProps={{
          disabled: loading
        }}
        onOk={submitForm}
        confirmLoading={loading}
      >
        <StatusBadge
          status='error'
          text="错误定位"
        >
          <div className={style['error-info']}>
            <Paragraph>
              <Divider orientation="left">用户设备描述：</Divider>
              <blockquote>{navigator.userAgent}</blockquote>
            </Paragraph>
            <Paragraph>
              <Divider orientation="left">当前页面网址：</Divider>
              <blockquote>{location.href}</blockquote>
            </Paragraph>
          </div>
        </StatusBadge>
        <Card>
          <Form
            validateMessages={validateMessages}
            form={form}
            requiredMark={false}
          >
            <Form.Item
              name="type"
              label="问题类型"
              rules={requiredRule}
            >
              <Select options={QuestionTypeOptions} />
            </Form.Item>
            <Form.Item
              name="title"
              label="问题简述"
              rules={requiredRule}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="问题详述"
              name="description"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </React.Fragment >
  );
};

export default FeedBack;