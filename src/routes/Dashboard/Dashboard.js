import React, { Component } from 'react';
import settings from '../../config/settings';

import DataComparisonBadge from '../../components/Badges/DataComparisonBadge';
import ListComparisonBadge from '../../components/Badges/ListComparisonBadge';

import ExcelDownloadButton from '../../components/Buttons/ExcelDownloadButton';


/*
Palabras más usadas por los clientes
Palabras más usadas por los hombres
Palabras más usadas por las mujeres
Pregunta con más sí
Pregunta con más sí hombres
Pregunta con más sí mujeres
Pregunta con más no
Pregunta con más no hombres
Pregunta con más no mujeres
Opciones más escogidas
Opciones más escogidas hombres
Opciones más escogidas mujeres
*/
export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      user          : this.props.route.getUser()
    }
  }

  render() {
    return (
      <div>
      <ExcelDownloadButton
      uri={settings.EXCEL_ALL.replace(':company_id', this.state.user.company_id)}
      fileName='reporte_total.xlsx'
      label='Descargar excel con los datos de la empresa'
      />
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <DataComparisonBadge title='Respuestas'
      uri={settings.COMPANY_DATE_TOTAL.replace(':company_id', this.state.user.company_id)}
      />

      <DataComparisonBadge title='Promedios'
      uri={settings.COMPANY_DATE_AVG.replace(':company_id', this.state.user.company_id)}
      />

      <ListComparisonBadge title='Mejores Tiendas'
      uri={settings.COMPANY_DATE_BEST_AVG_STORE.replace(':company_id', this.state.user.company_id).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='location'
      />

      <ListComparisonBadge title='Mejores Empleados'
      uri={settings.COMPANY_DATE_BEST_AVG_EMPLOYEE.replace(':company_id', this.state.user.company_id).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='full_name'
      />

      <ListComparisonBadge title="Mejores Encuestas"
      uri={settings.COMPANY_DATE_BEST_AVG_POLL.replace(':company_id', this.state.user.company_id).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='name'
      />

      <ListComparisonBadge title="Mejores Preguntas"
      uri={settings.COMPANY_DATE_BEST_AVG_QUESTION.replace(':company_id', this.state.user.company_id).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='text'
      />

      <DataComparisonBadge title="Edad Promedio"
      uri={settings.COMPANY_DATE_AGE_AVG.replace(':company_id', this.state.user.company_id)}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />
      {
        // <OrderedListThreeBadge title="Preguntas con mejor promedio (Mes): mujeres"
        // uri={settings.COMPANY_DATE_BEST_AVG_QUESTION.replace(':company_id', this.state.user.company_id).replace(':gender', 'f')
        // .replace(':start_date', dateManager.getMonthStart(Date.now()))
        // .replace(':end_date', dateManager.getString(Date.now()))}
        // valueKey='avg'
        // labelKey='text'
        // />
        // <OrderedListThreeBadge title="Preguntas con mejor promedio (Mes): hombres"
        // uri={settings.COMPANY_DATE_BEST_AVG_QUESTION.replace(':company_id', this.state.user.company_id).replace(':gender', 'm')
        // .replace(':start_date', dateManager.getMonthStart(Date.now()))
        // .replace(':end_date', dateManager.getString(Date.now()))}
        // valueKey='avg'
        // labelKey='text'
        // />
        // <OrderedListThreeBadge title="Encuestas con mejor promedio (Mes)"
        // uri={settings.COMPANY_DATE_BEST_AVG_POLL.replace(':company_id', this.state.user.company_id).replace(':gender', 'none')
        // .replace(':start_date', dateManager.getMonthStart(Date.now()))
        // .replace(':end_date', dateManager.getString(Date.now()))}
        // valueKey='avg'
        // labelKey='name'
        // />
        // <OrderedListThreeBadge title="Encuestas con mejor promedio (Mes): mujeres"
        // uri={settings.COMPANY_DATE_BEST_AVG_POLL.replace(':company_id', this.state.user.company_id).replace(':gender', 'f')
        // .replace(':start_date', dateManager.getMonthStart(Date.now()))
        // .replace(':end_date', dateManager.getString(Date.now()))}
        // valueKey='avg'
        // labelKey='name'
        // />
        // <OrderedListThreeBadge title="Encuestas con mejor promedio (Mes): hombres"
        // uri={settings.COMPANY_DATE_BEST_AVG_POLL.replace(':company_id', this.state.user.company_id).replace(':gender', 'm')
        // .replace(':start_date', dateManager.getMonthStart(Date.now()))
        // .replace(':end_date', dateManager.getString(Date.now()))}
        // valueKey='avg'
        // labelKey='name'
        // />
      }
      </div>
      </div>
    );
  }
}
