import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LibraryProvider } from './context/LibraryContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Games } from './pages/Games'
import { GamePage } from './pages/GamePage'
import { Platforms } from './pages/Platforms'
import { PlatformPage } from './pages/PlatformPage'
import { Profile } from './pages/Profile'
import { Diary } from './pages/Diary'
import { Lists } from './pages/Lists'
import { ListPage } from './pages/ListPage'
import { SignIn } from './pages/SignIn'

export default function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/platform/:slug" element={<PlatformPage />} />
            <Route path="/u/:username" element={<Profile />} />
            <Route path="/u/:username/diary" element={<Diary />} />
            <Route path="/u/:username/lists" element={<Lists />} />
            <Route path="/list/:id" element={<ListPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Analytics />
      </BrowserRouter>
    </LibraryProvider>
  )
}
