import React, { useEffect, useState } from 'react';
import {Breadcrumb, Button, Form, Input, message, Select} from 'antd';
import { StaffBuildingSelector } from "@/component/StaffBuildingSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildingsList } from "@/store/modules/building";
import {fetchUsersList, register} from "@/store/modules/user";
import {request} from "@/utils";
import {useNavigate} from "react-router-dom";

const roles = [
    {
        value: 'admin',
        label: 'Admin',
    },
    {
        value: 'internal',
        label: 'Internal Manager',
    },
    {
        value: 'subcontractor',
        label: 'Subcontractor',
    },
    {
        value: 'cleaner',
        label: 'Cleaner',
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    },
};

const breadItems = [
    { title: <a href="/">Dashboard</a> },
    { title: <a href="/staff">Staffs Table</a> },
    { title: "New Staff" }
];

const StaffNew = () => {
    const [form] = Form.useForm();
    const [buildingIds, setBuildingIds] = useState([]); // 保存 building_id 的列表
    const [isBuildingDisabled, setIsBuildingDisabled] = useState(true); // 控制 Assigned Buildings 的禁用状态
    const [isPhoneUnique, setIsPhoneUnique] = useState(true); // 控制手机号唯一性

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const buildingsList = useSelector(state => state.building.buildingsList);
    const usersList = useSelector(state => state.user.usersList);
    useEffect(() => {
        dispatch(fetchUsersList());
        dispatch(fetchBuildingsList())
    }, [dispatch]);

    const fetchBuildingList = async (building_name) => {
        if (buildingsList !== []) {
            return buildingsList
                .filter((b) => b.building_info.building_name.includes(building_name))
                .map(b => ({
                    label: b.building_info.building_name,
                    value: b.building_id
                }));
        } else {
            return [];
        }
    };

    const handleRoleChange = (value) => {
        if (value === 'admin' || !value) {
            setIsBuildingDisabled(true);
        } else {
            setIsBuildingDisabled(false);
        }
    };
    const checkPhoneExists = async (phone) => {
        const existingUser = usersList.find(user => user.phone === phone);
        if (existingUser) {
            return Promise.reject(new Error('Phone number already exists!'));
        }
        return Promise.resolve();
    };
    const onFinish = (values) => {
        values.building_ids = buildingIds;
        console.log('Received values of form: ', values);
        const res = dispatch(register(values))
        // navigate('/staff');
        message.success(res.message);
    };

    return (
        <div style={{ padding: '64px 24px 0 24px' }}>
            <Breadcrumb items={breadItems} style={{ margin: '16px 0' }} />
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                onValuesChange={(_, values) => {
                    handleRoleChange(values.role); // 监听 role 的变化
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="User Name"
                    rules={[{ required: true, message: 'Please input user name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail Address"
                    rules={[
                        { type: "email", message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input email address!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    tooltip="Please input phone number, starting with ‘0’"
                    rules={[
                        { pattern: /^0[2-9]\d{8}$/, message: 'Please input a valid phone number!' },
                        { required: true, message: 'Please input phone number!' },
                        {
                            validator: (_, value) => checkPhoneExists(value),
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input password!' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Select Role"
                    rules={[{ required: true, message: 'Please select user role!' }]}
                >
                    <Select placeholder="Please select a role" options={roles} />
                </Form.Item>

                <Form.Item
                    name="building_ids"
                    label="Select Assigned Buildings"
                >
                    <StaffBuildingSelector
                        mode="multiple"
                        value={buildingIds}
                        placeholder="Select buildings"
                        fetchOptions={fetchBuildingList}
                        onChange={(newValue) => {
                            const ids = newValue.map(item => item.value);
                            setBuildingIds(ids);
                        }}
                        style={{ width: '100%' }}
                        disabled={isBuildingDisabled}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StaffNew;