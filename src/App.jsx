import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RequestReporter from './Components/RequestReporter';
import Modal, { ModalBody } from './Components/Modal';
import ModalText from './Components/ModalText';
import Input from './Components/Input';
import UsersTable from './Components/UsersTable';
import { addUser, deleteUser, editUser, getUsers } from './Requests';
import { validateFields, validateFilters, handelFielterChange } from '../Helpers';
import { formFields } from './Models';
import { setCurrentUserFields } from './Store/actions';
import './App.css';

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
  const [isTypeNumber, setIsTypeNum] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);

  // The actions related to the filters when there's one applied
  function handleFiltersSelection() {
    filterSelector.current.value == 'ID' || filterSelector.current.value == 'department_number' ?
      setIsTypeNum(true) : setIsTypeNum(false);
  }

  function handleClearFilters() {
    setClearFilters(false);
    filterSelector.current.focus();
    setFilters(formFields('filter-fields'));
  }

  function applyFilters() {
    validateFilters(
      filters,
      setFilters,
      () => getUsers(true, filters.method.value, filters.keyWord.value, setUsers, dispatch),
      setClearFilters
    );
  }

  // The Modal section
  const [currentUser, setCurrentUser] = useState({ name: '', id: 0 });
  const [modalTextKind, setModalTextKind] = useState('');

  // The form fields
  const inputFields = useSelector((state) => state.formFields);
  const requestStatus = useSelector((state) => state.requestReporter);

  // Getting Users as their is no filter applied
  function getUsersWithNoFilters() {
    getUsers(false, '', '', setUsers, dispatch);
  }

  // Shifting the type of validation according to what is requested
  function validateBeforeSubmit() {
    switch (modalTextKind) {
      case 'addition':
        validateFields(
          inputFields,
          () => addUser(inputFields, getUsersWithNoFilters, dispatch, setOpenModal),
          null, null, false, null, dispatch
        );
        break;
      case 'edition':
        validateFields(
          inputFields,
          () => editUser(currentUser.id, inputFields, getUsersWithNoFilters, dispatch, setOpenModal),
          null, null, false, null, dispatch
        );
        break;
      case 'deletion':
        deleteUser(
          currentUser.id,
          getUsersWithNoFilters,
          dispatch,
          setOpenModal
        );
        break;
      default:
        return false;
    }
  }

  useEffect(() => {
    getUsersWithNoFilters();
  }, []);

  return (
    <div className='container'>
      {requestStatus.status.isVisible && <RequestReporter />}
      <header aria-label="Heading">
        <div className="field-aria">
          <select
            name='method'
            value={filters.method.value}
            aria-label="select a filter"
            onChange={(e) => { handleFiltersSelection(); handelFielterChange(e, setFilters); }}
            ref={filterSelector}
            disabled={users.length == 0 ? true : false}
          >
            <option value=''>___</option>
            <option value='ID'>ID</option>
            <option value='name'>Name</option>
            <option value='city'>City</option>
            <option value='role'>Role</option>
            <option value='department_number'>Department Number</option>
          </select>
          {filters.method.isEmpty && <div className="warn-aria" role="alert">
            <i className='fas fa-exclamation-circle'></i>
            <span>You must choose a filter type</span>
          </div>}
        </div>
        <div className='field-aria'>
          <input
            id="searchField"
            name='keyWord'
            type={isTypeNumber ? 'number' : 'text'}
            placeholder="Search users according to the filters to the left"
            aria-label="search user"
            value={filters.keyWord.value}
            onChange={(e) => { handleFiltersSelection(); handelFielterChange(e, setFilters); }}
            disabled={users.length == 0 ? true : false}
          />
          {filters.keyWord.isEmpty && <div className="warn-aria" role="alert">
            <i className='fas fa-exclamation-circle'></i>
            <span>You must fill this field with any information</span>
          </div>}
          {clearFilters && <button
            className="filterActions"
            aria-label="Clear Filters"
            title="Clear Filters"
            onClick={() => { handleClearFilters(); getUsersWithNoFilters(); }}
          >
            <i className="fas fa-eraser"></i>
          </button>}
          <button
            className="filterActions"
            aria-label="Search User"
            title="Search User"
            onClick={() => applyFilters()}
            disabled={users.length == 0 ? true : false}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        <button
          onClick={() => { setOpenModal(true); setModalTextKind('addition'); }}
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
        close={() => { setOpenModal(false); dispatch(setCurrentUserFields('RESET')); }}
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
                value={inputFields.name.value}
                min={inputFields.name.minLength}
                max={inputFields.name.maxLength}
                placeholder="What is the full name of the one to be added to the database?"
                isInvalid={inputFields.name.isInvalid}
              />
              <Input
                key={2}
                label='Age'
                type='number'
                name='age'
                value={inputFields.age.value}
                min={inputFields.age.mimLength}
                max={inputFields.age.maxLength}
                placeholder="How old is this one?"
                isInvalid={inputFields.age.isInvalid}
              />
              <Input
                key={3}
                label='City'
                type='text'
                name='city'
                value={inputFields.city.value}
                min={inputFields.city.minLength}
                max={inputFields.city.maxLength}
                placeholder="Where do they live? (city)"
                isInvalid={inputFields.city.isInvalid}
              />
              <Input
                key={5}
                label='Role'
                type='text'
                name='role'
                value={inputFields.role.value}
                min={inputFields.role.minLength}
                max={inputFields.role.maxLength}
                placeholder='What do they do?'
                isInvalid={inputFields.role.isInvalid}
              />
              <Input
                key={6}
                label='Department Number'
                type='number'
                name='department_number'
                value={inputFields.department_number.value}
                min={inputFields.department_number.minLength}
                max={inputFields.department_number.maxLength}
                placeholder='Which department do they belong to? (Just Numbers)'
                isInvalid={inputFields.department_number.isInvalid}
              />
            </form>
          }
        </ModalBody>
      </Modal>
    </div >
  );
}

export default App;
