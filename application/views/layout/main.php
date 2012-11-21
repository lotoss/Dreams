<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
   <!-- <link rel="stylesheet" type="text/css" href="css/styles.css" />-->
    <link rel="stylesheet" type="text/css" href="styles/dreamsalbum.css" />
    <script type="text/javascript">
		option = { cart: <?=$cart?> };
	</script>
	<script type="text/javascript" src="scripts/libs/require.js" data-main="/scripts/index"></script>

	<!--
    
	<script type="text/javascript" src="scripts/album/album.js"></script>
	
	<script type="text/javascript" src="scripts/album/base.view.js"></script>
	<script type="text/javascript" src="scripts/album/cover.view.js"></script>
	<script type="text/javascript" src="scripts/album/cover.model.js"></script>
	<script type="text/javascript" src="scripts/album/forzatz.view.js"></script>
	<script type="text/javascript" src="scripts/album/forzatz.model.js"></script>
	<script type="text/javascript" src="scripts/album/stamp.view.js"></script>
	<script type="text/javascript" src="scripts/album/stamp.model.js"></script>
	<script type="text/javascript" src="scripts/album/box.view.js"></script>
	<script type="text/javascript" src="scripts/album/box.model.js"></script>
	<script type="text/javascript" src="scripts/album/boxstamp.view.js"></script>
	<script type="text/javascript" src="scripts/album/boxstamp.model.js"></script>
	<script type="text/javascript" src="scripts/album/collections.js"></script>
	
	
	<script type="text/javascript" src="scripts/popup.js"></script>

	-->
	
	

</head>
<body>
	<!-- start top_panel -->
	<div id="top_panel">
		<div class="wrap">
			<ul id="data_nav" class="top_nav">
				<li class="drop"><a href="#">Фотографы</a>
					<ul>
						<li><a href="">Популярные</a></li>
						<li><a href="">Обновившиеся</a></li>
						<li><a href="">Новые</a></li>
						<li><a href="">По алфавиту</a></li>
					</ul>
				</li>
				<li class="drop"><a href="#">Фотографии</a>
					<ul>
						<li><a href="">Новые</a></li>
						<li><a href="">Лучшие </a></li>
						<li><a href="">Выбор редакции</a></li>
						<li><a href="">Фото дня</a></li>
					</ul>
				</li>
				<li><a href="#">Форум</a></li>
				<li><a href="#" class="pro">Pro</a></li>
			</ul>
			<a href="" id="top_panel_logo">MyWed</a>
			<ul id="user_nav" class="top_nav">
				<li class="drop"><a href="#" onclick="window.cart.set('user', {id: 10,firstname: 'Александр',	surename: 'Прокопенко',	phone: '+380637268477',	email: 'donald-dack@mail.ru', money: 25340, discount: true}); return false;">OlgaN</a>
					<dl>
						<dd><a href="">Любимое</a></dd>
						<dd><a href="">Персональный сайт</a></dd>
						<dt>Редактировать</dt>
						<dd><a href="">Личные данные</a></dd>
						<dd><a href="">Портфолио</a></dd>
						<dd class="exit"><a href="" onclick="window.cart.set('user'); return false;" >Выйти</a></dd>
					</dl>
				</li>
				<li><a href="#" class="mail">Почта <span class="new">+5</span></a></li>
				<li><a href="#">Счет: 13000 Р</a></li>
			</ul>
		</div>
	</div>
	<!-- end top_panel -->
	<!-- start mainarea -->
	<div id="mainarea">
		<!-- start header -->
		<div id="header">
			<a href="" id="logo" data-value="prevu"></a>
			<!-- start control -->
			<ul id="control">
				<li class="construct"  data-value="album"><i></i> Конструктор альбомов</li>
				<li class="cart"  data-value="cart"><i></i>Корзина <span>(пусто)</span></li>
			</ul>
			<!-- end control -->
			<!-- start socials -->
			<ul class="socials">
				<li><a href="" class="vk"></a></li>
				<li><a href="" class="facebook"></a></li>
				<li><a href="" class="twitter"></a></li>
				<li><a href="" class="odnoklasniki"></a></li>
				<li><a href="" class="google"></a></li>
			</ul>
			<!-- end socials -->
		</div>
		<!-- end header -->
		<!-- start middle -->
		<div id="middle_background"></div>
		<div id="middle">
			<!-- start prevu_page -->
			<div class="page prevu" id="prevu">
				<h2>Книги потрясающие воображение</h2>
				<ul class="app_nav">
					<li><a href="">Альбом</a></li>
					<li><a href="">Книга в кофре</a></li>
					<li><a href="">Книга в коробке</a></li>
				</ul>
				<ul id="prevu_slider">
					<li class="album">
						<img src="images/dreamsalbum/uploads/album_prevu.png" width="357" height="294"/>
						<a href="#popup1" class="gray pos1"></a>
						<a href="#popup2" class="gray pos2"></a>
						<a href="#popup3" class="gray pos3"></a>
						<p>С начала 2010 года Dream Album выпускает полиграфические фотокниги премиум качества в переплётах трёх типов. Это книги в фотообложках, и книги в тканевых и кожаных переплётах.</p>
					</li>
					<li class="cofra">
						<img src="images/dreamsalbum/uploads/cofra_prevu.png" width="664" height="351" />
						<a href="#popup4" class="purpe pos1"></a>
						<a href="#popup5" class="purpe pos2"></a>
						<a href="#popup6" class="purpe pos3"></a>
						<a href="#popup7" class="purpe pos4"></a>
						<p>Кофр придаёт альбому дополнительную солидность, тем самым повышая его статус. Полностью обтянут тканью, поэтому идеально сочетается как с тканевым, так и с кожаным переплётом альбома.</p>
					</li>
					<li class="box">
						<img src="images/dreamsalbum/uploads/box_prevu.png" width="750" height="350" />
						<a href="#popup8" class="blue pos1"></a>
						<a href="#popup9" class="blue pos2"></a>
						<a href="#popup10" class="blue pos3"></a>
						<p>Мы рекомендуем дополнительно упаковывать книги в недорогие декоративные коробочки, прежде чем отдавать их клиенту. Книга в коробочке смотрится гораздо лучше нежели просто «голая» книжка.</p>
					</li>
				</ul>
				<!--<p>Кофр придаёт альбому дополнительную солидность, тем самым повышая его статус. Полностью обтянут 
