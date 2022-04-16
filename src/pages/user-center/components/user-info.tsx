import * as React from 'react';
import { Descriptions, Badge, Button, Modal, Tag, Card } from 'antd';
import { EditFilled } from '@ant-design/icons';
import style from '../style.module.less';
import UpdateUserInfo from '@/components/update-user-info';
import { useAuth } from '@/context/auth.context';
import moment from 'moment';

interface IProps {

}

const UserInfo: React.FC<IProps> = (props) => {
  const { user } = useAuth();
  const { student, manager, ...baseInfo } = user;
  const [modalVisible, setModalVisible] = React.useState(false);
  const detailInfo = React.useMemo(() => baseInfo.identity === 'manager' ? manager : student, [user])
  const isStudent = React.useMemo(() => baseInfo.identity !== 'manager', [baseInfo]);
  const positionInfo = React.useMemo(
    () => {
      if (baseInfo.identity === 'manager') {
        const tempInfo = detailInfo as unknown as IManagerInfo;
        return `${tempInfo.department} - ${tempInfo.office} - ${tempInfo.position}`
      }
      const tempInfo = detailInfo as unknown as IStudentInfo;
      return `${tempInfo.college} - ${tempInfo.professional} 『 ${moment(tempInfo.grade).format("YYYY")} 级（${tempInfo.class}） 班 』`
    },
    [baseInfo, detailInfo]);

  const showModal = () => {
    setModalVisible(true);
  }
  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <div className={style['user-info']}>
      <Modal
        footer={null}
        onCancel={closeModal}
        title="完善用户信息"
        visible={modalVisible}>
        <UpdateUserInfo
          formValue={user}
        />
      </Modal>
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
          onClick={showModal}
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
        {
          user.identity !== 'manager' && (
            <Descriptions.Item label="学位类型" span={3}>
              {(detailInfo as IStudentInfo).type === 'bachelor_degree' ? <Tag color="geekblue">学硕</Tag> : <Tag color="green">专硕</Tag>}
            </Descriptions.Item>
          )
        }
        <Descriptions.Item label="资料查看">
          <Card>
            <Card.Grid><a href="http://gr.xupt.edu.cn/xbwz/zlxz/zs.htm" target="_blank" title="招生">招生</a></Card.Grid>
            <Card.Grid><a href="http://gr.xupt.edu.cn/xbwz/zlxz/py.htm" title="培养">培养</a></Card.Grid>
            <Card.Grid><a href="http://gr.xupt.edu.cn/xbwz/zlxz/xw.htm" title="学位">学位</a></Card.Grid>
            <Card.Grid><a href="http://gr.xupt.edu.cn/xbwz/zlxz/xk.htm" title="学科">学科</a></Card.Grid>
            <Card.Grid><a href="http://gr.xupt.edu.cn/xbwz/zlxz/xsgl.htm" title="学生管理">学生管理</a></Card.Grid>
            <Card.Grid><a href="http://gr.xupt.edu.cn/xbwz/zlxz/gjzc.htm" title="国家政策">国家政策</a></Card.Grid>
          </Card>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
};

export default UserInfo;