package com.emc.app.rest.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class RestApiCallContext {
	public static Object callRestApiGetQueryParam(String url, Class<?> className) throws ClientProtocolException, IOException{
		ObjectMapper objectMapper = new ObjectMapper();
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpUriRequest request =  new HttpGet(url);
		request.addHeader("content-type", "application/json");
		request.addHeader("accept", "application/json");
		
		HttpResponse resp = httpClient.execute(request);
		int status =   resp.getStatusLine().getStatusCode();
		String output = new String();
		if(status!=200){
			return null;
		}
		String buffer;
		BufferedReader br = new BufferedReader(new InputStreamReader(resp
				.getEntity().getContent()));
		while ((buffer = br.readLine()) != null) {
			output += buffer;
		}
		return objectMapper.readValue(output, className);
	}

	public static Object callRestApiPostJsonObject(String url,Object obj, Class<?> className) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonString = objectMapper.writeValueAsString(obj);
		StringEntity params = new StringEntity(jsonString);
		
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpPost postRequest = new HttpPost(url);
		postRequest.addHeader("content-type", "application/json");
		postRequest.addHeader("accept", "application/json");
		postRequest.setEntity(params);
		HttpResponse resp = httpClient.execute(postRequest);
		int status =   resp.getStatusLine().getStatusCode();
		if(status!=200){
			return null;
		}
		String buffer;
		BufferedReader br = new BufferedReader(new InputStreamReader(resp.getEntity().getContent()));
		String output = new String();
		while ((buffer = br.readLine()) != null) {
			output += buffer;
		}
		return objectMapper.readValue(output, className);
	}
	
	
}
