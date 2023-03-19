import { useState } from 'react'

import Box from '@mui/material/Box'

import { SomeJSX2 } from './modal/constants/AddNewPack'
import { ModalBasic } from './modal/ModalBasic'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'features/packs/components/pagination/PaginationComponent'
import { SearchPackPanel } from 'features/packs/components/pagination/SearchPackPanel'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import { ResponsePacksType } from 'features/packs/packs-api'
import e from 'features/packs/Packs.module.css'
import { addPackTC, getPacksTC } from 'features/packs/packsReducer'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  // const page = useAppSelector(state => state.packsParams.page)
  // const pageCount = useAppSelector(state => state.packsParams.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const userID = useAppSelector(state => state.profile._id)
  const paramsID = useAppSelector(state => state.profile._id)

  // const fullParams = useAppSelector(state => state.packsParams)
  const [open, setOpen] = useState('false')
  const handleOpen = (value: string) => setOpen(value)
  const handleClose = () => setOpen('false')
  // const handleOpen1 = (value: boolean) => {
  //   value
  // }
  // const handleOpen2 = () => {}

  const newPackHandler = () => {
    handleOpen('one')
    const userParams = paramsID ? paramsID : ''

    // dispatch(addPackTC({ cardsPack: {} }, userParams))
  }
  // const newPackHandler2 = () => {
  // handleOpen2()
  // const userParams = paramsID ? paramsID : ''
  // dispatch(addPackTC({ cardsPack: {} }, userParams))
  // }

  const paginationLabel = 'Packs per Page'

  const onChangePageHandler = (page?: number, size?: number) => {
    dispatch(getPacksTC({ page: page, pageCount: size }))
  }
  const someJSX = <div>1</div>

  return (
    <div className={e.packsContainer}>
      <div className={e.packsBoxContainer}>
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
        <PacksTable cardsPacks={userPacks.cardPacks} userID={userID} userIDsettings={paramsID} />
        {/* <PaginationComponent
          totalCount={cardPacksTotalCount}
          currentPage={page ?? 1}
          pageSize={pageCount ?? 4}
          onPageChanged={onChangePageHandler}
          labelRowsPerPage={paginationLabel}
          restParams={fullParams}
        /> */}
        <ModalBasic handleState={open === 'one'} handleClose={handleClose}>
          <SomeJSX2 />
        </ModalBasic>
        <ModalBasic handleState={open === 'two'} handleClose={handleClose}>
          {someJSX}
        </ModalBasic>
      </div>
    </div>
  )
}
