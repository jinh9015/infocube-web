const STORAGE_KEY = 'infocube_news_data';

const initialData = [
    {
        id: '1',
        title: 'Infocube Wins Dell Technologies Partner of the Year 2024',
        date: '2024-11-15',
        content: '<p><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" alt="Partner of the Year" /></p><p>We are proud to announce that Infocube has been recognized as the Partner of the Year for our outstanding contribution to digital transformation. This award reflects our team\'s dedication to delivering excellence in every project. We thank our customers for their trust and our partners at Dell for their support.</p>'
    },
    {
        id: '2',
        title: 'Launching New AI Infrastructure Consulting Services',
        date: '2024-10-01',
        content: '<p><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" alt="AI Infrastructure" /></p><p>To meet the growing demand for AI workloads, we are launching specialized consulting services for high-performance computing. Our new service line helps enterprises design, deploy, and manage AI-ready infrastructure using Dell PowerEdge XE servers and PowerScale storage.</p>'
    },
    {
        id: '3',
        title: 'Infocube Expands Office to Digital Valley',
        date: '2024-08-20',
        content: '<p><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="New Office" /></p><p>We have moved to a new, larger office space in the heart of Seoul\'s Digital Valley to accommodate our growing team. The new office features a state-of-the-art demo center where clients can experience our solutions firsthand.</p>'
    }
];

export const newsStore = {
    init: () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
    },

    getAll: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    getById: (id) => {
        const data = newsStore.getAll();
        return data.find(item => item.id === id);
    },

    add: (post) => {
        try {
            const data = newsStore.getAll();
            const newPost = { ...post, id: Date.now().toString() };
            const newData = [newPost, ...data];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
            return newPost;
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                throw new Error('Storage limit exceeded. Please reduce image size or number of images.');
            }
            throw e;
        }
    },

    update: (updatedPost) => {
        try {
            const data = newsStore.getAll();
            const newData = data.map(item => item.id === updatedPost.id ? updatedPost : item);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                throw new Error('Storage limit exceeded. Please reduce image size or number of images.');
            }
            throw e;
        }
    },

    delete: (id) => {
        const data = newsStore.getAll();
        const newData = data.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    },

    moveUp: (id) => {
        const data = newsStore.getAll();
        const index = data.findIndex(item => item.id === id);
        if (index > 0) {
            const newData = [...data];
            [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        }
    },

    moveDown: (id) => {
        const data = newsStore.getAll();
        const index = data.findIndex(item => item.id === id);
        if (index < data.length - 1) {
            const newData = [...data];
            [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        }
    },

    reorder: (startIndex, endIndex) => {
        const data = newsStore.getAll();
        const result = Array.from(data);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    }
};
