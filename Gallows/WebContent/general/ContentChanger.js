/**
 * 
 */

/**
 * 
 */



function changeContent(element) {
	
	var sElementId = element.id;
	
	var sData = null;

		
	switch (sElementId) {
	case "mainpage_option": {
		sData = "mainpage.html";
		break;
	}
	case "gallow_option": {
		sData = "gallow.html";
		break;
	}
	case "tetris_option": {
		sData = "tetris.html";
		break;
	}
	}

	
	var contentElement = document.getElementById("middle__content");
	if (sData == null) {
		contentElement.innerHTML = "Nieznana zakładka";
	} else {
		contentElement.innerHTML = '<object style="width: 100%; min-height: 790px;" type="text/html" data=' + sData
		+ '></object>';
	}

	
	//FETCH API żeby to działaa to musi być jakiś serwer serwujący strony przez zappytania http
//
//		var contentElement = document.querySelector(".content");
//	// var allElements = document.querySelectorAll();
//		console.log("heelllllllllllllllllo dupero");
//	window.fetch(sData) //fetch zwraca promise
//		.then(function(r) {
//			return r.text();
//		}).then(function(html) {
//			contentElement.innerHTML = html;
//		});
//	
//	console.log("another log");



}