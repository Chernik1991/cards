import o from './DeletePack.module.css'

type DeletePackType = {
  packName: string | undefined
}

export const DeletePack = ({ packName }: DeletePackType) => {
  return (
    <div className={o.modalWrapper}>
      <span>
        Do you really want to remove <strong>{packName}</strong>?
        <br />
        All cards will be deleted.
      </span>
    </div>
  )
}
