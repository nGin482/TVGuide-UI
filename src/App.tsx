import { ConfigProvider } from 'antd';

import NavigationHandle from './Navigation/NavigationHandle';
import './App.css';

const theme = {
    token: {
        colorPrimary: '#00b96b'
    }
};

function App() {
    return (
        <ConfigProvider theme={theme}>
            <div className="App">
                <NavigationHandle/>
            </div>
        </ConfigProvider>
    );
};

export default App;
