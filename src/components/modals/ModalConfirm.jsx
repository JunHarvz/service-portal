function ModalConfirm ({isOpen, onClose, confirmDelete}) {
    
    return (<>

    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={isOpen}>
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog" className="flex">
        <button className="btn btn-error mr-7" onClick={confirmDelete}>Yes</button>
        <button className="btn btn-neutral" onClick={onClose}>No</button>
      </form>
    </div>
  </div>
</dialog>
    </>)
}
export default ModalConfirm