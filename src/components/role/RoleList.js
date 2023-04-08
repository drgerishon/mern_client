import React from "react";
import {Table, Button} from "antd";
import {EditOutlined, DeleteOutlined, KeyOutlined} from "@ant-design/icons";
import './RolesTable.css'

const RoleList = ({roles, onDelete, onEdit}) => {
    const columns = [
        {
            title: "Role name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            render: (active) => (
                <span style={{color: active ? "#52c41a" : "#f5222d"}}>
          {active ? "Active" : "Inactive"}
        </span>
            ),
            sorter: (a, b) => a.active - b.active,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Action",
            key: "action",
            className: "actions-column",
            render: (text, record) => (
                <span className="action-buttons">
        <Button
            className="view-button"
            type="text"
            size="large"
            icon={<KeyOutlined/>}
            onClick={() => onEdit(record)}
        />
        <Button
            className="edit-button"
            type="text"
            size="large"
            icon={<EditOutlined/>}
            onClick={() => console.log("Edit role", record)}
        />
        <Button
            className="delete-button"
            type="text"
            size="large"
            icon={<DeleteOutlined/>}
            onClick={() => onDelete(record._id)}
        />
      </span>
            ),
        },
    ];
    const getRowClassName = (record) => {
        return record.active ? "active-row" : "inactive-row";
    };

    return (
        <Table
            columns={columns}
            dataSource={roles}
            rowKey={(record) => record._id}
            rowClassName={getRowClassName}
            hover/>
    );
};

export default RoleList;
