package com.emc.app.servlet.entity;


public class ProductOrderId {
	private Product product;
	private Order order;
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}	
}
