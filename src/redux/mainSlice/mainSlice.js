import { createSlice } from "@reduxjs/toolkit";

// In real application filtration must be done in backend

const initialState = {
    user: {
        id: 541,
        name: 'Olive Larson',
        avatar: 'https://i.pinimg.com/originals/c0/ba/a4/c0baa409466fe2decab14fc640fb91f9.png',
        comments: [],
        likedComments: [],

    },
    isFilterMode: false,
    comments: [{
            id: 1,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Sara Lewis',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        },
        {
            id: 2,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Alma Jackson',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Michael Ramirez',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        },
        {
            id: 4,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Adelaide Goodwin',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        }
    ],
    unfilteredComments: [{
            id: 1,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Sara Lewis',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        },
        {
            id: 2,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Alma Jackson',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Michael Ramirez',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        },
        {
            id: 4,
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque minima iure, beatae, repellat quisquam nobis quidem similique cupiditate, voluptatibus ex praesentium rerum doloribus blanditiis sapiente vel natus neque nihil? Alias!',
            date: '',
            level: 1,
            author: {
                name: 'Adelaide Goodwin',
                avatar: 'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-.jpg'
            },
            comments: [],
        }
    ],
}


const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        addComment(state, action) {
            state.comments.push(action.payload);
            state.unfilteredComments.push(action.payload);
            state.user.comments.push(action.payload.id);
        },

        updateComment(state, action) {
            state.comments.forEach(comment => {
                if (comment.id === action.payload.id) {
                    comment.text = action.payload.text;
                }
            })
        },

        likeComment(state, action) {
            state.user.likedComments.push(action.payload);
        },

        unlikeComment(state, action) {
            state.user.likedComments = state.user.likedComments.filter(id => id !== action.payload);
        },

        filterComment(state, action) {
            if (action.payload === undefined) {
                state.comments = state.unfilteredComments;
            } else {
                state.comments = [...state.unfilteredComments.filter(comment => comment.text.includes(action.payload))]
            }

        },
        addCommentToComment(state, action) {
            state.comments.forEach(comment => {
                if (comment.id === action.payload.id) {
                    comment.comments.push(action.payload.comment.id);
                }
            })
            state.unfilteredComments.forEach(comment => {
                if (comment.id === action.payload.id) {
                    comment.comments.push(action.payload.comment.id);
                }
            })
            state.comments.push(action.payload.comment);
            state.unfilteredComments.push(action.payload.comment);
            state.user.comments.push(action.payload.comment.id);
        },
        setIsFilterMode(state, action) {
            state.isFilterMode = action.payload;
        }

    }
})

export const {
    addComment,
    updateComment,
    likeComment,
    unlikeComment,
    filterComment,
    addCommentToComment,
    setIsFilterMode
} = mainSlice.actions;

export default mainSlice.reducer;