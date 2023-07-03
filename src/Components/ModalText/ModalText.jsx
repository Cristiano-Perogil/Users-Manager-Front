function ModalText(props) {
  const { kind, currentUser } = props;

  switch (kind) {
    case 'addition':
      return (
        <p>
          Fill the filds below to add a new user to the database.<br />
          All of them are <strong>mandatory!</strong>
        </p>
      );
    case 'edition':
      return (
        <p>
          Fill the fields below to edit {currentUser}&rsquo;s data.<br />
          All fields are <strong>mandatory!</strong><br />
          <strong>Attention: once you hit submit, the changes made will immediately reflect on the database, so be careful!</strong>
        </p>
      );
    case 'deletion':
      return (
        <p>
          Are you sure you want to delete <strong>{currentUser}</strong> from the database?<br />
          This action cannot be undone!
        </p>
      );
    default:
      return (<p>A problem occured!</p>);
  }
}

export default ModalText;
