import { useState } from "react";
import { Button, Dropdown, Table, Typography } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import type { MenuProps, TableColumnsType } from "antd";

import AddReminder from "./AddReminder";
import EditReminder from "./EditReminder";
import { EmptyTableView } from "../EmptyTableView";
import type { FormMode, Reminder } from "../../utils/types";

interface ReminderProps {
    reminder: Reminder
    show?: string
}

const Reminder = ({ reminder, show }: ReminderProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>(null);

    const { Text } = Typography;


    const columns: TableColumnsType<Reminder> = [
        {
            key: "alert",
            dataIndex: "alert",
            title: "Reminder Alert",
        },
        {
            key: "warning_time",
            dataIndex: "warning_time",
            title: "Warning Time",
        },
        {
            key: "occasions",
            dataIndex: "occasions",
            title: "Occasions",
        },
        {
            key: "actions",
            title: "Actions",
            render: () => (
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                    <Button>Edit {show} Reminder</Button>
                </Dropdown>
            )
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            icon: <EditOutlined />,
            key: "edit",
            label: "Edit",
            onClick: () => console.log('clicked edit')
        },
        {
            icon: <DeleteFilled />,
            key: "delete",
            label: "Delete",
            onClick: () => console.log('clicked delete')
        }
    ];

    const openForm = (mode: FormMode) => {
        setFormMode(mode);
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const EmptyDescription = () => (
        <>
            <Text type="secondary">No reminder set for {show}</Text>
            <br />
            <Button onClick={() => openForm("add")}>Add Reminder</Button>
        </>
    );

    return (
        <>
            <Table 
                dataSource={reminder ? [reminder] : null}
                columns={columns}
                rowKey={(record: Reminder) => record.show}
                locale={{
                    emptyText: <EmptyTableView description={<EmptyDescription />} />
                }}
            />
        </>
    );


};

export { AddReminder, EditReminder, Reminder };