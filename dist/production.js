//window.onload = app.rectangle.setupTools('canvas');
var element = null;
var currentCanvas = null
window.onbeforeunload = function() {
  return 'May be you dragged in wrong position or refreshed the page!';
};

app.dom = function() {

  var hotspotcounter = 0;

  var addhotspotdom = function(canvas, object) {
    divNew = document.createElement('div');
    divNew.className = 'hotspot';
    divNew.setAttribute('id', 'hotspot' + hotspotcounter);
    divNew.setAttribute('draggable', 'true');
    divNew.setAttribute('ondragstart', 'dragStart(this)');
    divNew.style.top = object.top + 'px';
    divNew.style.left = object.left + 'px';
    divNew.style.width = object.width + 'px';
    divNew.style.height = object.height + 'px';
    img = document.createElement('img');
    img.setAttribute('src', 'images/close.png')
    img.setAttribute('onclick', "app.dom.deletehotspotdom(" + "'hotspot" + hotspotcounter + "')")
    hotspotcounter++;
    divNew.appendChild(img);
    canvas.appendChild(divNew);

    if (app.hotspot.checkOverlap(canvas)) {
      alert('This is overlapping, not allowed');
      hotspot = document.getElementById(canvas.id).childNodes
      hotspot[hotspot.length - 1].remove()
    }
  };

  var deletehotspotdom = function(hotspot) {

    element = null
    document.getElementById(hotspot).remove();
    document.getElementById('rect').remove();

  };

  var deleterectangledom = function(canvas, objectID) {
    re = document.getElementById(objectID);
    canvas.removeChild(re);
  };


  var getNodeById = function(objectID) {
    return document.getElementById(objectID);
  };

  var getNodesByClass = function(objectClass) {
    return document.getElementsByClassName(objectClass);
  }


  var setRectangle = function(width, height, left, top) {
    var rect = document.getElementById('rect');
    rect.style.width = width;
    rect.style.height = height;
    rect.style.left = left;
    rect.style.top = top;
  };

  var createRectangle = function(canvas, x, y) {
    element = document.createElement('div');
    element.className = 'rectangle';
    element.setAttribute('id', 'rect');
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    canvas.appendChild(element);

  };

  var hideDropDown = function() {
    var drop = document.getElementById('dropdown');
    drop.style.display = 'none';

  }

  var showDropDown = function(top, left, currentHotspot) {
    var drop = document.getElementById('dropdown');
    drop.style.left = left;
    drop.style.top = top;
    drop.style.display = 'block';

  }

  var getAllhotspots = function(canvas) {
    var id = document.getElementById(canvas.id)
      // console.log("aaaaapp"+document.getElementById(canvas.id).childNodes[0].id)

    var canvaHotspots = document.getElementById(canvas.id).childNodes
      // return document.getElementsByClassName('hotspot');
      // console.log("uuuuuuu"+canvaHotspots)
    return canvaHotspots
  }


  return {
    showDropDown: showDropDown,
    hideDropDown: hideDropDown,
    getNodeById: getNodeById,
    addhotspotdom: addhotspotdom,
    setRectangle: setRectangle,
    createRectangle: createRectangle,
    deleterectangledom: deleterectangledom,
    deletehotspotdom: deletehotspotdom,
    getNodesByClass: getNodesByClass,
    getAllhotspots: getAllhotspots
  }

}();

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
        // var hotspotId = document.getElementById()
        // alert('selected_index ' + selectedImage);
        canvasNow = document.getElementById(currentCanvas);
        hotspotNow = canvasNow.childNodes
        var title = document.createElement('p');
        var titleText = document.createTextNode(selectedImage)
        title.appendChild(titleText)
        hotspotNow[hotspotNow.length - 1].appendChild(title)


    }
    

    var createList = function(image_name)
    {
        var parent = document.getElementById('dropdown');
        var length = document.getElementById('list').childNodes.length;
        var li_element = document.createElement('li');
        li_element.setAttribute('id',image_name+'list');
        li_element.setAttribute('onclick', "app.hotspot.setTagOnHotspot('"+image_name+"')");

        li_element.innerHTML = image_name;
        parent.appendChild(li_element);
        imgcount++;
    }

    return {


        setTagOnHotspot: setTagOnHotspot,
        createHotspot: createHotspot,
        checkOverlap: checkOverlap,
        dragStart: dragStart,
        escapeKey: escapeKey,
        createList: createList

  };


}();

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

 var flag = 0;
 var dropZone = document.getElementById('drop_zone');
 dropZone.addEventListener('dragover', imageFile.handleDragOver, false);
 dropZone.addEventListener('drop', imageFile.handleFileSelect, false);

 function addImage(object) {
   if (checkDuplicateImage(object.img_name + "div")) {
     if (confirm("You are about to replace the image, are you sure?? ")) {
       console.log("i will replace the image here");
       deletePic(object.img_name);
     } else {
       return false;
     }
   }
   var listTag = document.getElementById('list');
   var preview = document.getElementById('preview');
   var image = document.createElement('img');
   var div = document.createElement('div');
   var canvas = document.createElement('div');

   var titleDiv = document.createElement('div');
   var titleText = document.createTextNode(object.img_name);
   titleDiv.appendChild(titleText);
   titleDiv.setAttribute('id', 'link');
   var cross = document.createElement('img');
   var defaultButton = document.createElement('input');
   defaultButton.setAttribute('class', "thumbnails");
   defaultButton.setAttribute('type', 'radio');
   defaultButton.setAttribute('name', 'default');
   defaultButton.setAttribute('value', object.img_name + "default");

   cross.setAttribute('src', 'images/close.png');
   cross.setAttribute('id', 'cross');
   image.setAttribute('src', object.url);
   image.setAttribute('title', object.img_name);
   image.setAttribute('id', object.img_name);
   image.setAttribute('onclick', "viewImage(this)");
   div.setAttribute('id', object.img_name + "div");
   cross.setAttribute('onclick', "deletePic('" + object.img_name + "')");
   canvas.setAttribute('id', object.img_name + "c");

   canvas.setAttribute('class', 'canvas notuploaded');
   canvas.style.width = image.naturalWidth + "px";
   canvas.style.height = image.naturalHeight + "px"

   div.appendChild(defaultButton);
   div.appendChild(cross);
   div.appendChild(image);
   div.appendChild(titleDiv);

   listTag.appendChild(div);
   preview.appendChild(canvas);

   app.hotspot.createList(object.img_name);
 }


 function viewImage(obj) {
   var images = document.getElementsByClassName("thumbnails");
   console.log("In function");
   if (flag == 0) {
     console.log("In if");
     images[0].checked = true;
     flag++;
   }
   var x = document.getElementsByClassName("canvas");
   var i;
   for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
   }
   var preview = document.getElementById('preview');
   preview.style.visibility = 'visible';
   var canvas = document.getElementById(obj.title + "c");
   currentCanvas = obj.title + "c";
   canvas.style.display = 'block';
   x = document.getElementById(obj.title).src;
   canvas.style.backgroundImage = "url('" + x + "')";
   var saveButton = document.getElementById('save');
   // saveButton.setAttribute('onclick', "saveFile.generateURL('"+x+"' , '"+obj.title+"')") ;
   saveButton.setAttribute('onclick', "imageFile.saveImage()");

   app.rectangle.setupTools(obj.title + "c");

 }

 function deletePic(obj) {
   document.getElementById(obj + "div").remove();
   document.getElementById(obj + "c").remove();
   document.getElementById(obj + "list").remove()
 }

 function checkDuplicateImage(divName) {
   var allImages = document.getElementById("list").childNodes
   var flagCheck = 0;
   if (allImages.length > 0) {
     for (var i = allImages.length - 1; i >= 0; i--) {
       if (allImages[i].id == divName) {
         flagCheck = 1;
       }
     };
   }
   if (flagCheck == 1) {
     return true;
   } else {
     return false;
   }
 }

