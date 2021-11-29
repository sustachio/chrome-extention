$(document).ready(function() {
	$("#userinput").on("input", newText);

	function newText() {

		let args = {
			active: true,
			currentWindow: true
		}
		chrome.tabs.query(args, gotTab);

		function gotTab(tabs) {
			// send a message to the content script
			let message = $("#userinput").val();
			console.log(message);
			let msg = {
				txt: message
			}	
			chrome.tabs.sendMessage(tabs[0].id, msg);
		}
	}
})