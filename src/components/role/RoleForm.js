import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { createRole, updateRole } from "../../services/role.service";

const { Option } = Select;

const RoleForm = ({ token, permissions, onSubmit, initialRole = null }) => {
  const [roleData, setRoleData] = useState(
    initialRole || { name: "", code: "", permissions: [] }
  );

  const handleChange = (e) => {
    setRoleData({ ...roleData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (permissions) => {
    setRoleData({ ...roleData, permissions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (initialRole) {
      result = await updateRole(token, initialRole._id, roleData);
    } else {
      result = await createRole(token, roleData);
    }
    onSubmit(result.data);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-top-border">
            <div className="card-body">
              <h4 className="mb-4">{initialRole ? "Update Role" : "Create Role"}</h4>
              <Form onFinish={handleSubmit} className="mb-3">
                <Form.Item label="Role Name" name="name">
                  <Input
                    name="name"
                    value={roleData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Item>
                <Form.Item label="Code" name="code">
                  <Input
                    type="number"
                    name="code"
                    value={roleData.code}
                    onChange={handleChange}
                    required
                  />
                </Form.Item>
                <Form.Item label="Permissions" name="permissions">
                  <Select
                    mode="multiple"
                    placeholder="Select permissions"
                    value={roleData.permissions}
                    onChange={handlePermissionChange}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                  >
                    {permissions.map((permission) => (
                      <Option key={permission._id} value={permission._id}>
                        {permission.action} {permission.subject}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {initialRole ? "Update Role" : "Create Role"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
