type HeaderUserProfileProps = {
  name: string;
};

const HeaderUserProfile = ({ name }: HeaderUserProfileProps) => {
  return (
    <div className="user-profile" data-testid="profile">
      <div className="user-profile__name">{name}</div>
    </div>
  );
};

export default HeaderUserProfile;
