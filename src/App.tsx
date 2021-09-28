import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import { ThemeProvider } from '@mui/material';
import Theme from './ui/theme/Theme';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import TheRevolution from './pages/TheRevolution';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

const headerSections = [
    { title: 'Home', url: 'home' },
    { title: 'Services', url: 'services' },
    { title: 'The Revolution', url: 'revolution' },
    { title: 'About Us', url: 'about-us' },
    { title: 'Contact Us', url: 'contact-us' },
];

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <Header sections={headerSections} />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/Services">
                    <Services />
                </Route>
                <Route path="/revolution">
                    <TheRevolution />
                </Route>
                <Route path="/about-us">
                    <AboutUs />
                </Route>
                <Route path="/contact-us">
                    <ContactUs />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
