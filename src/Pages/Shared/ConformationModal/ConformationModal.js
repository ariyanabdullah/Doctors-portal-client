import React from "react";

const ConformationModal = ({
  title,
  message,
  closeModal,
  modalData,
  successAction,
  successBtnName,
}) => {
  return (
    <div>
      {/* <label htmlFor="confirm-modal" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={closeModal}
              htmlFor="confirm-modal"
              className="btn btn-accent"
            >
              Cancel
            </label>
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirm-modal"
              className="btn btn-error"
            >
              {successBtnName}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformationModal;
