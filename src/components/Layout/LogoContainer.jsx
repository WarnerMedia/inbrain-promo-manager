import Logo from '../Logo';

export default function LogoContainer({ className }) {
  return (
    <div className={className}>
      <span className="sr-only">Inbrain Promo Manager</span>
      <span className="mr-1 text-3xl font-bold tracking-tighter text-brand">
        in
      </span>
      <Logo className="h-10 w-auto fill-brand" />
    </div>
  );
}
