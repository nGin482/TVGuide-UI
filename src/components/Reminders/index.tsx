import { Table, TableColumnsType } from "antd";

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