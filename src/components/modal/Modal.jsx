import React, { useState, useEffect } from 'react';
import './Modal.css';

function CustomSelect({ options, defaultOption, label, id }) {
  const [selected, setSelected] = useState(defaultOption);
  const [open, setOpen] = useState(false);

  // Toggle dropdown open/close
  const toggleOpen = (e) => {
    e.stopPropagation();
    if (!open) {
      document.dispatchEvent(new Event('closeAllSelects'));
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  // Handle option click and update the selected state
  const handleOptionClick = (option) => {
    // Prevent selecting the default option
    if (option === defaultOption) return;
    setSelected(option);
    // Close the dropdown after selecting an option
    setOpen(false);
  };

  useEffect(() => {
    const closeAllHandler = () => {
      if (open) setOpen(false);
    };
    document.addEventListener('closeAllSelects', closeAllHandler);

    const handleClickOutside = () => {
      if (open) setOpen(false);
    };
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('closeAllSelects', closeAllHandler);
      document.removeEventListener('click', handleClickOutside);
    };
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
              className={selected === option ? 'same-as-selected' : ''}>
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Button() {
  // The state now holds the raw amount as a string
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Track if the input is focused
  const [isFocused, setIsFocused] = useState(false);

  // Formatter for PKR currency
  const formatPKR = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (!numericValue) return '';
    const number = parseFloat(numericValue);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(number);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleAmountChange = (e) => {
    // Always store the raw number (unformatted)
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(rawValue);
  };

  // When the user focuses on the input, show raw input
  const handleFocus = () => {
    setIsFocused(true);
  };

  // When the user blurs the input, apply formatting
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="container">
      {/* Button to open the modal */}
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
                ×
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
                  options={[
                    'Subscription',
                    'Supplies',
                    'Service Package',
                    'Monthly Report',
                    'Hardware Equipment',
                  ]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amountInput">Amount</label>
                <input
                  type="text"
                  id="amountInput"
                  placeholder="Rs. 0.00"
                  // When focused, show raw number; otherwise, show formatted version
                  value={isFocused ? amount : (amount ? formatPKR(amount) : '')}
                  onChange={handleAmountChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
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
