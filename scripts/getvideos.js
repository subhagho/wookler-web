//get all videos
//load the player once even before any images are clicked
//var k = 0;
var ytvideolink;
var syncmutex;

function getallvideos(val)
{
	//alert(val);
	syncmutex= false;
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
		
		// in the end attach a custom event to section

				
		//$('body').append("<h1>triggering event</h1></br>");

		$('#intro').trigger("sectionloaded");


		});

}




		
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
    						.appendTo('#intro')
    						.click(function(){
        					ytvideolink = $(this).attr("videolink");

        					loadAndPlayVideo(ytvideolink);
        					

    						});
    						
    						//k=k+1;
    						//$('body').append("<h1>creating images<h1></br>");
    						//$('body').append($('img').first().attr("videolink"));

					});
				
				//syncmutex = true;
					
				});
				
				
		}