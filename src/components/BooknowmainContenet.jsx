import { useState } from "react"

import Booknowcard from "./Booknowcard";
import AdventureBackGround from "../assets/images/AdventureBackGround.jpg"
import { Link } from "react-router-dom";
 



export function BooknowmainContenet(){
    const [isBig, setIsBig] = useState(false);
    // const AdventureBackGround = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

    function toggleReadMoreHandler(){
        setIsBig((e) => !e)
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            {/* Container with max height when collapsed */}
            <div className={`relative transition-all duration-500 ease-in-out ${
                isBig ? "h-auto" : "h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden"
            }`}>
                
                <main className="flex flex-col lg:flex-row w-full">
                    {/* Main Content Section */}
                    <div className="lg:w-[70%] w-full p-4 sm:p-6 lg:p-8">
                        <section className="p-4 sm:p-6 lg:p-8 w-full bg-white rounded-lg shadow-sm border border-gray-100">
                            <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                              What if you could walk through time—through India's military triumphs,
                              strategic evolution, and cultural resilience—all within the walls of a
                              single museum?
                              <br />
                              <br />
                              Located in the heart of the Military College of Materials Management (MCMM)
                              in Jabalpur, the AOC Museum is more than a repository of artefacts. It's a
                              living chronicle of India's armed forces, housing over 2,000 items and 895
                              archival pieces. For historians, students, military enthusiasts, and
                              patriots, this is where India's defence story is preserved and proudly
                              displayed. <br/><br/><br/><br/>
                            </p>
                            <h3 className="font-[Montserrat] text-lg sm:text-[20px] font-bold leading-tight sm:leading-[22.5px]">
                              The AOC Museum: A Curated Legacy of India's Defence Excellence
                              <br/>  <br/>
                            </h3>
                            <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                            This isn't your average museum. <br/>
                            The AOC Museum was built to showcase the strength, creativity, and courage of the Army Ordnance Corps—the branch responsible for military logistics, equipment, and arms support. From ancient weaponry to cutting-edge technology, it walks visitors through:
                            </p>
                            <ul className="list-disc pl-4 sm:pl-5 font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                              <li>Historical milestones from 1120 AD to post-Independence India</li>
                              <li>Evolution of military equipment and ordnance support</li>
                              <li>The role of logistics in wars that shaped the nation</li>
                              <li>
                                Its sheer scale and depth make it India's largest and most diverse
                                armament museum.
                              </li>
                            </ul>
                            <br/><br/>
                            <br/>
                             
                            <section className="space-y-3 sm:space-y-4">
                              {/* Heading */}
                              <h3 className="font-[Montserrat] text-lg sm:text-[20px] font-bold leading-tight sm:leading-[22.5px]">
                                The Top 5 Must-See Artefacts You Can't Miss
                              </h3>
                             
                              {/* Intro paragraph */}
                              <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                Whether you're a curious student or a seasoned military scholar, these
                                exhibits will stop you in your tracks:
                              </p>
                             
                              {/* Artefacts list */}
                              <ol className="list-decimal pl-4 sm:pl-5 space-y-2 sm:space-y-3 font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                <li>
                                  <span className="font-semibold">Execution Order of Sepoy Mangal Pandey (1857)</span>  
                                  – The original document that sparked India's first war of independence.
                                  An unparalleled artefact of rebellion and sacrifice.
                                </li>
                                <li>
                                  <span className="font-semibold">The Gatling Gun (1862)</span>  
                                  – Invented in the USA, this was the world's first practical, rapid-fire
                                  weapon. Rarely seen outside of Western museums.
                                </li>
                                <li>
                                  <span className="font-semibold">Royal Buggy of Maharaja Hari Singh (1925)</span>  
                                  – Imported from Paris for the king's Raj Tilak, this vintage coach offers
                                  a window into regal and colonial history.
                                </li>
                                <li>
                                  <span className="font-semibold">Armour Suit from 1120 AD</span>  
                                  – Weighing 12 kg and made entirely of brass, it's the oldest item in the
                                  museum—a true relic of India's early defence heritage.
                                </li>
                                <li>
                                  <span className="font-semibold">Ordnance Crest of the Azad Hind Fauj</span>  
                                  – A symbol of India's underground freedom movement, this insignia
                                  belonged to Netaji Subhash Chandra Bose's legendary army.
                                </li>
                              </ol>
                            </section>
                            <br/><br/>
                            <br/>
                            <section className="space-y-3 sm:space-y-4">
                              {/* Heading */}
                              <h3 className="font-[Montserrat] text-lg sm:text-[20px] font-bold leading-tight sm:leading-[22.5px]">
                                Beyond the Weapons: A Cultural and National Treasure
                              </h3>
                             
                              {/* Intro paragraph */}
                              <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                The AOC Museum doesn't glorify war—it honors those who stood for peace,
                                discipline, and sovereignty.
                              </p>
                             
                              {/* List Items */}
                              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                <li>Prisoner of War records from the 1971 Indo-Pak War</li>
                                <li>Military technology progression: from muskets to missiles</li>
                                <li>Insignias and awards that reflect regimental pride and honor</li>
                              </ul>
                             
                              {/* Closing paragraph */}
                              <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                More than a military archive, it's a mirror of India's journey—its wars,
                                its resilience, its heroes.
                              </p>
                            </section>
                             
                              <br/>  <br/>
                              <br/>
                             
                            <h3 className="font-[Montserrat] text-lg sm:text-[20px] font-bold leading-tight sm:leading-[22.5px]">
                              Ticketing Info
                              <br/>  <br/>
                            </h3>
                             
                            {/* Mobile-first responsive table */}
                            <div className="overflow-x-auto">
                              <table className="min-w-full border-collapse font-[Montserrat] text-xs sm:text-sm lg:text-[15px]">
                                {/* Table Head */}
                                <thead className="">
                                  <tr className="bg-gray-100 border border-gray-400">
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-lg lg:text-[20px] font-bold leading-tight sm:leading-[30px] border border-gray-400">Category</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-lg lg:text-[20px] font-bold leading-tight sm:leading-[30px] border border-gray-400">Price (₹)</th>
                                  </tr>
                                </thead>
                             
                                {/* Table Body Rows */}
                                <tbody>
                                  <tr className="border border-gray-400 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">Adults</td>
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">₹200 per person</td>
                                  </tr>
                                  <tr className="border border-gray-400 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">Children (5–18 yrs)</td>
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">₹100 per person</td>
                                  </tr>
                                  <tr className="border border-gray-400 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">Infants (Below 5 yrs)</td>
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">Free</td>
                                  </tr>
                                  <tr className="border border-gray-400 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">School/College Students Group</td>
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">₹1,200 (up to 30)</td>
                                  </tr>
                                  <tr className="border border-gray-400 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">Senior Citizens</td>
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">₹100 per person</td>
                                  </tr>
                                  <tr className="border border-gray-400 hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">Veterans/Ex-Servicemen</td>
                                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-[15px] font-medium leading-tight sm:leading-[30px] border border-gray-400">₹100 per person</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                             
                            <br /><br />
                            <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                            Booking is limited to one batch of 18 visitors per day, so plan and reserve in advance.
                            </p>
                            <br /><br />
                            <section className="space-y-3 sm:space-y-4">
                              {/* Heading */}
                              <h3 className="font-[Montserrat] text-lg sm:text-[20px] font-bold leading-tight sm:leading-[22.5px]">
                                Tips Before You Go
                              </h3>
                             
                              {/* Tips List */}
                              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                <li>Book at least a week in advance (especially for Sundays)</li>
                                <li>Carry water and a small bag for personal items</li>
                                <li>No photography in restricted or classified areas</li>
                                <li>Arrive 15 minutes early for check-in and briefing</li>
                                <li>Sunscreen and hats recommended for summer visitors</li>
                              </ul>
                            </section>
                            <br /><br /><br />
                            <section className="space-y-3 sm:space-y-4">
                              {/* Heading */}
                              <h3 className="font-[Montserrat] text-lg sm:text-[20px] font-bold leading-tight sm:leading-[22.5px]">
                                Conclusion: Where History Lives On
                              </h3>
                             
                              {/* Paragraphs */}
                              <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                To understand India's past, this is where you start.
                              </p>
                              <p className="font-[Montserrat] text-sm sm:text-[15px] font-medium leading-relaxed">
                                The AOC Museum isn't just about the artefacts—it's about the people, the
                                perseverance, and the passion behind every uniform, document, and display.
                                Come as a visitor. Leave as someone who has walked beside India's military
                                soul.
                              </p>
                            </section>
                            
                            {/* Add padding bottom to ensure content spacing */}
                            <div className="pb-8"></div>
                        </section>
                    </div>
                    
                    {/* Sidebar Cards Section */}
                    <div className="lg:w-[30%] w-full p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col gap-4 sm:gap-6">
                          <Link to= "/EnterEmail">
                            <Booknowcard 
                                title="ENJOY THE HERITAGE WALK" 
                                buttonTxt="Book Now" 
                                para="Discover iconic army landmarks, rich stories, and guided trails that bring history to life." 
                                img={AdventureBackGround}
                                url="/EnterEmail"
                            />
                            </Link>
                    <a href= "/EnterEmail">

                            <Booknowcard 
                                title="PLEASE ALSO CHECK" 
                                buttonTxt="know more" 
                                para="Immerse yourself in centuries of military heritage through interactive exhibits and authentic artifacts." 
                                img={AdventureBackGround}
                                url="https://www.mptourism.com/inside-the-army-ordnance-corps-museum-jabalpur.html"
                            />
                            </a>
                            <Booknowcard 
                                title="DESTINATION" 
                                buttonTxt="Explore" 
                                para="Uncover the untold stories of courage, sacrifice, and triumph that shaped our nation's defense." 
                                img={AdventureBackGround}
                                url="https://www.mptourism.com/destination-jabalpur.php"
                            />
                        </div>
                    </div>
                </main>
                
                {/* Global Gradient overlay when content is collapsed */}
                {!isBig && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10"></div>
                )}
            </div>
            
            {/* Read More/Less Button - positioned at bottom center of entire component */}
            <div className="flex justify-center py-6 sm:py-8">
                <button
                    className="cursor-pointer rounded-[50px] font-[Montserrat] text-sm sm:text-[14px] font-bold leading-[18px] text-white py-3 px-6 sm:px-8 hover:bg-red-600 transition-all duration-300 bg-[#C64A30] shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C64A30]/30"
                    onClick={toggleReadMoreHandler}
                >
                    {isBig ? "Read Less" : "Read More"}
                </button>
            </div>
        </div>
    )
}