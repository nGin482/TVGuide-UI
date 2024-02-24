import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import NavigationHandle from './Navigation/NavigationHandle';
import BasePage from './Pages/BasePage';
import { ContextWrapper } from "./contexts";

const theme = {
    token: {
        colorPrimary: '#00b96b'
    }
};

function App() {

    return (
        <ConfigProvider theme={theme}>
            <ContextWrapper>
                <BrowserRouter>
                    <BasePage />
                    <NavigationHandle/>
                </BrowserRouter>
            </ContextWrapper>
        </ConfigProvider>
    );
};

export default App;
