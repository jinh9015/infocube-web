const STORAGE_KEY = 'infocube_inquiries';

export const inquiryStore = {
    getAll: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    add: (inquiry) => {
        const data = inquiryStore.getAll();
        const newInquiry = {
            ...inquiry,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString()
        };
        const newData = [newInquiry, ...data];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        return newInquiry;
    },

    delete: (id) => {
        const data = inquiryStore.getAll();
        const newData = data.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }
};
