import React, { useState, useRef } from 'react';

import { Button, message, } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import type { TableListItem } from './data';
import { queryOssList, addOss, deleteOss } from './service';
import UploadBtn from './components/UploadBtn'


/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (row) => {
  console.log(row)
  const hide = message.loading('Deleting');
  if (!row) return true;
  try {
    await deleteOss({
      name: row.name,
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

const OssList: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.title"
          defaultMessage="Title"
        />
      ),
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.ruleName.description" defaultMessage="Description" />,
      dataIndex: 'size',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'url',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button onClick={async () => {
          const success = await handleRemove(record);
          if (success) {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }} type="link">删除</Button>
      ],
    },
  ];

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
          <UploadBtn onAdd={() => {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}/>
        ]}
        request={(params, sorter, filter) => queryOssList({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default OssList;
