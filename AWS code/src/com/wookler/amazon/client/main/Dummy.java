package com.wookler.amazon.client.main;

import java.math.BigInteger;
import java.net.MalformedURLException;
import java.net.URL;

import com.wookler.amazon.client.jax.AWSECommerceService;
import com.wookler.amazon.client.jax.AWSECommerceServicePortType;
import com.wookler.amazon.client.jax.BrowseNode;
import com.wookler.amazon.client.jax.BrowseNodeLookup;
import com.wookler.amazon.client.jax.BrowseNodeLookupRequest;
import com.wookler.amazon.client.jax.BrowseNodeLookupResponse;
import com.wookler.amazon.client.jax.BrowseNodes;
import com.wookler.amazon.client.jax.Item;
import com.wookler.amazon.client.jax.ItemLookup;
import com.wookler.amazon.client.jax.ItemLookupRequest;
import com.wookler.amazon.client.jax.ItemSearch;
import com.wookler.amazon.client.jax.ItemSearchRequest;
import com.wookler.amazon.client.jax.Items;
import com.wookler.amazon.client.jax.Price;

public class Dummy {

	public static void main(String[] args) {

		/*
		 * com.ECS.client.jax.AWSECommerceService service = new
		 * com.ECS.client.jax.AWSECommerceService(); //Set the service port:
		 * com.ECS.client.jax.AWSECommerceServicePortType port =
		 * service.getAWSECommerceServicePort();
		 * 
		 * //Get the operation object: com.ECS.client.jax.ItemSearchRequest
		 * itemRequest = new com.ECS.client.jax.ItemSearchRequest();
		 * 
		 * //Fill in the request object: itemRequest.setSearchIndex("Books");
		 * itemRequest.setKeywords("dog");
		 * //itemRequest.setVersion("2011-08-01"); com.ECS.client.jax.ItemSearch
		 * ItemElement= new com.ECS.client.jax.ItemSearch();
		 * ItemElement.setAWSAccessKeyId("vidya0d-20");
		 * ItemElement.getRequest().add(itemRequest);
		 * 
		 * 
		 * //Call the Web service operation and store the response //in the
		 * response object: com.ECS.client.jax.ItemSearchResponse response =
		 * port.itemSearch(ItemElement); System.out.println(response);
		 */
		AWSECommerceService service = new AWSECommerceService();
		service.setHandlerResolver(new AwsHandlerResolver(
				"hiKcbEFod4PUvKjbdrDr1Ez69ZIJ5Jw2mY3Lu3hL"));

		// Create Web Service Connection
		AWSECommerceServicePortType port = service.getAWSECommerceServicePort();

		// Add Parameters for the Item Lookup
		ItemLookupRequest request = new ItemLookupRequest();
		request.getItemId().add("059035342X");
		request.setIdType("ASIN");
		request.getResponseGroup().add("Large");

		// Wrap Request in Lookup Body
		ItemLookup body = new ItemLookup();
		body.setAWSAccessKeyId("AKIAIG2DQW2S6YOMD2UQ");
		body.setShared(request);

		// Assign Results to a Response Object
		/*ItemLookupResponse response = port.itemLookup(body);

		// Print Results to Screen
		System.out.println(response.getItems().get(0).getItem());*/
		ItemSearchRequest itemRequest = new com.wookler.amazon.client.jax.ItemSearchRequest();

		// Get the operation object: com.ECS.client.jax.ItemSearchRequest
		itemRequest = new com.wookler.amazon.client.jax.ItemSearchRequest();

		// Fill in the request object: itemRequest.setSearchIndex("Books");
		itemRequest.setKeywords("Harry Potter");
		itemRequest.getResponseGroup().add("Large");
		//itemRequest.setAuthor("Rowling");
		itemRequest.setSearchIndex("Apparel");
		itemRequest.setItemPage(new BigInteger("2"));
		
		//itemRequest.set
		
		// itemRequest.setVersion("2011-08-01"); com.ECS.client.jax.ItemSearch
		ItemSearch ItemElement = new com.wookler.amazon.client.jax.ItemSearch();
		ItemElement.setAWSAccessKeyId("AKIAIG2DQW2S6YOMD2UQ");
		ItemElement.setAssociateTag("vidya0d-20");
		//ItemElement.setMarketplaceDomain("Clothes");
		ItemElement.getRequest().add(itemRequest);

		com.wookler.amazon.client.jax.ItemSearchResponse response1 = port.itemSearch(ItemElement);
		System.out.println(response1.getOperationRequest().getRequestProcessingTime());
		System.out.println(response1.getItems().size());
		
		for(Items items : response1.getItems()){
			System.out.println(items.getTotalPages());
			System.out.println(items.getTotalResults());
			for (Item item : items.getItem()){
				//item.getBrowseNodes();
	            System.out.println(String.format("Item Recieved ASI= %S, Name=%s, Price=%s",  item.getASIN(), item.getItemAttributes().getTitle(), getDisplayPrice(item.getItemAttributes().getListPrice())));
	            
	        }
		}
		BrowseNodeLookup browseNodeLookup= new BrowseNodeLookup();
		browseNodeLookup.setAWSAccessKeyId("AKIAIG2DQW2S6YOMD2UQ");
		browseNodeLookup.setAssociateTag("vidya0d-20");
		BrowseNodeLookupRequest browseNodeLookupRequest = new BrowseNodeLookupRequest();
		browseNodeLookupRequest.getBrowseNodeId().add("258061011");
		browseNodeLookupRequest.getResponseGroup().add("BrowseNodeInfo");
		browseNodeLookup.getRequest().add(browseNodeLookupRequest);
		BrowseNodeLookupResponse browseNodeLookupResponse = port.browseNodeLookup(browseNodeLookup);
		System.out.println(browseNodeLookupResponse);
		System.out.println(browseNodeLookupResponse.getOperationRequest().getErrors());
		
		for (BrowseNodes browseNodes : browseNodeLookupResponse.getBrowseNodes()){
			
			for (BrowseNode browseNode : browseNodes.getBrowseNode()){
				//System.out.println(browseNode.getName());
				getNodeName(browseNode);
			}
		}
	}
	
	private static void getNodeName(BrowseNode browseNode) {
		if (browseNode != null) {
			if (browseNode.getAncestors() != null) {
				for (BrowseNode browseNode1 : browseNode.getAncestors().getBrowseNode()) {
					getNodeName(browseNode1);
					System.out.println(browseNode.getName());
				}
			} 
			else {
				System.out.println(browseNode.getName());
			}
		}
	}
	
	private static String getDisplayPrice(Price price){
		if (null!=price ){
			return price.getFormattedPrice();
		}
		return "NULL";
	}

	private static URL getURL() {
		URL url = null;
		try {
			url = new URL(
					"https://soap.amazon.com/onca/soap?Service=AWSECommerceService");
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return url;
	}
}
