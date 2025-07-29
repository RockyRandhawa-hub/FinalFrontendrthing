// export function UpperBookNow(){




// }


// import Navdeep from "../assets/images/Navdeep.jpg"
// import FooterImg from "../assets/images/FooterImg.jpg"
 
export function UpperBookNow({img,children}){
 
return      (<div className="relative w-full h-[100vh]">
       
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
 
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
 
        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full ">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4 italic" style={{fontFamily:"Kaushan"}}>
            {children}
          </h1>
        </div>
      </div>)
 
}