import * as React from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink } from 'react-router-dom'

import { PaginationComponent } from '../../packs/PaginationComponent'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'
import { clearCardDataAC, CreateCardsTC, DeleteCardsTC, GetCardsTC } from 'features/cards/card/card-reducer'
import s from 'features/cards/card/CardNotPack.module.css'
import { SearchPackPanel } from 'features/cards/card/CardsSearchBar'
import { EnhancedTable } from 'features/cards/card/CardsTable'
import { CardsType } from 'features/cards/cards-api'
// import e from 'features/packs/Packs.module.css'
import { getPacksTC } from 'features/packs/packsReducer'

export const Card = () => {
  const dispatch = useAppDispatch()
  const rows = useAppSelector<Array<CardsType>>(state => state.cards.cards)
  const cards = useAppSelector<Array<CardsType>>(state => state.cards.cards)
  const getIdPack = useAppSelector<string>(state => state.packs.cardPacks[0]._id)
  //исправить, пока что грузится только 1 колода
  const getIdUser = useAppSelector<string>(state => state.profile._id)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const currentPage = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const paginationLabel = 'Cards per Page'
  const packsListHandler = () => {
    dispatch(getPacksTC({ params: { user_id: getIdUser } }))
    dispatch(clearCardDataAC())
    //пока только мои колоды загружаются, потом исправить
  }
  const getCardHandler = () => {
    dispatch(GetCardsTC({ cardsPack_id: getIdPack }))
  }
  const postCardHandler = () => {
    dispatch(
      CreateCardsTC({
        card: {
          answer: '123',
          question: '1235555',
          cardsPack_id: getIdPack,
        },
      })
    )
  }
  const delCardHandler = (card_id: string, cardsPack_id: string) => {
    dispatch(DeleteCardsTC({ id: card_id, cardsPack_id: cardsPack_id }))
  }
  // const updateCardHandler = () => {
  //   dispatch(UpdateCardsTC({ card: { _id: rows[0]._id, question: 'rows[0]._id' } }))
  //   //пока только первый вопрос и вопрос хардкор, потом исправить
  // }
  const onChangePageHandler = () => {
    /*dispatch(setCardsCurrentPageAC(res.data))
    dispatch(setCardsPageCountAC(res.data))*/
  }
  const handleClick = (event: React.MouseEvent<unknown>, name: string, card_id: string, cardsPack_id: string) => {
    delCardHandler(card_id, cardsPack_id)
    // console.log(cardsPack_id, 'handleClick')
    // dispatch(GetCardsTC({ cardsPack_id: cardsPack_id }))
    // console.log(card_id, 'card_id')
    // console.log(cardsPack_id, 'cardsPack_id')
    // console.log(name, 'name')
  }

  if (rows.length === 0) {
    console.log(rows.length, 'rows')

    return <Navigate to={PATH.CARD_NOT_PACK} />
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
          <EnhancedTable cards={cards} />
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
          <PaginationComponent
            totalCount={cardsTotalCount}
            currentPage={currentPage ?? 1}
            pageSize={pageCount ?? 4}
            onPageChanged={onChangePageHandler}
            labelRowsPerPage={paginationLabel}
          />
        </Box>
      </div>
      {/*<div className={e.packsContainer}>*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      gridArea: 'left',*/}
      {/*      width: '80%',*/}
      {/*      display: 'flex',*/}
      {/*      justifyContent: 'space-between',*/}
      {/*      alignItems: 'center',*/}
      {/*      paddingTop: 4,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <h2>Packs list</h2>*/}
      {/*    <SuperButton className={e.newPackButton} onClick={postCardHandler}>*/}
      {/*      Add new card*/}
      {/*    </SuperButton>*/}
      {/*  </Box>*/}
      {/*  <SearchPackPanel />*/}
      {/*  <EnhancedTable cards={cards} />*/}
      {/*  <PaginationComponent*/}
      {/*    totalCount={cardsTotalCount}*/}
      {/*    currentPage={currentPage ?? 1}*/}
      {/*    pageSize={pageCount ?? 4}*/}
      {/*    onPageChanged={onChangePageHandler}*/}
      {/*    labelRowsPerPage={paginationLabel}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'center',*/}
      {/*    alignItems: 'center',*/}
      {/*    flexDirection: 'column',*/}
      {/*    margin: '40px 50px 0px 50px',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <div>*/}
      {/*    <button onClick={getCardHandler}>get card</button>*/}
      {/*    <button onClick={postCardHandler}>new card</button>*/}
      {/*    /!*<button onClick={delCardHandler}>del card</button>*!/*/}
      {/*    <button onClick={updateCardHandler}>update card</button>*/}
      {/*  </div>*/}
      {/*  <div>{rows[0]._id}</div>;*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      gridArea: 'left',*/}
      {/*      width: '100%',*/}
      {/*      display: 'flex',*/}
      {/*      justifyContent: 'center',*/}
      {/*      alignItems: 'flex-start',*/}
      {/*      paddingTop: 4,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <NavLink className={s.backContainer} to={PATH.PACKS} onClick={packsListHandler}>*/}
      {/*      <svg className={s.backArrow} viewBox="0 0 512 512">*/}
      {/*        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />*/}
      {/*      </svg>*/}
      {/*      <span> Back to Packs List</span>*/}
      {/*    </NavLink>*/}
      {/*  </Box>*/}
      {/*  ;*/}
      {/*  <TableContainer component={Paper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>*/}
      {/*    <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
      {/*      <TableHead>*/}
      {/*        <TableRow>*/}
      {/*          <TableCell>Question</TableCell>*/}
      {/*          <TableCell align="right">Answer</TableCell>*/}
      {/*          <TableCell align="right">Last Updated</TableCell>*/}
      {/*          <TableCell align="right">Grade</TableCell>*/}
      {/*        </TableRow>*/}
      {/*      </TableHead>*/}
      {/*      <TableBody>*/}
      {/*        {rows.map((row: any) => (*/}
      {/*          <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>*/}
      {/*            <TableCell*/}
      {/*              component="th"*/}
      {/*              scope="row"*/}
      {/*              onClick={event => handleClick(event, row.question, row._id, row.cardsPack_id)}*/}
      {/*            >*/}
      {/*              {row.question}*/}
      {/*            </TableCell>*/}
      {/*            <TableCell align="right">{row.answer}</TableCell>*/}
      {/*            <TableCell align="right">{row.updated}</TableCell>*/}
      {/*            <TableCell align="right">{row.grade}</TableCell>*/}
      {/*          </TableRow>*/}
      {/*        ))}*/}
      {/*      </TableBody>*/}
      {/*    </Table>*/}
      {/*  </TableContainer>*/}
      {/*  ;*/}
      {/*  <PaginationComponent*/}
      {/*    totalCount={cardsTotalCount}*/}
      {/*    currentPage={currentPage}*/}
      {/*    pageSize={pageCount}*/}
      {/*    onPageChanged={onChangePageHandler}*/}
      {/*    labelRowsPerPage={paginationLabel}*/}
      {/*  />*/}
      {/*  ;*/}
      {/*</div>*/}
    </>
  )
}
