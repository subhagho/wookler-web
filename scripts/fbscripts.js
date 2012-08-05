
 function fblogin() {
	FB.login(function(response) {
   if (response.authResponse) {
     //console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       //console.log('Good to see you, ' + response.name + '.');
     });
   } else {
     //console.log('User cancelled login or did not fully authorize.');
   }
 });
 }
 
 function postToFeed(caption,landingurl,imageurl,productname,description) {

        // calling the API ...
        //var cap = "Hannah Montana";
        var obj = {
          method: 'feed',
          link: landingurl,
          picture: imageurl,
          name: productname,
          caption: caption,
          description: 'Keep your cool'
        };

        function callback(response) {
          //alert("Post ID: " + response['post_id']);
        }

        FB.ui(obj, callback);
 }
