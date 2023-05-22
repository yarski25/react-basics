import { userAPI } from '../api/UserService';
import { IUser } from '../types/interfaces/User';
import UserItem from './UserItem';

const UsersList = () => {
  //const [limit, setLimit] = useState(10);
  const { data: users, error, isLoading } = userAPI.useFetchAllUsersQuery(100);
  const [createUser] = userAPI.useCreateUserMutation();
  const [updateUser] = userAPI.useUpdateUserMutation();
  const [deleteUser] = userAPI.useDeleteUserMutation();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLimit(3);
  //     }, 2000);
  //   }, []);

  const handleCreate = async () => {
    const name = prompt();
    await createUser({ name, email: name } as IUser);
  };

  const handleUpdate = (user: IUser) => {
    updateUser(user);
  };

  const handleRemove = (user: IUser) => {
    deleteUser(user);
  };

  return (
    <div>
      <div className='user__list'>
        <button onClick={handleCreate}>Add new post</button>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error occured...</h1>}
        {users?.map((user) => (
          <UserItem
            update={handleUpdate}
            remove={handleRemove}
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
