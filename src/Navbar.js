import React from 'react'
import Styled from "./Navbar.module.css";
import {  NavLink } from 'react-router-dom';
export default function Navbar() {
    return (
        <div>
            <header>
                <ul>
                    <li><NavLink to="/" exact  activeClassName={Styled.active}>Home</NavLink></li>
                    <li><NavLink to="/blogs" activeClassName={Styled.active}>Blogs</NavLink></li>
                    <li><NavLink to="/addblog" activeClassName={Styled.active}>Add Blog</NavLink></li>
                </ul>
            </header>
        </div>
    )
}
