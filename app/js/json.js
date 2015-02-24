var JSONModule = function() {

    var JSONObj = new Object();

    var _writeHotspot = function(hotspotArray, id, t, l, w, h, link) {

        hotspotArray[id] = {};
        hotspotArray[id]["id"] = id;
        hotspotArray[id]["t"] = t;
        hotspotArray[id]["l"] = l;
        hotspotArray[id]["w"] = w;
        hotspotArray[id]["h"] = h;
        hotspotArray[id]["link"] = link;
    }
    var _writeDimensions = function(height, width) {
        var dimensions = {
            "height": height,
            "width": width
        };
        return dimensions;
    }
    var _writeImage = function(imageArray, filename, imgid, filepickerurl, dimensions, hotspotArray) {
        var imagefile = {
            "filename": filename,
            "id": imgid,
            "filepickerurl": filepickerurl,
            "dimensions": dimensions,
            "hotspots": hotspotArray
        };
        imageArray[imgid] = imagefile;
    }
    var generateJSON = function() {

        JSONObj = new Object();
        var imageArray = {};

        var list = document.getElementById('list');
        var imageList = list.childNodes;
        var length = imageList.length;
        for (var i = 0; i < length; i++) {
            var canvas = document.getElementById(imageList[i].title + 'c');
            var allHotspots = canvas.childNodes;

            var url = false;

            var imageHeight = parseInt(canvas.style.height);
            var imageWidth = parseInt(canvas.style.width);
            var imageName = imageList[i].title;
            var dimension = _writeDimensions(imageHeight, imageWidth);
            var hotspotlist = {};

            var defaultImage = document.getElementsByName('default');
            var defaultImageValue;
            for (var k = 0; k < defaultImage.length; k++) {
                if (defaultImage[k].checked) {
                    defaultImageValue = defaultImage[k].value;
                    break;
                }
            }

            for (var j = 0; j < allHotspots.length; j++) {
                var top = (parseInt(allHotspots[j].style.top)-canvas.offsetTop)*100.0/imageHeight;
                var left = (parseInt(allHotspots[j].style.left)-canvas.offsetLeft)*100.0/imageWidth;
                var width = parseInt(allHotspots[j].style.width)*100.0/imageWidth;
                var height = parseInt(allHotspots[j].style.height)*100.0/imageHeight;
                var id = allHotspots[j].id;



                if (allHotspots[j].style.top == "") {
               
                    url = allHotspots[j].innerHTML;
                    continue;
                   }else{
                    var link = allHotspots[j].childNodes[1].innerHTML;
               
                }
                _writeHotspot(hotspotlist, id, top, left, width, height, link);

            }

            _writeImage(imageArray, imageName, imageName, url, dimension, hotspotlist);
        }

        JSONObj["images"] = imageArray;
        JSONObj["default"] = defaultImageValue;
    }
    var getJSON = function() {
        return JSONObj;
    }

    return {
        generateJSON: generateJSON,
        getJSON: getJSON
    }

}()
