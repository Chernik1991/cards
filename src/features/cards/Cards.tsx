import * as React from 'react'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink, useSearchParams } from 'react-router-dom'

import * as appSelectors from 'app/selectorApp'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import { BackToPacksButton } from 'common/constans/BackToPacksButton'
import {
  badResponse,
  defaultCover,
  NoCards,
  paginationLabel,
  sxCardsBpxButton,
  sxCardsCardsTable,
  sxCardsPagination,
  sxCardsResponse,
  sxCardsSearchPanel,
} from 'common/constans/constans'
import * as authSelectors from 'features/auth/selectorAuth'
import { CardMenu } from 'features/cards/cardMenu/CardMenu'
import { CardsType } from 'features/cards/cards-api'
import { clearCardDataAC, GetCardsTC, pageCardsAC, pageCountCardsAC } from 'features/cards/cards-reducer'
import s from 'features/cards/Cards.module.css'
import { CardsTable } from 'features/cards/cardTable/CardsTable'
import { SearchCardPanel } from 'features/cards/searchCardPanel/SearchCardPanel'
import * as cardsSelectors from 'features/cards/selectorCard'
import o from 'features/modals/EditCard/EditCardModal.module.css'
import { Modals } from 'features/modals/Modals'
import y from 'features/profile/Profile.module.css'
import * as profileSelectors from 'features/profile/selectorProfile'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(cardsSelectors.page)
  const pageCount = useAppSelector(cardsSelectors.pageCount)
  const totalCount = useAppSelector(cardsSelectors.cardsTotalCount)
  const sort = useAppSelector(cardsSelectors.sortCards)
  const rows = useAppSelector<Array<CardsType>>(cardsSelectors.cards)
  const cardsPack_id = useAppSelector(cardsSelectors.cardsPack_id)
  const search = useAppSelector(cardsSelectors.search)
  const packName = useAppSelector(cardsSelectors.packName)
  const packDeckCover = useAppSelector(cardsSelectors.packDeckCover)
  const packUserId = useAppSelector(cardsSelectors.packUserId)
  const my_id = useAppSelector(profileSelectors._id)
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const isNotEmptyCard = !!rows.length
  const [open, setOpen] = useState('false')
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const status = useAppSelector(appSelectors.status)
  const crudAccessValue = my_id === packUserId

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }
  useEffect(() => {
    if (status !== 'loading') {
      dispatch(GetCardsTC())
    }
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
      param = { ...param, search: search }
    }
    param = { ...param, cardsPack_id: cardsPack_id }
    setSearchParams({ ...param })
  }, [pageCount, page, search, sort])

  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(pageCardsAC(page))
    dispatch(pageCountCardsAC(pageCount))
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

  return (
    <>
      <div className={s.packsContainer}>
        <Box sx={{ m: 1, width: '50ch', marginLeft: 17 }}>
          <NavLink className={s.backContainer} to={PATH.PACKS} onClick={cardsListHandler}>
            <BackToPacksButton />
          </NavLink>
        </Box>
        <Box sx={sxCardsBpxButton}>
          <div className={s.PackNameContainer}>
            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{packName}</span>
            {crudAccessValue ? <CardMenu /> : ''}
          </div>
          {crudAccessValue ? (
            <SuperButton className={s.newPackButton} onClick={() => modalOpenHandler('add-card')}>
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
        <Box sx={sxCardsBpxButton}>
          <div className={o.selectCover}>
            <img src={packDeckCover ? packDeckCover : defaultCover} className={y.deckCover} alt="ava" />
          </div>
        </Box>
        <Box sx={sxCardsSearchPanel}>
          <SearchCardPanel />
        </Box>
        <Box sx={sxCardsCardsTable}>
          {isNotEmptyCard ? (
            <CardsTable modalHandler={modalOpenHandler} />
          ) : (
            <Box sx={sxCardsResponse}>{my_id === packUserId ? <div>{NoCards}</div> : <div>{badResponse}</div>}</Box>
          )}
        </Box>
        <Box sx={sxCardsPagination}>
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
