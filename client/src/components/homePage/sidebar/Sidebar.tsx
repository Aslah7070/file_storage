
"use client"
import React from 'react'
import { 
  Trash2,
  Share,
  Star,
  Clock,
  Home,
} from 'lucide-react';
import Homes from '../categories/homs/Home';
const Sidebar = () => {

  return (
    <div className='flex bg-gray-100  '>

       <aside className="w-64 bg-gray-200 border-r  border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 p-2 text-blue-600 bg-blue-50 rounded-lg">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Star className="w-5 h-5" />
              <span>Starred</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5" />
              <span>Recent</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Share className="w-5 h-5" />
              <span>Shared</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Trash2 className="w-5 h-5" />
              <span>Trash</span>
            </a>
          </nav>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Storage</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '16%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">2.4 GB of 15 GB used</p>
          </div>
        </aside>

        <Homes/>
    </div>
  )
}

export default Sidebar
