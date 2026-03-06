import React from "react"

function TablaDatos({datos}){

return(

<div className="card p-3 mt-3">

<h5>📋 Historial de monitoreo</h5>

<table className="table table-striped">

<thead>

<tr>

<th>ID</th>
<th>Dispositivo</th>
<th>Voltaje</th>
<th>Corriente</th>
<th>Potencia</th>
<th>Estado</th>
<th>Fecha</th>

</tr>

</thead>

<tbody>

{datos.map(d=>(

<tr key={d.id}>

<td>{d.id}</td>
<td>{d.dispositivo}</td>
<td>{d.voltaje} V</td>
<td>{d.corriente} A</td>
<td>{(d.voltaje*d.corriente).toFixed(2)} W</td>

<td>

{d.estado==="NORMAL" && <span className="badge bg-success">NORMAL</span>}
{d.estado==="BAJO" && <span className="badge bg-warning">BAJO</span>}
{d.estado==="SOBRECARGA" && <span className="badge bg-danger">SOBRECARGA</span>}

</td>

<td>{new Date(d.fecha).toLocaleString()}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default TablaDatos