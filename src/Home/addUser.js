import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const { addUser } = actions;

class AddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
      validFields: false
    }
  }

  handleChange = (name, event) => {
    this.setState({[name]: event.target.value, disabled: false});
  };

  handleValidation = field => {
    const {nickname} = this.state;

    if (field === 'email') {
      const expression = /(\w(=?@)\w+\.{1}[a-zA-Z]{2,})/i;
      const isEmail = expression.test(this.state[field]);
      if (!isEmail) {
        this.setState({
          [`error${field}`]: 'Wrong e-mail format.'
        });
      } else {
        this.setState({
          [`error${field}`]: null
        });
      }
      return isEmail;
    }

    if (field === 'ip') {
      const expression = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
      const isIP = expression.test(this.state[field]);
      if (!isIP) {
        this.setState({
          [`error${field}`]: 'Wrong IP adress format.'
        });
      } else {
        this.setState({
          [`error${field}`]: null
        });
      }
      return isIP;
    }

    if (field === 'nickname' && nickname && nickname.length > 0) {
      this.setState({
        [`error${field}`]: null
      });
      return true;
    } else {
      this.setState({
        [`error${field}`]: 'Nickname require.'
      });
      return false;
    }
  }

  handleAddUser = () => {
    const {fields, users, addUser} = this.props;
    const {nickname, email, ip} = this.state;

    let validFields = 0;
    fields.forEach(field => {
      if (this.handleValidation(field.short)) {
        validFields++;
        this.setState({disabled: false});
      } else {
        this.setState({disabled: true});
      }
    });

    if (validFields === fields.length) {
      addUser(users, nickname, email, ip);
    }
  }

  renderFields = fields => {
    return fields.map(field => {
      const shortName = field.short;
      return (
        <div className="addUserItem" key={shortName}>
          <TextField
            label={field.full}
            required={true}
            error={this.state[`error${shortName}`] ? true : false}
            helperText={this.state[`error${shortName}`] || ''}
            onChange={event => this.handleChange(shortName, event)}
          />
        </div>
      );
    });
  }

  render() {
    const { fields } = this.props;

    return (
      <form id="addUser">
        {fields && fields.length > 0
            ? this.renderFields(fields)
            : null
        }
        <Button
          variant="contained"
          disabled={this.state.disabled}
          onClick={this.handleAddUser}
        >
          Add user
        </Button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    fields: state.fields
  };
}

export default connect(mapStateToProps, {addUser})(AddUser);
