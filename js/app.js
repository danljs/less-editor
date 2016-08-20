var model = (function(){
	var ajax = function(type, url, data){
    return new Promise(function(resolve, reject){
      var request = new XMLHttpRequest();
      request.open(type, url);
      request.onreadystatechange = function (){
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

      request.onerror = function(){reject(Error('Network Error'));}

      request.send(data);
    });
  }

	return{
		update : function(styles){
			ajax('post', 'update', JSON.stringify(styles))
      .then(
        function(e){
        	console.log(e);
        },
        function (e) {
        	console.log(e);
        }
      )
		}
	}
}());

//================================================================
function $(id){return document.getElementById(id)}
(function(){
	$('button-update').addEventListener('click', function(e){
		model.update({
      color: $('input-color').value,
      background: $('input-background').value
    });
	});
})();