import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { resolvePayloadMediaUrl, usePayloadPage } from "@/lib/payload";
import { getLocalImageProps } from "@/lib/images";
import SEO from "@/components/SEO";

interface TeamMember {
  id?: string;
  name: string;
  roleRo: string;
  roleEn: string;
  bioRo: string;
  bioEn: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "irina-stoica",
    name: "Irina Stoica",
    roleRo: "Fondator & Lead Designer",
    roleEn: "Founder & Lead Designer",
    bioRo: "Cu o experiență de peste 15 ani în design interior, Irina este vizionara din spatele SelfDezign. Pasiunea ei pentru spații care reflectă personalitatea celor care le locuiesc a stat la baza filozofiei studioului.",
    bioEn: "With over 15 years of experience in interior design, Irina is the visionary behind SelfDezign. Her passion for spaces that reflect the personality of those who inhabit them has been the foundation of the studio's philosophy.",
    image: "/team/totem-irina.svg",
    linkedin: "https://linkedin.com/in/irina-stoica",
    email: "irina@selfdezign.ro"
  },
  {
    id: "toni-bunaiasu",
    name: "Toni Bunăiașu",
    roleRo: "Co-Fondator & Business Development",
    roleEn: "Co-Founder & Business Development",
    bioRo: "Toni aduce viziunea strategică și asigură că fiecare proiect SelfDezign depășește așteptările clienților. Experiența sa în management și dezvoltare de business completează perfect latura creativă a echipei.",
    bioEn: "Toni brings strategic vision and ensures that every SelfDezign project exceeds client expectations. His experience in management and business development perfectly complements the creative side of the team.",
    image: "/team/totem-toni.svg",
    linkedin: "https://linkedin.com/in/toni-bunaiasu",
    email: "toni@selfdezign.ro"
  },
  {
    id: "mario",
    name: "Mario",
    roleRo: "Junior Interior Designer",
    roleEn: "Junior Interior Designer",
    bioRo: "Mario aduce o perspectivă fresh și inovatoare în fiecare proiect. Specializat în design comercial și office, el transformă spațiile de lucru în medii care inspiră productivitate și creativitate.",
    bioEn: "Mario brings a fresh and innovative perspective to every project. Specializing in commercial and office design, he transforms workspaces into environments that inspire productivity and creativity.",
    image: "/team/totem-mario.svg",
    email: "mario@selfdezign.ro"
  },
  {
    id: "pina-bodega",
    name: "Pina Bodega",
    roleRo: "Interior Designer",
    roleEn: "Interior Designer",
    bioRo: "Pina este expertă în design rezidențial și are un ochi deosebit pentru detalii. Abordarea ei empatică o ajută să înțeleagă profund nevoile clienților și să creeze spații cu adevărat personalizate.",
    bioEn: "Pina is an expert in residential design and has a keen eye for detail. Her empathetic approach helps her deeply understand client needs and create truly personalized spaces.",
    image: "/team/totem-pina.svg",
    email: "pina@selfdezign.ro"
  }
];

export default function Team() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("team");
  const cmsLayout = page?.teamLayout;
  const cmsMembers = cmsLayout?.members?.length
    ? cmsLayout.members.map((member, index) => ({
        id:
          member.name
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || `member-${index}`,
        name: member.name || "",
        roleRo: member.roleRo || member.roleEn || "",
        roleEn: member.roleEn || member.roleRo || "",
        bioRo: member.bioRo || member.bioEn || "",
        bioEn: member.bioEn || member.bioRo || "",
        image: resolvePayloadMediaUrl(
          typeof member.image === "string"
            ? member.image
            : member.image && typeof member.image === "object"
            ? member.image.url
            : ""
        ),
        linkedin: member.linkedin,
        email: member.email,
      }))
    : null;
  const members = cmsMembers?.length ? cmsMembers : teamMembers;
  const heroTitle = cmsLayout?.heroTitle || t.team.title;
  const heroSubtitle = cmsLayout?.heroSubtitle || t.team.subtitle;
  const joinTitle =
    cmsLayout?.joinTitle ||
    (language === "ro" ? "Vrei să faci parte din echipă?" : "Want to join the team?");
  const joinText =
    cmsLayout?.joinText ||
    (language === "ro"
      ? "Căutăm mereu oameni pasionați de design, care cred că spațiile pot schimba vieți. Dacă te regăsești în valorile noastre, hai să vorbim."
      : "We're always looking for people passionate about design who believe that spaces can change lives. If you share our values, let's talk.");
  const joinCtaLabel =
    cmsLayout?.joinCtaLabel ||
    (language === "ro" ? "TRIMITE-NE CV-UL TĂU" : "SEND US YOUR CV");
  const joinCtaHref =
    cmsLayout?.joinCtaHref ||
    "mailto:hello@selfdezign.ro?subject=Aplicație pentru echipa SelfDezign";
  const noteText =
    cmsLayout?.noteText ||
    (language === "ro"
      ? "* Fotografiile membrilor echipei vor fi actualizate în curând."
      : "* Team member photos will be updated soon.");
  const seoTitle = page?.seoTitle || t.team.title;
  const seoDescription = page?.seoDescription || t.team.subtitle;
  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  if (page?.renderMode === "replace" && page.html) {
    return (
      <section className="py-20">
        <div className="container">
          <PayloadHtml html={page.html} />
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        url="/echipa"
      />
      {payloadMode === "prepend" ? payloadSection : null}
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
              {heroTitle}<span className="text-accent">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {members.map((member, index) => (
              <motion.div
                key={member.id || member.name || `member-${index}`}
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
                      {(() => {
                        const isLocalImage =
                          member.image.startsWith("/") &&
                          !member.image.startsWith("/media/");
                        return (
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        {...(isLocalImage
                          ? getLocalImageProps(
                              member.image,
                              "(max-width: 768px) 100vw, 50vw"
                            )
                          : {})}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5c400] to-[#fde68a]">
                              <span class="text-4xl font-bold text-black">${member.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                          `;
                        }}
                      />
                        );
                      })()}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[var(--color-brand-yellow)] font-medium mb-4 bg-black inline-block px-3 py-1 text-sm">
                      {language === 'ro' ? member.roleRo : member.roleEn}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {language === 'ro' ? member.bioRo : member.bioEn}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[var(--color-brand-yellow)] hover:text-black transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[var(--color-brand-yellow)] hover:text-black transition-colors"
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
                {joinTitle}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {joinText}
              </p>
              <a
                href={joinCtaHref}
                className="inline-flex items-center gap-2 bg-[var(--color-brand-yellow)] text-black px-8 py-4 font-bold hover:bg-[var(--color-brand-yellow)]/90 transition-colors"
              >
                <Mail size={20} />
                {joinCtaLabel}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Note about photos */}
      <section className="py-8 bg-gray-100">
        <div className="container">
          <p className="text-center text-gray-500 text-sm">
            {noteText}
          </p>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </>
  );
}
