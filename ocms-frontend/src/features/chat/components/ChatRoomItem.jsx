const ChatRoomItem = ({ room,selected,isDoctor,onClick,}) => {

  const participant = isDoctor? room.patient: room.doctor;

  return (
    <button
      type="button"
      className={`list-group-item list-group-item-action ${
        selected ? "active" : ""
      }`}
      onClick={onClick}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="fw-semibold">
            {participant?.fullName ?? "Không xác định"}
          </div>

          <small
            className={
              selected
                ? "text-white-50"
                : "text-muted"
            }
          >
            {room.status}
          </small>
        </div>

        <i className="bi bi-chevron-right" />
      </div>
    </button>
  );
};

export default ChatRoomItem;