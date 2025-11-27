import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const HistoryItem = ({ year, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col md:flex-row items-center justify-between w-full mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="w-full md:w-5/12"></div>

            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-12 h-12 rounded-full justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>

            <div className={`w-full md:w-5/12 order-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-8 md:mt-0 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <span className="font-bold text-primary text-xl mb-2 block">{year}</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const History = () => {
    const { t } = useLanguage();
    const milestones = t('history.items');

    return (
        <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('history.title')}</h1>
                    <p className="text-xl text-gray-600">
                        {t('history.subtitle')}
                    </p>
                </div>

                <div className="relative wrap overflow-hidden p-4 h-full">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2 transform -translate-x-1/2 hidden md:block"></div>

                    {Array.isArray(milestones) && milestones.map((item, index) => (
                        <HistoryItem
                            key={index}
                            index={index}
                            year={item.year}
                            title={item.title}
                            description={item.desc}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
