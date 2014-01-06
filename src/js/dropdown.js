function DropDown(element) {
    this.element = element;
    this.displayedElement = null;
    this.selectedItemElement = null;

    this.init();
}

DropDown.prototype.init = function() {
    var listsElement = this.element.getElementsByClassName("list");

    if (listsElement.item(0)) {
        var listElement = listsElement.item(0);
        var itemsElement = listElement.getElementsByTagName("div");

        for (var j = 0; j < itemsElement.length; j++) {
            var itemElement = itemsElement.item(j);

            if (itemElement.hasAttribute("selected")) {
                this.selectedItemElement = itemElement;
            }

            itemElement.addEventListener("click", this.onItemClicked.bind(this));
        }

        if (this.selectedItemElement === null && itemsElement.item(0)) {
            this.selectedItemElement = itemsElement.item(0);
            this.selectedItemElement.setAttribute("selected", "");
        }

        if (this.selectedItemElement) {
            this.createDisplayedElement();
            this.displayedElement.style.width = listElement.offsetWidth + "px";

            document.addEventListener("click", this.onDocumentClicked.bind(this));
        }
    }
};

DropDown.prototype.createDisplayedElement = function () {
    this.displayedElement = document.createElement("div");
    this.displayedElement.className = "displayedItem";
    this.displayedElement.appendChild(document.createTextNode(this.selectedItemElement.innerHTML));
    this.element.insertBefore(this.displayedElement, this.element.firstChild);

    this.displayedElement.addEventListener("click", this.onClicked.bind(this));
};

DropDown.prototype.setMenuEnable = function (enable) {
    if (enable) {
        this.element.setAttribute("expanded", "");
    }
    else {
        this.element.removeAttribute("expanded");
    }
};

DropDown.prototype.onClicked = function (e) {
    if (this.element.hasAttribute("expanded")) {
        this.setMenuEnable(false);
    }
    else {
        this.setMenuEnable(true);
    }

    e.stopPropagation();
};

DropDown.prototype.onItemClicked = function (e) {
    this.selectedItemElement.removeAttribute("selected");

    this.selectedItemElement = e.target;
    this.selectedItemElement.setAttribute("selected", "");
    this.displayedElement.innerHTML = this.selectedItemElement.innerHTML;
    this.setMenuEnable(false);

    e.stopPropagation();

    // Fire event
    var event = new CustomEvent("selectedItemChanged", {
        "detail": {
            "selectedItem": this.selectedItemElement
        }
    });
    this.element.dispatchEvent(event);
};

DropDown.prototype.onDocumentClicked = function() {
    this.setMenuEnable(false);
};

window.addEventListener("load", function () {
    var elements = document.getElementsByClassName("nova-dropdown");

    for (var i = 0; i < elements.length; i++) {
        var dropdown = new DropDown(elements.item(i));
    }
});

//window.addEventListener("load", function () {
//    var elements = document.getElementsByClassName("nova-dropdownmenu");
//
//    for (var i = 0; i < elements.length; i++) {
//        var currentDropdownElement = elements.item(i);
//
//        (function(dropdownElement) {
//            var displayedElement = null;
//            var selectedItemElement = null;
//
//            var listElement = dropdownElement.getElementsByClassName("list");
//
//            if (listElement.item(0)) {
//                var itemsElement = listElement.item(0).getElementsByTagName("div");
//
//                for (var j = 0; j < itemsElement.length; j++) {
//                    var itemElement = itemsElement.item(j);
//
//                    if (itemElement.hasAttribute("selected")) {
//                        selectedItemElement = itemElement;
//                    }
//
//                    itemElement.addEventListener("click", function (element) {
//                        return function (e) {
//                            selectedItemElement.removeAttribute("selected");
//
//                            selectedItemElement = element;
//                            selectedItemElement.setAttribute("selected", "");
//                            displayedElement.innerHTML = selectedItemElement.innerHTML;
//                            dropdownElement.removeAttribute("expanded");
//
//                            e.stopPropagation();
//
//                            // Fire event
//                            if (document.createEvent) {
//                                var event = new CustomEvent("selectedItemChanged", {
//                                    "detail": {
//                                        "selectedItem": selectedItemElement
//                                    }
//                                });
//                                dropdownElement.dispatchEvent(event);
//                            }
//                        }
//                    }(itemElement));
//                }
//
//                if (selectedItemElement === null && itemsElement.item(0)) {
//                    selectedItemElement = itemsElement.item(0);
//                }
//
//                if (selectedItemElement) {
//                    displayedElement = document.createElement("div");
//                    displayedElement.className = "displayedItem";
//                    displayedElement.appendChild(document.createTextNode(selectedItemElement.innerHTML));
//                    dropdownElement.insertBefore(displayedElement, dropdownElement.firstChild);
//
//                    displayedElement.addEventListener("click", function (e) {
//                        if (dropdownElement.hasAttribute("expanded")) {
//                            dropdownElement.removeAttribute("expanded");
//                        }
//                        else {
//                            dropdownElement.setAttribute("expanded", "");
//                        }
//
//                        e.stopPropagation();
//                    });
//
//                    displayedElement.style.width = listElement.item(0).offsetWidth + "px";
//
//                    document.addEventListener("click", function () {
//                        dropdownElement.removeAttribute("expanded");
//                    });
//                }
//            }
//        })(currentDropdownElement);
//    }
//});