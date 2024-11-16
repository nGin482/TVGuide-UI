import { Alert, Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";

import { EmptyTableView } from "../EmptyTableView";
import type { SearchItem } from "../../utils/types";
import "./SearchItem.css";


interface SearchItemProps {
    searchItem: SearchItem
    show: string
}

const SearchItem = ({ searchItem, show }: SearchItemProps) => {


    const columns: TableColumnsType<SearchItem> = [
        {
            key: "search_active",
            dataIndex: "search_active",
            title: "Search Active",
            render: (search: boolean) => (
                <Tag color={search ? "green" : "red"}>
                    {search ? "Active" : "Inactive"}
                </Tag>
            )
        },
        {
            key: "exact_title_match",
            dataIndex: "exact_title_match",
            title: "Exact Title Match",
            render: (exact_title_match: boolean) => exact_title_match ? "Exact Match" : "Any matches"
        },
        {
            key: "min_season_number",
            dataIndex: ["conditions", "min_season_number"],
            title: "Min Season Number",
            render: (min_season_number: number) => min_season_number
        },
        {
            key: "max_season_number",
            dataIndex: ["conditions", "max_season_number"],
            title: "Max Season Number",
            render: (max_season_number: number) => max_season_number
        },
        {
            key: "ignore_episodes",
            dataIndex: ["conditions", "ignore_episodes"],
            title: "Ignore Episodes",
            render: (ignore_episodes: string[]) => ignore_episodes
        },
        {
            key: "ignore_seasons",
            dataIndex: ["conditions", "ignore_seasons"],
            title: "Ignore Seasons",
            render: (ignore_seasons: number[]) => ignore_seasons
        },
        {
            key: "ignore_titles",
            dataIndex: ["conditions", "ignore_titles"],
            title: "Ignore Titles",
            render: (ignore_titles: string[]) => ignore_titles
        },
        {
            key: "actions",
            title: "Actions",
            render: () => (
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                    <Button>Edit {show} Search</Button>
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
        searchItem ? (
            <>
                <Table
                    columns={columns}
                    dataSource={[searchItem]}
                    bordered
                    locale={{
                        emptyText: <EmptyTableView text={`No search configured for ${show}`} />
                    }}
                />
            </>
        ) : (
            <Alert message="No search item was found for this show" type="warning" />
        )
    );
};

export { SearchItem };