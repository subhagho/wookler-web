      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[1];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
       event.target.loadVideoById(link,0,'medium');
       event.target.playvideo();
	   invokeAtIntervals();

      }

      var done = false;
      function onPlayerStateChange(event) {
/*        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }*/
      }
      function stopVideo() {
        if (player) {
        player.stopVideo();
        }
        }
        
      function loadAndPlayVideo(val)
      {
      	//alert('toplay'+val);
      	if(!player)
      	{
      	  player = new YT.Player('mainplayer', {
          height: '400',
          width: '960',
          videoId: val,  //TDKR - Nolan rules!!
          playerVars: { 'autoplay': 1, 'controls': 1},
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
         });
         
        }
          
      	else
      	{
      		//alert(player);
      		player.loadVideoById(val,0,'medium');

      	}
      	
      	invokeAtIntervals();
      }
    
    var duration = player.getCurrentTime();
	var last_duration = duration;
	var productloaded = false;	    
	function getAndBindData()
	{

		duration = player.getCurrentTime();	
		
		//for now i am just going to display the contents at > 10 second
		// need to replace with actual ajax call and passing of markers
		//for now just once and stop
		if(duration > 35 && !productloaded)
		{
			loadproducts();
			productloaded = true;
			//player.pauseVideo();
		}	
					
	}
	
	function invokeAtIntervals()
	{
		setInterval((getAndBindData),10);
	}