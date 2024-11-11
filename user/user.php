<?php
session_start();
$conexion = mysqli_connect("localhost", "root", "", "login_register_db");

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario'])) {
    echo '<script>console.log("Usuario no ha iniciado sesión. Redirigiendo...");</script>';
    header("location: ../login-register/index.php");
    session_destroy();
    die();
}

if($_SESSION['usuario'] == 'admin@gmail.com') {
  header("location: user-admin.php");
}

// Obtener el usuario de la sesión
$usuario = $_SESSION['usuario'];
echo '<script>console.log("Usuario de la sesión: ' . $usuario . '");</script>';

// Consultar los datos del usuario en la base de datos
$verificar_usuario = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo = '$usuario'");
if (mysqli_num_rows($verificar_usuario) > 0) {
    $fila = mysqli_fetch_assoc($verificar_usuario);
    $nombre_completo = $fila['nombre_completo'];
    $correo = $fila['correo'];
    $nombre_usuario = $fila['usuario'];
} else {
    $nombre_completo = "Usuario no encontrado";
    $correo = "Correo no disponible";
    $nombre_usuario = "Usuario no disponible";
}

// Consultar los pedidos del usuario y separarlos por estado
$pedidos_en_curso = mysqli_query($conexion, "SELECT * FROM pedidos WHERE correo = '$usuario' AND status = 1");
$pedidos_completados = mysqli_query($conexion, "SELECT * FROM pedidos WHERE correo = '$usuario' AND status = 0");

// Cerrar la conexión
$conexion->close();
?>


<!DOCTYPE html>
<html>

<head>
  <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Site Metas -->
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />
  <link rel="shortcut icon" href="images/favicon.png" type="">

  <title> Delicias Chuy </title>

  <!-- bootstrap core css -->
  <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />

  <!--owl slider stylesheet -->
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
  <!-- nice select  -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.min.css" integrity="sha512-CruCP+TD3yXzlvvijET8wV5WxxEh5H8P4cmz0RFbKK6FlZ2sYl3AEsKlLPHbniXKSrDdFewhbmBK5skbdsASbQ==" crossorigin="anonymous" />
  <!-- font awesome style -->
  <link href="../css/font-awesome.min.css" rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="../css/style.css" rel="stylesheet" />
  <!-- responsive style -->
  <link href="../css/responsive.css" rel="stylesheet" />
  <link href="assets/css/contenedores.css" rel="stylesheet" />
  <link href="assets/css/style.css" rel="stylesheet" />

</head>

<body class="sub_page">

  <div class="hero_area">
    <div class="bg-box">
      <img src="../images/hero-bg.jpg" alt="">
    </div>
    <!-- header section strats -->
    <header class="header_section">
      <div class="container">
        <nav class="navbar navbar-expand-lg custom_nav-container ">
          <a class="navbar-brand" href="../index.html">
            <span>
              Delicias Chuy
            </span>
          </a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class=""> </span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  mx-auto ">
              <li class="nav-item ">
                <a class="nav-link" href="../index.html">Inicio </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../menu.html">Menu</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../about.html">Sobre Nosotros <span class="sr-only">(current)</span> </a>
              </li>
            </ul>
            <div class="user_option">
              <a href="../login-register/index.php" class="user_link">
                <i class="fa fa-user" aria-hidden="true"></i>
              </a>
              <form class="form-inline">
                <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
              <a href="../menu.html" class="order_online">
                Ordenar
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <!-- end header section -->
  </div>

 <!-- Sección sobre el usuario -->
 <section class="about_section layout_padding">
    <div class="profile-details">
        <img src="../images/User.jpg" alt="Foto de perfil">
        <h2><?php echo htmlspecialchars($nombre_completo); ?></h2>
        <div class="info">
            <p><strong>Email:</strong> <?php echo htmlspecialchars($correo); ?></p>
            <p><strong>Nombre de usuario:</strong> <?php echo htmlspecialchars($nombre_usuario); ?></p>
        </div>
        <form action="../login-register/php/cerrar_sesion.php">
            <button>Cerrar sesión</button>
        </form>
    </div>

    <div class="templates">
        <h3>Pedidos</h3>
        <p>Pedidos hechos por este usuario</p>

        <!-- Tabla de Pedidos en Curso -->
        <div class="table-container">
            <h4>Pedidos en curso:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Repartidor</th>
                        <th>Detalles</th>
                        <th>Precio</th>
                        <th>M.Pago</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($pedido = mysqli_fetch_assoc($pedidos_en_curso)) { ?>
                    <tr>
                        <td><?php echo htmlspecialchars($pedido['hora']); ?></td>
                        <td><?php echo htmlspecialchars($pedido['repartidor']); ?></td>
                        <td><?php echo htmlspecialchars($pedido['detalles']); ?></td>
                        <td><?php echo "$" . htmlspecialchars($pedido['total']); ?></td>
                        <td><?php echo htmlspecialchars($pedido['metodo_pago']); ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

        <!-- Tabla de Pedidos Completados -->
        <div class="table-container_completed">
            <h4>Pedidos completados:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Repartidor</th>
                        <th>Detalles</th>
                        <th>Precio</th>
                        <th>M.Pago</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($pedido = mysqli_fetch_assoc($pedidos_completados)) { ?>
                    <tr>
                        <td><?php echo htmlspecialchars($pedido['hora']); ?></td>
                        <td><?php echo htmlspecialchars($pedido['repartidor']); ?></td>
                        <td><?php echo htmlspecialchars($pedido['detalles']); ?></td>
                        <td><?php echo "$" . htmlspecialchars($pedido['total']); ?></td>
                        <td><?php echo htmlspecialchars($pedido['metodo_pago']); ?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>
</section>


  <!-- end about section -->

  <!-- footer section -->
  <footer class="footer_section">
    <div class="container">
      <div class="row">
        <div class="col-md-4 footer-col">
          <div class="footer_contact">
            <h4>
              Contáctanos
            </h4>
            <div class="contact_link_box">
              <a href="">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span>
                  +52 1 244 133 6533
                </span>
              </a>
              <a href="">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  jesusespinoza@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 footer-col">
          <div class="footer_detail">
            <a href="" class="footer-logo">
              Delicias Chuy
            </a>
            <p>
              a
            </p>
            <div class="footer_social">
              <a href="https://www.facebook.com/baconest">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/jsshrnndz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 footer-col">
          <h4>
            Horario
          </h4>
          <p>
            Lunes a Jueves
          </p>
          <p>
            7:30 Am -2:00 Pm
          </p>
        </div>
      </div>
      <div class="footer-info">
        
      </div>
    </div>
  </footer>
  <!-- footer section -->

  <!-- jQery -->
  <script src="../js/jquery-3.4.1.min.js"></script>
  <!-- popper js -->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
  </script>
  <!-- bootstrap js -->
  <script src="../js/bootstrap.js"></script>
  <!-- owl slider -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js">
  </script>
  <!-- isotope js -->
  <script src="https://unpkg.com/isotope-layout@3.0.4/dist/isotope.pkgd.min.js"></script>
  <!-- nice select -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.min.js"></script>
  <!-- custom js -->
  <script src="../js/custom.js"></script>

</body>

</html>