import * as React from 'react'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'

// SELECTORS
import { getUserRoles } from 'src/shared/userSelectors'

// UTILS
import {
  useAddSavedDocument,
  useUpdateSavedDocument,
} from 'src/shared/mutations'
import { handleApiError } from 'src/shared/utils'

// COMPONENTS
import { Box, Tabs, Tab, useTheme, Typography } from '@mui/material'
import { PdfPreviewDialog } from 'src/documents/components/PdfPreviewDialog'
import { ScannedDocumentsTable } from 'src/documents/scanned/components/ScannedDocumentsTable'
import { SavedDocumentsTable } from 'src/documents/saved/components/SavedDocumentsTable'
import { SaveDocumentDialog } from 'src/documents/components/SaveDocumentDialog'
import { UpdateDocumentDialog } from 'src/documents/components/UpdateDocumentDialog'

// TYPES & CONSTANTS
import { DocumentTabs, SavedDocument } from 'src/documents/types'
import {
  SAVED_DOCUMENTS_QUERY_KEY,
  SCANNED_DOCUMENTS_QUERY_KEY,
} from 'src/shared/queryKeys'
import { actions as scanActions } from 'src/documents/scanned/scanDocumentFiltersActions'
import { actions as savedActions } from 'src/documents/saved/savedDocumentFiltersActions'
import { DocumentTabsToTextMap } from 'src/documents/strategyMaps'
import { Roles } from 'src/shared/types'

export const DocumentsPage: React.FC = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const queryClient = useQueryClient()

  const { mutate: addSavedDocument } = useAddSavedDocument()
  const { mutate: updateSavedDocument } = useUpdateSavedDocument()

  const userRoles = useSelector(getUserRoles)

  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = React.useState(false)
  const [isSaveDocumentOpen, setIsSaveDocumentOpen] = React.useState(false)
  const [isUpdateDocumentOpen, setIsUpdateDocumentOpen] = React.useState(false)
  const [savedDocument, setSavedDocument] =
    React.useState<SavedDocument | null>(null)
  const [previewFile, setPreviewFile] = React.useState<string | null>(null)
  const [previewFileName, setPreviewFileName] = React.useState<string | null>(
    null
  )
  const [scannedDocumentId, setScannedDocumentId] = React.useState<
    number | null
  >(null)
  const [tab, setTab] = React.useState(DocumentTabs.ScannedDocuments)

  const handleClosePdfPreviewDialog = () => {
    setIsPdfPreviewOpen(false)
  }

  const handleCloseSaveDocumentDialog = () => {
    setIsSaveDocumentOpen(false)
  }

  const handleCloseUpdateDocumentDialog = () => {
    setIsUpdateDocumentOpen(false)
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
        {tab === DocumentTabs.ScannedDocuments &&
          userRoles.filter((x) => x !== Roles.Viewer).length > 0 && (
            <ScannedDocumentsTable
              onPreviewFile={(file: string, fileName: string) => {
                setPreviewFile(file)
                setIsPdfPreviewOpen(true)
                setPreviewFileName(fileName)
              }}
              onSaveFile={(id: number, file: string, fileName: string) => {
                setIsSaveDocumentOpen(true)
                setScannedDocumentId(id)
                setPreviewFile(file)
                setPreviewFileName(fileName)
              }}
            />
          )}

        {tab === DocumentTabs.ScannedDocuments &&
          userRoles.filter((x) => x !== Roles.Viewer).length <= 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <Typography variant="body1" color="textSecondary">
                You do not have permission to view scanned documents.
              </Typography>
            </Box>
          )}

        {tab === DocumentTabs.SavedDocuments && (
          <SavedDocumentsTable
            onPreviewFile={(file: string, fileName: string) => {
              setPreviewFile(file)
              setIsPdfPreviewOpen(true)
              setPreviewFileName(fileName)
            }}
            onUpdate={(document: SavedDocument) => {
              setSavedDocument(document)
              setIsUpdateDocumentOpen(true)
            }}
          />
        )}
      </Box>

      {isPdfPreviewOpen && previewFile && (
        <PdfPreviewDialog
          isOpen={isPdfPreviewOpen}
          onClose={handleClosePdfPreviewDialog}
          file={previewFile}
          fileName={`${previewFileName}.pdf`}
        />
      )}

      {isSaveDocumentOpen && (
        <SaveDocumentDialog
          isOpen={isSaveDocumentOpen}
          file={previewFile}
          fileName={previewFileName}
          onPreview={(file, fileName) => {
            setPreviewFile(file)
            setIsPdfPreviewOpen(true)
            setPreviewFileName(fileName)
          }}
          onClose={handleCloseSaveDocumentDialog}
          onSave={(data) =>
            addSavedDocument(data, {
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

      {isUpdateDocumentOpen && savedDocument && (
        <UpdateDocumentDialog
          isOpen={isUpdateDocumentOpen}
          onClose={handleCloseUpdateDocumentDialog}
          onUpdate={(data) =>
            updateSavedDocument(
              { id: savedDocument.id, data },
              {
                onSuccess: () => {
                  enqueueSnackbar('Document updated successfully!', {
                    variant: 'success',
                  })
                  handleCloseUpdateDocumentDialog()
                  queryClient.invalidateQueries({
                    queryKey: [SAVED_DOCUMENTS_QUERY_KEY],
                  })
                },
                onError: handleApiError,
              }
            )
          }
          savedDocument={savedDocument}
        />
      )}
    </Box>
  )
}
