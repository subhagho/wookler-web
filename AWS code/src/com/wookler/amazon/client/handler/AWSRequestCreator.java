package com.wookler.amazon.client.handler;

import com.wookler.amazon.client.jax.ItemSearch;
import com.wookler.amazon.client.jax.ItemSearchRequest;

public class AWSRequestCreator {
	
	public AWSRequestCreator(){
		
	}

	public ItemSearch getRequestForClothes(String keyWord){
		ItemSearchRequest itemSearchRequest = getBasicItemRequest(keyWord);
		itemSearchRequest.setSearchIndex("Apparel");
		return getSearchItem(itemSearchRequest);
		
	}
	
	public ItemSearch getRequestForBook(String keyWord){
		ItemSearchRequest itemSearchRequest = getBasicItemRequest(keyWord);
		itemSearchRequest.setSearchIndex("Books");
		return getSearchItem(itemSearchRequest);
		
	}

	private ItemSearch getSearchItem(ItemSearchRequest itemSearchRequest) {
		ItemSearch itemSearch = AWSRequestFactory.INSTANCE().getAWSSearchContext();
		itemSearch.getRequest().add(itemSearchRequest);
		return itemSearch;
	}
	
	private ItemSearchRequest getBasicItemRequest(String keyWord){
		ItemSearchRequest itemSearchRequest = new ItemSearchRequest();
		itemSearchRequest.setKeywords(keyWord);
		return itemSearchRequest;
		
	}
}
