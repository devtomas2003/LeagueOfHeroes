import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import SuperHeroForm from "./Views/SuperHeroForm";

import Base from "./Components/Base";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Notification from "./Components/Notification";

import { ApiProvider } from "./Contexts/Api";
import { UtilsProvider } from "./Contexts/Utils";

export default function Router(){
    return (
        <BrowserRouter>
            <Base>
                <UtilsProvider>
                    <Notification />
                    <Header />
                        <ApiProvider>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/dashboard/add" element={<SuperHeroForm />} />
                                <Route path="/dashboard/edit/:id" element={<SuperHeroForm />} />
                            </Routes>
                        </ApiProvider>
                    <Footer />
                </UtilsProvider>
            </Base>
        </BrowserRouter>
    );
}