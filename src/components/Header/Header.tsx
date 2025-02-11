import styled from 'styled-components';
import NavListItem from './NavListItem';
import { useEffect, useState } from 'react';
import { PiGitlabLogoFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../scrollToTop';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header>
            <HeaderElement
                onClick={scrollToTop}
                className={isScrolled ? 'scrolled' : ''}
            >
                <div className="logo-container">
                    <PiGitlabLogoFill />
                    <Link className="logo" to="/">
                        Absolute Cinema
                    </Link>
                </div>
                <div>
                    <NavListItem />
                </div>
            </HeaderElement>
        </header>
    );
}

export default Header;

const HeaderElement = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 30px 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;

    width: 100%;
    z-index: 100;
    border: none;
    transition: 0.5s;

    &.scrolled {
        padding: 15px 70px;
        background-color: #1e1d23;
    }
    a.logo {
        letter-spacing: 5px;
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        transition: 0.5s;
        font-weight: 600;
        text-transform: uppercase;
    }
    a.logo:hover {
        opacity: 0.5;
        letter-spacing: 6px;
    }
    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        svg {
            color: var(--2ndPrimary);
            font-size: 2.5rem;
        }
    }
    @media (max-width: 1496px) {
        a.logo {
            font-size: 1.2rem;
        }
        .logo-container {
            svg {
                font-size: 2.5rem;
            }
        }
    }
    @media (max-width: 648px) {
        a.logo {
            font-size: 1rem;
        }
        .logo-container {
            svg {
                font-size: 2rem;
            }
        }
    }
    @media (max-width: 572px) {
        padding: 30px 50px;
        &.scrolled {
            padding: 30px 50px;
            background-color: #1e1d23;
        }
    }
    @media (max-width: 500px) {
        padding: 30px 25px;
        &.scrolled {
            padding: 15px 25px;
            background-color: #1e1d23;
        }
    }
`;
