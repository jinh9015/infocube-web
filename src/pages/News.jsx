import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsStore } from '../data/newsStore';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const News = () => {
    const [news, setNews] = useState([]);
    const { t } = useLanguage();

    useEffect(() => {
        newsStore.init();
        setNews(newsStore.getAll());
    }, []);

    return (
        <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('news.title')}</h1>
                    <p className="text-xl text-gray-600">
                        {t('news.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => {
                        // Extract first image from content
                        const getThumbnail = (content) => {
                            if (!content) return null;
                            const div = document.createElement('div');
                            div.innerHTML = content;
                            const img = div.querySelector('img');
                            return img ? img.src : null;
                        };

                        // Strip HTML tags for summary
                        const getSummary = (content) => {
                            if (!content) return '';
                            const div = document.createElement('div');
                            div.innerHTML = content;
                            return div.textContent || div.innerText || '';
                        };

                        const thumbnail = getThumbnail(item.content);
                        const summary = getSummary(item.content);

                        return (
                            <Link
                                to={`/news/${item.id}`}
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
                            >
                                <div className="h-48 overflow-hidden bg-gray-100">
                                    <img
                                        src={thumbnail || 'https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=2062&auto=format&fit=crop'}
                                        alt={item.title}
                                        className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${!thumbnail ? 'opacity-50 grayscale' : ''}`}
                                    />
                                </div>
                                <div className="p-8 flex-grow">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                                        {item.date}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                                        {summary}
                                    </p>
                                </div>
                                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between group-hover:bg-blue-50 transition-colors">
                                    <span className="text-primary font-semibold text-sm">{t('news.readMore')}</span>
                                    <ArrowRight className="w-4 h-4 text-primary transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {news.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{t('news.noNews')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
