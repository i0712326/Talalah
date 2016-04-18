package com.emc.app.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.codehaus.jackson.map.ObjectMapper;
import org.jasypt.util.password.StrongPasswordEncryptor;

import com.emc.app.servlet.entity.Customer;

/**
 * Servlet implementation class UserLogInServlet
 */
@WebServlet(description = "Log In Servlet", urlPatterns = { "/login" }, initParams={
		@WebInitParam(name="CUSTURL",value="http://localhost:8080/EmarketService/WebService/customer/login")})
public class UserLogInServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = getInitParameter("CUSTURL");
		String email = request.getParameter("email").trim();
		String passwd = request.getParameter("passwd").trim();
		Customer customer = new Customer();
		customer.setEmail(email);
		customer.setPasswd(passwd);
		
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonCustomer = objectMapper.writeValueAsString(customer);
		StringEntity params = new StringEntity(jsonCustomer);
		
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpPost postRequest = new HttpPost(url);
		postRequest.addHeader("content-type", "application/json");
		postRequest.addHeader("accept", "application/json");
		postRequest.setEntity(params);
		HttpResponse resp = httpClient.execute(postRequest);
		int status =   resp.getStatusLine().getStatusCode();
		if(status!=200){
			request.getRequestDispatcher("auth/error.jsp").forward(request, response);
		}
		BufferedReader br = new BufferedReader(new InputStreamReader(resp.getEntity().getContent()));
		String output = new String();
		String buffer;
		while ((buffer = br.readLine()) != null) {
			output += buffer;
		}
		customer = objectMapper.readValue(output, Customer.class);
		StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();
		if (passwordEncryptor.checkPassword(passwd, customer.getPasswd())) {
			HttpSession session = request.getSession();
			session.setAttribute("name", customer.getName());
			request.getRequestDispatcher("auth/home.jsp").forward(request, response);
		} else {
			request.getRequestDispatcher("auth/error.jsp").forward(request, response);
		}
		
	}

}
