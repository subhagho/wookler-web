
var ytvideolink;

var url_get_all_videos = "http://localhost:8090/rest/wookler/core/data/videos/-";
var url_get_latest_videos = "http://localhost:8090/rest/wookler/core/data/videos/latest";
var url_get_popular_videos = "http://localhost:8090/rest/wookler/core/data/videos/popular";
var url_get_id_videos = "http://localhost:8090/rest/wookler/core/data/videos/-?q=id=";


function getallvideos(val)
{
    
    var url;


	if(typeof(val) == 'number')
	{
		url = url_get_id_videos + val;
		//alert(url);
	}
	
	else
	{
		if(val=='latest')
		{
			url = url_get_latest_videos;
		}
			
		else if(val== 'popular')
		{
			url = url_get_popular_videos;
		}
			
	
		else
		{
			url = url_get_all_videos;
		}	
	
	}
	
	//get videos with appropriate url
	
	//alert(url);
	
	$.getJSON(url, function(jdata){

			$.each(jdata.data, function(i,video){
				
				//getvideoSrc
				var vsrc=video.source;
				
				//contact appropriate player APIs
				if(vsrc=="YouTube")
				{
					//pass
					loadytVideosbyId(video.refid, val);
				}
				
			});
		
		// in the end attach a custom event to section		
		//$('#intro').trigger("sectionloaded");
	});

}




		

//load youtube videos
function loadytVideosbyId(videoid, type)
{
			
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
						
						//var image_element = "<article class='one_fifth'><img src='"+mediathumbnailval['url']+"' width='166' height='130' onclick='loadAndPlayVideo(\""+clickthru+"\")'></img></article>";
						
						var image_element = "<figure class='img-indent frame'><img src='"+mediathumbnailval['url']+"' width='200' height='160' onclick='loadAndPlayVideo(\""+clickthru+"\")'/></figure>";
						//alert(image_element);
						
						var section_element;


						if(typeof(type) == 'number')
						{
							section_element = '#imagegrid';
						}
						
						else
						{
	
							if(type=='latest')
							{
								section_element = '#recent_tagged';
							}
								
							else if(type== 'popular')
							{
								section_element = '#most_popular';
							}
								
						
							else
							{
								section_element = '#most_tagged';
							}
						}
						
						$(image_element).appendTo(section_element);
						
/*						$(document.createElement("img"))
					    	.attr({ src: mediathumbnailval['url'], videolink: clickthru})
    						.addClass("thumbs")
    						.appendTo('#intro')
    						.click(function(){
        					ytvideolink = $(this).attr("videolink");

        					loadAndPlayVideo(ytvideolink);
        					

    						});
    						*/
    						
    						//$('body').append("<h1>creating images<h1></br>");
    						//$('body').append($('img').first().attr("videolink"));

					});
									
				});
				
				
}