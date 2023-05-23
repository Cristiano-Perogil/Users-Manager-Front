import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RequestReporter from './Components/RequestReporter/RequestReporter';
import Modal, { ModalBody } from './Components/Modal';
import ModalText from './Components/ModalText';
import Input from './Components/Input';
import UsersTable from './Components/UsersTable';
import { addUser, deleteUser, editUser, getUsers } from './Requests';
import { validateFields, handleChange } from '../Helpers';
import { formFields } from './Models';
import { setCurrentUserFields } from './Store/actions';
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
  const [users, setUsers] = useState([]);

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
  const [currentUser, setCurrentUser] = useState({ name: '', ID: 0 });
  const [modalTextKind, setModalTextKind] = useState('');

  // The form fields
  const inputFields = useSelector((state) => state.formFields.fields);
  const [emptyInputFields, setEmptInputFields] = useState(formFields('empty-fields'))
  const requestStatus = useSelector((state) => state.requestReporter.status);

  // Shifting the type of validation according to what is requested
  function validateBeforeSubmit() {
    switch (modalTextKind) {
      case 'addition':
        validateFields(inputFields, setEmptInputFields, () => addUser(inputFields, () => getUsers(false, '', '', setUsers, dispatch), dispatch, setOpenModal));
        break;
      case 'edition':
        validateFields(inputFields, setEmptInputFields, () => editUser(currentUser.ID, inputFields, () => getUsers(false, '', '', setUsers, dispatch), dispatch, setOpenModal));
        break;
      case 'deletion':
        deleteUser(currentUser.ID, () => getUsers(false, '', '', setUsers, dispatch), dispatch, setOpenModal);
        break;
      default:
        return false;
    }
  }

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
          {clearFilters && <button className="filterActions"
            aria-label="Clear Filters"
            title="Clear Filters"
            onClick={() => { handleClearFilters(); getUsers(false, '', '', setUsers, dispatch) }}
          >
            <i className="fas fa-eraser"></i>
          </button>}
          <button
            className="filterActions"
            aria-label="Search User"
            title="Search User"
            onClick={() => validateFields(filters, setEmptyFilter, () => { setClearFilters(true); getUsers(true, filters.method, filters.keyWord, setUsers, dispatch); })}
            disabled={users.length == 0 ? true : false}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <button
          onClick={() => { setOpenModal(true); setModalTextKind('addition'); }}
          disabled={users.length == 0 ? true : false}
        >
          Add User
        </button>
      </header >
      {users.length == 0 ?
        (<p id='empty-request-msg'>There is nothing to be shown!<br />Checkout your network connection and refrash the page.</p>) :
        (<UsersTable
          setOpenModal={setOpenModal}
          setModalKind={setModalTextKind}
          setCurrentUser={setCurrentUser}
          users={users}
        />)
      }
      <Modal
        show={openModal}
        title={modalTextKind}
        close={() => { setOpenModal(false); dispatch(setCurrentUserFields('RESET')); setEmptInputFields(formFields('empty-fields')); }}
        validateAndSubmit={() => validateBeforeSubmit()}
      >
        <ModalBody>
          <ModalText
            kind={modalTextKind}
            currentUser={currentUser.name}
          />
          {(modalTextKind == 'addition' || modalTextKind == 'edition') &&
            <form>
              <Input
                key={1}
                label='Name'
                type='text'
                name='name'
                value={inputFields.name}
                min={5}
                max={50}
                placeholder="What is the full name of the one to be added to the database?"
                isInvalid={emptyInputFields.name}
                onErrorVerify={setEmptInputFields}
              />
              <Input
                key={2}
                label='Age'
                type='number'
                name='age'
                value={inputFields.age}
                placeholder="How old is this one?"
                isInvalid={emptyInputFields.age}
                onErrorVerify={setEmptInputFields}
              />
              <Input
                key={3}
                label='City'
                type='text'
                name='city'
                value={inputFields.city}
                min={4}
                max={50}
                placeholder="Where do they live? (city)"
                isInvalid={emptyInputFields.city}
                onErrorVerify={setEmptInputFields}
              />
              <Input
                key={5}
                label='Role'
                type='text'
                name='role'
                value={inputFields.role}
                min={5}
                max={50}
                placeholder='What do they do?'
                isInvalid={emptyInputFields.role}
                onErrorVerify={setEmptInputFields}
              />
              <Input
                key={6}
                label='Department Number'
                type='number'
                name='departmentNumber'
                value={inputFields.departmentNumber}
                placeholder='Which department do they belong to? (Just Numbers)'
                isInvalid={emptyInputFields.departmentNumber}
                onErrorVerify={setEmptInputFields}
              />
            </form>
          }
        </ModalBody>
      </Modal>
    </div >
  )
}
export default App
