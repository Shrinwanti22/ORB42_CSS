
var saveFile = function() {
  var noOfUrl = 0;
  var doneUrl = 0;
  var urlstring = false;

  var generateURL = function(src, title) {


      filepicker.setKey("AJyjszryUSGGEsDo5ntvqz");
      console.log("src " + src);
      var input = src.split(',')[1];
      var fname = title;
      var ftype = title.split('.')[1];
      var mtype = 'image/' + ftype;


          // console.log("File inp"+input);

          filepicker.store(
            input, {
              base64decode: true,
              mimetype: mtype,
              filename: title
            },
            function(Blob) {
              console.log("Store successful:" + JSON.stringify(Blob));
              console.log(Blob.url);
              var canvas = document.getElementById(fname + 'c');
              var setURL = document.createElement('p');
              setURL.setAttribute('class', 'filepickerurltext');
              var text = document.createTextNode(Blob.url);
              setURL.appendChild(text);
              canvas.appendChild(setURL);
              doneUrl++;

              if (doneUrl >= noOfUrl) {
                JSONModule.generateJSON();
                app.mongodb.insert(JSONModule.getJSON());
                doneUrl = 0;
                alert("JSON CREATED and PUSHED");
              }

            },
            function(FPError) {
              console.log(FPError.toString());
            },
            function(progress) {
              console.log("Loading: " + progress + "%");
            }
            );
            enablePreview();
  }



  var enablePreview = function() {
    var preview = document.getElementById('previewButton');
    preview.style.display = 'block';
  }

  var setNoOfUrl = function(noofurl) {
    noOfUrl = noofurl;
  }

  return {
    generateURL: generateURL,
    setNoOfUrl: setNoOfUrl,
    enablePreview: enablePreview,
    noOfUrl : noOfUrl,
    doneUrl : doneUrl

  }
}();
