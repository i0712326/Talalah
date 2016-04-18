package com.emc.app.servlet.entity;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;

public class MerchantCatGrp implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String note;
	private List<MerchantCode> merchantCodes;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	@JsonIgnore
	public List<MerchantCode> getMerchantCodes() {
		return merchantCodes;
	}
	public void setMerchantCodes(List<MerchantCode> merchantCodes) {
		this.merchantCodes = merchantCodes;
	}
}
