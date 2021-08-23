import { useParams } from "react-router";

const RecordedShow = () => {
    const recordedShow = useParams().show
    
    return (
        <h1>{recordedShow}</h1>
    )
}


export default RecordedShow;