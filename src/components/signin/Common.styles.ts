import { SxProps, Theme } from '@mui/material'

export const loginStyles: { [key: string]: SxProps<Theme> } = {
  paper: (theme: Theme) => ({
    padding: 6,
    margin: 'auto',
    width: '90%',
    maxWidth: 700,
    background: theme.palette.gradients.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0px 12px 36px rgba(0, 0, 0, 0.4)', // hover 시 더 깊은 그림자
    },
    [theme.breakpoints.down('md')]: {
      padding: 4,
      maxWidth: 600,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 3,
      width: '95%',
      maxWidth: '95%',
    },
  }),
  title: (theme: Theme) => ({
    color: theme.palette.TypographyColor.primary,
    marginBottom: 4,
    textAlign: 'center',
    fontSize: '2rem',
    textTransform: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main, // hover 시 색상 변경
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
    },
  }),
  form: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    background: 'transparent',
    gap: 3,
    width: '100%',
    maxWidth: 500,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      gap: 2,
    },
  }),
  inputLabel: (theme: Theme) => ({
    color: theme.palette.TypographyColor.secondary,
    fontSize: '1rem',
    textTransform: 'none',
    transition: 'color 0.3s ease',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      color: theme.palette.primary.main, // hover 시 색상 변경
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  }),
  primaryButton: (theme: Theme) => ({
    padding: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    color: theme.palette.TypographyColor.primary,
    background: theme.palette.primary.main,
    transition: 'background 0.3s ease, color 0.3s ease',
    '&:hover': {
      background: theme.palette.primary.dark, // hover 시 배경색 변경
      color: theme.palette.TypographyColor.secondary, // hover 시 텍스트 색상 변경
    },
    [theme.breakpoints.down('md')]: {
      padding: 1.2,
      fontSize: '0.95rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 1,
      fontSize: '0.9rem',
    },
  }),
  secondaryButton: (theme: Theme) => ({
    padding: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    color: theme.palette.TypographyColor.primary,
    background: theme.palette.secondary.main,
    transition: 'background 0.3s ease, color 0.3s ease',
    '&:hover': {
      background: theme.palette.secondary.dark, // hover 시 배경색 변경
      color: theme.palette.TypographyColor.secondary, // hover 시 텍스트 색상 변경
    },
    [theme.breakpoints.down('md')]: {
      padding: 1.2,
      fontSize: '0.95rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 1,
      fontSize: '0.9rem',
    },
  }),
  kakaoButton: (theme: Theme) => ({
    padding: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    color: theme.palette.TypographyColor.primary,
    background: '#FEE500',
    transition: 'background 0.3s ease, color 0.3s ease',
    '&:hover': {
      background: '#FEE500', // hover 시 배경색 변경
      color: theme.palette.TypographyColor.secondary,
      transition: 'opacity 0.3s ease',
      opacity: 0.8,
    },
    [theme.breakpoints.down('md')]: {
      padding: 1.2,
      fontSize: '0.95rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 1,
      fontSize: '0.9rem',
    },
  }),
  textField: (theme: Theme) => ({
    marginBottom: 2,
    '& .MuiInputLabel-root': {
      color: theme.palette.TypographyColor.primary,
    },
    '& .MuiInputBase-root': {
      color: theme.palette.TypographyColor.primary,
      borderColor: theme.palette.TypographyColor.secondary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& input:-webkit-autofill': {
      backgroundColor: 'transparent !important', // 투명 배경 설정
      color: theme.palette.TypographyColor.primary,
      boxShadow: '0 0 0px 1000px transparent inset !important', // 투명 유지
      transition: 'background-color 5000s ease-in-out 0s', // 호버, 포커스에서도 동일한 스타일 유지
    },
  }),
  checkboxLabel: (theme: Theme) => ({
    marginBottom: 2,
    color: theme.palette.TypographyColor.primary,
    '& .MuiCheckbox-root': {
      color: theme.palette.primary.main,
    },
    '& .Mui-checked': {
      color: theme.palette.primary.main,
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '1rem',
      textTransform: 'none',
      transition: 'color 0.3s ease',
      '&:hover': {
        opacity: 0.8,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '0.95rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 24,
      [theme.breakpoints.down('md')]: {
        fontSize: 22,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
  }),
  checkbox: (theme: Theme) => ({
    '& .MuiSvgIcon-root': {
      color: theme.palette.concept.complementary,
      transition: 'color 0.3s ease',
    },
    '&.Mui-checked .MuiSvgIcon-root': {
      color: theme.palette.concept.complementary,
      transition: 'color 0.3s ease',
    },
    '&:hover .MuiSvgIcon-root': {
      opacity: 0.8,
    },
  }),
}
