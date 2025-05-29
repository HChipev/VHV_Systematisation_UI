// TYPES & CONSTANTS
import { AdminTabs } from 'src/admin/types'

export const AdminTabsToTextMap: Record<AdminTabs, string> = {
  [AdminTabs.Users]: 'Users',
  [AdminTabs.DocumentTypes]: 'Document Types',
  [AdminTabs.ExpenseTypes]: 'Expense Types',
  [AdminTabs.Vehicles]: 'Vehicles',
  [AdminTabs.Offices]: 'Offices',
  [AdminTabs.DescriptionTypes]: 'Description Types',
  [AdminTabs.PaymentTypes]: 'Payment Types',
  [AdminTabs.ScanPath]: 'Scan Path',
  [AdminTabs.Personnel]: 'Personnel',
}
