/**
 * list表单骨架
 * 使用Card进行表单划分
 * 支持表单list的增删
 * 支持进行表单的alert的控制展示
 */
import * as React from 'react';
import { Alert, Button, Card, Form, Popover } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormListFieldData, FormListProps } from 'antd/lib/form/FormList';
import { TextLoop } from 'react-text-loop-next';
import EmptyForm from './empty-form';

type IProps = {
  listId?: string;
  name: FormListProps['name'];
  title: string;
  itemTitle: string;
  alertMessage?: string | string[];
  children: (field: FormListFieldData) => React.ReactNode;
}

const FormListSkeleton: React.FC<IProps> = (props) => {
  const {
    alertMessage, listId, title,
    itemTitle, name, children, ...resetProps
  } = props;

  const AlertMessage = React.useMemo(() => (
    typeof alertMessage === 'string' ? alertMessage : (
      <TextLoop
        mask
        children={alertMessage}
      />
    )
  ), [alertMessage]);

  const template = React.useMemo(() => {
    return (
      <ol style={{
        padding: '4px 6px',
      }}>
        {
          Array.isArray(alertMessage)
            ? alertMessage.map(msg => <li key={msg}>{msg}</li>)
            : alertMessage
        }
      </ol>
    );
  }, [alertMessage])

  return (
    <Card
      title={title}
      id={listId}>
      {
        !!alertMessage && (
          <Popover content={template} title="注意事项">
            <Alert
              type="info"
              showIcon
              message={AlertMessage}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
          </Popover>
        )
      }
      <Form.List
        {...resetProps}
        name={name}
      >
        {
          (fields, { add, remove }) => {
            return (
              <React.Fragment>
                {
                  !fields.length
                    ? (
                      <EmptyForm
                        title={itemTitle}
                      />
                    )
                    : fields.map(field => {
                      return (
                        <Card
                          title={`${itemTitle} ${field.name + 1}`}
                          type="inner"
                          key={field.name}
                          extra={
                            <Button
                              type="primary"
                              danger
                              shape="circle"
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                              size="small"
                            />
                          }
                        >
                          {children(field)}
                        </Card>
                      )
                    })
                }
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加{itemTitle}
                </Button>
              </React.Fragment>
            )
          }
        }
      </Form.List >
    </Card>
  )
};

export default FormListSkeleton;