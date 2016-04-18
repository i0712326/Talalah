package com.emc.app.servlet.entity;

import java.io.Serializable;
import java.util.List;

public class Merchant implements Serializable {
	private static final long serialVersionUID = 1L;
	private String mcId;
	private String name;
	
	private String tel;
	private String fax;
	private String email;
	private MerchantCode merchantCode;
	private List<Product> products;
	private Address address;
	public String getMcId() {
		return mcId;
	}
	public void setMcId(String mcId) {
		this.mcId = mcId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public MerchantCode getMerchantCode() {
		return merchantCode;
	}
	public void setMerchantCode(MerchantCode merchantCode) {
		this.merchantCode = merchantCode;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	
}
