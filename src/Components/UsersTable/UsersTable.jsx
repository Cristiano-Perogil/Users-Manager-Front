import './users-table.css';

function UsersTable(props) {
  const { setOpenModal, setModalKind, setCurrentUser, users } = props;

  function shiftModalKind(currentUser, kind) {
    setOpenModal(true);
    setModalKind(kind);
    setCurrentUser(currentUser);
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
            <td key={`IDColumn${idx}`}>{user.ID}</td>
            <td key={`nameColumn${idx}`}>{user.name}</td>
            <td key={`ageColumn${idx}`}>{user.age}</td>
            <td key={`cityColumn${idx}`}>{user.city}</td>
            <td key={`roleColumn${idx}`}>{user.role}</td>
            <td key={`departmentNumberColumn${idx}`}>{user.departmentNumber}</td>
            <td key={`actionsColumn${idx}`} className='actionsColumn'>
              <button
                title='Edit User'
                aria-label='Edit User'
                onClick={() => shiftModalKind(user.name, 'edition')}
              >
                <i className='fas fa-edit'></i>
              </button>
              <button
                title='Delete User'
                aria-label='DeleteUser'
                onClick={() => shiftModalKind(user.name, 'deletion')}
              >
                <i className='fas fa-trash'></i>
              </button>
            </td>
          </tr >
        ))}
      </tbody >
    </table >
  )
}

export default UsersTable;
