const showStringForEvent = (show_event) => {
    if (show_event.show) {
        let showText = show_event.show.title + ' Season ' + show_event.show.series_num + ', Episode '
        if (show_event.show.episode_title !== '') {
            if (show_event.show.episode_num !== '') {
                showText = showText + show_event.show.episode_num + ': '
            }
            showText = showText + show_event.show.episode_title
        }
        else {
            showText = showText + show_event.show.episode_num
        }
        
        return showText
    }
}

const showStringForGuide = show => {
    let showString = `${show.time}: ${show.title} is on ${show.channel}`

    if (show.series_num && show.episode_title) {
        showString = showString + ` (Season ${show.series_num}, Episode ${show.episode_num}: ${show.episode_title})`
    }
    else {
        if (show.series_num) {
            showString = showString + ` (Season ${show.series_num}, Episode ${show.episode_num}`
        }
        if (show.episode_title) {
            showString = showString + ` (${show.episode_title})`
        }
    }

    if (show.repeat) {
        showString = showString + ' (Repeat)'
    }

    return showString
}

const utilFunctions = {
    showStringForEvent,
    showStringForGuide
}

export default utilFunctions;