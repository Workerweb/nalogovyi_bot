jQuery(function($){
	$("#phone").mask('+7 (999) 999-99-99');

	$('.menu-trigger').click(function(){
		$('.menu-item').slideToggle(300)		
	});
	$(window).resize(function() {
		if ($(window).width()> 767) {
			$('.menu-item').removeAttr('style');
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

	$(".cnl_btn").on('click', this, function() {
		var login_form = document.getElementById("login_form_box");
		var reg_form = document.getElementById("reg_form_box");
		var forms = [login_form, reg_form];
		for (i = 0; i < forms.length; i++) {
			$(forms).css('display', 'none');
		}
	});

	$("#reg_form").validate({
		rules: {
			phone: {
				required: true
			},
			email: {
				required:  true,
				email: true,
				remote: {
					url: "/ajax/check_email.php",
					type: "post"
				}
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
				email: "Ваш email должен быть в формате name@domain.com",
				remote: "Данный email уже зарегистрирован"
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
			}).done(function(response) {
				if (response === "true") {
					$("#reg_form_box").hide();
					$("#login_form_box").show();
				} else {
					$(".result", "#reg_form").text("Вы уже зарегистрированы!");
				}
			});
		};
	});

	$("#change_profile").on('click', function(event) {
		$("#profile_data").children("input").removeAttr('readonly');
		$(".profile").css('background-color', 'transparent');
		$("#profile_data").addClass('change_data');
		$("#profile_data").children("input").removeClass('profile_data');
		$("#profile_data").children("input").addClass('field');
		$(this).hide();
		$("#save_profile").show();
		event.preventDefault();
	})

	$("#save_profile").on("click", function(event) {
		request = $.ajax({
			type: "post",
			url: "/ajax/user_data.php",
			data: $("#profile_data").serialize()
			}).done(function() {
				$("#profile_data").children("input").attr('readonly');
				$(".profile").css('background-color', 'rgba(255,255,255,.45)');
				$("#profile_data").removeClass('change_data');
				$("#profile_data").children("input").removeClass('field');
				$("#profile_data").children("input").addClass('profile_data');
				$("#profile_data").find($(".result")).text("Данные успешно сохранены!");
				setTimeout(function() {
					$("#profile_data").find($(".result")).hide("slow");
					$("#profile_data").find($(".result")).text("");
				}, 1500);
				$("#save_profile").hide();
				$("#change_profile").show();
			});
		event.preventDefault();
	});

	$("#login_btn_submit").on("click", function() {
		request = $.ajax({
			type: "post",
			url: "/ajax/login.php",
			data: $("#login_form").serialize()
			}).done(function(response, textStatus, jqXHR) {
				if (textStatus === "success") {
					$("#login_form_box").hide();
					$("#profile_box").show();
					load_data = JSON.parse(response);
					$("#bin").val(load_data['bin']);
					$("#ip").val(load_data['ip']);
					$("#surname").val(load_data['surname']);
					$("#name").val(load_data['name']);
					$("#patronymic").val(load_data['patronymic']);
					if (load_data['resident'] == 1) {
						$("#resident").val("Резидент РК");
					} else {
						$("#resident").val("Не Резидент РК");
					}
					console.log(load_data['bin']);
				} else {
					$(".result", "#login_form").text("Неправильный пароль!");
					console.log(response);
				}
			});
	});

	$("#exit_btn").on("click", function() {
		request = $.ajax({
			type: "post",
			url: "/ajax/logout.php",
			success: function(response) {
				if (response === "true") {
					$("#profile_box").hide();
				}
			}
		})
	})
});