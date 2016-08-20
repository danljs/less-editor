var model = (function() {

	var ajax = function(type, url, data) {

    return new Promise(function(resolve, reject) {

      var request = new XMLHttpRequest();
      request.open(type, url);
      request.onreadystatechange = function() {

        if(request.readyState == 2||request.readyState == 3){
            //do nothing
        }
        else if (request.readyState == 4 && (request.status === 200 || request.status === 204) && resolve) {
            resolve(request);
        }
        else if (reject) {
            reject(request);
        }
      }
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      request.onerror = function() {
        reject(Error('Network Error'));
      }

      request.send(data);
    });
  };

  var getLinks = function() {
    var files = document.getElementsByTagName( 'link' ),
        links = [];

    [].slice.call(files).map(function(c) {
      var rel = c.rel;

      if ( typeof rel != 'string' || rel.length == 0 || rel == 'stylesheet' ) {
        links.push({
          'elem' : c,
          'href' : c.getAttribute( 'href' ).split( '?' )[ 0 ]
        });
      }
    })
    return links;
  };

  var cssRefresh = function() {
    getLinks().map(function(c) {
      c.elem.setAttribute( 'href', c.href + '?x=' + Math.random());
    })
  };

	return{
		update : function(styles) {

			ajax('post', 'update', JSON.stringify(styles))
      .then(
        function(e) {
          console.log(e);
          cssRefresh();
        },
        function (e) {console.log(e);}
      )
		}
	}
}());

//================================================================
function $(id){return document.getElementById(id)}

(function() {

	$('button-update').addEventListener('click', function(e) {

		model.update({
      color: $('input-color').value,
      background: $('input-background').value
    });

	});

})();