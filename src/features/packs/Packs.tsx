import { useCallback, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'

import { AddNewPack } from './constants/AddNewPackModal/AddNewPack'
import { DeletePack } from './constants/DeletePack'
import { EditPack } from './constants/EditPack'

import { ModalBasic } from 'common/components/c11-SuperModal/ModalBasic'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import e from 'features/packs/Packs.module.css'
import { getPacksTC } from 'features/packs/packsReducer'
import { SearchPackPanel } from 'features/packs/SearchPackPanel'
import { packCardPacks, packCardPacksTotalCount, packPage, packPageCount } from 'features/packs/selectorPack'
import { userIdProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Packs = () => {
  console.log('Packs')
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(packCardPacks)
  const pagePacks = useAppSelector(packPage)
  const pageCount = useAppSelector(packPageCount)
  const cardPacksTotalCount = useAppSelector(packCardPacksTotalCount)
  const userID = useAppSelector(userIdProfile)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<any>()
  const myPacks = useAppSelector(state => state.packs.myPacks)
  const userPacks = useAppSelector(state => state.packs)
  const params = Object.fromEntries(searchParams)
  const [open, setOpen] = useState('false')
  const [searchInputCallBack, setSearchInputCallBack] = useState<boolean>(false)
  const isNotEmptyPack = !!cardPacks.length

  useEffect(() => {
    console.log('useEffect search')
    dispatch(getPacksTC({ ...search }))
    setSearchParams({ ...search })
  }, [search])
  const handleOpen = (value: string) => setOpen(value)
  const handleClose = () => setOpen('false')
  const paginationLabel = 'Packs per Page'
  const modalOpenHandler = (value: string) => {
    handleOpen(value)
  }
  const onChangePageHandler = (page: number, size: number) => {
    if (pagePacks == page && pageCount == 4) {
      setSearchParams({ ...search, page: page, pageCount: size })
    } else {
      setSearch({ ...search, page: page, pageCount: size })
    }
  }
  const setParamsSortedHandler = (sortPacks: string) => {
    setSearch({ ...search, sortPacks: sortPacks })
  }
  const callBackSearchInput = () => {
    setSearchInputCallBack(true)
  }
  const onChangeSearchHandler = (searchValue: string) => {
    if (searchInputCallBack) {
      setSearch({ ...search, packName: searchValue })
    }
  }
  const onChangeValuesHandler = useCallback((values: number[]) => {
    setSearch({ ...search, min: values[0], max: values[1] })
  }, [])

  const handleChangeMyPack = (my: boolean) => {
    if (my) {
      setSearch({ ...search, user_id: userID })
    } else {
      setSearch({})
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
        <SearchPackPanel
          searchParams={searchParams}
          onChangeSearchHandler={onChangeSearchHandler}
          onChangeValuesHandler={onChangeValuesHandler}
          callBackSearchInput={callBackSearchInput}
          handleChangeMyPack={handleChangeMyPack}
        />
        {isNotEmptyPack ? (
          <PacksTable
            cardsPacks={userPacks.cardPacks}
            userID={userID}
            userIDsettings={userID}
            setParamsSorted={setParamsSortedHandler}
            modalHandler={modalOpenHandler}
          />
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
            <div>{'not answer'}</div>
          </Box>
        )}
        {isNotEmptyPack ? (
          <PaginationComponent
            totalCount={cardPacksTotalCount}
            currentPage={params.page ? +params.page : pagePacks}
            pageSize={params.pageCount ? +params.pageCount : pageCount}
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
