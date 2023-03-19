import * as React from 'react'
import { useEffect } from 'react'

import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { Navigate, NavLink, useSearchParams } from 'react-router-dom'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { clearCardDataAC, CreateCardsTC, GetCardsTC } from 'features/cards/card/card-reducer'
import { SearchCardPanel } from 'features/cards/card/SearchCardPanel'
import s from 'features/cards/cardNotPack/CardNotPack.module.css'
import { CardsType } from 'features/cards/cards-api'
import { EnhancedTable } from 'features/cards/cardTable/CardsTable'
import { cards, cardsPageCount, cardsTotalCount, packUserId, pageCard } from 'features/cards/selectorCard'
import { PaginationComponent } from 'features/packs/components/pagination/PaginationComponent'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Card = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(pageCard)
  const rows = useAppSelector<Array<CardsType>>(cards)
  const user_id = useAppSelector(packUserId)

  console.log(user_id)
  const my_id = useAppSelector(state => state.profile._id)

  console.log(my_id)
  const totalCount = useAppSelector(cardsTotalCount)
  const pageCount = useAppSelector(cardsPageCount)
  const cardsPack_id = useAppSelector(state => (state.cards.setPackId ? state.cards.setPackId : ''))
  //временно

  const paginationLabel = 'Cards per Page'
  const isNotEmptyPack = !!rows.length
  const [searchParams, setSearchParams] = useSearchParams()
  // const [cardsPack_id, setCardsPack_id] = useState('')

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
    const params = Object.fromEntries(searchParams)

    dispatch(GetCardsTC({ cardsPack_id: params.cardsPack_id, page: page, pageCount: pageCount }))
    setSearchParams({
      cardsPack_id: params.cardsPack_id.toString(),
      page: page.toString(),
      pageCount: pageCount.toString(),
    })
    console.log('Card onChangePageHandler')
  }

  if (rows.length === 0 && my_id === user_id) {
    console.log(rows.length === 0, 'rows.length === 0')
    console.log(my_id === user_id, 'my_id === user_id')

    return <Navigate to={PATH.CARD_NOT_PACK} replace />
  }
  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    console.log(params)

    dispatch(GetCardsTC({ cardsPack_id: cardsPack_id }))
    // setCardsPack_id(params.cardsPack_id)
    setSearchParams({ cardsPack_id: cardsPack_id })
  }, [cardsPack_id])

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
          <EnhancedTable cards={rows} my_id={my_id} />
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
          {isNotEmptyPack && (
            <PaginationComponent
              totalCount={totalCount}
              currentPage={page ?? 1}
              pageSize={pageCount ?? 4}
              onPageChanged={onChangePageHandler}
              labelRowsPerPage={paginationLabel}
            />
          )}
        </Box>
      </div>
    </>
  )
}
