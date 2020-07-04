window.onload = () => {
    const $topBtn = document.getElementById('topBtn')
    const $select = document.getElementById('select')

    // 默认获取 value
    chrome.storage.sync.get('speed', function (speed) {
        $select.value = speed.speed
    })


    $topBtn.addEventListener('click', () => {
        chrome.storage.sync.get('speed', function (speed) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.executeScript({
                    code: `
                    speed = '${speed.speed}'
                    function speedScroll() {
                        let currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    
                        if (currentTop > 0) {
                            window.requestAnimationFrame ? window.requestAnimationFrame(speedScroll) : setTimeout(speedScroll, 16)
                            switch (speed) {
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
                    speedScroll()
                    `
                })


            })
        })
    })

    $select.addEventListener('change', () => {
        const bg = chrome.extension.getBackgroundPage()
        bg.setSelectedSpeed($select.value)

    })
}