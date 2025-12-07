import { Mail, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in discussing opportunities or collaboration? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card-elevated p-8 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-foreground font-medium hover:text-primary transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">Find me online</p>
                
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-primary group transition-colors"
                >
                  <Linkedin size={20} className="text-secondary-foreground group-hover:text-primary-foreground" />
                  <span className="font-medium text-secondary-foreground group-hover:text-primary-foreground">
                    LinkedIn
                  </span>
                  <ExternalLink size={14} className="ml-auto text-muted-foreground group-hover:text-primary-foreground" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-primary group transition-colors"
                >
                  <Github size={20} className="text-secondary-foreground group-hover:text-primary-foreground" />
                  <span className="font-medium text-secondary-foreground group-hover:text-primary-foreground">
                    GitHub
                  </span>
                  <ExternalLink size={14} className="ml-auto text-muted-foreground group-hover:text-primary-foreground" />
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-border text-center">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-all"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Mail size={20} />
                Send me an email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
