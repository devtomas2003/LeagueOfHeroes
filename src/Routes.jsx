import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import SuperHeroForm from "./Views/SuperHeroForm";

import Base from "./Components/Base";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { UtilsProvider } from "./Contexts/Utils";

export default function Router(){
    return (
        <BrowserRouter>
            <Base>
                <UtilsProvider>
                    <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/add" element={<SuperHeroForm />} />
                            <Route path="/dashboard/edit/:id" element={<SuperHeroForm />} />
                        </Routes>
                    <Footer />
                </UtilsProvider>
            </Base>
        </BrowserRouter>
    );
}