import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles';
import settings from '../../config/settings';
import dateManager from '../../lib/dateManager';

import MainAndTwoSubDataBadge from '../../components/Badges/MainAndTwoSubDataBadge';
import OrderedListThree from '../../components/Badges/OrderedListThree';


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
  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <MainAndTwoSubDataBadge title="Total respuestas Hoy"
      uri={settings.COMPANY_DATE_TOTAL.replace(':company_id', 1)
      .replace(':start_date', dateManager.getYesterday(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Total respuestas esta semana"
      uri={settings.COMPANY_DATE_TOTAL.replace(':company_id', 1)
      .replace(':start_date', dateManager.getWeekStart(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Total respuestas este mes"
      uri={settings.COMPANY_DATE_TOTAL.replace(':company_id', 1)
      .replace(':start_date', dateManager.getMonthStart(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Total respuestas este año"
      uri={settings.COMPANY_DATE_TOTAL.replace(':company_id', 1)
      .replace(':start_date', dateManager.getYearStart(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Promedio de hoy"
      uri={settings.COMPANY_DATE_AVG.replace(':company_id', 1)
      .replace(':start_date', dateManager.getYesterday(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Promedio esta semana"
      uri={settings.COMPANY_DATE_AVG.replace(':company_id', 1)
      .replace(':start_date', dateManager.getWeekStart(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Promedio este mes"
      uri={settings.COMPANY_DATE_AVG.replace(':company_id', 1)
      .replace(':start_date', dateManager.getMonthStart(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <MainAndTwoSubDataBadge title="Promedio este año"
      uri={settings.COMPANY_DATE_AVG.replace(':company_id', 1)
      .replace(':start_date', dateManager.getYearStart(Date.now()))
      .replace(':end_date', dateManager.getString(Date.now()))}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />

      <OrderedListThree title="Locales con mejor promedio"
      uri={settings.COMPANY_BEST_AVG_STORE.replace(':company_id', 1).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='location'
      />
      <OrderedListThree title="Locales con mejor promedio: mujeres"
      uri={settings.COMPANY_BEST_AVG_STORE.replace(':company_id', 1).replace(':gender', 'f')}
      valueKey='avg'
      labelKey='location'
      />
      <OrderedListThree title="Locales con mejor promedio: hombres"
      uri={settings.COMPANY_BEST_AVG_STORE.replace(':company_id', 1).replace(':gender', 'm')}
      valueKey='avg'
      labelKey='location'
      />
      <OrderedListThree title="Preguntas con mejor promedio"
      uri={settings.COMPANY_BEST_AVG_QUESTION.replace(':company_id', 1).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='text'
      />
      <OrderedListThree title="Preguntas con mejor promedio: mujeres"
      uri={settings.COMPANY_BEST_AVG_QUESTION.replace(':company_id', 1).replace(':gender', 'f')}
      valueKey='avg'
      labelKey='text'
      />
      <OrderedListThree title="Preguntas con mejor promedio: hombres"
      uri={settings.COMPANY_BEST_AVG_QUESTION.replace(':company_id', 1).replace(':gender', 'm')}
      valueKey='avg'
      labelKey='text'
      />
      <OrderedListThree title="Encuestas con mejor promedio"
      uri={settings.COMPANY_BEST_AVG_POLL.replace(':company_id', 1).replace(':gender', 'none')}
      valueKey='avg'
      labelKey='name'
      />
      <OrderedListThree title="Encuestas con mejor promedio: mujeres"
      uri={settings.COMPANY_BEST_AVG_POLL.replace(':company_id', 1).replace(':gender', 'f')}
      valueKey='avg'
      labelKey='name'
      />
      <OrderedListThree title="Encuestas con mejor promedio: hombres"
      uri={settings.COMPANY_BEST_AVG_POLL.replace(':company_id', 1).replace(':gender', 'm')}
      valueKey='avg'
      labelKey='name'
      />
      <MainAndTwoSubDataBadge title="Promedio de edad"
      uri={settings.COMPANY_AGE_AVG.replace(':company_id', 1)}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />
      </div>
    );
  }
}
