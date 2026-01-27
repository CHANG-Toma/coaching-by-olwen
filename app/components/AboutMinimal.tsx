export default function AboutMinimal() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-dark mb-6">
              Qui Suis-Je ?
            </h2>
            <p className="text-lg text-secondary-dark mb-4 font-body leading-relaxed">
              Passionnée par le sport et le bien-être, je vous accompagne dans votre transformation physique et mentale. 
              Avec plus de 10 ans d'expérience, j'ai aidé des centaines de personnes à atteindre leurs objectifs.
            </p>
            <p className="text-lg text-secondary-dark mb-6 font-body leading-relaxed">
              Mon approche est <strong>100% personnalisée</strong> : chaque programme est adapté à vos besoins, votre niveau et vos contraintes.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary-light rounded-full">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-secondary-dark">Certifiée</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary-light rounded-full">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-secondary-dark">10+ ans</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-violet to-primary-rose">
              <div className="w-full h-full flex items-center justify-center text-white p-8">
                <div className="text-center">
                  <div className="text-7xl mb-4">💪</div>
                  <p className="text-xl font-bold mb-2">Olwen</p>
                  <p className="text-sm opacity-80">Coach Professionnel</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary-violet/20 to-primary-rose/20 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
