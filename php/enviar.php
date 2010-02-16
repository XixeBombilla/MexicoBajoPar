<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Mexico Bajo Par</title>
<link rel="shortcut icon" href="img/favico.png">
<link href="../css/estilos.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js">

</script>
	<script type="text/javascript" src="js/bookflip.js"></script>

<script type="text/javascript" charset="utf-8">
			$(document).ready(function(){
				$("#barra li").prepend("<span></span>");
				
				$("#barra li").each(function(){
					var linkText = $(this).find("a").html();
					$(this).find("span").show().html(linkText);
				});
				
				$("#barra li").hover(function(){
					$(this).find("span").stop().animate({
						marginTop: "-40"}, 250);
				}, function(){
					$(this).find("span").stop().animate({
						marginTop:"0"
					},250);
				});
			});
		</script>

<style type="text/css" media="screen">

			ul#barra li{
				overflow:hidden;
				height:40px;
			}
			ul#barra a, ul#barra span{
				padding:10px 10px;
				float:left;
				text-decoration: none;
				color:#fff;
				clear:both;
 				line-height:20px;
			}
			ul#barra a{
				color: #333;
				background-position: left bottom;
				background:url(../img/cuadro1.jpg);
				text-shadow: #191919;
				text-decoration: blink;
			}
		</style>
</head>

<body>
<div id="contenedorGeneral">

	<div id="menu">
		
		<div id="logo"><br/><a href="../index.html"><img src="../img/logo.png" width="461px" height="45px" style="border:none;"/></a></div>
				
				<a id="barra1">Contacto</a>
			        <ul id="barra">
			                <li><a href="foro.html">Foro</a></li>
					<li><a href="calendario.html">Calendario</a></li>
					<li><a href="num.html">Num.Anteriores</a></li>	
					<li><a href="nosotros.html">Nosotros</a></li>	
					<li><a href="../inicio.html">Revista</a></li>
				</ul>
		<div class="clear"></div>
		
	</div>

	<div id="infoContenido">
		<div id="banner">
			<a><object type="application/x-shockwave-flash" data="../swf/banner/BANNERCO.swf" width="300px" height="590px" style="margin-left:10px; margin-top:10px;">
			    <param name="movie" value="../swf/banner/BANNERCO.swf" />
			    <param name="quality" value="high"/>
			    <param name="wmode" value="transparent"/>
			</object>
			</a>
			</div>
		<div id="infoContenidoPrincipal">
			<ul id="textoInfo" style="margin-right:10px; margin-left:100px;">
				
						<p style="text-align:right; text-shadow: #333;">CONTACTO</p>
						<p style="text-align:right; text-shadow: #333;">contacto@mexicobajopar.com</p>
						<p style="text-align:right; text-shadow: #333; color:#ccc333;">www.mexicobajopar.com</p>
						<p>
									
                                                                                                    <?php

                                                                                                        $nombre = $_POST['nombre'];
                                                                                                        $mail = $_POST['mail'];
                                                                                                        $empresa = $_POST['empresa'];
                                                                                                        
                                                                                                        $header = 'From: ' . $mail . " \r\n";
                                                                                                        $header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
                                                                                                        $header .= "Mime-Version: 1.0 \r\n";
                                                                                                        $header .= "Content-Type: text/plain";
                                                                                                        
                                                                                                        $mensaje = "Este mensaje fue enviado por " . $nombre . ", de la empresa " . $empresa . " \r\n";
                                                                                                        $mensaje .= "Su e-mail es: " . $mail . " \r\n";
                                                                                                        $mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
                                                                                                        $mensaje .= "Enviado el " . date('d/m/Y', time());
                                                                                                        
                                                                                                        $para = 'tiliches_88@hotmail.com';
                                                                                                        $asunto = 'Contacto Mexico Bajo Par';
                                                                                                        
                                                                                                        mail($para, $asunto, utf8_decode($mensaje), $header);
                                                                                                        
                                                                                                        echo "Mensaje enviado Correctamente";
                                                                                                        
                                                                                                        ?>
								
						</p>
					
			</ul>
		</div>

	</div>
	<div class="clear"></div>

	<div id="pie"></div>
</div>

</body>

</html>

