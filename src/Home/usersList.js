import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AlertDialog from './alertDialog';

export default class UsersList extends React.Component {

  constructor() {
    super();

    this.state = {
      selected: [],
      order: 'asc',
      orderBy: 'nickname',
      openDialog: false,
      selectUser: null
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({order, orderBy});
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
    }

    this.setState({selected: newSelected});
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0)
        return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  getSorting = (order, orderBy) => {
    const desc = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    return order === 'desc'
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  handleRemoveUser = email => {
    this.setState({openDialog: true, selectUser: email});
  }

  handleDialogClose = () => {
    this.setState({openDialog: false});
  };

  handleDialogAccept = () => {
    this.setState({openDialog: false});
    this.props.deleteUser(this.props.users, this.state.selectUser);
  };

  render() {
    const {users, fields} = this.props;
    const {order, orderBy, openDialog} = this.state;
    const header = <h3>Users list:</h3>;

    if (!users) {
      return (
        <div>
          {header}
          <div>Loading...</div>
        </div>
      );
    }

    if (users && users.length === 0) {
      return (
        <div>
          {header}
          <div>No users are here... yet.</div>
        </div>
      );
    }

    if (users && fields && users.length > 0 && fields.length > 0) {
      return (
        <div>
          {header}
          <Table>
            <TableHead>
              <TableRow>
                {fields.map(field => {
                    return (<TableCell key={field.short}>
                      <Tooltip title="Sort">
                        <TableSortLabel onClick={this.createSortHandler(field.short)}>
                          {field.full}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>);
                  }, this)}
                <TableCell key="delete">
                  <TableSortLabel></TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.stableSort(users, this.getSorting(order, orderBy))
                .map(user => {
                  return (
                    <TableRow hover
                      onClick={event => this.handleClick(event, user.nickname)}
                      tabIndex={-1}
                      key={user.nickname}
                    >
                      <TableCell>{user.nickname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.ip}</TableCell>
                      <TableCell>
                        <Button onClick={() => this.handleRemoveUser(user.email)}>
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <AlertDialog
            open={openDialog}
            handleClose={this.handleDialogClose}
            handleAccept={this.handleDialogAccept}
            dialogTitle="Do you confirm removal of this user?"
          />
      </div>
      );
    }

    return '';
  }
}
