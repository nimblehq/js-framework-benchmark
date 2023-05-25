type HeaderUserProfileProps = {
  name: string;
};

const HeaderUserProfile = ({ name, ...rest }: HeaderUserProfileProps) => {
  return (
    <div className="user-profile" {...rest}>
      <div className="user-profile__name">{name}</div>
    </div>
  );
};

export default HeaderUserProfile;
