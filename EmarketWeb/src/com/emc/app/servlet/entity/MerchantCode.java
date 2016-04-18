package com.emc.app.servlet.entity;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;

public class MerchantCode {
	private String mcc;
	private String note;
	private List<Merchant> merchants;
	private TransCodeCat transCodeCat;
	private MerchantCatGrp merchantCatGrp;
	public String getMcc() {
		return mcc;
	}
	public void setMcc(String mcc) {
		this.mcc = mcc;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	@JsonIgnore
	public List<Merchant> getMerchants() {
		return merchants;
	}
	public void setMerchants(List<Merchant> merchants) {
		this.merchants = merchants;
	}
	public TransCodeCat getTransCodeCat() {
		return transCodeCat;
	}
	public void setTransCodeCat(TransCodeCat transCodeCat) {
		this.transCodeCat = transCodeCat;
	}
	public MerchantCatGrp getMerchantCatGrp() {
		return merchantCatGrp;
	}
	public void setMerchantCatGrp(MerchantCatGrp merchantCatGrp) {
		this.merchantCatGrp = merchantCatGrp;
	}
}
