const unblockCount = {};

const setUnblockCounter = () => {
	chrome.tabs.query({ active: true }, (tabs) => {
		const currentTabId = tabs[0].id;

		const badge = typeof unblockCount[currentTabId] !== undefined && unblockCount[currentTabId] > 0
		? unblockCount[currentTabId].toString()
		: '';

		chrome.browserAction.setBadgeText({ text: badge });
	});
};

chrome.runtime.onMessage.addListener((message, sender) => {
	switch (message) {
		case 'incrementUnblockCount':
			unblockCount[sender.tab.id]++;
			setUnblockCounter();
	}
});

chrome.webNavigation.onCommitted.addListener((details) => {
	switch (details.transitionType) {
		case 'reload':
		case 'link':
		case 'typed':
			unblockCount[details.tabId] = 0;
			setUnblockCounter();
	}
});

chrome.tabs.onActivated.addListener(setUnblockCounter);
