var unblockCount = {};

chrome.webNavigation.onCommitted.addListener(function(details){
	switch(details.transitionType){
		case 'reload':
		case 'link':
		case 'typed':
			unblockCount[details.tabId] = 0;
			setUnblockCounter();
	}
});

chrome.tabs.onActivated.addListener(function(data) {
	setUnblockCounter();
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message){
		case 'incrementUnblockCount':
			unblockCount[sender.tab.id]++;
			setUnblockCounter();
	}
});

function setUnblockCounter(){
	console.log(unblockCount);
	chrome.tabs.query({active: true }, function (tabs) {
		var currentTabId = tabs[0].id;
		var badge = '';
		if(typeof unblockCount[currentTabId] != 'undefined' && unblockCount[currentTabId] > 0){
			var badge = unblockCount[currentTabId].toString();
		}
		chrome.browserAction.setBadgeText({text: badge});
	});
}