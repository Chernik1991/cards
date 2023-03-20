import { useState } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'

import { ModalBasic } from '../../common/components/c11-SuperModal/ModalBasic'

import { AddNewPack } from './constants/AddNewPackModal/AddNewPack'
import { DeletePack } from './constants/DeletePack'
import { EditPack } from './constants/EditPack'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import e from 'features/packs/Packs.module.css'
import { addPackTC, getPacksTC } from 'features/packs/packsReducer'
import { SearchPackPanel } from 'features/packs/SearchPackPanel'
import { packCardPacks, packCardPacksTotalCount, packPage, packPageCount } from 'features/packs/selectorPack'
import { userIdProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(packCardPacks)
  const page = useAppSelector(packPage)
  const pageCount = useAppSelector(packPageCount)
  const cardPacksTotalCount = useAppSelector(packCardPacksTotalCount)
  const userID = useAppSelector(userIdProfile)
  const [searchParams, setSearchParams] = useSearchParams()
  const myPacks = useAppSelector(state => state.packs.myPacks)
  const userPacks = useAppSelector(state => state.packs)
  const params = Object.fromEntries(searchParams)
  const [open, setOpen] = useState('false')
  const handleOpen = (value: string) => setOpen(value)
  const handleClose = () => setOpen('false')

  const modalOpenHandler = (value: string) => {
    handleOpen(value)
  }
  const newPackHandler2 = () => {
    // dispatch(addPackTC({ cardsPack: {} }, userParams))
  }
  // const newPackHandler2 = () => {
  // handleOpen2()
  // const userParams = paramsID ? paramsID : ''
  // dispatch(addPackTC({ cardsPack: {} }, userParams))
  // }

  const paginationLabel = 'Packs per Page'

  const onChangePageHandler = (page: number, size: number) => {
    if (myPacks) {
      dispatch(getPacksTC({ user_id: userID, page: page, pageCount: size }))
      setSearchParams({ user_id: userID, page: page.toString(), pageCount: pageCount.toString() })
    } else {
      dispatch(getPacksTC({ page: page, pageCount: size }))
      setSearchParams({ page: page.toString(), pageCount: pageCount.toString() })
    }
  }

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
          <SuperButton className={e.newPackButton} onClick={() => modalOpenHandler('add-pack')}>
            Add new pack
          </SuperButton>
        </Box>
        <SearchPackPanel />
        <PacksTable
          cardsPacks={userPacks.cardPacks}
          userID={userID}
          userIDsettings={userID}
          modalHandler={modalOpenHandler}
        />
        <PaginationComponent
          totalCount={cardPacksTotalCount}
          currentPage={page ?? 1}
          pageSize={pageCount ?? 4}
          onPageChanged={onChangePageHandler}
          labelRowsPerPage={paginationLabel}
        />
        <ModalBasic
          modalName={'Add new pack'}
          deleteSave={false}
          handleState={open === 'add-pack'}
          handleClose={handleClose}
          handleModalFn={() => ''}
        >
          <AddNewPack />
        </ModalBasic>
        <ModalBasic
          modalName={'Edit pack'}
          deleteSave={false}
          handleState={open === 'edit-pack'}
          handleClose={handleClose}
          handleModalFn={() => ''}
        >
          <EditPack />
        </ModalBasic>
        <ModalBasic
          modalName={'Delete pack'}
          deleteSave={true}
          handleState={open === 'delete-pack'}
          handleClose={handleClose}
          handleModalFn={() => ''}
        >
          <DeletePack />
        </ModalBasic>
      </div>
    </div>
  )
}
