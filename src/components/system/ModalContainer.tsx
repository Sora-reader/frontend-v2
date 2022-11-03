import { Modal, ModalDialog } from '@mui/joy';

export const ModalContainer = ({ open, setOpen, children, sx }) => {
  return (
    <Modal keepMounted open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        sx={[
          {
            border: 'none',
            padding: 0,
          },
          sx,
        ]}
      >
        {children}
      </ModalDialog>
    </Modal>
  );
};

ModalContainer.defaultProps = {
  sx: {},
};
