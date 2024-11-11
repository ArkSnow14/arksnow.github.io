<?php

    include 'conexion_be.php';

    $correo = $_POST['correo'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $salon = $_POST['salon'];
    $hora = $_POST['hora'];
    $repartidor = $_POST['repartidor'];
    $detalles = $_POST['detalles'];
    $metodo_pago = $_POST['metodo_pago'];
    $total = $_POST['total'];


    $query = "INSERT INTO pedidos(nombre, correo, telefono, salon, hora, repartidor, detalles, metodo_pago, status, total)
                VALUES('$nombre', '$correo', '$telefono', '$salon', '$hora', '$repartidor', '$detalles', '$metodo_pago', 1, '$total')";



    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar){
        echo '
            <script>
                alert("PEdido realizado exitosamente");
                window.location = "../index.php";
            </script>
        ';
    }else{
        echo '
            <script>
                alert("Pedido no realizado, intente de nuevo");
                window.location = "../index.php";
            </script>
        ';  
    }

    mysqli_close($conexion);
?>