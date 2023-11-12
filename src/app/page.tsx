import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Homepage from "@/components/Homepage";
import UserTypes from "@/components/UserTypes";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col min-h-[calc(100vh-64px)] w-[95%] max-w-[1600px] max-[1280px]:m-auto mb-16 overflow-hidden">
        <Homepage />
        <UserTypes />
        <Feature />
      </div>
      <Footer />
    </section>
  );
}
