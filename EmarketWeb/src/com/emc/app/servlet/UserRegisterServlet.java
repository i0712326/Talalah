package com.emc.app.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.codehaus.jackson.map.ObjectMapper;

import com.emc.app.servlet.entity.Customer;

/**
 * Servlet implementation class UserAuthenServlet
 */
@WebServlet(name = "UserRegisterServlet", description = "user authenticate servlete", urlPatterns = { "/signup" },
initParams={@WebInitParam(name="CUSTURL",value="http://localhost:8080/EmarketService/WebService/customer/save")})
public class UserRegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
     * @see HttpServlet#HttpServlet()
     */
    public UserRegisterServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = getInitParameter("CUSTURL");
		String email = request.getParameter("email").trim();
		String passwd1 = request.getParameter("passwd").trim();
		String passwd2 = request.getParameter("repasswd").trim();
		String tel = request.getParameter("telnumber").trim();
		String first = request.getParameter("firstname").trim();
		String last = request.getParameter("lastname").trim();
		
		if (passwd1.equals(passwd2)) {
			Customer customer = new Customer();
			customer.setEmail(email);
			customer.setPasswd(passwd1);
			customer.setName(first);
			customer.setLast(last);
			customer.setTel(tel);
			
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
				String buffer;
				BufferedReader br = new BufferedReader(new InputStreamReader(resp.getEntity().getContent()));
				String output = "";
				while ((buffer = br.readLine()) != null) {
					output += buffer;
				}
				response.setContentType("application/json");
				PrintWriter out = response.getWriter();
				out.print(output);
				out.close();
			}
			RequestDispatcher rd = request.getRequestDispatcher("auth/home.jsp");
			rd.forward(request, response);
		}

	}

}
