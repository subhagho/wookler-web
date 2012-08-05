function buildallsections()
{
		//buildproductsection('latest',3);	
		//buildproductsection('featured',3);	
		//mostviewed
		buildproductsection('totalviews',9);	
		//buildproductsection('trending',3);	

}

function buildproductsection(type,count)
{

    var url = "http://localhost:8090/rest/wookler/core/data/products/"+type+"?s="+count;
   
    var productsection;
   
    if(type == 'totalviews')
	{
		productsection = '#mostviewed';
	}
	
    
    $.getJSON(url, function(jdata){

		$.each(jdata.data, function(i,product){
				
			var imageurl = product.creative.html;
			var producturl = product.creative.url;
			var product_landingpage = "products.html?id="+product.creative.id;
					
	     	var article_section="<article class='sale'><header><hgroup class='name'><h1 class='h1 highlight'><a class='sale-header-link' href=''>Dummy Name</a></h1></hgroup></header><a class='' href='"+product_landingpage+"'><img class='medium' src='"+imageurl+"' alt='dummyname'></a></article>";
     		//alert(article_section);
     		$(article_section).appendTo(productsection);
				
		});
		
	});

}

function buildproductpage(productid)
{
	 //hack for now - get all videos and filter for that specific id
	 //var url = "http://localhost:8090/rest/wookler/core/data/products/-?id="+id;

    var url = "http://localhost:8090/rest/wookler/core/data/products/-";
   	
   	var currenturl = window.location;
   	
   	$.getJSON(url, function(jdata){

		$.each(jdata.data, function(i,product){
			
			if(product.creative.id == productid)
			{
				var imageurl = product.creative.html;
				var producturl = product.creative.url;
				var productname = "Dummy Product";
				var caption = "Dummy Caption";
				var productdescription = "Dummy Description";
				
				var fbpostmethod = "postToFeed('"+caption+"','"+currenturl+"','"+imageurl+"','"+productname+"','"+productdescription+"')";
				
				var product_landingpage = "products.html?id="+product.creative.id;
						
		     	var product_section="<article class='sale'><header><hgroup class='name'><h1 class='h1 highlight'><a class='sale-header-link' href='#' onclick=\""+fbpostmethod+"\">Share with Facebook</a></h1></hgroup></header><a class='' href='"+product_landingpage+"'><img class='medium' src='"+imageurl+"' alt='dummyname'></a></article>";
	     		//alert(product_section);
	     		$(product_section).appendTo('#individual_product');
     		}
				
		});
		
	});

}
