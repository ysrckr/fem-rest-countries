type CardProps = {
  children: React.ReactNode;
  image: {
    src: string;
    alt: string;
  };
  title: string;
};

export const Card = ({ children, image, title }: CardProps) => {
  return (
    <div className="rounded-lg bg-white shadow-md dark:bg-dark-element dark:text-white">
      <div className="w-full overflow-hidden rounded-md">
        <img src={image.src} alt={image.alt} className="h-64 w-full p-0 md:h-56 lg:h-48" />
      </div>
      <div className="p-4">
        <h3 className="mb-4 text-xl font-bold">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};
