import React, { useState, useEffect } from 'react';
import './Moral.css';

// CustomSelect
function CustomSelect({ options, defaultOption, label, id }) {
  const [selected, setSelected] = useState(defaultOption);
  const [open, setOpen] = useState(false);

  // Toggle dropdown
  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  // Option selection
  const handleOptionClick = (option) => {
    if (option === defaultOption) return;
    setSelected(option);
    setOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (open) setOpen(false);
    };
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <div className="custom-select" id={id}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="select-container">
      <div
        className={`select-selected ${open ? 'select-arrow-active' : ''} ${selected === defaultOption ? 'placeholder-option' : ''}`}
        onClick={toggleOpen}>
        {selected}
      </div>
        <div className={`select-items ${open ? '' : 'select-hide'}`}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={selected === option ? 'same-as-selected' : ''}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Button
export default function Button() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="container">
      {/* Button to open modal */}
      <div className="button-container">
        <button className="open-modal-button" onClick={openModal}>
          Create a sell
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Sell</h2>
              <button className="close-icon" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <CustomSelect
                  id="customerSelect"
                  label="Customer"
                  defaultOption="Select"
                  options={['Mohsin Ali', 'Ali Zaib']}
                />
              </div>

              <div className="form-group">
                <CustomSelect
                  id="categorySelect"
                  label="Category"
                  defaultOption="Select"
                  options={['Sales', 'Marketing', 'Finance', 'Support']}
                />
              </div>

              <div className="form-group">
                <CustomSelect
                  id="productSelect"
                  label="Product"
                  defaultOption="Select"
                  options={['Subscription', 'Supplies', 'Service Package', 'Monthly Report', 'Hardware Equipment']}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amountInput">Amount</label>
                <input type="text" id="amountInput" placeholder="$0.00" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="sell-button" onClick={closeModal}>
                Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}