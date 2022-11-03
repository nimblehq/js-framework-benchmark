import Image from 'next/image';

type IconProps = {
  name: string;
  alt?: string;
};

const Icon = ({ name, alt }: IconProps) => {
  return (
    <>
      <Image
        src={`/images/icons/${name}.svg`}
        alt={alt}
        width={16}
        height={16}
      />
    </>
  );
};

export default Icon;
