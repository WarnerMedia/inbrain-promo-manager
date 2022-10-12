import clsx from 'clsx';

export default function Complete({ items }) {
  return (
    <ul className="mx-3 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mx-0 md:grid-cols-3">
      {items.map((promo) => (
        <li
          key={promo.id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 p-8">
            <div
              id={promo.id}
              className="flex w-full flex-col items-center justify-start px-4"
            >
              <div className="aspect-w-16 aspect-h-9 h-full w-full">
                <a
                  className=""
                  href={promo.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="h-full w-full object-cover object-center"
                    src={`${promo.imageSrc}?w=410&h=230`}
                    alt={promo.imageAlt}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://via.placeholder.com/410/230';
                    }}
                  />
                </a>
              </div>
              <div className="mx-2 flex w-full items-start justify-between pt-2">
                <div className="flex flex-col items-start">
                  <div className="text-md text-left font-bold">
                    {promo.text}
                  </div>
                  <div className="text-xs">{promo.subtext}</div>
                </div>
                <div className="self-center">
                  <img
                    src={promo.logoSrc}
                    alt={promo.logoAlt}
                    className={clsx(
                      'max-w-[80px]',
                      promo.logoStyle
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
