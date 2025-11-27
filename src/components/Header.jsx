import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo_color.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productDropdown, setProductDropdown] = useState(false);
    const [langDropdown, setLangDropdown] = useState(false);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const timeoutRef = React.useRef(null);
    const isHoveredRef = React.useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Clear any existing timeout when scrolling
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
                // Auto-hide after stopping scroll (if not hovered)
                timeoutRef.current = setTimeout(() => {
                    if (!isHoveredRef.current && window.scrollY > 100) {
                        setIsVisible(false);
                    }
                }, 800);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [lastScrollY]);

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        // Only auto-hide if we are scrolled down
        if (window.scrollY > 100) {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2000); // Hide after 2 seconds
        }
    };

    const navItems = [
        { name: t('nav.home'), path: '/' },
        {
            name: t('nav.products'),
            path: '/products',
            dropdown: [
                { name: t('nav.server'), path: '/products/server' },
                { name: t('nav.storage'), path: '/products/storage' },
                { name: t('nav.hci'), path: '/products/hci' },
                { name: t('nav.backup'), path: '/products/backup' },
            ]
        },
        { name: t('nav.vision'), path: '/vision' },
        { name: t('nav.history'), path: '/history' },
        { name: t('nav.news'), path: '/news' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setLangDropdown(false);
    };

    return (
        <>
            {/* Hover trigger area at the top */}
            <div
                className="fixed top-0 left-0 w-full h-4 z-50 bg-transparent"
                onMouseEnter={handleMouseEnter}
            />

            <header
                className={`fixed w-full bg-white/90 backdrop-blur-md z-40 shadow-sm border-b border-gray-100 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <img src={logo} alt="InfoCube" className="h-7 w-auto" />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <div
                                    key={item.path}
                                    className="relative group"
                                    onMouseEnter={() => item.dropdown && setProductDropdown(true)}
                                    onMouseLeave={() => item.dropdown && setProductDropdown(false)}
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center text-sm font-medium transition-colors duration-200 ${isActive(item.path)
                                            ? 'text-primary'
                                            : 'text-gray-600 hover:text-primary'
                                            }`}
                                    >
                                        {item.name}
                                        {item.dropdown && <ChevronDown size={14} className="ml-1" />}
                                    </Link>

                                    {/* Product Dropdown */}
                                    {item.dropdown && (
                                        <AnimatePresence>
                                            {productDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                                                >
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}

                            {/* Language Switcher */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setLangDropdown(true)}
                                onMouseLeave={() => setLangDropdown(false)}
                            >
                                <button
                                    className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors px-3 py-1 rounded-full border border-gray-200 hover:border-primary"
                                >
                                    <Globe size={16} />
                                    <span className="text-xs font-bold">{language === 'ko' ? 'KR' : 'EN'}</span>
                                </button>

                                <AnimatePresence>
                                    {langDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 pt-2 w-24"
                                        >
                                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                                                <button
                                                    onClick={() => handleLanguageChange('ko')}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'ko' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                                >
                                                    Korean
                                                </button>
                                                <button
                                                    onClick={() => handleLanguageChange('en')}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                                >
                                                    English
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                {navItems.map((item) => (
                                    <div key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => !item.dropdown && setIsOpen(false)}
                                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                                                ? 'text-primary bg-blue-50'
                                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.dropdown && (
                                            <div className="pl-6 space-y-1 mt-1">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-primary hover:bg-gray-50"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-gray-100 mt-4">
                                    <div className="flex space-x-4 px-3">
                                        <button
                                            onClick={() => handleLanguageChange('ko')}
                                            className={`text-sm font-medium ${language === 'ko' ? 'text-primary' : 'text-gray-500'}`}
                                        >
                                            Korean
                                        </button>
                                        <div className="w-px h-4 bg-gray-300"></div>
                                        <button
                                            onClick={() => handleLanguageChange('en')}
                                            className={`text-sm font-medium ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}
                                        >
                                            English
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Header;
