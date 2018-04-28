// Initialize your app
var myApp = new Framework7({
  animateNavBackIcon: true,
  // Enable templates auto precompilation
  precompileTemplates: true,
  // Enabled pages rendering using Template7
  swipeBackPage: true,
  pushState: true,
  template7Pages: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
  // Enable dynamic Navbar
  dynamicNavbar: false,
});

// Funcion to handle Submit button on Login page
$$('#submit-login').on('click', function () {
  var username = $$('#login-username').val();
  var email = username + '@vinaas.com';
  var pass = $$('#login-password').val();
  myApp.showIndicator();
//   var url = 'http://localhost:2990/api/Users/login'; 
  var url =  'http://103.199.18.44:2990/api/Users/login';
  inputData = JSON.stringify({ "username": username, "password": pass });
  // Using Ajax for communication with Parse backend
  // Note mandatory headers with credentials required
  // by Parse. HTTP communication responses are handled
  // in success / error callbacks
  $$.ajax({
    url: url,
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: inputData,
    // if successful response received (http 2xx)
    success: function (data, textStatus) {

      console.log('Success', data);
      myApp.hideIndicator();

      localStorage.loggedIn = 'true';
      localStorage["accessToken"] = data.id;
      localStorage["userId"] = data.userId;
      myApp.closeModal();
      mainView.router.loadPage('about.html')

    },
    error: function (xhr, textStatus, errorThrown) {
      // We have received response and can hide activity indicator
      myApp.hideIndicator();
      myApp.alert('Đăng Nhập Không Thành Công! Hãy Thử Lại');

      // $$('#login-username').val('');
      $$('#login-password').val('');
    }
  });
});


// Function to handle Submit button on Register page
$$('#submit-register').on('click', function () {

  var username = $$('#register-username').val();
  var email = $$('#register-email').val();
  var password = $$('#register-password').val();
  var phone = $$('#register-phone').val();
  var address = $$('#register-address').val(); //lấy giá trị từ form

  if (!email) {
	  email = username + '@dakotavina.vn'; 
  }
  if (!username || !password || !email) {
    myApp.alert('Hãy Đăng Ký Đủ Thông tin');
    return;
  }
  jsonData = {
    "username": username,
    "email": email,
	"password": password,
	"phone" : phone,
	"address" : address
  };  //thêm các trường khi đăng ký "ten-truong" : giá-trị-lay-tu-form

  var query = 'http://103.199.18.44:2990/api/Users';

  // Using Ajax for communication with Parse backend
  // Note mandatory headers with credentials required
  // by Parse. HTTP communication responses are handled
  // based on HTTP response codes
  $$.ajax({
    url: query,
    headers: {},
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(jsonData),
    success: function (data, textStatus) {
      myApp.hideIndicator();
      myApp.alert('Đăng ký Thành Công!!');

      localStorage.loggedIn = 'true';
      localStorage["accessToken"] = data.id;
      localStorage["username"] = data.username;
      localStorage["userId"] = data.id;
      myApp.closeModal();
      mainView.router.loadPage('so-tay-nuoi-tom')
    },
    error: function (xhr, textStatus, errorThrown) {
      // We have received response and can hide activity indicator
      myApp.hideIndicator();
      myApp.alert('Đăng ký Thất Bại!!');

    }
  });

});

$$(document).on('pageInit', function (e) {
  var page = e.detail.page;
  // Đây là các trang cần đăng nhập
  if (page.name === 'index' || 
	  page.name === 'about' || 
	  page.name === 'trang-chu-so-tay')
  {
    if (localStorage.loggedIn) {
	
    }else {
	//  $$('#menu-logged').hide(); 
      console.log('Not yet')
    }
  }
  
  $(".swipebox").swipebox();
  $(".videocontainer").fitVids();

  $("#ContactForm").validate({
    submitHandler: function (form) {
      ajaxContact(form);
      return false;
    }
  });


  $(".posts li").hide();
  size_li = $(".posts li").size();
  x = 3;
  $('.posts li:lt(' + x + ')').show();
  $('#loadMore').click(function () {
    x = (x + 1 <= size_li) ? x + 1 : size_li;
    $('.posts li:lt(' + x + ')').show();
    if (x == size_li) {
      $('#loadMore').hide();
      $('#showLess').show();
    }
  });



  $("a.switcher").bind("click", function (e) {
    e.preventDefault();

    var theid = $(this).attr("id");
    var theproducts = $("ul#photoslist");
    var classNames = $(this).attr('class').split(' ');


    if ($(this).hasClass("active")) {
      // if currently clicked button has the active class
      // then we do nothing!
      return false;
    } else {
      // otherwise we are clicking on the inactive button
      // and in the process of switching views!

      if (theid == "view13") {
        $(this).addClass("active");
        $("#view11").removeClass("active");
        $("#view11").children("img").attr("src", "images/switch_11.png");

        $("#view12").removeClass("active");
        $("#view12").children("img").attr("src", "images/switch_12.png");

        var theimg = $(this).children("img");
        theimg.attr("src", "images/switch_13_active.png");

        // remove the list class and change to grid
        theproducts.removeClass("photo_gallery_11");
        theproducts.removeClass("photo_gallery_12");
        theproducts.addClass("photo_gallery_13");

      }

      else if (theid == "view12") {
        $(this).addClass("active");
        $("#view11").removeClass("active");
        $("#view11").children("img").attr("src", "images/switch_11.png");

        $("#view13").removeClass("active");
        $("#view13").children("img").attr("src", "images/switch_13.png");

        var theimg = $(this).children("img");
        theimg.attr("src", "images/switch_12_active.png");

        // remove the list class and change to grid
        theproducts.removeClass("photo_gallery_11");
        theproducts.removeClass("photo_gallery_13");
        theproducts.addClass("photo_gallery_12");

      }
      else if (theid == "view11") {
        $("#view12").removeClass("active");
        $("#view12").children("img").attr("src", "images/switch_12.png");

        $("#view13").removeClass("active");
        $("#view13").children("img").attr("src", "images/switch_13.png");

        var theimg = $(this).children("img");
        theimg.attr("src", "images/switch_11_active.png");

        // remove the list class and change to grid
        theproducts.removeClass("photo_gallery_12");
        theproducts.removeClass("photo_gallery_13");
        theproducts.addClass("photo_gallery_11");

      }

    }

  });

  document.addEventListener('touchmove', function (event) {
    if (event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1) {
      event.preventDefault();
    }
  }, false);

  // Add ScrollFix
  var scrollingContent = document.getElementById("pages_maincontent");
  new ScrollFix(scrollingContent);


  var ScrollFix = function (elem) {
    // Variables to track inputs
    var startY = startTopScroll = deltaY = undefined,

      elem = elem || elem.querySelector(elem);

    // If there is no element, then do nothing
    if (!elem)
      return;

    // Handle the start of interactions
    elem.addEventListener('touchstart', function (event) {
      startY = event.touches[0].pageY;
      startTopScroll = elem.scrollTop;

      if (startTopScroll <= 0)
        elem.scrollTop = 1;

      if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
        elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }, false);
  };



})