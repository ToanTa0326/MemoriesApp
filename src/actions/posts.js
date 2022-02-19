import * as api from '../api';
import {FETCH_ALL, DELETE, UPDATE, CREATE, GET_BY_SEARCH, START_LOADING, END_LOADING, GET_POST, COMMENT, GET_BY_CREATOR} from '../constants/actionTypes'

export const fetchPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
    
}

export const fetchPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: GET_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
    
}

export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: GET_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsByCreator(name);
    
        dispatch({ type: GET_BY_CREATOR, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.creatPost(post);
        navigate(`/posts/${data._id}`)
        dispatch({
            type: CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({
            type: DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async(dispatch) => {
    try {
        const { data } = await api.commentPost(value,id)

        dispatch({
            type: COMMENT,
            payload: data
        })

        return data.comments
    } catch (error) {
        console.log(error);
    }
}