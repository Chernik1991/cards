import o from './DeleteCard.module.css'

type DeleteCardType = {
  cardName: string
}

export const DeleteCard = ({ cardName }: DeleteCardType) => {
  return (
    <div className={o.modalWrapper}>
      <span>
        Do you really want to remove <strong>{cardName}</strong>?
        <br />
        Card will be deleted.
      </span>
    </div>
  )
}
