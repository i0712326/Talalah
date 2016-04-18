package com.emc.app.servlet.entity;

import java.util.List;

public class TransCodeCat {
	private String tcc;
	private String note;
	private List<MerchantCode> merchantCodes;
	public String getTcc() {
		return tcc;
	}
	public void setTcc(String tcc) {
		this.tcc = tcc;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public List<MerchantCode> getMerchantCodes() {
		return merchantCodes;
	}
	public void setMerchantCodes(List<MerchantCode> merchantCodes) {
		this.merchantCodes = merchantCodes;
	}
}
