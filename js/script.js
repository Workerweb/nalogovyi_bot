jQuery(function($){
	$("#phone").mask('+7 (999) 999-99-99');

	$('.menu-trigger').click(function(){
		$('nav ul').slideToggle(300)		
	});
	$(window).resize(function() {
		if ($(window).width()> 767) {
			$('nav ul').removeAttr('style');
		}
	});

	
	$("#reg_btn").on('click', function() {
		if ($("#login_form_box").css('display', 'block')) {
			$("#login_form_box").css('display', 'none');
			$("#reg_form_box").css('display', 'block');
		};
	}); 

	$("#login_btn").on('click', function() {
		if ($("#reg_form_box").css('display', 'block')) {
			$("#reg_form_box").css('display', 'none');
			$("#login_form_box").css('display', 'block');
		}
	});

	$("#profile_btn").on('click', function() {
		$("#profile_box").css('display', 'block');
	});

	$(".cnl_btn").on('click', this, function() {
		var login_form = document.getElementById("login_form_box");
		var reg_form = document.getElementById("reg_form_box");
		var forms = [login_form, reg_form];
		for (i = 0; i < forms.length; i++) {
			$(forms).css('display', 'none');
		}
	});

	$("#change_profile").on('click', function() {
		$("#profile_data").children("input").removeAttr('readonly');
		$(".profile").css('background-color', 'transparent');
		$("#profile_data").addClass('change_data');
		$("#profile_data").children("input").removeClass('profile_data');
		$("#profile_data").children("input").addClass('field');
		$(this).hide();
	})

	$("#reg_form").validate({
		rules: {
			phone: {
				required: true
			},
			email: {
				required:  true,
				email: true
			},
			password: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				equalTo: "#reg_pass"
			}
		},
		messages: {
			phone: {
				required: "Введите телефон в указанном формате"
			},
			email: {
				required: "Введите email",
				email: "Ваш email должен быть в формате name@domain.com"
			},
			password: {
				required: "Введите пароль",
				minlength: "Пароль должен быть не менее 6 знаков"
			},
			confirm_password: {
				required: "Повторите пароль",
				equalTo: "Пароли должны быть одинаковыми"
			}
		}
	});

	$("#reg_btn_submit").on("click", function() {
		if ($("#reg_form").valid() === true) {
			request = $.ajax({
			type: "post",
			url: "/ajax/register.php",
			data: $("#reg_form").serialize()
			}).done(function() {
				$("#reg_form").find($(".result")).text("done!");
			});
		};
	});

	$("#save_profile").on("click", function() {
			request = $.ajax({
			type: "post",
			url: "/ajax/user_data.php",
			data: $("#profile_data").serialize()
			}).done(function() {
				$("#profile_data").find($(".result")).text("done!");
			});
	});

	$("#login_btn_submit").on("click", function() {
			request = $.ajax({
			type: "post",
			url: "/ajax/login.php",
			data: $("#login_form").serialize()
			}).done(function() {
				$("#login_form_box").hide();
				$("#profile_box").show();
			});
	});
});