import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TestTableItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';


/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: TestTableItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在保存');
  try {
    await updateRule({
      name1: fields.name1,
      name2: fields.name2,
      name3: fields.name3,
      name4: fields.name4,
    });
    hide();

    message.success('保存成功');
    return true;
  } catch (error) {
    hide();
    message.error('保存失败请重试！');
    return false;
  }
};

/**
 *  删除
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TestTableItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const WsTestTable: React.FC<{}> = () => {
  const [isShowCreateForm, handleCreateFormVisible] = useState<boolean>(false);
  const [isShowUpdateForm, handleUpdateFormVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TestTableItem[]>([]);
  const columns: ProColumns<TestTableItem>[] = [
    {
      title: '项目名1',
      dataIndex: 'name1',
      rules: [
        {
          required: true,
          message: '必填',
        },
      ],
    },
    {
      title: '项目名2',
      dataIndex: 'name2',
      valueType: 'textarea',
    },
    {
      title: '项目名3',
      dataIndex: 'name3',
      //在 create form中隐藏
      //hideInForm: true,
      hideInSearch: true, // 在查询表单中隐藏
      // 显示样式
      //renderText: (val: string) => `${val} 万`,
    },
    {
      title: '项目名4',
      dataIndex: 'name4',
      //hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
              handleUpdateFormVisible(true);
              setStepFormValues(record);
            }}>编辑</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TestTableItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateFormVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        />
        {/* 删除 */}
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest();
              }}
            >
              批量删除
            </Button>
          </FooterToolbar>
        )}
        {/* 新增 */}
        <CreateForm onCancel={() => handleCreateFormVisible(false)} modalVisible={isShowCreateForm}>
          <ProTable<TestTableItem, TestTableItem>
            onSubmit={async (value) => {
              const success = await handleAdd(value);
              if (success) {
                handleCreateFormVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="key"
            type="form"
            columns={columns}
            rowSelection={{}}
          />
        </CreateForm>

        {/* 修改 */}
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateFormVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateFormVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={isShowUpdateForm}
          values={stepFormValues}
        />
        ) : null}
    </PageContainer>
  );
}

export default WsTestTable;
