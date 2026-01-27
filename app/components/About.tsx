"use client"

export default function About() {
  const features = [
    {
      icon: "✓",
      title: "Certification Professionnelle",
      description: "Diplômée en coaching sportif et nutrition, certifiée par les plus grandes institutions",
    },
    {
      icon: "✓",
      title: "Approche Personnalisée",
      description: "Programmes sur mesure adaptés à chacun, vos objectifs et votre rythme de vie",
    },
    {
      icon: "✓",
      title: "Suivi Continu",
      description: "Accompagnement régulier avec ajustements en temps réel pour garantir vos résultats",
    },
  ]

  return (
    <section id="about" className="py-24 bg-secondary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-violet/10 text-primary-violet rounded-full font-semibold mb-4">
            À PROPOS DE MOI
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary-dark mb-6 heading-uppercase">
            Votre Coach de Confiance
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-secondary-dark mb-6 font-body leading-relaxed">
                Passionnée par le sport et le bien-être, je vous accompagne dans votre <strong>transformation physique et mentale</strong>. 
                Avec plus de 10 ans d'expérience, j'ai aidé des centaines de personnes à atteindre leurs objectifs.
              </p>
              <p className="text-lg text-secondary-dark mb-8 font-body leading-relaxed">
                Mon approche est <strong>100% personnalisée</strong> : chaque programme est adapté à vos besoins, votre niveau et vos contraintes. 
                Ensemble, nous construirons un plan d'action efficace et durable pour des résultats durables.
              </p>
            </div>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white rounded-card hover:shadow-md transition-all hover-lift group"
                >
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-secondary-dark mb-1 text-lg">{feature.title}</h3>
                    <p className="text-secondary-dark/70 font-body">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="px-4 py-2 bg-white rounded-full border border-secondary-light shadow-sm">
                <span className="text-sm font-semibold text-secondary-dark">🏆 Certifiée</span>
              </div>
              <div className="px-4 py-2 bg-white rounded-full border border-secondary-light shadow-sm">
                <span className="text-sm font-semibold text-secondary-dark">⭐ 5/5 Avis</span>
              </div>
              <div className="px-4 py-2 bg-white rounded-full border border-secondary-light shadow-sm">
                <span className="text-sm font-semibold text-secondary-dark">💯 Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-card overflow-hidden shadow-2xl hover-lift transition-all">
              <div className="w-full h-full gradient-primary flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-violet/50 to-primary-rose/50"></div>
                <div className="relative text-white text-center p-8 z-10">
                  <div className="text-7xl mb-4 animate-pulse">💪</div>
                  <p className="text-2xl font-bold mb-2">Olwen</p>
                  <p className="text-lg opacity-90">Coach Professionnel</p>
                  <div className="mt-6 pt-6 border-t border-white/30">
                    <p className="text-sm opacity-80 italic">Photo professionnelle à ajouter</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full gradient-primary rounded-card opacity-10 -z-10 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
