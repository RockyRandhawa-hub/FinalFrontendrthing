const Booknowcard = ({title, para, buttonTxt, img, url}) => {   
  return (     
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 bg-[#FFF8E7]">
      {/* Content container */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col items-center text-center h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] justify-between">
        
        {/* Image container with enhanced styling */}
        <div className="relative mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50 group-hover:ring-[#FDC46C]/50 transition-all duration-500">
            <img 
              src={img} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          {/* Decorative glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FDC46C]/30 to-orange-300/30 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
        </div>

        {/* Text content */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-[Montserrat] text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
            {title}
          </h2>
          
          <p className="font-[Montserrat] text-xs sm:text-sm lg:text-[15px] font-medium leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4 sm:mb-6">
            {para}
          </p>
        </div>

        {/* Enhanced button */}
        <a href={url}>
          <button className="relative w-full bg-gradient-to-r from-[#C64A30] to-[#E55A40] hover:from-[#B63E2A] hover:to-[#D14D35] text-white font-[Montserrat] font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C64A30]/30 group-hover:shadow-2xl text-sm sm:text-base">
            <span className="relative z-10">{buttonTxt}</span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </button>
        </a>

      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-[#FDC46C]/20 rounded-bl-3xl"></div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C64A30] via-[#FDC46C] to-[#C64A30] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
    </div>   
  ); 
};

export default Booknowcard;