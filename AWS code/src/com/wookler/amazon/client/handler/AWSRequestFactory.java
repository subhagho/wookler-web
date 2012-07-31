package com.wookler.amazon.client.handler;

import com.wookler.amazon.client.jax.AWSECommerceService;
import com.wookler.amazon.client.jax.AWSECommerceServicePortType;
import com.wookler.amazon.client.jax.ItemSearch;
import com.wookler.amazon.client.main.AwsHandlerResolver;

public class AWSRequestFactory {

	private final AWSECommerceService service;
	private final AWSECommerceServicePortType port;

	private static AWSRequestFactory awsRequestCreator = new AWSRequestFactory();

	private AWSRequestFactory() {
		service = new AWSECommerceService();
		service.setHandlerResolver(new AwsHandlerResolver("hiKcbEFod4PUvKjbdrDr1Ez69ZIJ5Jw2mY3Lu3hL"));
		port = service.getAWSECommerceServicePort();
	}
	
	public static AWSRequestFactory INSTANCE(){
		return awsRequestCreator;
	}

	public AWSECommerceServicePortType getAWSSerachServiceAndPort() {
		return this.port;
	}

	public ItemSearch getAWSSearchContext() {
		ItemSearch itemSearch = new com.wookler.amazon.client.jax.ItemSearch();
		itemSearch.setAWSAccessKeyId("AKIAIG2DQW2S6YOMD2UQ");
		itemSearch.setAssociateTag("vidya0d-20");
		return itemSearch;
	}

}
