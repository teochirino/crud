const tabla=document.querySelector('#id_body');
var table = document.getElementById( 'tabla_lista' );
var fila="";

cargarTodos();
async function cargarTodos(){
    datos =new URLSearchParams("accion=LeerTodos");
    await fetch('Api.php',{
    method: 'POST',
    body: datos
})
.then(function(respuesta){
    console.log('Respuesa ',respuesta);
    if (respuesta.ok) {

        return respuesta.text()
    } else {
        throw "Error en la llamada Ajax";
    }
})
.then(data =>{
    
    object_res = JSON.parse(data),
    object_res.forEach(element => {
        console.log('Elemt ',element.sku);
        var fila="";
        var id= element.id;
var sku = element.sku;
var descripcion = element.descripcion;
var costo = element.costo;
var existencia = element.existencia;
console.log(descripcion);
var fila=document.createElement('tr');
fila.innerHTML=`
<td style="display:none;">${id}</td>
<td>${sku}</td>
<td>${descripcion}</td>
<td>${costo}</td>
<td>${existencia}</td>
<td><button class="btn btn-info edit" title="Editar"><i class="fa fa-edit"></i></button> <button  class="btn btn-danger del" title="Eliminar"><i class="fa fa-trash"></i></button></td>
`;
tabla.appendChild(fila);

    });
    
    
});


} //Fin CargarTodos()



tabla.addEventListener('click', (e) => {
   elemento=e.target;
   clase=elemento.getAttribute('class');
   console.log('Clase ',clase);
   

   if (elemento.matches('.edit') || elemento.matches('.fa-edit') ){
        document.getElementById('tipo_accion').value="editar";
        
        fila=elemento.closest('tr');
        const cols = fila.querySelectorAll('td');
        var id = cols[0].textContent;
        var sku = cols[1].textContent;
        var descripcion = cols[2].textContent;
        var costo = cols[3].textContent;
        var existencia = cols[4].textContent;
        
        document.getElementById('tsku').value=sku;
        document.getElementById('tdescripcion').value=descripcion;
        document.getElementById('tcosto').value=costo;
        document.getElementById('texistencia').value=existencia;
        document.getElementById('btn-modal').click();
        //Fin editar
   }

   if (elemento.matches('.del') || elemento.matches('.fa-trash') ){
        fila=e.target.closest('tr');
        const cols = fila.querySelectorAll('td');
        var id = cols[0].textContent;
        var sku = cols[1].textContent;
        //fila.remove();
        swal({
            title: "Desea eliminar el producto ? "+sku,
            text: "Eliminar el producto de la lista",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Eliminado!", {
                icon: "success",
              });
              console.log('Eliminó');
              fila.remove();
              //Llamada API Eliminar
              
              let formData = new FormData();
              formData.append("accion", "EliminaUno");
              formData.append('id', id);
              fetch('Api.php',{
                method: 'POST',
                body: formData
            });

            } else {
              swal("No Eliminó");
            }
          });
   } 

});

  //Añadir
    document.querySelector('#graba').addEventListener('click', (e) => {
        tipo_accion=document.getElementById('tipo_accion').value;
        sku=document.querySelector('#tsku').value;
                descripcion=document.querySelector('#tdescripcion').value;
                costo=document.querySelector('#tcosto').value;
                existencia=document.querySelector('#texistencia').value;
        if (tipo_accion=="nuevo"){
            //API insertar
            let formData = new FormData();
            formData.append("accion", "InsertarUno");
            formData.append('sku', sku);
            formData.append('descripcion', descripcion);
            formData.append('costo', costo);
            formData.append('existencia', existencia);
            fetch('Api.php',{
              method: 'POST',
              body: formData
          })
          .then(function(respuesta){
            console.log('Respuesa ',respuesta);
            if (respuesta.ok) {
        
                return respuesta.text()
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(data =>{
            
            console.log('Data '+data),
            object_res = JSON.parse(data);
            console.log(object_res);
            id=parseInt(object_res[0]);
            console.log('El id es ',id);
            row = tabla.insertRow();
            
            cell1 = row.insertCell(0),
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell4 = row.insertCell(3);
            cell5 = row.insertCell(4);
            cell6 = row.insertCell(5);
            cell1.innerHTML = id;
            cell1.style.display="none";
            cell2.innerHTML = sku;
            cell3.innerHTML = descripcion;
            cell4.innerHTML = costo;
            cell5.innerHTML = existencia;
            cell6.innerHTML = '<button class="btn btn-info edit" title="Editar"><i class="fa fa-edit"></i></button> <button class="btn btn-danger del" title="Eliminar"><i class="fa fa-trash"></i></button>';
            
        });       
           
        }//Fin Nuevo
        else{
            
            const cols = fila.querySelectorAll('td');
            id=parseInt(cols[0].textContent);
            //API update
            let formData = new FormData();
            formData.append("accion", "UpdateUno");
            formData.append('id', id);
            formData.append('sku', sku);
            formData.append('descripcion', descripcion);
            formData.append('costo', costo);
            formData.append('existencia', existencia);
            fetch('Api.php',{
              method: 'POST',
              body: formData
          })
          .then(function(respuesta){
            
            if (respuesta.ok) {
        
                return respuesta.text()
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(data =>{
          cols[1].textContent=sku;
           cols[2].textContent=descripcion;
            cols[3].textContent=costo;
            cols[4].textContent=existencia;
            document.getElementById('tipo_accion').value="nuevo";
        });   
        }//Fin de Editar
  

    });  


//Ver JSON
    document.querySelector('#btn_json').addEventListener('click', (e) => {
        
        lista=[];
        document.getElementById('div_json').innerHTML="";
   filas=tabla.querySelectorAll('tr');
   tam=filas.length;
   console.log('Tam ',tam);
        if (tam>0){
            for (i=0;i<tam;i++){
                xxx=filas[i];
                const cols = xxx.querySelectorAll('td');
            var sku = cols[1].textContent;
            var descripcion = cols[2].textContent;
            var costo = cols[3].textContent;
            var existencia = cols[4].textContent;
            obj={
                'sku':sku,
                'descripcion':descripcion,
                'costo':costo,
                'existencia':existencia
            
            }
            lista.push(obj);
            
            }//For
            
            const JsonArray = JSON.stringify(lista);
console.log(JsonArray);
document.getElementById('div_json').innerHTML=JsonArray;
        }  //IF 
    });