import React from 'react';
import { ArrowRight, Server, Database, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';


const Home = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Server className="w-8 h-8 text-primary" />,
            title: t('features.server'),
            description: t('features.serverDesc'),
            link: '/products/server'
        },
        {
            icon: <Database className="w-8 h-8 text-primary" />,
            title: t('features.storage'),
            description: t('features.storageDesc'),
            link: '/products/storage'
        },
        {
            icon: <Cpu className="w-8 h-8 text-primary" />,
            title: t('features.hci'),
            description: t('features.hciDesc'),
            link: '/products/hci'
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
            title: t('features.protection'),
            description: t('features.protectionDesc'),
            link: '/products/backup'
        }
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 to-blue-900 text-white py-32 lg:py-48 overflow-hidden h-screen flex items-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>



                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl relative z-10"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 flex flex-col gap-y-3">
                            {t('hero.title').split('\n').map((line, index) => (
                                <span key={index} className="leading-tight">{line}</span>
                            ))}
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 leading-loose max-w-2xl whitespace-pre-line">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary hover:bg-blue-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-blue-500/30">
                                {t('hero.getStarted')}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link to="/products" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border border-gray-600 hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm">
                                {t('hero.explore')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('features.title')}</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{t('features.subtitle')}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    {React.cloneElement(feature.icon, { className: "w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" })}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                                <Link to={feature.link} className="inline-flex items-center text-primary font-semibold hover:text-blue-700">
                                    {t('news.readMore')} <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('contact.subtitle')}</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        {t('vision.missionDesc')}
                    </p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all duration-200">
                        {t('contact.title')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
