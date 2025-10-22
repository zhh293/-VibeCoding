'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, BookOpen, Github, Linkedin, Twitter, Mail, Home, Code, FileText, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            <FileText className="w-6 h-6 mr-2" />
            个人博客
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              首页
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              博客
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
              管理
            </Link>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button 
                className="absolute top-4 right-4 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Home className="w-5 h-5 mr-3" />
                  首页
                </div>
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-3" />
                  博客
                </div>
              </Link>
              <Link 
                href="/admin" 
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  管理
                </div>
              </Link>
              <div className="flex space-x-6 pt-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}