import { Form, Input, Button, Modal } from "antd";
import { createUser } from "../../../Api/api";

interface UserFormProps {
  isVisible: boolean;
  onCancel: (info?: any) => void;
}

const UserFormModal = (props: UserFormProps) => {
  const { isVisible, onCancel } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    createUser({
      ...values,
      avatarImg:
        "http://coco727.oss-cn-hongkong.aliyuncs.com/b779af53356a48eed09560e479cf7bc2.png",
    }).then(async (res) => {
      localStorage.usersInfo = JSON.stringify(res.data);
      onCancel(res.data);
    });
  };

  return (
    <Modal visible={isVisible} footer={null} width="300px" closable={false}>
      <Form
        form={form}
        initialValues={JSON.parse(localStorage.usersInfo || "{}")}
        onFinish={onFinish}
      >
        <Form.Item name="nickName" rules={[{ required: true }]}>
          <Input placeholder="昵称" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item name="url" rules={[{ required: true }]}>
          <Input placeholder="博客/github地址" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "48%", marginRight: "4%" }}
        >
          Submit
        </Button>
        <Button onClick={() => onCancel(null)} style={{ width: "48%" }}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};
export default UserFormModal;
