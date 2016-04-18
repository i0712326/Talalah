package com.emc.app.servlet.entity;

import java.io.Serializable;
import java.util.List;

public class Product implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	
	private String name;
	
	private float price;
	
	private int stock;
	
	private String shDes;

	private String loDes;

	private String img;

	private String thumb;

	private int review;

	private int rate;

	private Merchant merchant;

	private List<ProductOrder> productOrders;
	
	private List<ProductImg> productImgs;
	private List<Comment> comments;
	public Product() {
		super();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public String getShDes() {
		return shDes;
	}
	public void setShDes(String shDes) {
		this.shDes = shDes;
	}
	public String getLoDes() {
		return loDes;
	}
	public void setLoDes(String loDes) {
		this.loDes = loDes;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getThumb() {
		return thumb;
	}
	public void setThumb(String thumb) {
		this.thumb = thumb;
	}
	public int getReview() {
		return review;
	}
	public void setReview(int review) {
		this.review = review;
	}
	public int getRate() {
		return rate;
	}
	public void setRate(int rate) {
		this.rate = rate;
	}
	public Merchant getMerchant() {
		return merchant;
	}
	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}
	public List<ProductOrder> getProductOrders() {
		return productOrders;
	}
	public void setProductOrders(List<ProductOrder> productOrders) {
		this.productOrders = productOrders;
	}
	public List<ProductImg> getProductImgs() {
		return productImgs;
	}
	public void setProductImgs(List<ProductImg> productImgs) {
		this.productImgs = productImgs;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
}
