import { useDispatch } from 'react-redux';
import { setCurrentUserFields } from '../../Store/actions';
import { structureData } from '../../../Helpers';
import './users-table.css';

function UsersTable(props) {
  const { setOpenModal, setModalKind, setCurrentUser, users } = props;
  const dispatch = useDispatch();

  function shiftModalKind(currentUser, kind) {
    setOpenModal(true);
    setModalKind(kind);
    setCurrentUser({ name: currentUser.name, id: currentUser.id });
    if (kind == 'edition') dispatch(setCurrentUserFields('SET_CURRENT_USER', currentUser));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>Role</th>
          <th>Department Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={`${idx}User`}>
            <td key={`IDColumn${idx}`} className='smallColumns'>{user.id}</td>
            <td key={`nameColumn${idx}`} className='mediumColumns'>{structureData(user.name)}</td>
            <td key={`ageColumn${idx}`} className='smallColumns'>{user.age}</td>
            <td key={`cityColumn${idx}`} className='mediumColumns'>{structureData(user.city)}</td>
            <td key={`roleColumn${idx}`} className='largeColumns'>{structureData(user.role)}</td>
            <td key={`department_numberColumn${idx}`} className='mediumnColumns'>{user.department_number}</td>
            <td key={`actionsColumn${idx}`} className='actionsColumn'>
              <button
                title='Edit User'
                aria-label='Edit User'
                onClick={() => shiftModalKind(user, 'edition')}
              >
                <i className='fas fa-edit'></i>
              </button>
              <button
                title='Delete User'
                aria-label='DeleteUser'
                onClick={() => shiftModalKind(user, 'deletion')}
              >
                <i className='fas fa-trash' style={{ color: 'red' }}></i>
              </button>
            </td>
          </tr >
        ))}
      </tbody >
    </table >
  );
}

export default UsersTable;
