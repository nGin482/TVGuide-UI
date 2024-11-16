import { Empty } from "antd";

interface EmptyTableProps {
    text: string
}

const EmptyTableView = ({ text }: EmptyTableProps) => (
    <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={text}
    />
);

export { EmptyTableView };