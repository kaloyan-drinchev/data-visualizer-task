import type { User } from '../interfaces/interfaces';

interface UserFilterProps {
  users: User[];
  userId: string;
  setUserId: (id: string) => void;
}

const UserFilter = ({ users, userId, setUserId }: UserFilterProps) => (
  <div className='navbar'>
    <h3>Filter posts by user:</h3>
    <select
      id="user-filter"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
    >
      <option value="">All</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  </div>
);

export default UserFilter;