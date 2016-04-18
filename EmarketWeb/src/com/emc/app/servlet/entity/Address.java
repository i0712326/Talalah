package com.emc.app.servlet.entity;

public class Address {
	private String addrId;
	private String street;
	private String ville;
	private String distr;
	private String provi;

	public String getAddrId() {
		return addrId;
	}

	public void setAddrId(String addrId) {
		this.addrId = addrId;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getDistr() {
		return distr;
	}

	public void setDistr(String distr) {
		this.distr = distr;
	}

	public String getProvi() {
		return provi;
	}

	public void setProvi(String provi) {
		this.provi = provi;
	}
}
