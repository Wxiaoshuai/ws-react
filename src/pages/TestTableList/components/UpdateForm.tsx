import React, { useState } from 'react';
import { Form, Button, Input, Modal, } from 'antd';

import { TestTableItem } from '../data.d';

export interface FormValueType extends Partial<TestTableItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TestTableItem>;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name1: props.values.name1,
    name2: props.values.name2,
    name3: props.values.name3,
    name4: props.values.name4,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const saveUpdate = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name1"
          label="名称name1"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="name2"
          label="名称name2"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="name3"
          label="名称name3"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="name4"
          label="名称name4"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => saveUpdate()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改----"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name1: formVals.name1,
          name2: formVals.name2,
          name3: formVals.name3,
          name4: formVals.name4,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
