"use client"

export default function TestimonialsMinimal() {
  const testimonials = [
    {
      name: "Sophie M.",
      result: "-15 kg",
      duration: "6 mois",
      content: "Résultats incroyables ! Je recommande à 100%.",
      rating: 5,
    },
    {
      name: "Marc D.",
      result: "+8 kg",
      duration: "4 mois",
      content: "Programme parfaitement adapté à mes objectifs.",
      rating: 5,
    },
    {
      name: "Julie L.",
      result: "En forme",
      duration: "3 mois",
      content: "J'ai retrouvé l'énergie que je pensais avoir perdue.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-dark mb-4">
            Témoignages
          </h2>
          <p className="text-secondary-dark/70 font-body">
            Des résultats réels de personnes réelles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-secondary-light to-white rounded-2xl p-6 border border-secondary-light hover:shadow-xl hover:border-primary-violet/20 transition-all duration-300"
            >
              {/* Result badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary-violet/10 to-primary-rose/10 rounded-full mb-4">
                <span className="text-xs font-bold text-primary-violet">
                  {testimonial.result}
                </span>
                <span className="text-xs text-secondary-dark/50">•</span>
                <span className="text-xs text-secondary-dark/50">{testimonial.duration}</span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-secondary-dark mb-4 font-body italic leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-secondary-dark">{testimonial.name}</div>
                  <div className="text-xs text-secondary-dark/60">Client vérifié</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-secondary-light rounded-full px-6 py-3">
            <span className="text-2xl font-bold text-secondary-dark">4.9</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-secondary-dark/70">127 avis</span>
          </div>
        </div>
      </div>
    </section>
  )
}
