		function loadVideos(val){
			//alert("enter");
			$.getJSON("https://gdata.youtube.com/feeds/api/videos?q="+val+"&alt=json",
			function(data)
			{
				//alert(data.feed.media$group.media$group.media$content);
				//$('body').append("<h2>"+data.link+"</h2>");
				
				//store video links in this array and associate with thumbs
				//weird way to do this because they are at the same level in diffrent lists in json form google
				var videolinks= new Array();
				
				$.each(data.feed.entry, function(m,entryvalue)
				{
					//$('body').append("<h2>"+entryvalue['media$group']['media$content'][0]['url']+"</h2>"+"<br></br>");
					$.each(entryvalue['media$group']['media$content'], function(p,mediacontentval)
					{
												
						//alert('i am here');
						videolinks[p]=mediacontentval['url'];
						
					});

				});
				
				var k =0;
				$.each(data.feed.entry, function(i,entryvalue)
				{

					$.each(entryvalue['media$group']['media$thumbnail'], function(j,mediathumbnailval)
					{

												
						if(j>=1)
						{
							return false;
						}
						k++;
						//$('body').append("<h2>"+mediathumbnailval['url']+"</h2>"+"<br></br>");
						$("<img/>").attr({
							"src": mediathumbnailval['url'],
							"class": 'thumbs'
							}).appendTo("#videoimages");
						//imagelem.click(function(){$(this).fadeIn('slow')})
						
					}
				);
				});
			});
		}
		