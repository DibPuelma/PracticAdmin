import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles';
import settings from '../../config/settings';


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
        <MainAndTwoSubDataBadge title="Total Respuestas Hoy"
        uri={settings.COMPANY_DATE_TOTAL.replace(':company_id', 1)
        .replace(':start_date', '15-02-2017')
        .replace(':end_date', '16-02-2017')}
        leftColor='#FFBAD2'
        rightColor='#7CD8EA'
        />

        {
        // <MainAndTwoSubDataBadge title="Total Respuestas Semanales"
        // uri={settings.COMPANY_WEEK_TOTAL.replace(':company_id', 1)}
        // leftColor='#7CD8EA'
        // rightColor='#FFBAD2'
        // />
        // <MainAndTwoSubDataBadge title="Promedio de hoy"
        // uri={settings.COMPANY_TODAY_AVG.replace(':company_id', 1)}
        // leftColor='#7CD8EA'
        // rightColor='#FFBAD2'
        // />
        // <MainAndTwoSubDataBadge title="Promedio semanal"
        // uri={settings.COMPANY_WEEK_AVG.replace(':company_id', 1)}
        // leftColor='#7CD8EA'
        // rightColor='#FFBAD2'
        // />
      }
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
