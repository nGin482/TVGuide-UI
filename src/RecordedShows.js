import './RecordedShows.css';

const RecordedShows = ({recordedShows}) => {

    return (
        <div id="recorded-shows-list">
            {recordedShows.map(recShow => (
                <div key={recShow.show} className="recorded-show" id="recorded-shows-section">
                    <blockquote>{recShow.show}</blockquote>
                    {recShow.seasons.length === 1 ? <blockquote>{recShow.seasons.length} season</blockquote>  : <blockquote>{recShow.seasons.length} seasons</blockquote>}                    
                </div>
            ))}
        </div>
    )
}

export default RecordedShows;