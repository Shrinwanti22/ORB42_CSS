var imgcount = 0;
app.hotspot = function() {

    var createHotspot = function() {
        rect = app.dom.getNodeById('rect');
        var hotSpotData = {
            top: parseInt(rect.style.top),
            left: parseInt(rect.style.left),
            width: parseInt(rect.style.width),
            height: parseInt(rect.style.height)
        }
        return hotSpotData;
    };

    var checkOverlap = function(canvas) {
        console.log(canvas.id);
        var hotspot = app.dom.getAllhotspots(canvas);
        var currentElement = hotspot[hotspot.length - 1]
        currentTop = parseInt(currentElement.style.top)
        currentLeft = parseInt(currentElement.style.left)
        currentWidth = parseInt(currentElement.style.width)
        currentHeight = parseInt(currentElement.style.height)
        if (hotspot.length > 1) {

            //console.log('calling checkOverlap')

            for (var i = 0; i < hotspot.length - 1; i++) {
                thisTop = parseInt(hotspot[i].style.top)
                thisLeft = parseInt(hotspot[i].style.left)
                thisWidth = parseInt(hotspot[i].style.width)
                thisHeight = parseInt(hotspot[i].style.height)

                if ((currentTop + currentHeight > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft > thisLeft) && (currentLeft < thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop + currentHeight > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft + currentWidth > thisLeft) && (currentLeft + currentWidth < thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft < thisLeft) && (currentLeft + currentWidth > thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop + currentHeight > thisTop) && (currentTop + currentHeight < thisTop + thisHeight) && (currentLeft < thisLeft) && (currentLeft + currentWidth > thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop < thisTop) && (currentTop + currentHeight > thisTop + thisHeight) && (currentLeft < thisLeft) && (currentLeft + currentWidth > thisLeft + thisWidth)) {
                    // console.log('overlapping')
                    return true

                } else {
                    //console.log('not overlapping')
                    selectedImage = app.dom.showDropDown(currentTop + 'px', currentLeft + 'px', currentElement);

                    return false;

                }
            }

        } else {
            //console.log('not overlapping')
            selectedImage = app.dom.showDropDown(currentTop + 'px', currentLeft + 'px', currentElement);

            return false;
        }
    };


    var dragStart = function(event) {
        event.dataTransfer.setData('text', event.target.id);
    };

    var escapeKey = function(e) {
        if (app.dom.getNodesByClass('rectangle')[0])
        // console.log('yes')
        {
            if (e.keyCode == 27) {
                element = null;
                app.dom.getNodesByClass('rectangle')[0].remove()
            }
        }
    };


    var setTagOnHotspot = function(selectedImage) {
        app.dom.hideDropDown();
         canvasNow = document.getElementById(currentCanvas);
        hotspotNow = canvasNow.childNodes;
        var title = document.createElement('p');
        var titleText = document.createTextNode(selectedImage);
        title.appendChild(titleText);
        hotspotNow[hotspotNow.length - 1].appendChild(title);
    };


    var createList = function(image_name) {
        var parent = document.getElementById('dropdown');
        var length = document.getElementById('list').childNodes.length;
        var li_element = document.createElement('li');
        li_element.setAttribute('id', image_name + 'list');
        li_element.setAttribute('onclick', "app.hotspot.setTagOnHotspot('" + image_name + "')");

        li_element.innerHTML = image_name;
        parent.appendChild(li_element);
        imgcount++;
    };

    return {
        setTagOnHotspot: setTagOnHotspot,
        createHotspot: createHotspot,
        checkOverlap: checkOverlap,
        dragStart: dragStart,
        escapeKey: escapeKey,
        createList: createList

    };


}();
