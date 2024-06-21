import { gridClasses } from '@mui/x-data-grid';


export const PageTable = {
    [`& .${gridClasses.columnHeader}`]: {
      paddingLeft: '.8rem',
      paddingRight: '.8rem',
    },
    [`& .${gridClasses.columnHeaderTitle}`]: {
      fontWeight: 'bold',
    },
    [`& .${gridClasses.cell}`]: {
      paddingLeft: '.8rem',
      paddingRight: '.8rem'
    },
    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
      outline: "none"
    },
    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
      outline: "none"
    },
    border: 'none',
    height: (520+56+53),
    maxHeight: '80vh',
}

export const DashboardTable = {
  [`& .${gridClasses.columnHeader}`]: {
    paddingLeft: '.8rem',
    paddingRight: '.8rem'
  },
  [`& .${gridClasses.columnHeaderTitle}`]: {
    fontWeight: 'bold',
  },
  [`& .${gridClasses.cell}`]: {
    paddingLeft: '.8rem',
    paddingRight: '.8rem'
  },
  [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
    outline: "none"
  },
  [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
    outline: "none"
  },
  border: 'none',
  height: (200+56+53),
  maxHeight: '80vh',
}

export const GroupTableStyle = {
  /*[`& .${gridClasses.columnHeader}`]: {
    paddingLeft: '.8rem',
    paddingRight: '.8rem',
  },*/
  [`& .${gridClasses.columnHeaderTitle}`]: {
    fontWeight: 'bold',
  },
  [`& .${gridClasses.cell}`]: {
    paddingLeft: '.8rem',
    paddingRight: '.8rem'
  },
  [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
    outline: "none"
  },
  [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
    outline: "none"
  },
  border: 'none',
  height: 'auto',
  maxHeight: '80vh',
}