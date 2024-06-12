import AppBar from "../AppBar/AppBar"

export default function AppLayout({ children }) {
  return (
    <>
      <AppBar />
      <main style={{ marginTop: '60px' }}>
        {children}
      </main>
    </>
  );
}