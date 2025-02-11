import { PiGitlabLogoFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { scrollToTop } from '../scrollToTop';

function Footer() {
    return (
        <FooterElement>
            <Header>
                <PiGitlabLogoFill />
                <a className="logo" href="/">
                    Absolute Cinema
                </a>
            </Header>
            <FooterContent>
                <ul>
                    <li>
                        <Link onClick={scrollToTop} to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            to={'/contact/'}
                        >
                            Contact us
                        </Link>
                    </li>
                    <li>
                        <a href="/">Terms of service</a>
                    </li>
                    <li>
                        <a href="/">About us</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="/">Live</a>
                    </li>
                    <li>
                        <a href="/">FAQ</a>
                    </li>
                    <li>
                        <a href="/">Premium</a>
                    </li>
                    <li>
                        <a href="/">Privacy policy</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="/">You must watch</a>
                    </li>
                    <li>
                        <a href="/">Recent release</a>
                    </li>
                    <li>
                        <a href="/">Top IMDB</a>
                    </li>
                </ul>
            </FooterContent>
        </FooterElement>
    );
}

export default Footer;

const FooterElement = styled.footer`
    position: relative;
    height: 60vh;
    padding: 5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: url('/assets/FooterBanner.jpg') center / cover no-repeat;
    margin-top: 5rem;
    background-color: rgba(0, 0, 0, 0.6);
    @media (max-width: 895px) {
        padding: 1;
    }
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        opacity: 0.7;
        z-index: 100;
        background: linear-gradient(
            to bottom,
            var(--primary),
            transparent
        ); /* From black to transparent */
    }
    &::after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0);
    }
`;

const FooterContent = styled.div`
    z-index: 200;
    color: white;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    width: 100%;
    margin-top: 5rem;
    ul {
        list-style-type: none;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 12px;
    }
    a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        letter-spacing: 2px;
        font-size: 1.1rem;
        transition: 0.5s;
        position: relative;
        &::before {
            position: absolute;
            content: '';
            width: 0%;
            background-color: white;
            left: 50%;
            bottom: -5px;
            transform: translateX(-50%);
            height: 1px;
            transition: 0.5s;
        }
        &:hover::before {
            width: 100%;
        }
    }
    a:hover {
        color: #abaaaa;
    }
    @media (max-width: 895px) {
        a {
            margin-right: 2em;
            font-size: 0.8rem;
            white-space: break-spaces;
        }
    }
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: 0.5s;
    z-index: 200;
    a.logo {
        letter-spacing: 5px;
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        transition: 0.5s;
        font-weight: 600;
        text-transform: uppercase;
    }
    &:hover {
        opacity: 0.5;
        letter-spacing: 6px;
    }
    svg {
        color: var(--2ndPrimary);
        font-size: 3rem;
    }
    @media (max-width: 1496px) {
        white-space: nowrap;
        a.logo {
            font-size: 1.2rem;
        }
        svg {
            font-size: 2.5rem;
        }
    }
    @media (max-width: 648px) {
        a.logo {
            font-size: 0.8rem;
        }
        svg {
            font-size: 2.5rem;
        }
    }
`;
