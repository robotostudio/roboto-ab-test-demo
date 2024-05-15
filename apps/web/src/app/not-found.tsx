import { Footer } from '~/components/global/footer';
import { Navbar } from '~/components/global/navbar';

export default function NotFound() {
  return (
    <html lang="en-GB">
      <body>
        <main>
          <Navbar />
          <section className="grid min-h-screen place-items-center">
            <h1 className="text-4xl font-bold">Not Found</h1>
          </section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