тканью, поэтому идеально сочетается как с тканевым, так и с кожаным переплётом альбома.</p>-->
				<a class="next_step" href="#album"></a>
			</div>
			<!-- end prevu_page -->
			
			<!-- start album -->
			<div id="album_view" class="page album_page">
				<ul class="app_nav album_nav">
					<li><a href="" data-value="cover">Книга</a></li>
					<li><a href="" data-value="stamp">Тиснение на книге</a></li>
					<li><a href="" data-value="forzatz">Форзац</a></li>
					<li><a href="" data-value="box">Короб</a></li>
					<li><a href="" data-value="boxstamp">Тиснение на коробе</a></li>
				</ul>
			</div>
			<!-- end album -->
			
			<!-- start basket -->
			<div id="basket" class="page basket">
				<ul class="app_nav cart_nav">
					<li><a href="">Корзина</a></li>
					<li><a href="">Загрузка макетов</a></li>
					<li><a href="">Оформление заказа</a></li>
					<li><a href="">Получение заказа</a></li>
				</ul>
                
               
			</div>
			<!-- end basket -->
		
		</div>
		<!-- end middle -->
		<!-- start footer -->
		<div id="prefooter"></div>
		<div id="footer">
			<div class="wrap">
			<div class="discount">
				<span>10%</span>
				<p>Клубная скидка MyWed Pro</p>
			</div>
			<div class="contacts">
				<p>Skype: <a href="callto:dreamalbum">dreamalbum</a></p>
				<p>Тел.: <span class="white">(965) 285-24-13 </span></p>
				<p>Эл. почта: <a href="mailto:slon@dreamailbum.ru">slon@dreamailbum.ru</a></p>
			</div>
			<div class="adress">
				<p>Москва, Милютинский переулок д.19/4 стр. 5</p>
				<a href="http://goo.gl/maps/chbUZ" target="_blank">Посмотреть на карте</a>
			</div>			
			
			<div class="clear"></div>
			</div>
		</div>
		<!-- end footer -->
	</div>
	<!-- end mainarea -->
	<!-- start popup -->
	<div id="popup">
		<div id="overlay"></div>
		
		<div class="window">
			<a class="close"></a>
			<div class="slider">
				<ul>
					<li><img src="images/dreamsalbum/uploads/popup_cont1.jpg" alt="" /></li>
					<li><img src="images/dreamsalbum/uploads/popup_cont1.jpg" alt="" /></li>
					<li><img src="images/dreamsalbum/uploads/popup_cont1.jpg" alt="" /></li>
				</ul>
				<a href="" class="prev"></a>
				<a href="" class="next"></a>
			</div>
			<div class="text">
				<h3>Особое внимание к деталям</h3>
				<p>Тут текст о том какие крутые мы делаем короба, какая технология, рассказываем про сгиб, как он не ломается 
и свежо и опрятно выглядит.</p>
				<p>В отличие от пылевого и ионного хвостов, атомное время меняет вращательный надир, а время ожидания ответа составило бы 80 миллиардов лет. Звезда на следующий год, когда было лунное затмение и сгорел древний храм Афины 
в Афинах (при эфоре Питии и афинском архонте Каллии).</p>
			</div>
		</div>
		
	</div>
	<!-- end popup -->

<!-- end cart_list_template -->
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/scripts/cart/cart_template.html'); ?>
<?php require_once($_SERVER['DOCUMENT_ROOT'].'/scripts/album/view_template.html'); ?>
</body>
</html>