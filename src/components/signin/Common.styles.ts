import { SxProps, Theme } from '@mui/material'

export const loginStyles: { [key: string]: SxProps<Theme> } = {
  paper: (theme: Theme) => ({
    padding: 6,
    margin: 'auto',
    width: '90%',
    maxWidth: 700, // 최대 너비를 더 넓게 설정
    background: theme.palette.gradients.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // 더 부드러운 둥근 모서리
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)', // 더 깊은 그림자
    textTransform: 'none',
    transition: 'all 0.3s ease', // 전체 애니메이션 추가
    [theme.breakpoints.down('md')]: {
      padding: 4, // 태블릿에서는 패딩을 줄임
      maxWidth: 600, // 태블릿에서는 조금 더 좁게
    },
    [theme.breakpoints.down('sm')]: {
      padding: 3, // 모바일에서는 패딩을 더 줄임
      width: '95%', // 모바일에서 더 넓게
      maxWidth: '95%', // 모바일에서 뷰포트를 거의 꽉 채움
    },
  }),
  title: (theme: Theme) => ({
    color: theme.palette.TypographyColor.primary,
    marginBottom: 4,
    textAlign: 'center',
    fontSize: '2rem', // 기본 폰트 크기
    textTransform: 'none',
    transition: 'color 0.3s ease', // 색상 변경에 transition 추가
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem', // 태블릿에서 폰트 크기를 줄임
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem', // 모바일에서 더 작게
    },
  }),
  form: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    width: '100%',
    maxWidth: 500, // 폼 최대 너비
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      gap: 2, // 모바일에서 간격을 줄임
    },
  }),
  inputLabel: (theme: Theme) => ({
    color: theme.palette.TypographyColor.secondary,
    fontSize: '1rem', // 기본 크기
    textTransform: 'none',
    transition: 'color 0.3s ease', // 라벨 색상에 transition 추가
    '&.Mui-focused': {
      color: theme.palette.primary.main, // 포커스 상태에서 라벨 색상 변경
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem', // 모바일에서 라벨 크기를 줄임
    },
  }),
  primaryButton: (theme: Theme) => ({
    padding: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    color: theme.palette.TypographyColor.primary,
    background: theme.palette.primary.main,
    transition: 'background 0.3s ease, color 0.3s ease', // 버튼 색상 변화에 transition 추가
    [theme.breakpoints.down('md')]: {
      padding: 1.2, // 태블릿에서 버튼 패딩 조정
      fontSize: '0.95rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 1, // 모바일에서 버튼 패딩을 줄임
      fontSize: '0.9rem', // 모바일에서 글자 크기를 줄임
    },
  }),
  secondaryButton: (theme: Theme) => ({
    padding: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    color: theme.palette.TypographyColor.primary,
    background: theme.palette.secondary.main,
    transition: 'background 0.3s ease, color 0.3s ease', // 버튼 색상 변화에 transition 추가
    [theme.breakpoints.down('md')]: {
      padding: 1.2, // 태블릿에서 버튼 패딩 조정
      fontSize: '0.95rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 1, // 모바일에서 버튼 패딩을 줄임
      fontSize: '0.9rem', // 모바일에서 글자 크기를 줄임
    },
  }),
  textField: (theme: Theme) => ({
    marginBottom: 2, // 필드 간의 여백
    '& .MuiInputLabel-root': {
      color: theme.palette.TypographyColor.primary, // 라벨 색상
    },
    '& .MuiInputBase-root': {
      color: theme.palette.TypographyColor.primary, // 입력 텍스트 색상
      borderColor: theme.palette.TypographyColor.secondary, // 기본 테두리 색상
    },
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main, // 호버 시 테두리 색상
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main, // 포커스 시 테두리 색상
      },
    },
    '& input:-webkit-autofill': {
      backgroundColor: 'transparent !important', // 자동 완성 항목 배경을 투명으로 설정
      color: theme.palette.TypographyColor.primary, // 자동 완성 텍스트 색상
    },
    '& input:-webkit-autofill::first-line': {
      color: theme.palette.TypographyColor.primary, // 자동 완성된 텍스트 색상
    },
    '& input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
      transition: 'background-color 5000s ease-in-out 0s', // 자동 완성 hover 시 색상 유지
    },
  }),
}
