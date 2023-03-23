import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { Navigate, NavLink, useSearchParams } from 'react-router-dom'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PaginationComponent } from 'common/components/pagination/PaginationComponent'
import { clearCardDataAC, CreateCardsTC, GetCardsTC } from 'features/cards/card/card-reducer'
import { SearchCardPanel } from 'features/cards/card/SearchCardPanel'
import s from 'features/cards/cardNotPack/CardNotPack.module.css'
import { CardsType } from 'features/cards/cards-api'
import { CardsTable } from 'features/cards/cardTable/CardsTable'
import { cards, cardsPageCount, cardsTotalCount, packUserId, pageCard } from 'features/cards/selectorCard'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Card = () => {
  const dispatch = useAppDispatch()
  const cardPage = useAppSelector(pageCard)
  const pageCount = useAppSelector(cardsPageCount)
  const totalCount = useAppSelector(cardsTotalCount)
  const rows = useAppSelector<Array<CardsType>>(cards)
  const user_id = useAppSelector(packUserId)
  const my_id = useAppSelector(state => state.profile._id)
  const cardsPack_id = useAppSelector(state => (state.cards.setPackId ? state.cards.setPackId : ''))
  //временно
  const paginationLabel = 'Cards per Page'
  const isNotEmptyCard = !!rows.length
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const [search, setSearch] = useState<any>({ cardsPack_id: cardsPack_id.toString() })

  useEffect(() => {
    console.log('useEffect search')
    dispatch(GetCardsTC({ ...search }))
    setSearchParams({ ...search })
  }, [search])

  const packsListHandler = () => {
    // dispatch(getPacksTC({}))
    dispatch(clearCardDataAC())
  }
  const addNewCardHandler = () => {
    if (cardsPack_id) {
      dispatch(
        CreateCardsTC({
          answer: 'CreateCardsTC',
          question: 'Card',
          cardsPack_id,
        })
      )
    }
  }
  const searchCardPanelParams = (data: any) => {
    setSearchParams({ ...data })
  }
  const onChangePageHandler = (page: number, pageCount: number) => {
    if (cardPage == page && pageCount == 4) {
      setSearchParams({ ...search, page: page, pageCount: pageCount })
    } else {
      setSearch({ ...search, page: page, pageCount: pageCount })
    }
  }
  //      dispatch(GetCardsTC({ cardsPack_id: params.cardsPack_id, page: cardPage, pageCount: pageCount }))
  //   setSearchParams({
  //     cardsPack_id: params.cardsPack_id.toString(),
  //     page: cardPage.toString(),
  //     pageCount: pageCount.toString(),
  //   })
  //   console.log('Card onChangePageHandler')
  // }

  if (rows.length === 0 && my_id === user_id) {
    console.log(rows.length === 0, 'rows.length === 0')
    console.log(my_id === user_id, 'my_id === user_id')

    return <Navigate to={PATH.CARD_NOT_PACK} replace />
  }
  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams)
  //
  //   console.log(params)
  //
  //   dispatch(GetCardsTC({ cardsPack_id: cardsPack_id }))
  //   // setCardsPack_id(params.cardsPack_id)
  //   setSearchParams({ cardsPack_id: cardsPack_id })
  // }, [cardsPack_id])

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
          <h2>{my_id === user_id ? 'My Pack' : 'Friend’s Pack'}</h2>
          {my_id === user_id ? (
            <SuperButton className={s.newPackButton} onClick={addNewCardHandler}>
              Add new card
            </SuperButton>
          ) : (
            <NavLink to={PATH.STUDY} replace>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  minWidth: '115px',
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontStyle: 'Medium',
                  textTransform: 'none',
                }}
              >
                Learn to pack
              </Button>
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
          <SearchCardPanel
            cardsPack_id={cardsPack_id}
            searchParams={searchParams}
            // isNotEmptyPack={!!empty}
            // isMyPack={isMyPack}
            searchCardPanelParams={searchCardPanelParams}
            // addNewCard={addNewCard}
          />
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
            <CardsTable cards={rows} my_id={my_id} />
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
              currentPage={params.page ? +params.page : cardPage}
              pageSize={params.pageCount ? +params.pageCount : pageCount}
              onPageChanged={onChangePageHandler}
              labelRowsPerPage={paginationLabel}
            />
          ) : (
            ''
          )}
        </Box>
      </div>
    </>
  )
}
