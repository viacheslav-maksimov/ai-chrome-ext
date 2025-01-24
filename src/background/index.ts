console.log("background is running");

chrome.runtime.onMessage.addListener((request) => {

		console.log("background has received a message from popup");

});
