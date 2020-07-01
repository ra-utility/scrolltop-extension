chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        speed: 'immediate'
    }, function () {
        console.log("置顶速度为：immediate");
    });
})


function setSelectedSpeed(speed){
    chrome.storage.sync.set({
        speed
    }, function () {
        console.log("置顶速度为：" + speed)
    })
}