// TYPES & CONSTANTS
import { DocumentTabs } from 'src/documents/types'

export const DocumentTabsToTextMap: Record<DocumentTabs, string> = {
  [DocumentTabs.SavedDocuments]: 'Saved Documents',
  [DocumentTabs.ScannedDocuments]: 'Scanned Documents',
}
