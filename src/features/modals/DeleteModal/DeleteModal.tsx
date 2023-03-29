import o from 'features/modals/DeleteModal/DeleteModal.module.css'

type props = {
  name: string
}

export const DeleteModal = ({ name }: props) => {
  return (
    <div className={o.modalWrapper}>
      <span>
        Do you really want to remove <strong>{name}</strong>?<br />
      </span>
    </div>
  )
}
