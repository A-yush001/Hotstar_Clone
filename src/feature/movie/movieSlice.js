import { createSlice } from "@reduxjs/toolkit";

const initialState={
    recommend:null,
    newDisney:null,
    original:null,
    treanding:null,

};

const movieSlice=createSlice({
    name:"movie",
    initialState,
    reducers:{
        setMovies:(state,action)=>{
            state.recommend=action.payload.recommend
            state.newDisney=action.payload.newDisney
            state.original=action.payload.original
            state.treanding=action.payload.treanding
        }
    }
})

export const {setMovies}= movieSlice.actions

export const selectRecomended =(state )=> state.movie.recommend
export const selectNewDisney= (state)=>state.movie.newDisney
export const selectOriginal =(state)=>state.movie.original
export const selectTrending=(state)=>state.movie.treanding

export default movieSlice.reducer;