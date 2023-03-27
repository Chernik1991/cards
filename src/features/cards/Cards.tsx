import * as React from 'react'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink, useSearchParams } from 'react-router-dom'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import * as authSelectors from 'features/auth/selectorAuth'
import { CardMenu } from 'features/cards/cardMenu/CardMenu'
import s from 'features/cards/cardNotPack/CardNotPack.module.css'
import { CardsType } from 'features/cards/cards-api'
import { clearCardDataAC, GetCardsTC, pageCardsAC, pageCountCardsAC } from 'features/cards/cards-reducer'
import { CardsTable } from 'features/cards/cardTable/CardsTable'
import { SearchCardPanel } from 'features/cards/searchCardPanel/SearchCardPanel'
import * as cardsSelectors from 'features/cards/selectorCard'
import { Modals } from 'features/packs/modals/modals'
import * as profileSelectors from 'features/profile/selectorProfile'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Cards = () => {
  // console.log('Cards')
  const dispatch = useAppDispatch()
  const page = useAppSelector(cardsSelectors.page)
  const pageCount = useAppSelector(cardsSelectors.pageCount)
  const totalCount = useAppSelector(cardsSelectors.cardsTotalCount)
  const sort = useAppSelector(cardsSelectors.sortCards)
  const rows = useAppSelector<Array<CardsType>>(cardsSelectors.cards)
  const cardsPack_id = useAppSelector(cardsSelectors.cardsPack_id)
  const search = useAppSelector(cardsSelectors.cardQuestion)
  const packName = useAppSelector(cardsSelectors.packName)
  const packUserId = useAppSelector(cardsSelectors.packUserId)
  const my_id = useAppSelector(profileSelectors._id)
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const paginationLabel = 'Cards per Page'
  const badResponse = 'No data available. Change your search options'
  const isNotEmptyCard = !!rows.length
  const [open, setOpen] = useState('false')
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }
  useEffect(() => {
    dispatch(GetCardsTC())
    let param = {}

    if (page !== 1) {
      param = { ...param, page: page.toString() }
    }
    if (pageCount !== 4) {
      param = { ...param, pageCount: pageCount.toString() }
    }
    if (sort !== '0updated') {
      param = { ...param, sortCards: sort }
    }
    if (search !== '') {
      param = { ...param, cardQuestion: search }
    }
    param = { ...param, cardsPack_id: cardsPack_id }
    setSearchParams({ ...param })
  }, [pageCount, page, search, sort])

  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(pageCardsAC(page))
    dispatch(pageCountCardsAC(pageCount))
    console.log(page, pageCount, 'page, pageCount')
  }
  const cardsListHandler = () => {
    dispatch(clearCardDataAC())
  }
  const modalOpenHandler = (value: string) => {
    setOpen(value)
  }
  const learnHandler = () => {
    dispatch(pageCountCardsAC(totalCount))
  }

  if (rows.length === 0 && my_id === packUserId) {
    return <Navigate to={PATH.CARD_NOT_PACK} replace />
  }

  return (
    <>
      <div className={s.packsContainer}>
        <Box sx={{ m: 1, width: '50ch', marginLeft: 17 }}>
          <NavLink className={s.backContainer} to={PATH.PACKS} onClick={cardsListHandler}>
            <svg className={s.backArrow} viewBox="0 0 512 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
            </svg>
            <span> Back to Packs List</span>
          </NavLink>
        </Box>
        <Box
          sx={{
            gridArea: 'left',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 4,
            marginLeft: 18,
            marginRight: 10,
          }}
        >
          <div className={s.PackNameContainer}>
            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{packName}</span>
            {my_id === packUserId ? <CardMenu /> : ''}
          </div>
          {my_id === packUserId ? (
            <SuperButton className={s.newPackButton} onClick={() => modalOpenHandler('add-searchCardPanel')}>
              Add new card
            </SuperButton>
          ) : (
            <NavLink to={PATH.LEARN}>
              <SuperButton className={s.newPackButton} onClick={learnHandler}>
                Learn to pack
              </SuperButton>
            </NavLink>
          )}
        </Box>
        <Box
          sx={{
            gridArea: 'left',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 2,
            marginLeft: 18,
            marginRight: 10,
          }}
        >
          <SearchCardPanel />
        </Box>
        <Box
          sx={{
            gridArea: 'left',
            width: '84%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 4,
            marginLeft: 14,
            marginRight: 10,
          }}
        >
          {isNotEmptyCard ? (
            <CardsTable modalHandler={modalOpenHandler} />
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
        </Box>
        <Box
          sx={{
            gridArea: 'left',
            width: '84%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 14,
            marginRight: 10,
          }}
        >
          {isNotEmptyCard ? (
            <PaginationComponent
              totalCount={totalCount}
              currentPage={+params.page || page}
              pageSize={+params.pageCount || pageCount}
              onPageChanged={onChangePageHandler}
              labelRowsPerPage={paginationLabel}
            />
          ) : (
            ''
          )}
        </Box>
        <Modals open={open} setOpen={setOpen} />
      </div>
    </>
  )
}
