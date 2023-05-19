import { useTypedSelector } from '../hooks/useTypedSelector';

const UserList = () => {
  const { users, error, loading } = useTypedSelector((state) => state.user);
  console.log(users);
  console.log(error);
  console.log(loading);
  return <div></div>;
};

export default UserList;
