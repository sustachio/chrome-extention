console.log("Chrome plus has loaded!")

let paragraphs = $("p")

/**/

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, sendResponce) {
	console.log(messaege.txt)
	if (msg.reciver === "content") {
		if (msg.txt === "dog") {
			for (let i = 0; i < paragraphs.length; i++) {
				paragraphs[i].innerHTML = 'dog'
			}
		}
	}
}