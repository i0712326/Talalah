package com.emc.app.servlet.entity;

public class ProductOrder {
	private ProductOrderId productOrderId;

	private int quantity;
	private float price;
	public ProductOrderId getProductOrderId() {
		return productOrderId;
	}
	public void setProductOrderId(ProductOrderId productOrderId) {
		this.productOrderId = productOrderId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
}
