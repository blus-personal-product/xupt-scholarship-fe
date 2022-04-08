import * as React from 'react';
import { Descriptions, Badge, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import style from '../style.module.less';
import { IBaseUserInfo } from '@/service/user';

interface IProps {
  baseInfo: IBaseUserInfo;
  detailInfo: IStudentInfo | IManagerInfo
}

const UserInfo: React.FC<IProps> = (props) => {
  const { baseInfo, detailInfo } = props;
  const isStudent = React.useMemo(() => baseInfo.identity !== 'manager', [baseInfo]);
  const positionInfo = React.useMemo(
    () => {
      if (baseInfo.identity === 'manager') {
        const tempInfo = detailInfo as unknown as IManagerInfo;
        return `${tempInfo.department} - ${tempInfo.office} - ${tempInfo.position}`
      }
      const tempInfo = detailInfo as unknown as IStudentInfo;
      return `${tempInfo.college} - ${tempInfo.professional} 『 ${tempInfo.grade} 级（${tempInfo.class}） 班 』`
  },
    [baseInfo, detailInfo]);
  return (
    <div className={style['user-info']}>
      <section className={style['avatar-card']}>
        <div
          className={style['avatar-box']}
          style={{
            backgroundImage: `url(${baseInfo.avatar})`
          }}
        >
        </div>
        <Button
          type="primary"
          icon={<EditFilled />}
          block
        >编辑个人信息</Button>
      </section>
      <Descriptions
        title="我的信息"
        bordered
      >
        <Descriptions.Item label="姓名">{baseInfo.name}</Descriptions.Item>
        <Descriptions.Item label={isStudent ? "学号" : "工号"}>{baseInfo.user_id}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{baseInfo.email}</Descriptions.Item>
        <Descriptions.Item label="手机号">{baseInfo.phone}</Descriptions.Item>
        <Descriptions.Item label={isStudent ? "班级" : "职位"} span={2}>
          {positionInfo}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
};

export default UserInfo;