

function getcreatives(videoid, starttime, endtime)
{

	//alert('function call');
	
	var url_get_all_creatives= "http://localhost:8090/rest/wookler/core/data/videos/"+videoid;

	var url_get_creatives= "http://localhost:8090/rest/wookler/core/data/videos/"+videoid+"?q=starttime%20like%20"+starttime+";endtime%20like%20"+endtime;

	$.getJSON(url_get_all_creatives,function(sequencedata){
	
	//parse response
	
	$.each(sequencedata.data, function(i,sequence){
		//alert(sequence.creative.html);	
		$('body').append(sequence.creative.html);
	});
	
});


}
