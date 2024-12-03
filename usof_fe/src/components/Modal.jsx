import "./styles/Modal.scss";

import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onCancel, children }) => {
  return (
      <>
        {isOpen && (
            <div className="modalOverlay" onClick={onCancel}>
              <div
                  className="modalWindow"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
              >
                <div className="modalHeader">
                  <button className="closeButton" onClick={onCancel}>
                    &times;
                  </button>
                </div>
                <div className="modalBody">{children}</div>
                <div className="modalFooter">
                  <button className="cancelButton" onClick={onCancel}>
                    Close
                  </button>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
  onCancel: () => {},
  children: null,
};

export default Modal;
