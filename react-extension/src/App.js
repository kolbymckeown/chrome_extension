import logo from './logo.svg';
import './App.css';
import WishlistForm from './Form'
import { ChakraProvider } from '@chakra-ui/react';

function App() {
    return (
        <div className="App">
            <ChakraProvider>
                <WishlistForm />
            </ChakraProvider>
        </div>
    );
}

export default App;
