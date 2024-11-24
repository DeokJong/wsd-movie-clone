import { SxProps, Theme } from '@mui/material'

export const detailStyles: { [key: string]: SxProps<Theme> } = {
  container: (theme: Theme) => ({
    padding: 2,
    maxWidth: '70%',
    margin: '0 auto',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  }),
  header: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 2,
    marginBottom: 4,
    padding: theme => theme.spacing(2), // 패딩 추가
    borderRadius: 4, // 둥근 모서리
  },
  posterImage: {
    width: { xs: '100%', sm: 200 },
    height: 'auto',
    borderRadius: 2,
    boxShadow: 3,
    objectFit: 'cover',
  },
  headerText: {
    flex: 1,
    color: theme => theme.palette.TypographyColor.primary, // 텍스트 색상 설정
    fontWeight: 500, // 헤더 텍스트에 가중치 추가
  },
  airDates: {
    variant: 'body2',
    color: 'textSecondary',
  },
  metadataSection: {
    marginBottom: 4,
    color: theme => theme.palette.TypographyColor.primary, // 색상 설정
  },
  metadataGrid: {
    '& container': {
      spacing: 2,
    },
    '& item': {
      xs: 12,
      sm: 6,
    },
  },
  genreSection: {
    marginBottom: 4,
    color: theme => theme.palette.TypographyColor.primary, // 보조 텍스트 색상
  },
  genreChip: {
    margin: 0.5,
    color: theme => theme.palette.TypographyColor.primary, // 칩 텍스트 색상
  },
  productionCompaniesSection: {
    marginBottom: 4,
    color: theme => theme.palette.TypographyColor.primary
  },
  productionCompaniesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'flex-start',
  },
  productionCompanyBox: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`, // 테두리 색상
    borderRadius: 2,
    padding: 2,
    boxShadow: 2,
    width: 80,
    [theme.breakpoints.down('sm')]: {
      width: 60,
    },
  }),
  divider: {
    margin: '1rem 0',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Divider 색상
  },
  bookmarkAddButton: {
    color: 'red', // 북마크 버튼 색상
    fontsize: 20, // 북마크 버튼 크기
  },
  bookmarkRemoveButton: {
    color: 'blue', // 북마크 버튼 색상
    fontsize: 20, // 북마크 버튼 크기
  },
}
