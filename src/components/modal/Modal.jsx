import React, { useState } from 'react';
import './Modal.css';

function CustomSelect({ options, defaultOption, label, id }) {
  const [selected, setSelected] = useState(defaultOption);
  const [open, setOpen] = useState(false);

  const toggleOpen = (e) => {
    e.stopPropagation();
    if (!open) {
      document.dispatchEvent(new Event('closeAllSelects'));
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    if (option === defaultOption) return;
    setSelected(option);
    setOpen(false);
  };

  React.useEffect(() => {
    const closeAllHandler = () => open && setOpen(false);
    document.addEventListener('closeAllSelects', closeAllHandler);

    const handleClickOutside = () => open && setOpen(false);
    if (open) document.addEventListener('click', handleClickOutside);

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
          onClick={toggleOpen}
        >
          {selected}
        </div>
        <div className={`select-items ${open ? '' : 'select-hide'}`}>{
          options.map((option, idx) => (
            <div
              key={idx}
              className={selected === option ? 'same-as-selected' : ''}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))
        }</div>
      </div>
    </div>
  );
}

export default function Button() {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Formatter for PKR currency without trailing .00 when not needed
  const formatPKR = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (!numericValue) return '';
    const number = parseFloat(numericValue);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: number % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2
    }).format(number);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleKeyDown = (e) => {
    const { key } = e;
    if (/^[0-9]$/.test(key)) {
      setAmount(prev => prev + key);
    } else if (key === 'Backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.' && !amount.includes('.')) {
      setAmount(prev => prev + key);
    }
    e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="open-modal-button" onClick={openModal}>
          Create a sell
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Sell</h2>
              <button className="close-icon" onClick={closeModal}>×</button>
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
                  placeholder="Rs. 0"
                  value={amount ? formatPKR(amount) : ''}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="sell-button" onClick={closeModal}>Sell</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
