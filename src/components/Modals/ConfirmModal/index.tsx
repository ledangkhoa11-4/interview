import { memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import classes from './styles.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmModal = memo((props: ConfirmModalProps) => {
  const { isOpen, title, description, onClose, onSubmit } = props;

  return (
    <Dialog transitionDuration={0.3} open={!!isOpen} onClose={onClose} className={classes.container} closeAfterTransition={false}>
      <DialogTitle className={classes.title}>{title ?? 'N/A'}</DialogTitle>
      <DialogContent>
        <p className={classes.description}>{description ?? 'N/A'}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="outlined">OK</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ConfirmModal;
