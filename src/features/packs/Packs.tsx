import { useState } from 'react'

import Box from '@mui/material/Box'

import { SomeJSX2 } from './modal/constants/AddNewPack'
import { ModalBasic } from './modal/ModalBasic'
import { useSearchParams } from 'react-router-dom'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'features/packs/components/pagination/PaginationComponent'
import { SearchPackPanel } from 'features/packs/components/pagination/SearchPackPanel'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import { ResponsePacksType } from 'features/packs/packs-api'
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
  const isNotEmptyPack = !!cardPacks.length
  const [searchParams, setSearchParams] = useSearchParams()
  const myPacks = useAppSelector(state => state.packs.myPacks)
  const params = Object.fromEntries(searchParams)

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

  const onChangePageHandler = (page: number, size: number) => {
    if (myPacks) {
      dispatch(getPacksTC({ user_id: userID, page: page, pageCount: size }))
      setSearchParams({ user_id: userID, page: page.toString(), pageCount: pageCount.toString() })
    } else {
      dispatch(getPacksTC({ page: page, pageCount: size }))
      setSearchParams({ page: page.toString(), pageCount: pageCount.toString() })
    }
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
