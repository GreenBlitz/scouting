function Comment() {
    return {
        "teamNumber": teamNumber,
        "gameId": gameId,
        "eventName": "comment",
        "content": null
    }
}

var comment = null;

function comment_start() {
    comment = Comment();
    hideAllButtons();
    comment_text();
}

function comment_text() {
    fillEventsDivWithObjects([
        {
            type: 'text',
            value: 'Comment'
        }
    ], comment_finish);
}

function comment_finish(text) {
	comment.content = text;
    sendEvent(comment);

    initializeEvents();

}