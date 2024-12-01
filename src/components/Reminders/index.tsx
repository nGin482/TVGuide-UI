import { useContext, useState } from "react";
import { Button, Dropdown, Table, Typography } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import type { MenuProps, TableColumnsType } from "antd";

import { ReminderForm } from "./ReminderForm";
import { EmptyTableView } from "../EmptyTableView";
import { UserContext } from "../../contexts";
import { addReminder, editReminder } from "../../requests";
import type { FormMode, Reminder, ReminderFormValues } from "../../utils/types";
import { useShow } from "../../hooks/useShow";

interface ReminderProps {
    reminder: Reminder
    show?: string
}

const Reminder = ({ reminder, show }: ReminderProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>(null);

    const { Text } = Typography;
    const { currentUser } = useContext(UserContext);
    const { updateShowContext } = useShow();


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
            onClick: () => openForm("edit")
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

    const addReminderHandle = async (formValues: ReminderFormValues) => {
        formValues.show = show;
        const newReminder = await addReminder(formValues, currentUser.token);
        updateShowContext(show, "reminder", newReminder);
        return `The reminder for ${show} has been added`;
    };

    const editReminderHandle = async (formValues: ReminderFormValues) => {
        formValues.show = show;
        const updatedReminder = await editReminder(formValues, currentUser.token);
        updateShowContext(show, "reminder", updatedReminder);
        return `The reminder for ${show} has been updated`;
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
            {openModal && (
                <ReminderForm
                    mode={formMode}
                    open={openModal}
                    show={reminder?.show || show}
                    closeModal={closeModal}
                    successHandler={formMode === "add" ? addReminderHandle : editReminderHandle}
                    initialValues={formMode === "edit" && reminder}
                />
            )}
        </>
    );
};

export { Reminder };