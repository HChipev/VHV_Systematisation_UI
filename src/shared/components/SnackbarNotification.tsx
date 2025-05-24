import * as React from "react";

// COMPONENTS
import Alert, { AlertColor } from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// TYPES
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";

// ICONS
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

interface Props extends CustomContentProps {
  severity?: AlertColor;
}

export const SnackbarNotification = React.forwardRef<HTMLDivElement, Props>(
  ({ id, message, severity = "success" }, ref) => {
    SnackbarNotification.displayName = "SnackbarNotification";
    const theme = useTheme();

    const { closeSnackbar } = useSnackbar();

    const handleClose = React.useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Alert
          iconMapping={{
            success: <CheckCircleIcon />,
          }}
          variant="filled"
          severity={severity}
        >
          <Box display="flex" alignItems="center" gap={theme.spacing(5)}>
            <Typography variant="body1">{message}</Typography>

            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </SnackbarContent>
    );
  }
);
