import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage'
import JsonFormatter from './tools/JsonFormatter'
import UuidGenerator from './tools/UuidGenerator'
import PasswordGenerator from './tools/PasswordGenerator'
import Base64Tool from './tools/Base64Tool'
import JwtDecoder from './tools/JwtDecoder'
import TimestampConverter from './tools/TimestampConverter'
import ImageConverter from './tools/ImageConverter'
import WordCounter from './tools/WordCounter'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'

export default function App() {
  const { theme, changeTheme } = useTheme()

  return (
    <BrowserRouter>
      <Navbar theme={theme} onThemeChange={changeTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/tools/base64" element={<Base64Tool />} />
        <Route path="/tools/jwt-decoder" element={<JwtDecoder />} />
        <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
        <Route path="/tools/image-converter" element={<ImageConverter />} />
        <Route path="/tools/word-counter" element={<WordCounter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  )
}
