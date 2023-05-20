import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RequestReporter from './Components/RequestReporter/RequestReporter';
import Modal, { ModalBody } from './Components/Modal';
import ModalText from './Components/ModalText';
import Input from './Components/Input';
import getUsers from './Requests/getUsers';
import { validateFields, handleChange } from '../Helpers';
import { formFields } from './Models';
import { setRequestStatus } from './Store/actions';
import './App.css'

function App() {
    // Initializing the dispatch hook
    const dispatch = useDispatch();
    // References to the DOM
    const filterSelector = useRef(null);

    // States
    // Refers to the action of opening and closing the modal window
    const [openModal, setOpenModal] = useState(false);

    // Stores the users got from the back-end
    const [users, setUsers] = useState();

    // Refer to the header section, including the filter handlers
    const [filters, setFilters] = useState(formFields('filter-fields'));
    const [emptyFilter, setEmptyFilter] = useState(formFields('empty-filter-fields'));
    const [isTypeNumber, setIsTypeNum] = useState(false);
    const [clearFilters, setClearFilters] = useState(false);

    // The actions related to the filters when there's one applied
    function handleFiltersSelection() {
        filterSelector.current.value == 'ID' || filterSelector.current.value == 'departmentNumber' ?
            setIsTypeNum(true) : setIsTypeNum(false);
    }

    function handleClearFilters() {
        setClearFilters(false);
        setEmptyFilter(formFields('empty-filter-fields'));
        setFilters(formFields('filter-fields'));
        filterSelector.current.focus();
    }

    // The Modal section
    const [currentUser, setCurrentUser] = useState('Maria');
    const [modalTextKind, setModalTextKind] = useState('');

    // The form fields
    const inputFields = useSelector((state) => state.formFields.fields);
    const [emptyInputFields, setEmptInputFields] = useState(formFields('empty-fields'))
    const requestStatus = useSelector((state) => state.requestReporter.status);

    useEffect(() => {
        getUsers(false, '', '', setUsers, dispatch);
    }, []);

    return (
        <div className='container'>
            {requestStatus.isVisible && <RequestReporter />}
            <header aria-label="Heading">
                <div className="field-aria">
                    <select name='method' value={filters.method} aria-label="select a filter" onChange={(e) => { handleFiltersSelection(); handleChange(e, setFilters); setEmptyFilter(prevState => ({ ...prevState, method: false })); }} ref={filterSelector}>
                        <option value=''>___</option>
                        <option value='ID'>ID</option>
                        <option value='name'>Name</option>
                        <option value='city'>City</option>
                        <option value='role'>Role</option>
                        <option value='departmentNumber'>Department Number</option>
                    </select>
                    {emptyFilter.method && <div className="warn-aria" role="alert">
                        <i className='fas fa-exclamation-circle'></i>
                        <span>You must choose a filter type</span>
                    </div>}
                </div>
                <div className='field-aria'>
                    <input
                        id="searchField"
                        name='keyWord'
                        type={isTypeNumber ? "number" : "text"}
                        placeholder="Search users according to the filters to the left"
                        aria-label="search user"
                        value={filters.keyWord}
                        onChange={(e) => { handleFiltersSelection(); handleChange(e, setFilters); setEmptyFilter(prevState => ({ ...prevState, keyWord: false })); }}
                    />
                    {emptyFilter.keyWord && <div className="warn-aria" role="alert">
                        <i className='fas fa-exclamation-circle'></i>
                        <span>You must fill this field with any information</span>
                    </div>}
                    {clearFilters && <button className="filterActions" aria-label="Clear Filters" title="Clear Filters" onClick={handleClearFilters}>
                        <i className="fas fa-eraser"></i>
                    </button>}
                    <button className="filterActions" aria-label="Search User" title="Search User" onClick={() => validateFields(filters, setEmptyFilter, () => { setClearFilters(true); getUsers(true, 'city', 'cascavel', setUsers, dispatch); dispatch(setRequestStatus('SET_VISIBILITY', true)); })}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <button
                    onClick={() => { setOpenModal(true); setModalTextKind('addition'); }}
                >
                    Add User
                </button>
            </header >
            <Modal
                show={openModal}
                title="Edit User"
                close={() => setOpenModal(false)}
            >
                <ModalBody>
                    <ModalText
                        kind={modalTextKind}
                        currentUser={currentUser}
                    />
                    {(modalTextKind == 'addition' || modalTextKind == 'edition') &&
                        <form>
                            <Input
                                key={23}
                                label='Name'
                                type='text'
                                name='name'
                                placeholder="Full Name"
                                isInvalid={emptyInputFields.name}
                            />
                            <Input
                                key={22}
                                label='Age'
                                type='number'
                                name='age'
                                placeholder="How old is this one?"
                                isInvalid={emptyInputFields.age}
                            />
                        </form>
                    }
                </ModalBody>
            </Modal>
        </div >
    )
}
export default App
