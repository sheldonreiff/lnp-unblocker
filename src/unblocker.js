let inlineOverflowTries = 0;

const overflowInlined = () => typeof $('body').attr('style') === 'undefined'
	|| $('body').attr('style').length < 1
	|| $('body').attr('style').toLowerCase().replace(/\s/g, '')
	.indexOf('overflow:auto!important;') < 0;

const onBodyMutation = () => {
	if (inlineOverflowTries <= 500) {
		if(overflowInlined()){
			// make sure overflow:hidden is inlined at all times
			let currentStyle = '';
			if (typeof $('body').attr('style') !== 'undefined' && $('body').attr('style').length > 0) {
				currentStyle = `${$('body').attr('style')} `;
			}
			$('body').attr('style', `${currentStyle}overflow: auto !important;`);
			inlineOverflowTries++;

			chrome.runtime.sendMessage('incrementUnblockCount');
		}
	} // else give up to prevent infinate loop

	if ($('#syncronexOverlayContainer').length) {
		removeElement($('#syncronexOverlayContainer'));
	}

	if ($('#syncronexOverlay').length) {
		removeElement($('#syncronexOverlay'));
	}
};

const removeElement = (element) => {
	const elementType = typeof element.prop('tagName') !== 'undefined' && element.prop('tagName').length
	? ` Type: ${element.prop('tagName')}`
	: '';

	const elementId = typeof element.prop('id') !== 'undefined' && element.prop('id').length
	? ` Id: ${element.prop('id')}`
	: '';

	const elementClass = typeof element.prop('class') !== 'undefined' && element.prop('class').length
	? ` Class: ${element.prop('class')}`
	: '';

	element.remove();

	console.log(`LNP Unblocker: Removed element (${elementType}${elementId}${elementClass})`);

	chrome.runtime.sendMessage('incrementUnblockCount');
};

const targetNode = document.querySelector('body');
const observerOptions = {
	childList: true,
	subtree: true,
	attributes: true,
	characterData: false,
};

const observer = new MutationObserver(onBodyMutation);
observer.observe(targetNode, observerOptions);
