import React from 'react';
import {Card, CardHeader, CardMedia, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import AddIcon from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

import FullPageLoading from '../FullPageLoading/FullPageLoading';
import StoreCard from './StoreCard';
import CompanyEditForm from '../Forms/CompanyEditForm';
import StoreEditForm from '../Forms/StoreEditForm';

import settings from '../../config/settings';


// import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

export default class CardControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      expanded: false,
      editOpen: false,
      alertOpen: false,
      createStoreOpen: false
    }
  }

  componentDidMount(){
    this._getSellPoints();
  }

  _handleCreateStoreOpen = () => {
    this.setState({createStoreOpen: true});
  };

  _handleCreateStoreClose = () => {
    this.setState({createStoreOpen: false});
  };

  _handleEditOpen = () => {
    this.setState({editOpen: true});
  };

  _handleEditClose = () => {
    this.setState({editOpen: false});
  };

  _handleAlertOpen = () => {
    this.setState({alertOpen: true});
  };

  _handleAlertClose = () => {
    this.setState({alertOpen: false});
  };

  _handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  _handleToggle = (event, toggle) => {
    this.props.expand(this.props.diff, toggle);
    this.setState({expanded: toggle});
  };

  render() {
    const alertActions = [
      <FlatButton
        label="Sí"
        primary={true}
        onTouchTap={this._delete}
      />,
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this._handleAlertClose}
      />
    ];
    return (
      <Card expanded={this.state.expanded} onExpandChange={this._handleExpandChange}>
      <CardHeader
      title={this.props.company.name}
      subtitle={this.props.company.email}
      avatar={this.props.company.logo}
      actAsExpander={true}
      >
      </CardHeader>
      <CardText style={{justifyContent: 'right'}}>
      <Toggle
      toggled={this.state.expanded}
      onToggle={this._handleToggle}
      labelPosition="right"
      label="Mostrar tiendas"
      />
      </CardText>

      <CardMedia
      expandable={true}
      >
      <div>
      <FlatButton label="Crear nueva tienda"
      icon={<AddIcon />}
      onClick={this._handleCreateStoreOpen}
      />
      </div>
      <div style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap'}}>
      {this._getContent()}
      </div>
      </CardMedia>
      <CardActions>
      <FlatButton label="Editar"
        icon={<EditIcon />}
        onTouchTap={this._handleEditOpen}
        />
      <FlatButton label="Eliminar"
        icon={<DeleteIcon />}
        onTouchTap={this._handleAlertOpen}
        />
      </CardActions>
      <Dialog
          title="Creación de local"
          modal={false}
          open={this.state.createStoreOpen}
          onRequestClose={this._handleCreateStoreClose}
          autoScrollBodyContent={true}
        >
        <StoreEditForm company={this.props.company} handleClose={this._handleCreateStoreClose}/>
      </Dialog>
      <Dialog
          title="Edición de empresa"
          modal={false}
          open={this.state.editOpen}
          onRequestClose={this._handleEditClose}
          autoScrollBodyContent={true}
        >
          <CompanyEditForm company={this.props.company} handleClose={this._handleEditClose}/>
        </Dialog>
        <Dialog
          modal={false}
          actions={alertActions}
          open={this.state.alertOpen}
          onRequestClose={this._handleAlertClose}
        >
          Estás seguro que quieres eliminar esta compañía?
        </Dialog>
      </Card>
    );
  }

  _delete = () => {
    var url = settings.COMPANY.replace(':id', this.props.company.id)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      this.setState({alertOpen: false});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  _getContent = () => {
    if(!this.state.ready){
      return (
        <FullPageLoading />
      );
    }
    else {
      var sellPoints = [];
      this.state.sellPoints.map((sellPoint, i) => {
        sellPoints.push(
          <div key={i}>
          <StoreCard sellPoint={sellPoint} company={this.props.company}/>
          </div>
        );
      })
      return sellPoints;
    }
  }

  _getSellPoints = () => {
    var url = settings.COMPANY_SELLPOINTS.replace(':company_id', this.props.company.id);
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((result) => {
      this.setState({
        sellPoints: result,
        ready: true
       });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
