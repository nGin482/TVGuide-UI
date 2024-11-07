import { Image, List } from "antd";

import type { ShowDetails } from "../../utils/types";


interface ShowDetailsProps {
    showDetails: ShowDetails
}

const ShowDetails = ({ showDetails }: ShowDetailsProps) => {

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Image src={showDetails.image} width="auto" height={500} />
                <List
                    dataSource={showDetails.genres}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                    style={{ width: "20%" }}
                    bordered
                    header={<h1>Genres</h1>}
                />
            </div>
            <p dangerouslySetInnerHTML={{ __html: showDetails.description }} />
        </>
    );
};

export { ShowDetails };