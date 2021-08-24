

const EpisodeData = ({episode}) => {
    
    return (
        <div>
            <blockquote>Episode Number {episode['episode number']}</blockquote>
            <blockquote>Episode Title {episode['episode title']}</blockquote>
            <blockquote>First Air Date {episode['first air date']}</blockquote>
            <blockquote>Repeat {episode['repeat']}</blockquote>
        </div>
    )
}


export default EpisodeData;