import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import actions from '../actions';
import UsersList from './usersList';
import AddUser from './addUser';
import AlertDialog from './alertDialog';
import {HomeWrapper} from './home.style.js';

import './index.css';

const {getUsers, deleteUser, changeError} = actions;

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getUsers();

    if (props.error !== null) {
      this.state = {
        openDialog: true
      }
    } else {
      this.state = {
        openDialog: false
      }
    }
  }

  handleAccept = () => {
    this.props.changeError(null);
  }

  render() {
    const {error, users, fields, deleteUser} = this.props;

    return (
      <HomeWrapper>
        <h1>Crypto users</h1>
        <AddUser openDialog={this.state.openDialog}/>
        <Grid className="contentWrapper" container justify="center" spacing={16}>
          <Grid id="homeContent" item xs={12}>
            <UsersList
              users={users}
              fields={fields}
              deleteUser={deleteUser}
            />
          </Grid>
        </Grid>
        <AlertDialog
          open={error !== null ? true : false}
          onlyAccept={true}
          handleAccept={this.handleAccept}
          dialogTitle={error}
        />
      </HomeWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {users: state.users, fields: state.fields, error: state.error};
}

export default connect(mapStateToProps, {getUsers, deleteUser, changeError})(Home);
