import * as React from 'react'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

// UTILS
import { useAddSavedDocument } from 'src/shared/mutations'
import { handleApiError } from 'src/shared/utils'

// COMPONENTS
import { Box, Tabs, Tab, useTheme } from '@mui/material'
import { PdfPreviewDialog } from 'src/documents/components/PdfPreviewDialog'
import { ScannedDocumentsTable } from 'src/documents/scanned/components/ScannedDocumentsTable'
import { SavedDocumentsTable } from 'src/documents/saved/components/SavedDocumentsTable'
import { SaveDocumentDialog } from 'src/documents/components/SaveDocumentDialog'

// TYPES & CONSTANTS
import { DocumentTabs } from 'src/documents/types'
import { SCANNED_DOCUMENTS_QUERY_KEY } from 'src/shared/queryKeys'
import { actions as scanActions } from 'src/documents/scanned/scanDocumentFiltersActions'
import { actions as savedActions } from 'src/documents/saved/savedDocumentFiltersActions'
import { DocumentTabsToTextMap } from 'src/documents/strategyMaps'

export const DocumentsPage: React.FC = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const queryClient = useQueryClient()

  const { mutate } = useAddSavedDocument()

  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = React.useState(false)
  const [isSaveDocumentOpen, setIsSaveDocumentOpen] = React.useState(false)
  const [previewFile, setPreviewFile] = React.useState<string | null>(null)
  const [scannedDocumentId, setScannedDocumentId] = React.useState<
    number | null
  >(null)
  const [tab, setTab] = React.useState(DocumentTabs.ScannedDocuments)

  const handleClosePdfPreviewDialog = () => {
    setIsPdfPreviewOpen(false)
    setPreviewFile(null)
  }

  const handleCloseSaveDocumentDialog = () => {
    setIsSaveDocumentOpen(false)
    setScannedDocumentId(null)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      width="100%"
      padding={theme.spacing(3)}
      gap={theme.spacing(2)}
    >
      <Box display="flex" maxWidth="100%">
        <Tabs
          value={tab}
          onChange={(_, value: DocumentTabs) => {
            setTab(value)
            dispatch(scanActions.setScanDocumentFilters({}))
            dispatch(savedActions.setSavedDocumentFilters({}))
          }}
          variant="scrollable"
          scrollButtons="auto"
          slotProps={{
            list: { style: { width: 'fit-content' } },
          }}
        >
          {Object.values(DocumentTabs).map((tabValue) => (
            <Tab
              key={tabValue}
              value={tabValue}
              label={DocumentTabsToTextMap[tabValue]}
            />
          ))}
        </Tabs>
      </Box>

      <Box height="95%" display="flex" width="100%">
        {tab === DocumentTabs.ScannedDocuments && (
          <ScannedDocumentsTable
            onPreviewFile={(file: string) => {
              setPreviewFile(file)
              setIsPdfPreviewOpen(true)
            }}
            onSaveFile={(id: number) => {
              setIsSaveDocumentOpen(true)
              setScannedDocumentId(id)
            }}
          />
        )}

        {tab === DocumentTabs.SavedDocuments && (
          <SavedDocumentsTable
            onPreviewFile={(file: string) => {
              setPreviewFile(file)
              setIsPdfPreviewOpen(true)
            }}
          />
        )}
      </Box>

      {isPdfPreviewOpen && (
        <PdfPreviewDialog
          isOpen={isPdfPreviewOpen}
          onClose={handleClosePdfPreviewDialog}
          file={previewFile}
        />
      )}

      {isSaveDocumentOpen && (
        <SaveDocumentDialog
          isOpen={isSaveDocumentOpen}
          onClose={handleCloseSaveDocumentDialog}
          onSave={(data) =>
            mutate(data, {
              onSuccess: () => {
                enqueueSnackbar('Document saved successfully!', {
                  variant: 'success',
                })
                handleCloseSaveDocumentDialog()
                queryClient.invalidateQueries({
                  queryKey: [SCANNED_DOCUMENTS_QUERY_KEY],
                })
              },
              onError: handleApiError,
            })
          }
          scannedDocumentId={scannedDocumentId}
        />
      )}
    </Box>
  )
}
