<?php
require_once("Autoload.php");
class Productos extends Conexion
{
    private $strSku;
    private $strDescripcion;
    private $decCosto;
    private $intExistencia;
    private $conexion;

    public function __construct()
    {
        $this->conexion = new Conexion;
        $this->conexion = $this->conexion->connect();
    }
    public function insertProducto(string $sku, string $descripcion, float $costo, int $existencia)
    {
        $this->strSku = $sku;
        $this->strDescripcion = $descripcion;
        $this->decCosto = $costo;
        $this->intExistencia = $existencia;

        $sql = "INSERT INTO crud_productos(sku,descripcion,costo,existencia) VALUES (?,?,?,?)";
        $insert = $this->conexion->prepare($sql);
        $arrData = array($this->strSku, $this->strDescripcion, $this->decCosto, $this->intExistencia);
        $resInsert = $insert->execute($arrData);
        $idInsert = $this->conexion->lastInsertId();
        //return $idInsert;
        echo json_encode($idInsert);
    }

    public function getProductos()
    {
        $sql = "SELECT * FROM crud_productos ";
        $execute = $this->conexion->query($sql);
        $request = $execute->fetchall(PDO::FETCH_ASSOC);
        return $request;
    }

    public function delProducto($id)
    {
        $sql = "DELETE FROM crud_productos WHERE id=" . $id;
        $execute = $this->conexion->exec($sql);
    }

    public function modProducto($id, $sku, $descripcion, $costo, $existencia)
    {
        $sql = "UPDATE crud_productos SET sku='" . $sku . "', descripcion='" . $descripcion . "', costo=" . $costo . ", existencia=" . $existencia . " WHERE id=" . $id;
        $udpate = $this->conexion->prepare($sql);
        $udpate->execute();
    }
}
