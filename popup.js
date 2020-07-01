window.onload = () => {
    const $topBtn = document.getElementById('topBtn')
    const $select = document.getElementById('select')

    $topBtn.addEventListener('click', () => {
        chrome.storage.sync.get('speed', function (speed) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id, {
                        code: 'window.scrollTo(0, 0)'
                    })
            })
        })

    })

    $select.addEventListener('change', () => {
        const bg = chrome.extension.getBackgroundPage()
        bg.setSelectedSpeed($select.value)

    })
}

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            if (callback) {
                callback(response)
            }
        })
    })
}

function speedScroll() {
    // current page scroll height
    let currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    if (currentTop > 0) {
        // for compatibility
        window.requestAnimationFrame ? window.requestAnimationFrame(speedScroll) : setTimeout(speedScroll, 16)
        switch (this.speed) {
            case 'average':
                window.scrollTo(0, currentTop - 60)
                break
            case 'fast-to-slow':
                window.scrollTo(0, currentTop - (currentTop / 5))
                break
            case 'immediate':
                window.scrollTo(0, 0)
                break
        }
    }
}