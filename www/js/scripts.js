var query = function(request) {
	$.get(request, function(done){
		generatePage(done);
	});
}
var generatePage = function(data) {

}
function getE(element) {
	var symb = element.charAt(0);
	var elementName = element.slice(1);
	if(symb=="#"){
		return document.getElementById(elementName);
	} else if (symb==".") {
		return document.getElementsByClassName(elementName);
	} else {
		return document.getElementsByTagName(element);
	}
}