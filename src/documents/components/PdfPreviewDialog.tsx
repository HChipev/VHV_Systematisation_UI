import * as React from 'react'

// COMPONENTS
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { Document, Page } from 'react-pdf'

// ICONS
import CloseIcon from '@mui/icons-material/Close'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { DownloadOutlined } from '@mui/icons-material'

interface Props {
  isOpen: boolean
  onClose: () => void
  file: string | null
  fileName: string
}

export const PdfPreviewDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  file,
  fileName,
}) => {
  const theme = useTheme()

  const [pageNumber, setPageNumber] = React.useState(1)
  const [numPages, setNumPages] = React.useState(1)

  const handleCloseDialog = () => {
    onClose()
    setPageNumber(1)
    setNumPages(1)
  }

  const handleDownload = () => {
    if (!file) {
      return
    }
    const byteCharacters = atob(file)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} fullScreen>
      <Box display="flex" justifyContent="space-between">
        <DialogTitle gap={theme.spacing(1)} display="flex" alignItems="center">
          PDF Preview
          <Button
            variant="contained"
            size="small"
            disabled={!file}
            onClick={handleDownload}
          >
            <Box
              component="span"
              display="flex"
              alignItems="center"
              gap={theme.spacing(0.5)}
            >
              <Typography variant="body2">Download</Typography>

              <DownloadOutlined />
            </Box>
          </Button>
        </DialogTitle>

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
