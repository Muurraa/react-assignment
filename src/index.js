import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { createRoot } from 'react-dom/client'
import Assignment from "./ReactAssignment/Assignment"
import userReducer from './ReactAssignmentComponents/selectedFigure'

const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Assignment />
        </BrowserRouter>
    </Provider>
)
