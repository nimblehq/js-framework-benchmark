type HeaderUserProfileProps = {
  name: string;
};

const HeaderUserProfile = ({ name, ...rest }: HeaderUserProfileProps) => {
  return (
    <div className="user-profile" {...rest}>
      {name}
    </div>
  );
};

export default HeaderUserProfile;
