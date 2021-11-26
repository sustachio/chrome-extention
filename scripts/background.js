console.log("background running...");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
	console.log("Sending...");
	let msg = {
		reciver: "content",
		txt: "dog"
	};
	chrome.tabs.sendMessage(tab.id, msg);
	console.log("Message sent");
}