import styled from 'styled-components';
import { navListData } from '../../data/navListData';
import { Link, useLocation } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';

import { useRef } from 'react';
import { scrollToTop } from '../scrollToTop';
function NavListItem() {
    const location = useLocation();
    const sidebar = useRef<HTMLDivElement | null>(null);
    return (
        <>
            <NavList>
                <ul>
                    {navListData.map((item) => (
                        <li onClick={scrollToTop} key={item.id}>
                            <Link
                                to={item.link}
                                className={
                                    location.pathname === item.link
                                        ? 'active'
                                        : ''
                                }
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <IoIosMenu
                        onClick={() => {
                            if (sidebar.current) {
                                sidebar.current.style.display = 'flex';
                            }
                        }}
                    />
                </ul>
            </NavList>
            <SideBar ref={sidebar}>
                <ul className="sidebar">
                    <AiOutlineClose
                        onClick={() => {
                            if (sidebar.current) {
                                sidebar.current.style.display = 'none';
                            }
                        }}
                    />
                    {navListData.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.link}
                                onClick={scrollToTop}
                                className={
                                    location.pathname === item.link
                                        ? 'active'
                                        : ''
                                }
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </SideBar>
        </>
    );
}

export default NavListItem;

const SideBar = styled.div`
    display: none;

    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 100%;
        padding: 2em;
        z-index: 999;
        background-color: #1e1d237e;
        backdrop-filter: blur(20px);
        box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
        gap: 2em;
    }
    ul {
        list-style: none;
    }
    a.active {
        color: white;
        text-decoration: none;
    }
    li {
        width: 100%;
    }
    a {
        text-decoration: none;
        color: gray;
        transition: 0.5s;
        font-weight: 500;
        letter-spacing: 1px;
        font-size: 0.9rem;
        width: 100%;
        position: relative; /* Ensure the active state styling works correctly */

        &.active {
            color: white; /* Active link color */
        }
    }
    svg {
        font-size: 2rem;
        position: absolute;
        right: 0;
        margin-right: 1em;
        transition: 0.5s;
        border-radius: 50%;
        &:hover {
            background-color: #ffffff7e;
            backdrop-filter: blur(10px);
            cursor: pointer;
        }
    }
`;

const NavList = styled.div`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 2rem;
        display: none;
        transition: 0.5s;
        border-radius: 50%;

        @media (max-width: 760px) {
            display: block;
        }
        &:hover {
            background-color: #ffffff7e;
            backdrop-filter: blur(10px);
            cursor: pointer;
        }
    }
    li {
        @media (max-width: 760px) {
            display: none;
        }
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        list-style: none;
        gap: 2rem;
    }

    a {
        text-decoration: none;
        color: gray;
        transition: 0.5s;
        font-weight: 500;
        letter-spacing: 1px;
        font-size: 0.9rem;
        position: relative; /* Ensure the active state styling works correctly */

        &.active {
            color: white; /* Active link color */
        }

        &::before {
            position: absolute;
            content: '';
            bottom: -5px;
            left: 50%;
            width: 0%;
            transition: 1.5s;
            height: 1.5px;
            background-color: white;
            transform: translateX(-50%); /* Center the pseudo-element */
        }

        &.active::before {
            width: 100%;
        }
    }

    a:hover {
        color: #abaaaa;
    }
    @media (max-width: 1496px) {
        a {
            font-size: 0.9rem;
        }
    }
`;
