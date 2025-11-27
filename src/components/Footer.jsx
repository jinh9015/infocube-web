import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo_white.png';
import partnerLogo from '../assets/dell_partner.png';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <img src={logo} alt="InfoCube" className="h-8 w-auto" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.products')}</Link></li>
                            <li><Link to="/vision" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.vision')}</Link></li>
                            <li><Link to="/history" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.history')}</Link></li>
                            <li><Link to="/news" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.news')}</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">{t('footer.solutions')}</h3>
                        <ul className="space-y-4">
                            <li><Link to="/products/server" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.server')}</Link></li>
                            <li><Link to="/products/storage" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.storage')}</Link></li>
                            <li><Link to="/products/hci" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.hci')}</Link></li>
                            <li><Link to="/products/backup" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.backup')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">
                                    {t('footer.address')}
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{t('footer.phone')}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary flex-shrink-0" />
                                <span className="text-gray-400 text-sm">contact@infocube.co.kr</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <p className="text-gray-500 text-sm">
                            {t('footer.copyright')}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                            {t('footer.ceo')}
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end space-y-4 mt-4 md:mt-0">
                        <img src={partnerLogo} alt="Dell Technologies Titanium Partner" className="h-12 transition-all duration-300" />
                        <Link to="/admin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
                            {t('nav.admin')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
