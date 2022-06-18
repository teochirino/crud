<?php
//Conexion
class Conexion
{
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "test";
    private $conect;

    public function __construct()
    {
        $conection = "mysql:host=" . $this->servername . ";dbname=" . $this->dbname . ";charset=utf8";
        try {
            $this->conect = new PDO($conection, $this->username, $this->password);
            $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $e) {
            $this->conect = "Error de conexión";
            echo "Error: " . $e->getMessage();
        }
    }


    public function connect()
{
    return $this->conect;
}
}
