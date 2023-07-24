import styled from "styled-components";
import {auth, provider} from "../firebase"
import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOutState,
  } from "../feature/User/UserSlice";
  

const Header = () => {
    const dispatch=useDispatch()
    const history=useNavigate()
    const userName=useSelector(selectUserName);
    const userPhoto=useSelector(selectUserPhoto);

    useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
          history("/home");
        }
      });
    }, [userName]);

    const handleAuth = () => {
      if (!userName) {
        auth
          .signInWithPopup(provider)
          .then((result) => {
            setUser(result.user);
          })
          .catch((error) => {
            alert(error.message);
          });
      } else if (userName) {
        auth
          .signOut()
          .then(() => {
            dispatch(setSignOutState());
            history("/");
          })
          .catch((err) => alert(err.message));
      }
    };
    const setUser=(user)=>{
        dispatch(
            setUserLoginDetails({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL
            })
        )


    }
  return (
    <Nav>
      <Logo><img src="/images/logo.svg" alt="logo"/></Logo>
      {
        !userName?
        (<Login onClick={handleAuth}>Login</Login>)
        :
        (<>
      <NavMenu>
      <div style={{display:"flex"}}>
        <a href="/home"><img src="/images/home-icon.svg" alt="home"/><span>HOME</span></a>
        <a>
        <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
        </div>   
      </NavMenu>
      <SignOut>
      <UserImg src={userPhoto} alt={userName}/> 
      <DropDown>
        <span onClick={handleAuth}>Signout</span>
      </DropDown>
      </SignOut>
      </>)
      }
      
     
          </Nav>
  )
}
const Nav=styled.nav`
position:fixed;
top:0;
left:0;
right:0;
height:70px;
background:#090b13;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
padding:0 36px;
letter-spacing:16px;
z-index:3;
`

const Logo=styled.a`
width:90px;
padding:0;
margin-top:5px;
max-height:70px;
font-size:0;
display:inline-block;
vertical-align:middle;
img{
    display:block;
    width:100%;
}
`

const NavMenu=styled.div`
align-items:center;
dispaly:flex;
flex-direction:row !important;
flex-flow:row nowrap;
justify-content:flex-end;
margin:0px;
padding:0px;
position relative;
margin-right:auto;
margin-left:25px;

a{
    display:flex;
    align-items:center;
    padding:0 12px;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
       
        margin-bottom:5px;
      }
      span {
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
        margin-top:auto;
        margin-bottom:auto;
        margin-left:2px;
        &:before {
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
          }
        }
        &:hover {
            span:before {
              transform: scaleX(1);
              visibility: visible;
              opacity: 1 !important;
            }
          }
}


@media(max-width:768px)
{
    display:none;
}

`

const Login=styled.a`
background-color:rgba(0,0,0,0.6);
font-size: 16px;
letter-spacing: 1.6px;
line-height: 1.08;
border:0.8px solid #f9f9f9;
padding:8px 16px;
border-radius:4px;
corsor:pointer;
transition:all 0.2s ease 0s;

&:hover{
   background-color:#f9f9f9!important;
   color:black;
   border-color:#000;
   font-weight:bold;
}

`
const UserImg =styled.img`
height:100%;

`
const DropDown=styled.div`
position:absolute;
top:48px;
right:0px;
padding:10px;
font-size:14px;
letter-spacing:3px;
background:rgb(19,19,19);
border:1px solid rgba(151,151,151,0.34);
border-radius:4px;
box-shadow:rgb(0 0 0/50%) 0px 0px 18px 0px;


 opacity:0;
width:100px;

`;

const SignOut=styled.div`
position:relative;
height:48px;
width:48px;
display:flex;
cursor:pointer;



align-item:center;
justify-content:center;

${UserImg}{
  border-radius:50%
  width:100%;
  height:100%;

}

&:hover{
  ${DropDown}{
    opacity:1;
    transition-duration:1s;
  }
}

`;

export default Header
