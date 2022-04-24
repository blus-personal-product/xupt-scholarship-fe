import * as React from 'react';
import { Space, Avatar, Dropdown, Menu, Input, Tooltip, Typography, Drawer, Button } from 'antd';
import { LoginOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined, } from '@ant-design/icons';
import { Document, Page, pdfjs } from 'react-pdf';
import style from './style.module.less';
import { useAuth } from '@/context/auth.context';
import { Link } from 'react-router-dom';
import { cx } from '@/utils';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UserControllers: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showSearch, setShowSearch] = React.useState(false);
  const [ruleVisible, setRuleVisible] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const UserMenu = (
    <Menu>
      <Link to="/user" key="user-center" >
        <Menu.Item
          icon={<UserOutlined />}
          key="user-center"
        >用户中心</Menu.Item>
      </Link>
      <Menu.Item
        icon={<LoginOutlined />}
        danger
        onClick={signOut}
        key="login_out"
      >退出登录</Menu.Item>
    </Menu>
  );

  const showDrawer = () => {
    setRuleVisible(true);
  };
  const onClose = () => {
    setRuleVisible(false);
  };

  const onLoadSuccess = (pdf: any) => {
    if (pageNumber === 0) {
      setPageNumber(pdf.numPages)
    }
  }

  const renderPage = (props: any) => {
    const list = [];
    let i = 0;
    while (i < pageNumber) {
      list.push(<Page {...props} pageIndex={0} key={i} />)
    }
    return list;
  }

  const lastPage = () => {
    if (currentPage === 1) {
      return
    }
    setCurrentPage(currentPage - 1);
  }
  const nextPage = () => {
    if (currentPage === pageNumber) {
      return
    }
    setCurrentPage(currentPage + 1)
  }

  const applyRuleView = (
    <Typography className={style['rule-view']}>
      <Document file="/2021-rule.pdf" onLoadSuccess={onLoadSuccess}>
        <Page pageNumber={currentPage} width={600} />
      </Document>
      <div style={{
        textAlign: "center"
      }}>
        <Space>
          <Button onClick={lastPage}>上一页</Button>
          <Button type="text">第{currentPage}页，共{pageNumber}页</Button>
          <Button onClick={nextPage}>下一页</Button>
        </Space>
      </div>
    </Typography>
  )

  return (
    <Space align="center">

      <Drawer onClose={onClose} visible={ruleVisible} width={800}>
        {applyRuleView}
      </Drawer>
      <Tooltip title="查看评定细则">
        <div className={style['control-box']} onClick={showDrawer}>
          <QuestionCircleOutlined className={style['control-icon']} />
        </div>
      </Tooltip>
      <Dropdown overlay={UserMenu}>
        <div className={cx(style['control-box'], style['user-info'])}>
          <Avatar size={28} className={style['user-avatar']} src={user.avatar}></Avatar>
          <span>{user.name}</span>
        </div>
      </Dropdown>
    </Space >
  );
};

export default UserControllers;