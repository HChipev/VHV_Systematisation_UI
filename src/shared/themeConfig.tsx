// TYPES & CONSTANTS
import { ThemeOptions } from '@mui/material/styles'
import GlobalStyles from '@mui/styled-engine/GlobalStyles'
import { COLORS } from 'src/shared/colors'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.primaryBlue50,
      dark: COLORS.primaryBlue60,
    },
    text: {
      primary: COLORS.neutralGrey100,
      secondary: COLORS.neutralGray70,
    },
    background: {
      default: COLORS.neutralGray10,
      paper: COLORS.neutralGrayWhite,
    },
    error: {
      main: COLORS.statusError50,
    },
    success: {
      main: COLORS.statusSuccess60,
    },
  },

  spacing: 8,

  components: {
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: COLORS.primaryBlue50,
            color: COLORS.neutralGrayWhite,
            '&:hover': {
              backgroundColor: COLORS.primaryBlue50,
            },
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: '40px',
          borderBottom: 'none',
          width: '100%',
        },

        flexContainer: {
          gap: '48px',
          height: '40px',
          borderBottom: `2px solid ${COLORS.neutralGray20}`,
        },
      },
    },

    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          minWidth: 0,
          textTransform: 'none',
          fontWeight: 'normal',
          fontFamily: 'Neue Haas Unica',
          padding: 0,
          minHeight: '40px',
          lineHeight: '20px',
        },
      },
    },

    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small',
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: COLORS.neutralGray50,
          },
        },
      ],
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'fit-content',
        },
      },
    },

    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            color: COLORS.primaryBlue70,
          },
          '&:active': {
            color: COLORS.primaryBlue70,
          },
          '&:visited': {
            color: COLORS.purple60,
          },
          '&:enabled': {
            textDecoration: 'underline',
          },
        },
      },
    },

    MuiChip: {
      defaultProps: {
        size: 'small',
        variant: 'filled',
      },

      variants: [
        {
          props: { size: 'small' },
          style: {
            height: '22px',
            fontSize: '12px',
            lineHeight: '16px',
          },
        },
        {
          props: { color: 'primary' },
          style: {
            background: COLORS.primaryBlue20,
          },
        },
        {
          props: { color: 'success' },
          style: {
            background: COLORS.teal20,
          },
        },
        {
          props: { color: 'warning' },
          style: {
            background: COLORS.yellow20,
          },
        },
        {
          props: { color: 'error' },
          style: {
            background: COLORS.coral20,
          },
        },
      ],

      styleOverrides: {
        root: {
          color: COLORS.primaryBlue90,
          textTransform: 'uppercase',
          borderRadius: '2px',
          fontFamily: 'Neue Haas Unica',
          fontWeight: 'normal',
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '0px',

          '& :focus': {
            backgroundColor: 'transparent !important',
          },
        },
      },

      variants: [
        {
          props: { size: 'small' },
          style: {
            height: '32px',
            padding: '8px 0px 8px 8px',
            backgroundColor: COLORS.neutralGrayWhite,
            '& .MuiSelect-select': {
              padding: '0px',
              marginRight: '8px',
            },
          },
        },
      ],
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: COLORS.neutralGrayWhite,
            borderRadius: '0px',
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-rounded': {
            minWidth: '490px',
            borderRadius: '8px',
          },
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
}

export const globalStyles = (
  <GlobalStyles
    styles={() => ({
      body: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.neutralGray10,
      },
    })}
  />
)
