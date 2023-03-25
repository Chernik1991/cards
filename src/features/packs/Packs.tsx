import * as React from 'react'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'

import { appStatus } from 'app/selectorApp'
import { ModalBasic } from 'common/components/c11-SuperModal/ModalBasic'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import { SearchPackPanel } from 'features/packs/components/sortPacksMyAll/SearchPackPanel'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import { AddNewPack } from 'features/packs/modals/AddNewPackModal/AddNewPack'
import { DeletePack } from 'features/packs/modals/DeletePack/DeletePack'
import { EditPack } from 'features/packs/modals/EditPack/EditPack'
import { clearUserStateTypeAC } from 'features/packs/modals/modalsReducer'
import e from 'features/packs/Packs.module.css'
import {
  addPackTC,
  deletePackTC,
  getPacksTC,
  pageCountPacksAC,
  pagePacksAC,
  updatePackTC,
} from 'features/packs/packsReducer'
import {
  packAdditionalSettings,
  packAdditionalSettingsName,
  packAdditionalSettingsPrivate,
  packCardPacks,
  packCardPacksTotalCount,
  packIsMyPacks,
  packMax,
  packMaxCardsCount,
  packMin,
  packMinCardsCount,
  packPage,
  packPageCount,
  packSearch,
  packSort,
} from 'features/packs/selectorPack'
import { userIdProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Packs = () => {
  console.log('Packs')
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(packCardPacks)
  const page = useAppSelector(packPage)
  const pageCount = useAppSelector(packPageCount)
  const search = useAppSelector(packSearch)
  const sort = useAppSelector(packSort)
  const minCardsCount = useAppSelector(packMinCardsCount)
  const maxCardsCount = useAppSelector(packMaxCardsCount)
  const min = useAppSelector(packMin)
  const max = useAppSelector(packMax)
  const user_id = useAppSelector(userIdProfile)
  const isMyPacks = useAppSelector(packIsMyPacks)
  const cardPacksTotalCount = useAppSelector(packCardPacksTotalCount)
  const packsAdditionalSettings = useAppSelector(packAdditionalSettings)
  const packsAdditionalSettingsName = useAppSelector(packAdditionalSettingsName)
  const packsAdditionalSettingsPrivate = useAppSelector(packAdditionalSettingsPrivate)
  const [open, setOpen] = useState('false')
  const [error, setError] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const isNotEmptyPack = !!cardPacks.length
  const paginationLabel = 'Packs per Page'
  const status = useAppSelector(appStatus)

  useEffect(() => {
    dispatch(getPacksTC())
    let param = {}

    if (page !== 1) {
      param = { ...param, page: page.toString() }
    }
    if (pageCount !== 4) {
      param = { ...param, pageCount: pageCount.toString() }
    }
    if (sort !== '0updated') {
      param = { ...param, sortPacks: sort }
    }
    if (search !== '') {
      param = { ...param, packName: search }
    }
    if (max !== maxCardsCount) {
      param = { ...param, max: max.toString() }
    }
    if (min !== minCardsCount) {
      param = { ...param, min: min.toString() }
    }
    if (isMyPacks) {
      param = { ...param, user_id: user_id.toString() }
    }
    setSearchParams({ ...param })
  }, [search, pageCount, page, sort, isMyPacks, max, min])
  const handleOpen = (value: string) => setOpen(value)
  const handleClose = () => {
    dispatch(clearUserStateTypeAC())
    setOpen('false')
  }

  const modalOpenHandler = (value: string) => {
    handleOpen(value)
  }
  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(pagePacksAC(page))
    dispatch(pageCountPacksAC(pageCount))
  }
  const addNewPack = () => {
    if (packsAdditionalSettings.name) {
      //!add user_id for soring adter adding NewPack
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
      //!add user_id for soring adter adding NewPack
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
    console.log('2121212121212121212121211')
    //!add user_id for soring adter adding NewPack
    if (packsAdditionalSettings._id) {
      dispatch(deletePackTC(packsAdditionalSettings._id))
    }
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
        {isNotEmptyPack ? (
          <PacksTable modalHandler={modalOpenHandler} />
        ) : (
          <Box
            sx={{
              gridArea: 'center',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 50,
              paddingTop: 25,
            }}
          >
            <div>{'No data available. Change your search options'}</div>
          </Box>
        )}
        {isNotEmptyPack ? (
          <PaginationComponent
            totalCount={cardPacksTotalCount}
            currentPage={+params.page || page}
            pageSize={+params.pageCount || pageCount}
            onPageChanged={onChangePageHandler}
            labelRowsPerPage={paginationLabel}
          />
        ) : (
          ''
        )}
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
