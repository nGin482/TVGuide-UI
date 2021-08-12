const displayShow = (show_event) => {
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

const showDetails = show => {
    let showMessage = show.time + ': ' + show.title + ' is on ' + show.channel

    if (show.series_num) {
        showMessage = showMessage + ' (Series ' + show.series_num + ', Episode ' + show.episode_num + ')'
        if (show.episode_title) {
            showMessage = showMessage.substring(0, showMessage.length-2) + ': ' + show.episode_title + ')'
        }
    }
    else {
        showMessage = showMessage + ' (' + show.episode_title + ')'
    }

    if (show.repeat) {
        showMessage = showMessage + ' (Repeat)'
    }

    return showMessage
}

const utilFunctions = {
    displayShow,
    showDetails
}

export default utilFunctions;