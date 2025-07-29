// import { BooknowmainContenet } from "./BooknowmainContent";
import { BooknowmainContenet } from "./BooknowmainContenet";
import { UpperBookNow } from "./UpperBookNow";
import FooterImg from "../assets/images/FooterImg.jpg"
 
 
export function BookNow(){
 
return (<>
    <UpperBookNow img={FooterImg}>
        India's Military Heritage in One <br/> Place : Why the AOC Museum is a <br/> National Treasure
    </UpperBookNow>
    <BooknowmainContenet/>
    </>
   
)
 
}