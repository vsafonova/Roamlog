import SocialMedia from "../../SocialMedia";

export default function NavBar() {
  return (
    <nav className="absolute w-full z-10">
      <div className="flex items-center justify-between mx-4">
        <div>
          <img src="/images/LogoWhite.jpg" className="h-10" />
        </div>
        <div>
          <SocialMedia />
        </div>
      </div>
    </nav>
  );
}
