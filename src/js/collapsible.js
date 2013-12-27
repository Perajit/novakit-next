window.addEventListener("load", function() {
    var elements = document.getElementsByClassName("nova-collapsible");

    for (var i = 0; i < elements.length; i++) {
        var currentElement = elements.item(i);
        var headerElements = currentElement.getElementsByClassName("header");

        if (headerElements && headerElements.length > 0) {
            headerElements.item(0).onclick = function(element){
                return function() {
                    var oldValue = element.getAttribute("collapsed");

                    if (oldValue === "true") {
                        element.setAttribute("collapsed", "false");
                    }
                    else {
                        element.setAttribute("collapsed", "true");
                    }
                }
            }(currentElement);
        }
    }
});
