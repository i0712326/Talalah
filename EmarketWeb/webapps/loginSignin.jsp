<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
<script type="text/javascript" src="js/lib/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
<style type="text/css">
.loginSignUpArea {
	margin-left:35%;
	margin-top:5%;
	width : 30%;
	height :500px;
	border :  solid 1px #CCC;
}

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 50px auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #91D6ED;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #457EBA;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
</style>
<title>Talalah</title>
</head>
<body>
	<div class="loginSignUpArea">

		<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#login" aria-controls="login" role="tab" data-toggle="tab">login</a></li>
			<li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">signup</a></li>
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="login">

				<div class="login-page">
					<div class="form">
						<form class="login-form" action="login" method="POST">
							<input type="text" name="email" placeholder="email" />
							<input type="password" name="passwd" placeholder="password" />
							<button>login</button>
						</form>
					</div>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane" id="signup">
				<div class="login-page">
					<div class="form">
						<form class="register-form" action="">
								<input type="text" placeholder="name" /> <input type="password"
									placeholder="password" /> <input type="text"
									placeholder="email address" />
								<button>create</button>
							</form>
					</div>
				</div>
			</div>
		</div>

	</div>
	
	<div class="container">
        <hr>
        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12" style="text-align: center">
                    <p>Copyright &copy;Talalah.com</p>
                </div>
            </div>
        </footer>

    </div>
</body>
</html>