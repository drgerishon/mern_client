// AddRoleForm.js
import React, {useState, useEffect, useCallback} from "react";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    InputNumber,
    Space,
} from "antd";
import {getPermissions} from "../../services/permission.service";
import {createRole} from "../../services/role.service";
import {useSelector} from "react-redux";
import "./AddRoleForm.css";

const AddRoleForm = ({onCancel, onRoleAdded}) => {
    const {token} = useSelector((state) => state.auth.user);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const fetchPermissions = useCallback(async () => {
        const result = await getPermissions(token);
        setPermissions(result.data);
    }, [token]);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const handleSubmit = async (values) => {
        const {roleName, roleCode} = values;
        const newRole = await createRole(token, {
            name: roleName,
            code: roleCode,
            permissions: selectedPermissions,
        });

        if (newRole) {
            onRoleAdded(newRole);
        }
    };

    const handlePermissionChange = (checkedValues) => {
        setSelectedPermissions(checkedValues);
    };

    return (
        <Form onFinish={handleSubmit} className="add-role-form" layout="vertical">
            <Form.Item
                label="Role Name"
                name="roleName"
                className="add-role-form-item"
                rules={[{required: true, message: "Please input the role name!"}]}
            >
                <Input placeholder="Enter role name"/>
            </Form.Item>
            <Form.Item
                label="Role Code"
                name="roleCode"
                className="add-role-form-item"
                rules={[{required: true, message: "Please input the role code!"}]}
            >
                <InputNumber min={1} placeholder="Enter role code" style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item label="Permissions" className="add-role-form-item">
                <Checkbox.Group onChange={handlePermissionChange}>
                    <Row gutter={[16, 16]}>
                        {permissions.map((permission) => (
                            <Col key={permission._id} span={8}>
                                <Checkbox value={permission._id}>{permission.description}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item className="add-role-form-buttons">
                <Space>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddRoleForm;

