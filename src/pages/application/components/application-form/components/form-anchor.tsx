import React, { useState, useEffect } from 'react';
import { Collapse, Anchor } from 'antd';

const { Link } = Anchor;
const { Panel } = Collapse;

const FormAnchor: React.FC = () => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTargetOffset(window.innerHeight / 2);
  }, []);
  return (
    <React.Fragment>
      <Anchor
        showInkInFixed
        targetOffset={targetOffset}
        offsetTop={60}
        style={{
          backgroundColor: "#F0F2F5",
          marginLeft: 16
        }}>
          <Link href="#moral-form" title="思想品德" />
          <Link href="#practice-form" title="实践活动">
            <Link href="#practice-form-result" title="实践成果"></Link>
            <Link href="#practice-form-social" title="社会活动">
              <Link href="#practice-form-social-cadre" title="校园职位"></Link>
              <Link href="#practice-form-social-activity" title="校园活动"></Link>
            </Link>
            <Link href="#practice-form-competition" title="竞赛信息"></Link>
          </Link>
          <Link href="#academic-form" title="学术成果">
            <Link href="#academic-form-scientific" title="科研项目"></Link>
            <Link href="#academic-form-award" title="荣获奖项" />
            <Link href="#academic-form-dissertation" title="公开发表论文" />
            <Link href="#academic-form-publish" title="出版专著" />
          </Link>
      </Anchor>
    </React.Fragment>
  );
};

export default FormAnchor;