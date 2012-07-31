package com.wookler.amazon.client.main;

import com.wookler.amazon.client.handler.AWSRequestCreator;
import com.wookler.amazon.client.handler.AWSRequestMaker;
import com.wookler.amazon.client.jax.Item;
import com.wookler.amazon.client.jax.ItemSearch;
import com.wookler.amazon.client.jax.ItemSearchResponse;
import com.wookler.amazon.client.jax.Items;

public class Main {

	private final AWSRequestCreator awsRequestCreator;
	private final AWSRequestMaker awsRequestMaker;

	public Main() {
		this.awsRequestCreator = new AWSRequestCreator();
		this.awsRequestMaker = new AWSRequestMaker();
	}

	public static void main(String[] args) {
		Main main = new Main();
		main.serachHarryPotter();
		main.serachHarryPotterClothes();
	}

	private void serachHarryPotter() {
		ItemSearch itemSearch = awsRequestCreator.getRequestForBook("Harry Potter");
		ItemSearchResponse itemSearchResponse = awsRequestMaker.getAWSSearchResponse(itemSearch);
		displayResponse(itemSearchResponse);
	}

	private void displayResponse(ItemSearchResponse itemSearchResponse) {

		System.out.println(String.format("Request processing time is :%f", itemSearchResponse.getOperationRequest().getRequestProcessingTime()));
		
		for (Items items : itemSearchResponse.getItems()) {
			for (Item item : items.getItem()) {
				// item.getBrowseNodes();
				System.out.println(String.format("Item Recieved ASI= %S, Name=%s", item.getASIN(), item.getItemAttributes().getTitle()));

			}
		}

	}

	private void serachHarryPotterClothes() {
		ItemSearch itemSearch = awsRequestCreator.getRequestForClothes("Harry Potter");
		ItemSearchResponse itemSearchResponse = awsRequestMaker.getAWSSearchResponse(itemSearch);
		displayResponse(itemSearchResponse);
	}

}
