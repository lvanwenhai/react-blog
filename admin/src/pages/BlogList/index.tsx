import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

import type { TableListItem } from './data';
import { queryBlog, addBlog, deleteBlog } from './service';

import MDEditor from '@uiw/react-md-editor';


/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: any, content: string) => {
  const hide = message.loading('Adding');
  try {
    await addBlog({ ...fields, content });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await deleteBlog({
      id: selectedRows.map((row) => row.id)[0],
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const BlogList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [content, setContent] = useState<string>('');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage id="pages.searchTable.updateForm.ruleName.title" defaultMessage="Title" />
      ),
      dataIndex: 'title',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.description"
          defaultMessage="Description"
        />
      ),
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'imgUrl',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleModalVisible(true);
          }}
          type="link"
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="查看" />
        </Button>,
        <Button
          onClick={async () => {
            const success = await handleRemove([record]);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          type="link"
        >
          删除
        </Button>,
      ],
    },
  ];
  const onChangeMarkdown = (value: any) => {
   console.log(value)
   setContent(value);
  }
  
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryBlog({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.createBlog',
          defaultMessage: 'Create blog',
        })}
        width="90%"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem, content);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        initialValues={currentRow}
      >
        <ProFormText
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.title',
            defaultMessage: 'Title',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Title is required"
                />
              ),
            },
          ]}
          width="md"
          name="title"
        />
        <ProFormTextArea
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.description',
            defaultMessage: 'Description',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Title is required"
                />
              ),
            },
          ]}
          width="md"
          name="description"
        />
        <MDEditor value={content} onChange={onChangeMarkdown} />
        <ProFormText
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.imgUrl',
            defaultMessage: 'ImgUrl',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Title is required"
                />
              ),
            },
          ]}
          width="md"
          name="imgUrl"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default BlogList;
