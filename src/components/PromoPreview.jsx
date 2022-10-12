import clsx from 'clsx';

export default function PromoPreview({ id, link, text, subtext, image, logo }) {
  const onError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://placekitten.com/410/230';
  };

  return (
    <div
      id={id}
      className="flex w-full flex-col items-center justify-start px-4"
    >
      <div className="aspect-w-16 aspect-h-9 h-full w-full">
        <a className="" href={link} target="_blank" rel="noreferrer">
          <img
            className="h-full w-full object-cover object-center"
            src={`${image.src}?w=410&h=230`}
            alt={image.alt}
            onError={onError}
          />
        </a>
      </div>
      <div className="mx-2 flex w-full items-start justify-between pt-2">
        <div className="flex flex-col items-start">
          <div className="md:text-md text-xl font-bold lg:text-xl">{text}</div>
          <div className="text-sm md:text-xs lg:text-sm">{subtext}</div>
        </div>
        <div className="self-center">
          <img
            src={logo.src}
            alt={logo.alt}
            className={clsx('grayscale invert', logo.style)}
          />
        </div>
      </div>
    </div>
  );
}
