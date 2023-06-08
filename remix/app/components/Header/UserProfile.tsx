import Dropdown from '../Dropdown';

interface HeaderUserProfileProps {
  name: string;
  avatarUrl: string | null;
}

export default function HeaderUserProfile({
  name,
  avatarUrl,
}: HeaderUserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      {avatarUrl ? (
        <img
          data-testid="headerUserImage"
          alt="user profile"
          src={avatarUrl}
          referrerPolicy="no-referrer"
          className="h-7 w-7 object-cover rounded-full"
        />
      ) : (
        <div
          data-testid="headerUserNoImage"
          className="h-7 w-7 object-cover rounded-full bg-gray-600"
        />
      )}
      <p>{name}</p>
      <Dropdown />
    </div>
  );
}