var imageFile = function(){

  

  var handleFileSelect = function(evt){

 var files = evt.target.files; // FileList object
  evt.stopPropagation();
  evt.preventDefault();
  var output = {
    url:'', img_name:''
  };
  var files = evt.dataTransfer.files;
    // Loop through the FileList and render image files as thumbnails.
    if(files.length > 0)
    {
    //  do
    //  {
    //    var x = document.getElementsByTagName("img");
    //    var j;
    //    var counter = 0;
        // for (j = 0; j < x.length; j++) 
        // {
        //  console.log((x[j].title) + " and " + escape(files.name));
        //  if(x[j].title == escape(files.name))
        //  {
      //      alert("You have already added this image");
      //      console.log("heloooooooooooooooo"+(x[j].title));
      //      break;
        //  }
        // }

      

         
        for (var i = 0, f; f = files[i]; i++) 
        {
            if (!f.type.match('image.*')) 
               {
                   continue;
               }
         
          var reader = new FileReader();
        

        reader.onload = (function(files) 
        {

          return function(e) 
          {
            output.url = e.target.result;
            output.img_name = escape(files.name);
            addImage(output);
          };
        })(f);

        
        reader.readAsDataURL(f);
      }
       
  };
}

var handleDragOver = function(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}
var saveImage =function(){
 var x = document.getElementsByClassName("canvas");
 var i;
 for (i = 0; i < x.length; i++) 
 {
  if(x[i].classList.contains("notuploaded")){
   
   var src = x[i].style.backgroundImage;
   var name = x[i].id;
   name = name.substring(0, name.length - 1);
   saveFile.generateURL(src , name);
   x[i].classList.remove("notuploaded");
   x[i].classList.add("uploaded");
 }
 else
  console.log(" file  already saved");
}

}


return {
   handleFileSelect : handleFileSelect,
   handleDragOver : handleDragOver,
   saveImage : saveImage,
   
 }

}();






