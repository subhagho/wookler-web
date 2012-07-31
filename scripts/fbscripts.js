
 function fblogin() {
	FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 });
 }
 
 function postToFeed() {

        // calling the API ...
        var cap = "Hannah Montana";
        var obj = {
          method: 'feed',
          link: 'http://localhost:8090/web/web/products.html?id=123',
          picture: 'http://images5.fanpop.com/image/photos/29400000/Hannah-Montana-Christmas-hannah-montana-29409414-300-300.jpg',
          name: 'Wookler',
          caption: cap,
          description: 'Keep your cool'
        };

        function callback(response) {
          alert("Post ID: " + response['post_id']);
        }

        FB.ui(obj, callback);
 }
