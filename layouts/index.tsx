export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <div className="flex flex-col justify-center items-center m-8">{children}</div>;
}
