import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles';

import MainAndTwoSubDataBadge from '../../components/Badges/MainAndTwoSubDataBadge';

/*
Respuestas de hoy (hombres mujeres)
Respuestas de la semana (hombres mujeres)
Promedio de hoy (hombres mujeres)
Promedio de la semana (hombres mujeres)
Palabras más usadas por los clientes
Palabras más usadas por los hombres
Palabras más usadas por las mujeres
Pregunta con mejor promedio
Pregunta con mejor promedio hombres
Pregunta con mejor promedio mujeres
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
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <MainAndTwoSubDataBadge title="Total Respuestas Hoy" uri='http://www.localhost:3000/company/1/today_total_answers'/>
        <MainAndTwoSubDataBadge title="Total Respuestas Semanales" uri='http://www.localhost:3000/company/1/week_total_answers'/>
        <MainAndTwoSubDataBadge title="Promedio de hoy" uri='http://www.localhost:3000/company/1/today_average'/>
        <MainAndTwoSubDataBadge title="Promedio semanal" uri='http://www.localhost:3000/company/1/week_average'/>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        <Paper style={styles.paper} zDepth={2} >
        </Paper>
        </div>
      );
  }
}
