import o from 'features/modals/DeleteModal/DeleteModal.module.css'

type props = {
  name: string | undefined
}

export const DeleteModal = ({ name }: props) => {
  return (
    <div className={o.modalWrapper}>
      <span>
        Do you really want to remove <strong>{name}</strong>?{/*<br />*/}
        {/*All cards will be deleted.*/}
      </span>
    </div>
  )
}
