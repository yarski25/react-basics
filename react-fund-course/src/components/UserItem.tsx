import { IUser } from '../types/interfaces/User';

type UserItemProps = {
  user: IUser;
  update: (user: IUser) => void;
  remove: (user: IUser) => void;
};

const UserItem = ({ user, update, remove }: UserItemProps) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    remove(user);
  };

  const handleUpdate = () => {
    const name = prompt() || '';
    update({ ...user, name });
  };

  return (
    <div
      className='user'
      onClick={handleUpdate}
    >
      {user.id}. {user.name} {user.email}
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
};

export default UserItem;
