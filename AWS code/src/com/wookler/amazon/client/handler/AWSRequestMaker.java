package com.wookler.amazon.client.handler;

import com.wookler.amazon.client.jax.AWSECommerceServicePortType;
import com.wookler.amazon.client.jax.ItemSearch;
import com.wookler.amazon.client.jax.ItemSearchResponse;

public class AWSRequestMaker {

	public AWSRequestMaker() {

	}

	public ItemSearchResponse getAWSSearchResponse(ItemSearch itemSearch) {
		AWSECommerceServicePortType awseCommerceServicePortType = AWSRequestFactory.INSTANCE().getAWSSerachServiceAndPort();
		return awseCommerceServicePortType.itemSearch(itemSearch);

	}
}
