import { NotificationModalProps } from "../../Type/ModalPropsType";
import { Dialog, DialogContent, Button, Typography, Box } from '@mui/material';

function Modal(props: NotificationModalProps) {
  let { message, close, isOpen, ...rest} = props;

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1" gutterBottom>
            {message.value || ''}
          </Typography>
          <Button onClick={close} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default Modal;