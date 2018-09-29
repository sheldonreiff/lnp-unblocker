var inlineOverflowTries = 0;

function overflowInlined(){
	if(typeof $('body').attr('style') === 'undefined' || $('body').attr('style').length < 1 || $('body').attr('style').toLowerCase().replace(/\s/g,'').indexOf('overflow:auto!important;') < 0){
		return true;
	}else{
		return false;
	}
}

function onBodyMutation(mutationList, observer) {
	if(inlineOverflowTries <= 500){
  		if(overflowInlined()){
	  		//make sure overflow:hidden is inlined at all times
	  		var currentStyle = '';
	  		if(typeof $('body').attr('style') !== 'undefined' && $('body').attr('style').length > 0){
	  			currentStyle = $('body').attr('style') + ' ';
	  		}
	  		$('body').attr('style', currentStyle + 'overflow: auto !important;');
	  		inlineOverflowTries++;

	  		chrome.runtime.sendMessage('incrementUnblockCount');
	  	}
  	}else{
  		//give up to prevent infinate loop
  	}
  	
  	if($('#syncronexOverlayContainer').length > 0){
  		removeElement($('#syncronexOverlayContainer'));
  	}

  	if($('#syncronexOverlay').length > 0){
  		removeElement($('#syncronexOverlay'));
  	}
}

function removeElement(element){
	var elementDescription = '';
	if(typeof element.prop('tagName') != 'undefined' && element.prop('tagName').length > 1){
		elementDescription += 'Type: ' + element.prop('tagName');
	}
	if(typeof element.prop('id') != 'undefined' && element.prop('id').length > 1){
		elementDescription += ' Id: ' + element.prop('id');
	}
	if(typeof element.prop('class') != 'undefined' && element.prop('class').length > 1){
		elementDescription += ' Class: ' + element.prop('class');
	}
	elementDescription = $.trim(elementDescription)
	
	element.remove();

	console.log(`LNP Unblocker: Removed element (${elementDescription})`);

	chrome.runtime.sendMessage('incrementUnblockCount');
}

var targetNode = document.querySelector('body');
var observerOptions = {
	childList: true,
 	subtree: true,
	attributes: true,
	characterData: false
}

var observer = new MutationObserver(onBodyMutation);
observer.observe(targetNode, observerOptions);



