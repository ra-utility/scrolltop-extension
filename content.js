chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log(request)
    if (request.key === 'test') {
        alert(request.payload)
    } 
    sendResponse('Hi, I am content.js and I have received your message')
})