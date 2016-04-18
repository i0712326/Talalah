package com.emc.app.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.FileItemIterator;
import org.apache.tomcat.util.http.fileupload.FileItemStream;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.util.Streams;

import com.emc.app.rest.api.RestApiCallContext;
import com.emc.app.servlet.entity.Entity;
import com.emc.app.servlet.entity.Merchant;
import com.emc.app.servlet.entity.Product;
import com.emc.app.servlet.entity.ProductImg;

/**
 * Servlet implementation class ProductRegisterServlet
 */
@WebServlet(description = "Product Register Servlet", urlPatterns = { "/auth/product/register" }, 
		initParams = {
		@WebInitParam(name	= "MCURL", 		value 	= "http://localhost:8080/EmarketService/WebService/mc/get"),
		@WebInitParam(name 	= "PRDURL", 	value	= "http://localhost:8080/EmarketService/WebService/product/save"),
		@WebInitParam(name 	= "TEMPDIR",	value	= "F:\\Temp")})
public class ProductRegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Logger logger = Logger.getLogger(getClass());
	private Map<String, String> strField =  new HashMap<String,String>();
	private Map<String, File> fileField = new HashMap<String,File>();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProductRegisterServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mcUrl 	= getInitParameter("MCURL");
		String prdUrl 	= getInitParameter("PRDURL");
		String filePath	= getInitParameter("TEMPDIR");
		multiPartProcessor(request, filePath);
		String mcId 	= strField.get("mcId");
		String prdId 	= strField.get("prdId");
		String prdName 	= strField.get("prdName");
		String prdPrice = strField.get("prdPrice");
		String prdStock = strField.get("prdStock");
		String shrDes	= strField.get("shrdes");
		String lngDes	= strField.get("lngDes");
		
		// get merchant information
		 Merchant mc = (Merchant) RestApiCallContext.callRestApiGetQueryParam(mcUrl+"?mcId="+mcId, Merchant.class);
		if(mc==null){
			request.getRequestDispatcher("/auth/error.jsp").forward(request, response);
			return;
		}
		String mcc = mc.getMerchantCode().getMcc();
		Product product = new Product();
		product.setId(prdId);
		product.setName(prdName);
		product.setPrice(Float.parseFloat(prdPrice));
		product.setStock(Integer.parseInt(prdStock));
		product.setShDes(shrDes);
		product.setLoDes(lngDes);
		product.setMerchant(mc);
		// process image files
		String path = request.getServletContext().getRealPath("css/thumb");
		path = path+"/"+mcc+"/"+mcId+"/"+prdId;
		File mcidDir = new File(path);
		if(!mcidDir.exists())
			mcidDir.mkdirs();
		Set<String> keys = fileField.keySet();
		Iterator<String> names = keys.iterator();
		List<ProductImg> prdImgs = new ArrayList<ProductImg>();
		while(names.hasNext()){
			String name = names.next();
			File srcFile = fileField.get(name);
			String fileName = prdId+srcFile.getName();
			if(name.equals("thumb")){
				product.setThumb(fileName);
			}
			else{
				ProductImg prdImg = new ProductImg();
				prdImg.setPicName(fileName);
				prdImgs.add(prdImg);
			}
			File targetFile = new File(path+"/"+fileName);
			FileUtils.copyFile(srcFile, targetFile);
			srcFile.delete();
		}
		product.setProductImgs(prdImgs);
		Entity entity = (Entity) RestApiCallContext.callRestApiPostJsonObject(prdUrl, product, Entity.class);
		if(entity==null){
			request.getRequestDispatcher("/auth/error.jsp").forward(request, response);
			return;
		}
		RequestDispatcher rd = request.getRequestDispatcher("productCatalog.jsp");
		rd.forward(request, response);
	}

	private void multiPartProcessor(HttpServletRequest request, String path)
			throws ServletException, IOException {
		boolean isMultipartContent = ServletFileUpload.isMultipartContent(request);
		if(!isMultipartContent){
			logger.debug("Exception occured while try to get data from multipart form");
			throw new ServletException("Multipart form exeption");
		}
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		try {
			 FileItemIterator fields = upload.getItemIterator(request);
			if(!fields.hasNext()){
				logger.debug("Exception occured while try to iterate file item");
				throw new ServletException("Exception occured while try to iterate file items");
			}
			while(fields.hasNext()){
				FileItemStream fis = fields.next();
				boolean isFormField = fis.isFormField();
				String name = fis.getFieldName();
				InputStream stream = fis.openStream();
				if(isFormField){
					String value = Streams.asString(stream);
					strField.put(name, value);
				}
				else{
					String fileName = path+"/"+name;
					String contentType = fis.getContentType();
					File file = stream2File(stream, fileName, contentType);
					fileField.put(name, file);
				}
			}
			
		} catch (FileUploadException e) {
			logger.debug("Exception occured while try to get field data",e);
			throw new ServletException(e);
		}
	}
	
    public static File stream2File (InputStream in, String fileName, String contentType) throws IOException {
    	String fileType = ".jpg";
    	if(contentType.equals("image/gif")){
    		fileType = ".gif";
    	}
    	else if(contentType.equals("image/png")){
    		fileType = ".png";
    	}
    	File tempFile = new File(fileName+fileType);
        tempFile.deleteOnExit();
        try (FileOutputStream out = new FileOutputStream(tempFile)) {
            IOUtils.copy(in, out);
        }
        return tempFile;
    }

}
