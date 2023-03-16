import Box from '@mui/material/Box'

import { PaginationComponent } from './components/pagination/PaginationComponent'
import { SearchPackPanel } from './components/pagination/SearchInput'
import { EnhancedTable } from './components/table/PacksTable'
import { ResponsePacksType } from './packs-api'
import e from './Packs.module.css'
import { addPackTC, getPacksTC } from './packsReducer'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const userID = useAppSelector(state => state.profile._id)
  const paramsID = useAppSelector(state => state.packsParams.user_id)
  const newPackHandler = () => {
    const userParams = paramsID ? paramsID : ''

    dispatch(addPackTC({ cardsPack: {} }, userParams))
  }

  const paginationLabel = 'Packs per Page'

  const onChangePageHandler = (page?: number, size?: number) => {
    dispatch(getPacksTC({ page: page, pageCount: size, user_id: paramsID }))
  }

  return (
    <div className={e.packsContainer}>
      <Box
        sx={{
          gridArea: 'center',
          display: 'flex',
          width: '100%',
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
      <EnhancedTable cardsPacks={userPacks.cardPacks} userID={userID} userIDsettings={paramsID} />
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
