function log(str: string) {
	$('#logs').append(str + "\n");
}

function startup() {
	// load stored object data
	listObjects();
    return ;
}

function createObject() {
	// request to create a new object on the server
	$.ajax({
	    type: "GET",
	    contentType: "application/json",
	    url: "/add",
	})
	.done(function(response){
	    console.log(response)
		log("# object created");
		log(JSON.stringify(response))
	})
	.fail(function(xhr, textStatus, errorThrown){
		console.log("ERROR: ",xhr.responseText)
		return xhr.responseText;
	});
    return ;
}

function listObjects() {
	try{
		log("# loading previously stored objects:");
		$.ajax({
		    type: "GET",
		    contentType: "application/json",
		    url: "/load",
		})
		.done(function(response){
			var o = response['objects'];
			console.log(o.length)
		    log("# " + JSON.stringify(o));
		})
		.fail(function(xhr, textStatus, errorThrown){
			console.log("ERROR: ",xhr.responseText)
			return xhr.responseText;
		});
	}catch{
		log("# loading of previously stored objects failed");
	}
    return ;
}

function deleteObjects() {
	log("# deleting all objects")
	$.ajax({
	    type: "DELETE",
	    contentType: "application/json",
	    url: "/",
	})
	.done(function(response){
		console.log(response)
	})
	.fail(function(xhr, textStatus, errorThrown){
		console.log("ERROR: ",xhr.responseText)
		return xhr.responseText;
	});	
}