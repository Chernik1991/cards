import { useState } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'

import { ModalBasic } from '../../common/components/c11-SuperModal/ModalBasic'

import { AddNewPack } from './modals/AddNewPackModal/AddNewPack'
import { DeletePack } from './modals/DeletePack/DeletePack'
import { EditPack } from './modals/EditPack/EditPack'
import { clearUserStateTypeAC } from './modals/modalsReducer'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import e from 'features/packs/Packs.module.css'
import { addPackTC, getPacksTC, updatePackTC, deletePackTC } from 'features/packs/packsReducer'
import { SearchPackPanel } from 'features/packs/SearchPackPanel'
import {
  packAdditionalSettings,
  packAdditionalSettingsName,
  packAdditionalSettingsPrivate,
  packCardPacks,
  packCardPacksTotalCount,
  packMyPacks,
  packPage,
  packPageCount,
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
  const myPacks = useAppSelector(packMyPacks)
  const packsAdditionalSettings = useAppSelector(packAdditionalSettings)
  const packsAdditionalSettingsName = useAppSelector(packAdditionalSettingsName)
  const packsAdditionalSettingsPrivate = useAppSelector(packAdditionalSettingsPrivate)
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState('false')
  const [error, setError] = useState(false)
  const params = Object.fromEntries(searchParams)
  const handleOpen = (value: string) => setOpen(value)
  const handleClose = () => {
    dispatch(clearUserStateTypeAC())
    setOpen('false')
  }

  const modalOpenHandler = (value: string) => {
    handleOpen(value)
  }

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
  const addNewPack = () => {
    if (packsAdditionalSettings.name) {
      dispatch(
        addPackTC({
          name: packsAdditionalSettings.name,
          deckCover: packsAdditionalSettings.deckCover,
          private: packsAdditionalSettings.private,
        })
      )
      dispatch(clearUserStateTypeAC())
      handleClose()
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }
  const updatePack = () => {
    if (packsAdditionalSettings.name) {
      dispatch(
        updatePackTC({
          _id: packsAdditionalSettings._id,
          name: packsAdditionalSettings.name,
          private: packsAdditionalSettings.private,
        })
      )
      dispatch(clearUserStateTypeAC())
      handleClose()
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }
  const deletePack = () => {
    dispatch(deletePackTC({ id: packsAdditionalSettings._id }))
    handleClose()
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
        <PacksTable cardsPacks={cardPacks} userID={userID} userIDsettings={userID} modalHandler={modalOpenHandler} />
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
          handleModalFn={addNewPack}
        >
          <AddNewPack
            error={
              error ? (
                <span style={{ fontSize: '10px', position: 'relative', top: '60px' }}>Pack name required</span>
              ) : (
                ''
              )
            }
          />
        </ModalBasic>
        <ModalBasic
          modalName={'Edit pack'}
          deleteSave={false}
          handleState={open === 'edit-pack'}
          handleClose={handleClose}
          handleModalFn={updatePack}
        >
          <EditPack
            packStatus={packsAdditionalSettingsPrivate}
            packName={packsAdditionalSettingsName}
            error={
              error ? (
                <span style={{ fontSize: '10px', position: 'relative', top: '60px' }}>Pack name required</span>
              ) : (
                ''
              )
            }
          />
        </ModalBasic>
        <ModalBasic
          modalName={'Delete pack'}
          deleteSave={true}
          handleState={open === 'delete-pack'}
          handleClose={handleClose}
          handleModalFn={deletePack}
        >
          <DeletePack packName={packsAdditionalSettingsName} />
        </ModalBasic>
      </div>
    </div>
  )
}