var JSONObj = new Object();
var saveFile = function(){

  var generateURL =function(src , title){

   filepicker.setKey("AJyjszryUSGGEsDo5ntvqz");
   console.log("src "+src ); 
   var input = src.split(',')[1];
   var fname = title;
   var ftype = title.split('.')[1];
   var mtype = 'image/'+ftype;
   
   
   // console.log("File inp"+input);

   filepicker.store(
     input,
     {base64decode: true,
      mimetype: mtype,
      filename:  title},
     function(Blob){
       console.log("Store successful:" + JSON.stringify(Blob));
       console.log(Blob.url);
       var canvas = document.getElementById(fname +'c');
       var setURL = document.createElement('p');
       setURL.setAttribute('id', 'url');
       var text = document.createTextNode("abcd");
       setURL.appendChild(text);
       canvas.appendChild(setURL);
       
     },
     function(FPError) {
       console.log(FPError.toString());
     },
     function(progress) {
       console.log("Loading: "+progress+"%");
     }
     );
   enablePreview();
 }

  var generateJSON = function(){
    var list = document.getElementById('list');
    var imageList = list.childNodes;
    var length = imageList.length;
    var defaultImage = list.getElementsByName('default');
    for(var k =0; k<defaultImage.length; k++)
    {
      if(defaultImage.checked)
      {
        var defaultImageValue = defaultImage[i].value;
        break;
      }
    }
    for (var i = 0;i<length; i++)
    {
      var canvas = document.getElementById(imageList[i].title +'c');
      var allHotspots = canvas.childNodes;
      var url = allHotspots[length-1].innerHTML;
      for (var j=0;j<allHotspots.length-1;j++)
      {
        var top = allHotspots[i].style.top;
        var left = allHotspots[i].style.left;
        var width = allHotspots.style.width;
        var height = allHotspots.style.height;
        var id = allHotspots[i].id;
        var link = allHotspots[i].childNodes[1].innerHTML;
      }
    }
  }

  var enablePreview = function(){
    var preview = document.getElementById('previewButton');
    preview.style.display = 'block';
}

  return {
    generateURL : generateURL,
    generateJSON : generateJSON,
    enablePreview : enablePreview
    
    
  }



}();


