app.rectangle = (function() {
    function setupTools(canvas) {
        var canvasdiv = app.dom.getNodeById(canvas);
        createRectangle(canvasdiv);
    };


    function createRectangle(canvas) {
        function setMousePosition(e) {
            var ev = e || window.event; //Moz || IE
            if (ev.pageX) { //Moz
                mouse.x = ev.pageX + window.pageXOffset;
                mouse.y = ev.pageY + window.pageYOffset;
            } else if (ev.clientX) { //IE
                mouse.x = ev.clientX + document.body.scrollLeft;
                mouse.y = ev.clientY + document.body.scrollTop;
            }
        };
        var mouse = {
            x: 0,
            y: 0,
            startX: 0,
            startY: 0
        };
        var divNew = null;
        canvas.onmousemove = function(e) {
            setMousePosition();
            if (element !== null) {

                app.dom.setRectangle(Math.abs(mouse.x - mouse.startX) + 'px',
                    Math.abs(mouse.y - mouse.startY) + 'px', (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px', (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px');
            }
        };
        canvas.onmouseup = function(e) {
            if (element !== null) {

                var object = app.hotspot.createHotspot(canvas)
                app.dom.addhotspotdom(canvas, object)
                app.dom.deleterectangledom(canvas, 'rect');
                element = null;
                

            } else {
                mouse.startX = mouse.x;
                mouse.startY = mouse.y;
                app.dom.hideDropDown();
                app.dom.createRectangle(canvas, mouse.x, mouse.y);
            }
        }
    };
    
    return {
        createRectangle: createRectangle,
        setupTools: setupTools
    }
})();
