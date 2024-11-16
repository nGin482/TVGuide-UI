import { Button, Dropdown, Table, TableColumnsType } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";

import AddReminder from "./AddReminder";
import EditReminder from "./EditReminder";
import { EmptyTableView } from "../EmptyTableView";
import type { Reminder } from "../../utils/types";

interface ReminderProps {
    reminder: Reminder
    show?: string
}

const Reminder = ({ reminder, show }: ReminderProps) => {


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

    return (
        <>
            <Table 
                dataSource={reminder ? [reminder] : null}
                columns={columns}
                rowKey={(record: Reminder) => record.show}
                locale={{
                    emptyText: <EmptyTableView text={`No reminder set for ${show}`} />
                }}
            />
        </>
    );


};

export { AddReminder, EditReminder, Reminder };