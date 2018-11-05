import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleAccept} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" className={this.props.dialogTitle
            ? ''
            : 'hidden'}>
          {this.props.dialogTitle || ''}
        </DialogTitle>
        <DialogActions className={this.props.onlyAccept
            ? 'hidden'
            : ''}>
          <Button onClick={this.props.handleClose}>
            Disagree
          </Button>
          <Button onClick={this.props.handleAccept} color="primary">
            Agree
          </Button>
        </DialogActions>
        <DialogActions className={this.props.onlyAccept
            ? ''
            : 'hidden'}>
          <Button onClick={this.props.handleAccept} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
