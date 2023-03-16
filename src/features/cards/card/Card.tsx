import * as React from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'
import { clearCardDataAC, CreateCardsTC, GetCardsTC } from 'features/cards/card/card-reducer'
import s from 'features/cards/card/CardNotPack.module.css'
import { SearchPackPanel } from 'features/cards/card/CardsSearchBar'
import { EnhancedTable } from 'features/cards/card/CardsTable'
import { cards, cardsPageCount, cardsTotalCount, packUserId, pageCard } from 'features/cards/card/selectorCard'
import { CardsType } from 'features/cards/cards-api'
import { getPacksTC } from 'features/packs/packsReducer'

export const Card = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(pageCard)
  const rows = useAppSelector<Array<CardsType>>(cards)
  const user_id = useAppSelector(packUserId)
  const totalCount = useAppSelector(cardsTotalCount)
  const pageCount = useAppSelector(cardsPageCount)
  const cardsPack_id = useAppSelector(state => (state.cards.setPackId ? state.cards.setPackId : ''))
  const paginationLabel = 'Cards per Page'
  const packsListHandler = () => {
    dispatch(getPacksTC({ params: { user_id: user_id } }))
    dispatch(clearCardDataAC())
    //пока только мои колоды загружаются, потом исправить
  }
  const postCardHandler = () => {
    dispatch(
      CreateCardsTC({
        answer: 'CreateCardsTC',
        question: 'Card',
        cardsPack_id: cardsPack_id,
      })
    )
  }
  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(GetCardsTC({ page: page, pageCount: pageCount, cardsPack_id: cardsPack_id }))
  }

  if (rows.length === 0) {
    return <Navigate to={PATH.CARD_NOT_PACK} replace />
  }

  return (
    <>
      <div className={s.packsContainer}>
        <Box sx={{ m: 1, width: '50ch', marginLeft: 17 }}>
          <NavLink className={s.backContainer} to={PATH.PACKS} onClick={packsListHandler}>
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
          <h2>My pack</h2>
          <SuperButton className={s.newPackButton} onClick={postCardHandler}>
            Add new card
          </SuperButton>
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
          <SearchPackPanel />
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
          <EnhancedTable cards={rows} />
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
          {/*<div>*/}
          {/*  {pageCount !== 0 ? (*/}
          {/*    <PaginationComponent*/}
          {/*      totalCount={totalCount}*/}
          {/*      currentPage={page ?? 1}*/}
          {/*      pageSize={pageCount ?? 4}*/}
          {/*      onPageChanged={onChangePageHandler}*/}
          {/*      labelRowsPerPage={paginationLabel}*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    ''*/}
          {/*  )}*/}
          {/*</div>*/}
        </Box>
      </div>
    </>
  )
}
