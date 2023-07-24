import React from 'react'
import styled from "styled-components"
import ImgSlider from './ImgSlider'
import Viewers from './Viewers'
import Recomends from './Recomends'
import NewDisney from './NewDisney'
import Originals from './Originals'
import Treanding from './Treanding'
import {useEffect} from "react"
import {useDispatch,useSelector} from "react-redux";
import db from "../firebase"
import { setMovies } from "../feature/movie/movieSlice";
import { selectUserName } from "../feature/User/UserSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    console.log("hello");
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(recommends);
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          treanding: trending,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider/>
     <Viewers/>
     <Recomends/>
     <NewDisney/>
     <Originals/>
     <Treanding/>
    </Container>
  )
}
const Container=styled.div`
position:relative;
min-height:calc(100vh-250px);
overflow-x:hidden;
display:block;
top:72px;




padding: 0 calc(3.5vw + 5px);

&:after{
background: url("/images/home-background.png") center center / cover 
background-size: cover;
no-repeat fixed ;
content:"";
position:absolute;
inset:0px;
opacity:1;
z-index:-1;

}
`

export default Home
