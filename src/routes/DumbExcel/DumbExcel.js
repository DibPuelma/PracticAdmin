import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import FileSaver from 'file-saver';
export default class DumbExcel extends Component {
  render() {
    return (
      <div>
      <RaisedButton onClick={() => this._download('reporte_todas_las_preguntas.xlsx', 'question')}>Descargar TODO pregunta</RaisedButton>
      <RaisedButton onClick={() => this._download('reporte_todos_los_empleados.xlsx', 'employee')}>Descargar TODO empleado</RaisedButton>
      <RaisedButton onClick={() => this._download('reporte_todas_las_encuestas.xlsx', 'poll')}>Descargar TODO encuesta</RaisedButton>
      <RaisedButton onClick={() => this._download('reporte_todos_los_puntos_de_venta.xlsx', 'sell_point')}>Descargar TODO punto de venta</RaisedButton>
      <RaisedButton onClick={() => this._download('reporte_total.xlsx', 'answered_poll')}>Descargar TODO de TODO</RaisedButton>
      </div>
    );
  }
  _download(filename, type){
    fetch('http://www.localhost:8000/company/1/excel/' + type, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.ms-excel',
        'Content-Type': 'application/vnd.ms-excel',
      },
      responseType: 'arraybuffer'
    })
    .then((response) => {
      response.blob()
      .then((blob) => {
        FileSaver.saveAs(blob, filename);
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
