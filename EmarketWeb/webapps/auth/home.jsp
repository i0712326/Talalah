<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
	/* String sessionId = session.getId();

	if(sessionId==null){
		response.sendRedirect("default.jsp");
	}

	String name = (String)session.getAttribute("name");
	String mcId = (String)session.getAttribute("mcId"); */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="Phoudthavong Thephanonexay">
<title>LaosTalalah</title>
<link rel="home icon" href="/EmarketWeb/css/img/tm/tm16x16.ico" type="image/ico">
<link href="/EmarketWeb/css/bootstrap.min.css" rel="stylesheet"></link>
<link href="/EmarketWeb/css/shop-homepage.css" rel="stylesheet"></link>
<link href="/EmarketWeb/css/logon_signup.css" rel="stylesheet"></link>
<link href="/EmarketWeb/css/home_css.css" rel="stylesheet"></link>
</head>
<body>
<!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <p class="navbar-brand"> <span> <img alt="" src="/EmarketWeb/css/img/tm/tm32x32.png"/> LaosTalalah</span></p>
            </div>
            <!-- Collect the nav links, forms, and other content for navigation bar -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li id="item-home" class="active">
                        <a href="#Home">Home</a>
                    </li>
                    <li id="item-travel">
                        <a href="#Travel">Travel</a>
                    </li>
                    <li id="item-fashion">
                        <a href="#Fashion">Fashion</a>
                    </li>
                    <li id="item-contact">
                        <a href="#contact">Contact Us</a>
                    </li>
                </ul>
				<form class="navbar-form navbar-right" action="#" id="actionForm">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Search" id="itemSearchVal"/>
					</div>
					<button type="button" class="btn btn-default" id="searchItem">
  						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					<a href="#Logout" class="btn btn-default" role="button">
						<span class="glyphicon glyphicon-log-out aria-hidden="true" title="LOGOUT"></span>
					</a>
					
					<div class="btn btn-default dropdown" role="button">
						<span class="glyphicon glyphicon-th-list aria-hidden="true" title="MENU"></span>
						<div class="dropdown-content">
						    <a href="#Profile">Profile</a>
						    <a href="#History">History</a>
						    <a href="#">Cart</a>
						    <a href="#">Watch List</a>
						 	<a href="auth/merchant/myStore.jsp">My Store</a>
						</div>
					</div>
					 
					<span class="user-css"><strong>Hi Peter<%-- <%= name %>< --%></strong></span>
				</form>
				<form action="logout" method="POST" id="logoutform"/>
			</div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    
    <!-- Page Content -->
    <div class="container">
    	<div class="row" id="container"></div>
    	<!-- <div class="col-sm-4 col-lg-4 col-md-4" id="advertise">
    		<img alt="" src="/EmarketWeb/css/img/ads/ad02.jpg">
    	</div> -->
    </div>
    <!-- /.container -->
    <div class="container">

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12" style="text-align: center">
                    <p>Copyright &copy; Talalah.com</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->
    <!-- /.container -->
	<script data-main="js/scripts/application" src="js/lib/require.js"></script>
</body>
</html>