<?php
require_once "bd.php";

//CAPTURAR ERRORES Y AVISOS
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

//CAPTURAR CUALQUIER SALIDA INESPERADA
ob_start();

$valido = array('success'=> false, 'mensaje'=>"");

if ($_POST) {
    $action = isset($_POST['action']) ? $_POST['action'] : '';
    switch ($action) {
        case 'insert':
            $a = $_POST['nombre'];
            $b = $_POST['ap'];
            $c = $_POST['am'];
            $d = $_POST['correo'];
            $e = md5($_POST['pass']);

            $sql = "INSERT INTO usuario VALUES (null, '$a','$b','$c','$d','$e')";

            if ($cx->query($sql)) {
                $valido['success'] = true;
                $valido['mensaje'] = "SE REGISTRO CORRECTAMENTE";
            } else {
                $valido['success'] = false;
                $valido['mensaje'] = "NO SE PUDO REGISTRAR EL USUARIO";
            }
            break;

        default:
            $valido['success'] = false;
            $valido['mensaje'] = "Error al registar";
            break;
    }

    //CAPTURAR CUALQUIER SALIDA INESPERADA Y AÑADIRLA A LA RESPUESTA DEL JSON
    $output = ob_get_clean();
    if ($output) {
        $valido['debug'] = $output;
    }
    echo json_encode($valido);
}
?>
