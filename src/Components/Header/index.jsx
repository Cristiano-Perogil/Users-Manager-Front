import React, { useRef, useState } from "react";
import './header.css';

function Header() {
    const filters = useRef(null);

    const [filtersOption, setFiltersOption] = useState('');
    const [isTypeNum, setIsTypeNum] = useState(false);
    const [searchField, setSearchField] = useState('');
    const [noFilters, setNoFilters] = useState(false);
    const [emptySearch, setEmptySearch] = useState(false);
    const [clearFilters, setClearFilters] = useState(false);

    function handdleFilterSelection() {
        filters.current.value == 'ID' || filters.current.value == 'departmentNumber' ?
            setIsTypeNum(true) : setIsTypeNum(false);
    }

    function validateFields() {
        if (searchField == '' && filtersOption == '') {
            updateState(setNoFilters, true);
            updateState(setEmptySearch, true);
        } else if (filtersOption == '') {
            updateState(setNoFilters, true);
        } else if (searchField == '') {
            updateState(setEmptySearch, true);
        }
    }

    function clearFields() {
        updateState(setFiltersOption, '');
        updateState(setSearchField, '');
        updateState(setNoFilters, false);
        updateState(setEmptySearch, false);
        filters.current.focus();
    }

    function updateState(state, value) {
        state(value);
    }

    return (
        <header aria-label="Heading">
            <div className="field-aria">
                <select value={filtersOption} ref={filters} aria-label="select a filter" onChange={(e) => { handdleFilterSelection(); updateState(setFiltersOption, e.target.value); updateState(setNoFilters, false); }}>
                    <option value=''>___</option>
                    <option value='ID'>ID</option>
                    <option value='name'>Name</option>
                    <option value='city'>City</option>
                    <option value='role'>Role</option>
                    <option value='departmentNumber'>Department Number</option>
                </select>
                {noFilters && <div className="warn-aria" role="alert">
                    <i className='fas fa-exclamation-circle'></i>
                    <span>You must choose a filter type</span>
                </div>}
            </div>
            <div className='field-aria'>
                <input
                    id="searchField"
                    type={isTypeNum ? "number" : "text"}
                    placeholder="Search users according to the filters to the left"
                    aria-label="search user"
                    value={searchField}
                    onChange={(e) => { updateState(setSearchField, e.target.value); updateState(setEmptySearch, false); }}
                />
                {emptySearch && <div className="warn-aria" role="alert">
                    <i className='fas fa-exclamation-circle'></i>
                    <span>You must fill this field with any information</span>
                </div>}
                {clearFilters && <button className="filterActions" aria-label="Clear Filters" title="Clear Filters" onClick={() => { updateState(setClearFilters, false); clearFields(); }}>
                    <i className="fas fa-eraser"></i>
                </button>}
                <button className="filterActions" aria-label="Search User" title="Search User" onClick={() => { updateState(setClearFilters, true); validateFields() }}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
            <button>Add User</button>
        </header >
    )
}

export default Header