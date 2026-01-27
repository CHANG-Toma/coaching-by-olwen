"use client"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sophie M.",
      role: "Perte de poids • 6 mois",
      content: "Grâce à Olwen, j'ai perdu 15 kg en 6 mois et retrouvé confiance en moi. Son accompagnement est exceptionnel ! Le programme était parfaitement adapté à mon rythme.",
      rating: 5,
      result: "-15 kg",
      verified: true,
    },
    {
      name: "Marc D.",
      role: "Prise de masse • 4 mois",
      content: "Programme parfaitement adapté à mes objectifs. Les résultats sont au rendez-vous et je me sens plus fort que jamais. Je recommande à 100% !",
      rating: 5,
      result: "+8 kg",
      verified: true,
    },
    {
      name: "Julie L.",
      role: "Remise en forme • 3 mois",
      content: "Un coaching bienveillant et efficace. J'ai retrouvé l'énergie et la motivation que je pensais avoir perdues. Merci Olwen pour ce super accompagnement !",
      rating: 5,
      result: "En forme",
      verified: true,
    },
  ]

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-primary-violet/5 via-white to-primary-rose/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-violet/10 text-primary-violet rounded-full font-semibold mb-4">
            TÉMOIGNAGES CLIENTS
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary-dark mb-4 heading-uppercase">
            Ils Ont Réussi, Vous Aussi Pouvez
          </h2>
          <p className="text-xl text-secondary-dark/70 max-w-2xl mx-auto font-body">
            Découvrez les résultats obtenus par mes clients et leur expérience
          </p>
          
          {/* Overall rating */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-bold text-secondary-dark">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-secondary-dark/70">•</span>
            <span className="text-secondary-dark/70 font-medium">Basé sur 127 avis vérifiés</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-card p-8 shadow-lg border-2 border-secondary-light hover:border-primary-violet/30 hover:shadow-xl transition-all duration-300 hover-lift group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-secondary-dark flex items-center gap-2">
                      {testimonial.name}
                      {testimonial.verified && (
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-secondary-dark/60">{testimonial.role}</div>
                  </div>
                </div>
                {testimonial.result && (
                  <div className="px-3 py-1 bg-gradient-to-r from-primary-violet/10 to-primary-rose/10 rounded-full">
                    <span className="text-xs font-bold text-primary-violet">{testimonial.result}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-secondary-dark mb-6 font-body leading-relaxed italic relative">
                <span className="text-4xl text-primary-violet/20 absolute -top-2 -left-2">"</span>
                <span className="relative z-10">{testimonial.content}</span>
                <span className="text-4xl text-primary-violet/20 absolute -bottom-4 -right-2">"</span>
              </p>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-12 text-center">
          <p className="text-secondary-dark/60 font-body text-sm">
            💬 Tous les témoignages sont vérifiés et authentiques • 
            <span className="font-semibold text-secondary-dark"> 98% de satisfaction client</span>
          </p>
        </div>
      </div>
    </section>
  )
}
