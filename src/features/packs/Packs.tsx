import * as React from 'react'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { Navigate, useSearchParams } from 'react-router-dom'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import * as authSelectors from 'features/auth/selectorAuth'
import { SearchPackPanel } from 'features/packs/components/sortPacksMyAll/SearchPackPanel'
import { PacksTable } from 'features/packs/components/table/PacksTable'
import { Modals } from 'features/packs/modals/modals'
import e from 'features/packs/Packs.module.css'
import { getPacksTC, pageCountPacksAC, pagePacksAC } from 'features/packs/packsReducer'
import * as packsSelectors from 'features/packs/selectorPack'
import * as profileSelectors from 'features/profile/selectorProfile'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Packs = () => {
  // console.log('Packs')
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(packsSelectors.cardPacks)
  const page = useAppSelector(packsSelectors.page)
  const pageCount = useAppSelector(packsSelectors.pageCount)
  const search = useAppSelector(packsSelectors.search)
  const sort = useAppSelector(packsSelectors.sort)
  const minCardsCount = useAppSelector(packsSelectors.minCardsCount)
  const maxCardsCount = useAppSelector(packsSelectors.maxCardsCount)
  const min = useAppSelector(packsSelectors.min)
  const max = useAppSelector(packsSelectors.max)
  const isMyPacks = useAppSelector(packsSelectors.isMyPacks)
  const user_id = useAppSelector(profileSelectors._id)
  const cardPacksTotalCount = useAppSelector(packsSelectors.cardPacksTotalCount)
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const [open, setOpen] = useState('false')
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const isNotEmptyPack = !!cardPacks.length
  const paginationLabel = 'Packs per Page'
  const badResponse = 'No data available. Change your search options'

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }
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

  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(pagePacksAC(page))
    dispatch(pageCountPacksAC(pageCount))
  }
  const modalOpenHandler = (value: string) => {
    setOpen(value)
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
            <div>{badResponse}</div>
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
        <Modals open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
