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

	
	$(document).on('click', "#reg_btn", function() {
		if ($("#login_form_box").css('display', 'block')) {
			$("#login_form_box").css('display', 'none');
			$("#reg_form_box").css('display', 'block');
		};
	}); 

	$(document).on('click', "#login_btn", function() {
		if ($("#reg_form_box").css('display', 'block')) {
			$("#reg_form_box").css('display', 'none');
			$("#login_form_box").css('display', 'block');
			$("#login_form").show();
			$("#chng_psw_form").hide();
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
		$("#profile").hide();
		$("#profile_data").css('display', 'flex');
		$("#profile_box").css('background-color', 'transparent');
		$("input[name=bin]").val($("#bin").html());
		$("input[name=ip]").val($("#ip").html())
		$("input[name=surname]").val($("#surname").html())
		$("input[name=name]").val($("#name").html())
		$("input[name=patronymic]").val($("#patronymic").html())
		event.preventDefault();
	})

	$("#save_profile").on("click", function(event) {
		residentVal = function() {
			val = 0;
			if ($("input[name=resident]").prop('checked') === true) {
				val = 1;
			}
			return val;
		};
		data = {
			bin: $("input[name=bin]").val(),
			ip: $("input[name=ip]").val(),
			surname: $("input[name=surname]").val(),
			name: $("input[name=name]").val(),
			patronymic: $("input[name=patronymic]").val(),
			resident: residentVal()
		}
		request = $.ajax({
			type: "post",
			url: "/ajax/user_data.php",
			data: data
		}).done(function() {
			$("#profile_data").hide();
			$("#profile").show();
			$(".profile").css('background-color', 'rgba(255,255,255,.45)');
			$("#profile").find($(".result")).text("Данные успешно сохранены!");
			setTimeout(function() {
				$("#profile").find($(".result")).text('');
			}, 1500);
		});

		$("#bin").html($("input[name=bin]").val());
		$("#ip").html($("input[name=ip]").val());
		$("#surname").html($("input[name=surname]").val());
		$("#name").html($("input[name=name]").val());
		$("#patronymic").html($("input[name=patronymic]").val());
		if (residentVal() === 1) {
			$("#resident").text("Резидент РК");
		} else {
			$("#resident").text("Не Резидент РК");
		}

		event.preventDefault();
	});

	$("#login_btn_submit").on("click", function() {
		request = $.ajax({
			type: "post",
			url: "/ajax/login.php",
			data: $("#login_form").serialize()
		}).done(function(response, textStatus, jqXHR) {
			if (response === "false") {
				$(".result", "#login_form").text("Неправильный пароль!");
			} else {
				load_data = JSON.parse(response);
				$("#login_form_box").hide();
				$("#profile_box").show();
				$("#bin").text(load_data['bin']);
				$("#ip").text(load_data['ip']);
				$("#surname").text(load_data['surname']);
				$("#name").text(load_data['name']);
				$("#patronymic").text(load_data['patronymic']);
				if (load_data['resident'] == 1) {
					$("#resident").text("Резидент РК");
				} else {
					$("#resident").text("Не Резидент РК");
				};
				$("nav").append('<button class="menu-item" id="exit_btn">Выйти</button>');
				$("#login_btn").remove();
				$("#reg_btn").remove();
			};
		})
	});
	function loadSession() {
		request = $.ajax({
			type: 'post',
			url: '/ajax/upload.php'
		}).done(function(response) {
			if (response === 'false') {
				$("#login_form_box").show();
				$("#chng_psw_form").hide();
			} else {
				load_data = JSON.parse(response);
				$("#profile_box").show();
				$("#bin").text(load_data['bin']);
				$("#ip").text(load_data['ip']);
				$("#surname").text(load_data['surname']);
				$("#name").text(load_data['name']);
				$("#patronymic").text(load_data['patronymic']);
				if (load_data['resident'] == 1) {
					$("#resident").text("Резидент РК");
				} else {
					$("#resident").text("Не Резидент РК");
				};
				$("nav").append('<button class="menu-item" id="exit_btn">Выйти</button>');
				$("#login_btn").remove();
				$("#reg_btn").remove();
			}
		})
	};
		loadSession();

	$(document).on("click", "#exit_btn", function() {
		request = $.ajax({
			type: "post",
			url: "/ajax/logout.php",
			success: function(response) {
				if (response === "true") {
					$("#profile_box").hide();
					$("#exit_btn").remove();
					$("nav").append('<button class="menu-item" id="login_btn">Войти</button>');
					$("nav").append('<button class="menu-item" id="reg_btn">Зарегистрироваться</button>');
				}
			}
		})
	});

	$(".psw").on('click', function(event) {
		$("#login_form").hide();
		$("#chng_psw_form").show();
		event.preventDefault();
	})

	$("#chng_psw").on('click', function(event) {
		request = $.ajax ({
			type: 'post',
			url: '/ajax/change_password.php',
			data: $("#chng_psw_form").serialize()
		}).done(function(response) {
			if (response === 'false') {

			} else {
				$("h2", "#chng_psw_form").html("Функция восстановления пароля в разрабоке");
			}

		})
		event.preventDefault();
	})
});