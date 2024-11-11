<?php
$conexion = mysqli_connect("localhost", "root", "", "login_register_db");

if (isset($_POST['id']) && isset($_POST['status'])) {
    $id = intval($_POST['id']);
    $status = intval($_POST['status']);

    // Actualizar el estado del pedido en la base de datos
    $query = "UPDATE pedidos SET status = $status WHERE id = $id";
    if (mysqli_query($conexion, $query)) {
        echo "Estado del pedido actualizado correctamente.";
    } else {
        echo "Error al actualizar el estado del pedido.";
    }
} else {
    echo "ID de pedido o estado no proporcionado.";
}

// Cerrar la conexión
$conexion->close();
?>