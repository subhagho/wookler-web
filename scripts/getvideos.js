//get all videos
function getallvideos(val)
{
	//alert(val);
	$.getJSON("http://localhost:8090/rest/wookler/core/data/videos/-",
		function(jdata)
		{

			$.each(jdata.data, function(i,video){
				
				//getvideoSrc
				var vsrc=video.source;
				
				//contact appropriate player APIs
				if(vsrc=="YouTube")
				{
					//pass
					loadytVideosbyId(video.location);
				}
				
			});
		});
}



var ytvideolink;
		
		function loadytVideosbyId(videoid){
			
			//alert("https://gdata.youtube.com/feeds/api/videos/"+videoid+"?v=2&alt=json");
			
			$.getJSON("https://gdata.youtube.com/feeds/api/videos/"+videoid+"?v=2&alt=json",
			function(data)
			{
				
				//store video links in this array and associate with thumbs
				//weird way to do this because they are at the same level in diffrent lists in json form google
				var videolink;
				$.each(data.entry['media$group']['media$content'], function(p,mediacontentval)
					{
												
						if(p>=1)
						{
							return false;
						}
						videolink=mediacontentval['url'];
						
					});
				

					$.each(data.entry['media$group']['media$thumbnail'], function(j,mediathumbnailval)
					{

												
						if(j>=1)
						{
							return false;
						}
						
						var start_index= videolink.indexOf("/v/");
						var end_index= videolink.indexOf("?version");
						
						var clickthru = videolink.substring(start_index+3,end_index);
						//alert("clickthru url: "+clickthru);
						
						$(document.createElement("img"))
					    	.attr({ src: mediathumbnailval['url'], videolink: clickthru})
    						.addClass("thumbs")
    						.appendTo('#videoimages')
    						.click(function(){
        					ytvideolink = $(this).attr("videolink");

        					loadAndPlayVideo(ytvideolink);
    						})
    						
    						//k=k+1;


					});
				});
		}