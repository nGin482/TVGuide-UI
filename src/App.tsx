import { ConfigProvider } from 'antd';

import NavigationHandle from './Navigation/NavigationHandle';
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
                <div className="App">
                    <NavigationHandle/>
                </div>
            </ContextWrapper>
        </ConfigProvider>
    );
};

export default App;
