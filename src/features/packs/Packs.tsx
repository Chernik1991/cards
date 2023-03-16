import Box from '@mui/material/Box'
import { Navigate } from 'react-router-dom'

import { ResponsePacksType } from './packs-api'
import e from './Packs.module.css'
import { addPackTC, getPacksTC } from './packsReducer'
import { EnhancedTable } from './PacksTable'
import { SearchPackPanel } from './SearchInput'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const user_id = useAppSelector(state => state.profile._id)
  const newPackHandler = () => {
    dispatch(addPackTC())
  }
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const paginationLabel = 'Packs per Page'

  const onChangePageHandler = (page?: number, size?: number) => {
    dispatch(getPacksTC({ params: { page: page, pageCount: size, user_id: user_id } }))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }
  //Возможно убрать т.к. по умолчанию уже залогинен

  return (
    <div className={e.packsContainer}>
      <Box
        sx={{
          gridArea: 'left',
          width: '80%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 4,
        }}
      >
        <h2>Packs list</h2>
        <SuperButton className={e.newPackButton} onClick={newPackHandler}>
          Add new pack
        </SuperButton>
      </Box>
      <SearchPackPanel />
      <EnhancedTable cardsPacks={userPacks.cardPacks} />
      {/*<div>*/}
      {/*  {pageCount !== 0 ? (*/}
      {/*    <PaginationComponent*/}
      {/*      totalCount={cardPacksTotalCount}*/}
      {/*      currentPage={page ?? 1}*/}
      {/*      pageSize={pageCount ?? 4}*/}
      {/*      onPageChanged={onChangePageHandler}*/}
      {/*      labelRowsPerPage={paginationLabel}*/}
      {/*    />*/}
      {/*  ) : (*/}
      {/*    ''*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  )
}
