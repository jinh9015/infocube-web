import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import { inquiryStore } from '../data/inquiryStore';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            inquiryStore.add(formData);
            alert(t('contact.alertSuccess'));
            setFormData({ name: '', email: '', company: '', message: '' });
        } catch (error) {
            console.error('Error saving inquiry:', error);
            alert(t('contact.alertError'));
        }
    };

    return (
        <div className="pt-20 pb-24">
            <div className="bg-gray-900 text-white py-20 mb-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
                    <p className="text-xl text-gray-400">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.title')}</h2>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('contact.visit')}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t('footer.address')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('contact.call')}</h3>
                                    <p className="text-gray-600">
                                        {t('footer.phone')}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Mon-Fri from 9am to 6pm
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('contact.email')}</h3>
                                    <p className="text-gray-600">
                                        contact@infocube.co.kr
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        We'll respond within 24 hours
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="mt-12 h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.986665798967!2d127.1184277!3d37.4846315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357caf006570bc33%3A0xbc71038ee4828816!2z7J247Y-s7YGZ67iM!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Infocube Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.formTitle')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder={t('contact.name')}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.company')}</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder={t('contact.company')}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                                    placeholder={t('contact.message')}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
                            >
                                {t('contact.send')}
                                <Send className="ml-2 w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
