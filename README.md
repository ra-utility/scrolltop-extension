# scrolltop-extension

A one-click swipe to the top of the page browser plugin for some SX pages that don't have a top button. If you don't know CMD +(top/down).


## principle

use window.requestAnimationFrame or setTimeout.

```js
window.requestAnimationFrame ? window.requestAnimationFrame(func) : setTimeout(func, 16)
```