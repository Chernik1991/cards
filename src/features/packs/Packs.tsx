import { useEffect } from 'react'

import Box from '@mui/material/Box'
import { Navigate, useParams } from 'react-router-dom'

import { ResponsePacksType } from './packs-api'
import e from './Packs.module.css'
import { addPackTC, getPacksTC, setCountPageAC, setCurrentPageAC } from './packsReducer'
import { SearchPackPanel } from './PacksSearchBar'
import { EnhancedTable } from './PacksTable'
import { PaginationComponent } from './PaginationComponent'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  // useEffect(() => {

  //   } else {
  //     dispatch(getPacksTC({ params: {} }))
  //   }
  // }, [])
  const newPackHandler = () => {
    dispatch(addPackTC())
  }
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const paginationLabel = 'Packs per Page'

  const onChangePageHandler = (page: any, size: any) => {
    dispatch(setCurrentPageAC(page))
    dispatch(setCountPageAC(size))
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
      <PaginationComponent
        totalCount={cardPacksTotalCount}
        currentPage={page ?? 1}
        pageSize={pageCount ?? 4}
        onPageChanged={onChangePageHandler}
        labelRowsPerPage={paginationLabel}
      />
    </div>
  )
}
