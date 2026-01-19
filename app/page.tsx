import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full flex justify-between items-center p-6 md:p-12 z-50 mix-blend-difference">
        <div className="text-xl font-bold tracking-widest">DEVS • BAND</div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-gray-400 transition-colors">SERVICES</a>
          <a href="#about" className="hover:text-gray-400 transition-colors">ABOUT</a>
          <a href="#contact" className="hover:text-gray-400 transition-colors">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
          TURNING IDEAS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            INTO REALITY
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          Professional development of high-quality websites, applications, branding & logos.
          Since 2015.
        </p>
        <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-wide">
          START A PROJECT
        </button>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 md:px-12 bg-neutral-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <ServiceItem 
            number="01" 
            title="Web Development" 
            desc="High-performance websites and stress-resistant servers built for scale." 
          />
          <ServiceItem 
            number="02" 
            title="Mobile Apps" 
            desc="Native iOS & Android applications with intuitive user experiences." 
          />
          <ServiceItem 
            number="03" 
            title="UI/UX Design" 
            desc="Designing user-friendly interfaces that convert visitors into users." 
          />
          <ServiceItem 
            number="04" 
            title="Branding" 
            desc="Crafting recognizable logos and visual identities for modern businesses." 
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} DEVS • BAND. All rights reserved.</p>
      </footer>
    </main>
  );
}

// Simple helper component for the grid
function ServiceItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="border-t border-gray-700 pt-8">
      <span className="text-purple-500 font-mono text-sm mb-2 block">{number}</span>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
