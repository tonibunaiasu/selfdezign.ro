import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import Layout from "@/components/Layout";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "irina-stoica",
    name: "Irina Stoica",
    role: "Fondator & Lead Designer",
    bio: "Cu o experiență de peste 15 ani în design interior, Irina este vizionara din spatele SelfDezign. Pasiunea ei pentru spații care reflectă personalitatea celor care le locuiesc a stat la baza filozofiei studioului.",
    image: "/awards/irina-stoica.webp",
    linkedin: "https://linkedin.com/in/irina-stoica",
    email: "irina@selfdezign.ro"
  },
  {
    id: "toni-bunaiasu",
    name: "Toni Bunăiașu",
    role: "Co-Fondator & Business Development",
    bio: "Toni aduce viziunea strategică și asigură că fiecare proiect SelfDezign depășește așteptările clienților. Experiența sa în management și dezvoltare de business completează perfect latura creativă a echipei.",
    image: "/team/toni-bunaiasu.webp",
    linkedin: "https://linkedin.com/in/toni-bunaiasu",
    email: "toni@selfdezign.ro"
  },
  {
    id: "marco",
    name: "Marco",
    role: "Senior Interior Designer",
    bio: "Marco aduce o perspectivă fresh și inovatoare în fiecare proiect. Specializat în design comercial și office, el transformă spațiile de lucru în medii care inspiră productivitate și creativitate.",
    image: "/team/marco.webp",
    email: "marco@selfdezign.ro"
  },
  {
    id: "teodora-brancus",
    name: "Teodora Brâncuș",
    role: "Interior Designer",
    bio: "Teodora este expertă în design rezidențial și are un ochi deosebit pentru detalii. Abordarea ei empatică o ajută să înțeleagă profund nevoile clienților și să creeze spații cu adevărat personalizate.",
    image: "/team/teodora-brancus.webp",
    email: "teodora@selfdezign.ro"
  }
];

export default function Team() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              ECHIPA<span className="text-[#d4ff00]">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Oamenii din spatele proiectelor care transformă spații în povești.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo */}
                  <div className="w-full md:w-48 h-64 md:h-56 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#d4ff00] to-[#a8cc00]">
                              <span class="text-4xl font-bold text-black">${member.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#d4ff00] font-medium mb-4 bg-black inline-block px-3 py-1 text-sm">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#d4ff00] hover:text-black transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#d4ff00] hover:text-black transition-colors"
                        >
                          <Mail size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vrei să faci parte din echipă?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Căutăm mereu oameni pasionați de design, care cred că spațiile pot schimba vieți. 
                Dacă te regăsești în valorile noastre, hai să vorbim.
              </p>
              <a
                href="mailto:hello@selfdezign.ro?subject=Aplicație pentru echipa SelfDezign"
                className="inline-flex items-center gap-2 bg-[#d4ff00] text-black px-8 py-4 font-bold hover:bg-white transition-colors"
              >
                <Mail size={20} />
                TRIMITE-NE CV-UL TĂU
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Note about photos */}
      <section className="py-8 bg-gray-100">
        <div className="container">
          <p className="text-center text-gray-500 text-sm">
            * Fotografiile membrilor echipei vor fi actualizate în curând.
          </p>
        </div>
      </section>
    </Layout>
  );
}
