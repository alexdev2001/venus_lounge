import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import BookPage from "./pages/book/bookPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login/loginPage.tsx";
import AdminPage from "./pages/admin/adminPage.tsx";
import ForgotPasswordPage from "./pages/forgot-password/forgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/password-reset/resetPasswordPage.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
                <Route path="/reset-password" element={<ResetPasswordPage/>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);