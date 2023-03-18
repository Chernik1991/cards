import Box from '@mui/material/Box'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { SearchPackPanel } from 'features/packs/components/pagination/SearchPackPanel'
import { EnhancedTable } from 'features/packs/components/table/PacksTable'
import e from 'features/packs/Packs.module.css'
import { addPackTC, getPacksTC } from 'features/packs/packsReducer'
import {
  packCardPacks,
  packCardPacksTotalCount,
  packPage,
  packPageCount,
  packParamsID,
} from 'features/packs/selectorPack'
import { userIdProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(packCardPacks)
  const page = useAppSelector(packPage)
  const pageCount = useAppSelector(packPageCount)
  const cardPacksTotalCount = useAppSelector(packCardPacksTotalCount)
  const userID = useAppSelector(userIdProfile)
  const paramsID = useAppSelector(packParamsID)
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
      <EnhancedTable cardsPacks={cardPacks} userID={userID} userIDsettings={paramsID} />
      {/*<PaginationComponent*/}
      {/*  totalCount={cardPacksTotalCount}*/}
      {/*  currentPage={page ?? 1}*/}
      {/*  pageSize={pageCount ?? 4}*/}
      {/*  onPageChanged={onChangePageHandler}*/}
      {/*  labelRowsPerPage={paginationLabel}*/}
      {/*/>*/}
    </div>
  )
}
