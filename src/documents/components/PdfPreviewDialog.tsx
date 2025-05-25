import * as React from 'react'

// COMPONENTS
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { Document, Page } from 'react-pdf'

// ICONS
import CloseIcon from '@mui/icons-material/Close'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface Props {
  isOpen: boolean
  onClose: () => void
  file: string | null
}

export const PdfPreviewDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  file,
}) => {
  const [pageNumber, setPageNumber] = React.useState(1)
  const [numPages, setNumPages] = React.useState(1)

  const handleCloseDialog = () => {
    onClose()
    setPageNumber(1)
    setNumPages(1)
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} fullScreen>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle>PDF Preview</DialogTitle>

        <IconButton onClick={handleCloseDialog} color="error">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        {file && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
            width="100%"
          >
            <Document
              file={{ data: atob(file) }}
              onLoadSuccess={({ numPages: nPages }) => setNumPages(nPages)}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <IconButton
            onClick={() => setPageNumber(1)}
            disabled={pageNumber <= 1}
            size="small"
          >
            <FirstPageIcon />
          </IconButton>

          <IconButton
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            size="small"
          >
            <NavigateBeforeIcon />
          </IconButton>

          <Typography variant="body2">{`${pageNumber} of ${numPages}`}</Typography>

          <IconButton
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
            disabled={pageNumber >= numPages}
            size="small"
          >
            <NavigateNextIcon />
          </IconButton>

          <IconButton
            onClick={() => setPageNumber(numPages)}
            disabled={pageNumber >= numPages}
            size="small"
          >
            <LastPageIcon />
          </IconButton>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
