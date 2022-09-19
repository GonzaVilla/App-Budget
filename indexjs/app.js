
// Elementos del dom
const main = document.getElementById("main")
const header = document.getElementById("header")
const presupuestoData = document.getElementById("form-data");
const formPresupuesto = document.getElementById("formPresupuesto");


//botones del presupuesto
const btnAddColumn = document.getElementById("btnAddColumn"),
    btndeleteColumn = document.getElementById("btndeleteColumn"),
    btnImprimir = document.getElementById("imprimir"),
    btnCalcular = document.getElementById('btnCalcular');


//elementos del form-presupuesto sirve para generar las columnas
const item = document.getElementById('item'),
    cantidad = document.getElementById('cantidad'),
    unidad = document.getElementById('unidad'),
    descripcion = document.getElementById('descripcion'),
    precioUnit = document.getElementById('precioUnit'),
    precioTotal = document.getElementById('precioTotal');

let elementos = [item, cantidad, unidad, descripcion, precioUnit, precioTotal]




presupuestoData.addEventListener('submit', e => {
    e.preventDefault();
    header.classList.add('d-none');
    main.classList.remove('d-none');
    const {nombreEmpresa, nombrePresupuesto, numeroPresupuesto, startDate} = getinfo();
    const resultado = document.getElementById('rotulo');
    const dataPrint = document.createElement('div');
    dataPrint.classList.add('row',);
    dataPrint.innerHTML= `
        <h2 class="form-presupuesto__title col-sm-6 text-dark fs-4 p-3" id="empresa">Nombre: <b>${nombreEmpresa}</b></h2>
        <h2 class="form-presupuesto__title col-sm-6 text-dark fs-4 p-3" id="nombrePresupuesto">Proyecto: <b>${nombrePresupuesto}</b></h2>
        <p class="form-presupuesto__text col-sm-6 text-dark fs-4 p-3" id="numberPresupuesto">Presupuesto N°: <b>${numeroPresupuesto}</b></p>
        <p class="form-presupuesto__text col-sm-6 text-dark fs-4 p-3">Fecha: <time><b>${startDate}</b></time></p>
`
resultado.appendChild(dataPrint)
})

function getinfo() {
    let nombreEmpresa = document.getElementById('nombreEmpresa').value,
        nombrePresupuesto = document.getElementById('nombrePresupuesto').value,
        numeroPresupuesto = document.getElementById('numeroPresupuesto').value,
        startDate = document.getElementById('startDate').value;
    return{nombreEmpresa, nombrePresupuesto, numeroPresupuesto, startDate}
}


btnAddColumn.addEventListener('click', e =>{
    for(i = 0; i <= 5; i++){
        const inputContainer = elementos[i].children[1];
        let inner = inputContainer.outerHTML;
        elementos[i].innerHTML += inner;
    }

})
btndeleteColumn.addEventListener('click', e =>{
    for(i = 0; i <= 5; i++){
        if(elementos[i].children.length > 2){ 
            elementos[i].removeChild(elementos[i].lastChild);
    }}
});
formPresupuesto.addEventListener('submit', e => {
        e.preventDefault();
    const itemInput = document.querySelectorAll('.item__input'),
        unitInput = document.querySelectorAll('.unit__input'),
        descriptionInput = document.querySelectorAll('.description__input'),
        precioU = document.querySelectorAll('.unit-price__input'),
        tax = document.getElementById('tax__input'),
        cant = document.querySelectorAll('.quantity__input'),
        masImpuestos = document.getElementById('masimpuestos'),
        subTotal = document.getElementById('subtotal'),
        $total = document.getElementById('total'),
        precioT = document.querySelectorAll('.resultado'),
        btnImprimir = document.getElementById('imprimir');
    
    const inputs = [itemInput, unitInput, descriptionInput, precioU, tax, cant]
        
    let arr1 = [];
    let arr2 = [];  
    let current = 0;
    
    for( i = 0; i < precioU.length; i++) {
        arr1[i] = precioU[i].valueAsNumber;
        arr2[i] = cant[i].valueAsNumber;
    }
    let result = arr1.map( (item, ix) => item * arr2[ix] );    
    for( i = 0; i < precioU.length; i++) {
        precioT[i].textContent = result[i];
        current+=result[i]       
    }
    subTotal.textContent = current
    
    masImpuestos.textContent = current*(tax.valueAsNumber/100)
    $total.textContent = current+(current*(tax.valueAsNumber/100))
    inputs.forEach(listInputs =>{
        if (listInputs.__proto__.toString() == "[object NodeList]"){
            listInputs.forEach(input => input.disabled = true)
        } else{
            listInputs.disabled = true
            btnCalcular.classList.add("d-none")
            btnImprimir.disabled = false
        }
    })
    
    
})