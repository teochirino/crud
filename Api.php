<?php
//API
require_once("Autoload.php");
$objProducto = new Productos();

if ($_POST) {
    $accion = $_POST['accion'];

    if ($accion == "LeerTodos") {
        $productos = $objProducto->getProductos();
        echo json_encode($productos, true);
    } //Fin LeerTodos

    //Borrar un registro
    if ($accion == "EliminaUno") {
        $id = $_POST['id'];
        $productos = $objProducto->delProducto($id);
    } //Fin eliminar

    if ($accion == "InsertarUno") {
        $sku = $_POST['sku'];
        $descripcion = $_POST['descripcion'];
        $costo = $_POST['costo'];
        $existencia = $_POST['existencia'];
        $productos = $objProducto->insertProducto($sku, $descripcion, $costo, $existencia);
    }

    if ($accion == "UpdateUno") {
        $id = $_POST['id'];
        $sku = $_POST['sku'];
        $descripcion = $_POST['descripcion'];
        $costo = $_POST['costo'];
        $existencia = $_POST['existencia'];
        $productos = $objProducto->modProducto($id, $sku, $descripcion, $costo, $existencia);
    }
}
