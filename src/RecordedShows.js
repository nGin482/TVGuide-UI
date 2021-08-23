import { useHistory } from 'react-router';
import './RecordedShows.css';

const RecordedShows = ({recordedShows}) => {

    const history = useHistory()
    const goToShow = recordedShow => {
        history.push('/shows/' + recordedShow)
    }
    
    return (
        <div id="recorded-shows-list">
            {recordedShows.map(recShow => (
                <div key={recShow.show} className="recorded-show" id="recorded-shows-section" onClick={() => goToShow(recShow.show)}>
                    <blockquote>{recShow.show}</blockquote>
                    {recShow.seasons.length === 1 ? <blockquote>{recShow.seasons.length} season</blockquote>  : <blockquote>{recShow.seasons.length} seasons</blockquote>}                    
                </div>
            ))}
        </div>
    )
}

export default RecordedShows;