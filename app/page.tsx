import { ProfileForm } from "./_components/form";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-20">
      <header className="mb-5">
        <h1 className="text-3xl font-bold">영화 정보</h1>
      </header>

      <div className="flex">
        <ProfileForm />
      </div>
    </main>
  );
}
