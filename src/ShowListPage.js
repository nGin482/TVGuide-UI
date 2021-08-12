import ShowList from "./ShowList";
import AddShow from "./AddShow";
import './ShowList.css';

const ShowListPage = () => (
    <div id="show-list-page">
        <h1>List of Shows</h1>
        <ShowList/>
        <AddShow/>
    </div>
)

export default ShowListPage;