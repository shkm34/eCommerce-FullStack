import { Toaster } from 'react-hot-toast';

const ToasterComponent = () => {
    return (
        <Toaster 
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#4ade80',
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 4000,
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
};

export default ToasterComponent;