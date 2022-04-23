import * as React from 'react';
import { Comment, List, Form, Input, Button, message, Avatar, Collapse } from 'antd';
import { FormProps, useForm } from 'antd/lib/form/Form';
import * as api from '@/service/comment';
import { requiredRule } from '@/config/form';
import { useProcess } from '@/context/process-status';
import { useAuth } from '@/context/auth.context';
import { ArrowsAltOutlined } from '@ant-design/icons';

export interface CommentItem extends api.CommentItem {
  replyList?: CommentItem[];
}

const AnnouncementComment: React.FC = () => {
  const { process_id } = useProcess();
  const { user } = useAuth();
  const [commentList, setCommentList] = React.useState<CommentItem[]>([]);
  const [replyId, setReplyId] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [formRef] = useForm<{ content: string }>();

  const loadCommentList = async (procedureId: number, replyId: number = 0) => {
    try {
      setLoading(true);
      let commentList = (await api.getComment(procedureId, 0)) || [];
      if (replyId !== 0) {
        const childList = await api.getComment(procedureId, replyId);
        commentList = commentList.map(item => ({
          ...item,
          replyList: item.comment_id === replyId ? childList : []
        }));
      }
      setCommentList(commentList);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async () => {
    try {
      setLoading(true);
      const val = await formRef.validateFields();
      await api.postComment({
        ...val,
        reply_id: replyId,
        procedure_id: process_id,
      });
      await loadCommentList(process_id, replyId);
      message.success("创建评论成功");
      formRef.setFieldsValue({
        content: ''
      });
      setReplyId(0);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const delComment = async (id: number) => {
    try {
      setLoading(true);
      await api.deleteComment(id);
      loadCommentList(process_id, 0);
      message.success("删除评论成功");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadCommentList(process_id, 0);
  }, [process_id]);

  const replyComment = (item: api.CommentItem) => {
    formRef.setFieldsValue({
      content: `@[${item.name}_${item.user_id}]   `
    });
    setReplyId(item.comment_id);
  }

  const onValuesChange: FormProps['onValuesChange'] = (_, values) => {
    if (!(values.content || '').trim()) {
      console.log(values)
      setReplyId(0);
    }
  }

  const activeKeys = React.useMemo(() =>
    commentList.filter(item => item.replyList && item.replyList?.length > 0)
      .map(v => v.comment_id) || [], [commentList])

  return (
    <React.Fragment>
      <List
        loading={loading}
        className="comment-list"
        itemLayout="horizontal"
        dataSource={commentList}
        renderItem={item => (
          <li>
            <Comment
              actions={[
                <span onClick={() => replyComment(item)} key="reply">回复</span>,
                (user.user_id === item.user_id && (<span onClick={() => delComment(item.comment_id)} key="del">删除</span>)),
                item.children > 0 && (<span onClick = {() => loadCommentList(process_id, item.comment_id)}>共有{item.children}条回复<ArrowsAltOutlined /></span>)
              ]}
              author={item.user_id}
              avatar={item.avatar || <Avatar size={40}>{item.name}</Avatar>}
              content={item.content}
              datetime={item.create_date}
            >
              {
                item.replyList &&
                item.replyList.map(child => (
                  <Comment
                    actions={[
                      (user.user_id === child.user_id && (<span onClick={() => delComment(child.comment_id)} key="del">删除</span>))
                    ]}
                    author={child.user_id}
                    avatar={child.avatar || <Avatar size={40}>{item.name}</Avatar>}
                    content={child.content}
                    datetime={child.create_date}
                  />
                ))
              }
            </Comment>
          </li>
        )}
      />
      <Form
        form={formRef}
        initialValues={{
          content: '',
        }}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="content" rules={requiredRule}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" onClick={() => submitComment()} >
            添加评论
          </Button>
        </Form.Item>
      </Form>

    </React.Fragment>
  )
};

export default AnnouncementComment;