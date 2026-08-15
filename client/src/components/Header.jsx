export default function Header() {
  return (
    <>
      <div className="fixed top-0 left-0 w-auto bg-[#FFF4EA]">
        <div className="flex items-center justify-left h-16 px-4 py-4 space-x-8 text-[#C96868] text-lg">
          <img className="h-10 w-13 rounded-lg mx-2" src="/logo.png" />
          <div className="text-2xl font-bold">Blogify </div>
        </div>
      </div>
    </>
  );
}
